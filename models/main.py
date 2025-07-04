from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client, handle_file
from ultralytics import YOLO
from PIL import Image
from io import BytesIO
import shutil
import os
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("temp", exist_ok=True)


def super_res_and_predict(input_path, scale="2x"):
    client = Client("doevent/Face-Real-ESRGAN")
    result = client.predict(
        image=handle_file(input_path), size=scale, api_name="/predict"
    )
    sr_image = Image.open(result)
    model = YOLO("yolov8n-obb.pt")
    results = model(sr_image)
    rendered = results[0].plot()
    rendered_image = Image.fromarray(rendered)
    img_stream = BytesIO()
    rendered_image.save(img_stream, format="JPEG")
    img_stream.seek(0)
    return img_stream


@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    input_filename = f"temp_{uuid.uuid4().hex}_{file.filename}"
    input_path = os.path.join("temp", input_filename)
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    result_stream = super_res_and_predict(input_path)
    os.remove(input_path)
    return StreamingResponse(result_stream, media_type="image/jpeg")


@app.get("/")
def read_root():
    return {
        "message": "Upload an image via POST /upload/ to get super-resolution and prediction."
    }

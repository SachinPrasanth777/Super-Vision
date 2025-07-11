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


def super_res_and_predict(input_path, scale="4"):
    try:
        client = Client("Nick088/Real-ESRGAN_Pytorch")
        result = client.predict(
            img=handle_file(input_path), size_modifier=scale, api_name="/predict"
        )

        if result and os.path.exists(result):
            original_img = Image.open(input_path)
            enhanced_img = Image.open(result)

            original_size = original_img.size
            enhanced_size = enhanced_img.size

            if (
                enhanced_size[0] > original_size[0]
                and enhanced_size[1] > original_size[1]
            ):
                sr_image = enhanced_img
            else:
                sr_image = original_img
        else:
            sr_image = Image.open(input_path)

    except Exception as e:
        error_msg = str(e)
        if "exceeded your GPU quota" in error_msg or "quota" in error_msg.lower():
            print("GPU quota exceeded - using original image")
        else:
            print(f"Error during enhancement: {e}")
        sr_image = Image.open(input_path)

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

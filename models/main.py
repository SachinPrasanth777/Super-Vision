from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return JSONResponse(content={"message": "Welcome to the FastAPI application!"})


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        upload_dir = "images"
        os.makedirs(upload_dir, exist_ok=True)

        file_location = os.path.join(upload_dir, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return JSONResponse(
            content={
                "message": "Image uploaded successfully!",
                "filename": file.filename,
            }
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

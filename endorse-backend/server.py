import os
import time
import requests
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import cloudinary
import cloudinary.utils

# --- Initial Setup ---
load_dotenv()

app = FastAPI()

# --- Cloudinary Configuration ---
cloudinary.config(
    cloud_name=os.getenv("VITE_CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("VITE_CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

if not os.getenv("CLOUDINARY_API_SECRET"):
    print("FATAL ERROR: CLOUDINARY_API_SECRET is not defined in .env file.")
    exit(1)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Root Route (health check) ---
@app.get("/")
def index():
    return {"status": "ok", "message": "Endorse backend is running with FastAPI."}

# --- API Endpoint for Upload Signature ---
@app.get("/api/sign-upload")
def sign_upload():
    try:
        timestamp = int(time.time())
        folder = "endorse-uploads"

        signature = cloudinary.utils.api_sign_request(
            {"timestamp": timestamp, "folder": folder}, os.getenv("CLOUDINARY_API_SECRET")
        )

        return {"timestamp": timestamp, "signature": signature}

    except Exception as e:
        print("Error generating signature:", e)
        raise HTTPException(status_code=500, detail="Failed to generate signature")

# --- API Endpoint to Retrieve a PDF ---
@app.get("/api/get-pdf")
def get_pdf(url: str):
    if not url:
        raise HTTPException(status_code=400, detail="Missing URL parameter")

    try:
        # Fetch PDF from Cloudinary
        r = requests.get(url)
        r.raise_for_status()  # Raises an exception for bad status codes

        # Return PDF to frontend
        return Response(content=r.content, media_type="application/pdf")

    except Exception as e:
        print("Error loading PDF:", e)
        raise HTTPException(status_code=500, detail="Failed to load PDF")

# --- Start Server ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)

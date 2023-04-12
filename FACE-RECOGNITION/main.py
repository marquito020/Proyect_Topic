from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from face_recognition_compare import FaceRecognition
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:4000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class url_Imagen(BaseModel):
    imagen1: str
    imagen2: str


@app.get("/")
def index():
    url1 = 'https://media.glamour.mx/photos/63a0dae9a6d09f1d121b07b8/4:3/w_1999,h_1499,c_limit/Antonella_y_Messi_matrimonio.jpg'
    url2 = 'https://img.a.transfermarkt.technology/portrait/big/28003-1671435885.jpg'
    message = FaceRecognition.face_recognition(url1, url2)
    return {"message": message}


""" post FaceRecognition """


@app.post("/face_recognition")
def face_recognition(imagen: url_Imagen):
    message = FaceRecognition.face_recognition(imagen.imagen1, imagen.imagen2)
    """ return {"message": message} """
    return JSONResponse(content={"message": message}, status_code=200)
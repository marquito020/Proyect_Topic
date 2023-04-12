# import required libraries
import cv2
import urllib.request
import numpy as np
import face_recognition


class FaceRecognition:

    def face_recognition(url1, url2):
        # Descargar imagen1 desde URL
        with urllib.request.urlopen(url1) as url:
            arr = np.asarray(bytearray(url.read()), dtype=np.uint8)
            img1 = cv2.imdecode(arr, -1)

        with urllib.request.urlopen(url2) as url:
            arr = np.asarray(bytearray(url.read()), dtype=np.uint8)
            img2 = cv2.imdecode(arr, -1)

        # Obtener ubicaciones de los rostros en ambas imágenes
        rostros1 = face_recognition.face_locations(img1)
        rostros2 = face_recognition.face_locations(img2)

        # Verificar que se hayan detectado rostros en ambas imágenes
        if len(rostros1) == 0 or len(rostros2) == 0:
            return ("No se detectaron rostros en una o ambas imágenes.")
        else:
            # Obtener características faciales de los rostros
            codificadores1 = face_recognition.face_encodings(img1, rostros1)
            codificadores2 = face_recognition.face_encodings(img2, rostros2)

            # Comparar los rostros utilizando la función compare_faces de face_recognition
            resultado = face_recognition.compare_faces(
                codificadores1, codificadores2[0])

            # Imprimir mensaje según si los rostros son la misma persona o no
            if resultado[0]:
                return ("Valido")
            else:
                return ("No valido")


if __name__ == '__main__':
    # Descargar imagen1 desde URL
    url1 = 'https://assets-es.imgfoot.com/cristiano-ronaldo-wc-22-1-638de531aff57.jpg'
    url2 = 'https://images.ecestaticos.com/mXiaMzhISsDQH7Ki2YqTyi3XcCc=/0x0:0x0/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F36a%2Fe15%2F4ac%2F36ae154acded8663e9bd0402a78ab17f.jpg'
    print(FaceRecognition.face_recognition(url1, url2))

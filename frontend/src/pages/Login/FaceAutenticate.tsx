import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { useDispatch } from "react-redux";
import { createToken } from "../../redux/states/token.state";
import { createUser } from "../../redux/states/user.state";

function FaceAutenticate() {
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const webcamRef = useRef<Webcam>(null);

    const handleSearchFace = async () => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        if (imageSrc) {
            const response = await fetch("http://127.0.0.1:4000/api/faceAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": user.email,
                    "imagen1": user.photo,
                    "imagen2": imageSrc
                })
            });
            const data = await response.json();
            if (data.token) {
                dispatch(createUser(data.user));
                dispatch(createToken(data.token));
                /* navigate("/new-chat", { replace: true }); */
                console.log(data);
                setShowModalSucces(true);
            } else {
                /* alert(data.message) */
                setShowModalError(true);
                setMessageError(data.message);
                console.log(data);
            }
        }
    };
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user", // camera front
    };

    const [showModalSucces, setShowModalSucces] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [messageError, setMessageError] = useState("");

    return (
        <div className="FaceAutenticate min-h-screen bg-[#131517] text-[#d1d5db]">
            <main className="py-5 min-h-screen justify-center items-center">
                <h1 className="text-3xl text-center">Autenticación facial</h1>
                <div className='flex justify-center py-5'>
                    <Webcam ref={webcamRef}
                        audio={false}
                        height={480}
                        screenshotFormat="image/jpeg"
                        width={720}
                        videoConstraints={videoConstraints}
                        className="relative rounded-2xl" />
                </div>

                <div className='flex'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded
                    bottom-0 left-0 right-0 mx-auto
                    w-40 h-10
                    transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110
                    mr-3
                    "
                        onClick={handleSearchFace}
                    >
                        Ingresar
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded
                    bottom-0 left-0 right-0 mx-auto
                    w-40 h-10
                    transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110
                    ml-3
                    "
                        onClick={() => navigate("/login", { replace: true })}
                    >
                        Volver
                    </button>
                </div>

                {/* Modal */}
                <>
                    {showModalSucces ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="p-6 text-center">
                                            <div
                                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                                            >
                                                <svg
                                                    className="h-6 w-6 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 13l4 4L19 7"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-white-900">Successful!</h3>
                                            <div className="mt-2 text-center">
                                                <p className="text-sm text-white-500">Autenticación con exito</p>
                                            </div>
                                            <div className="items-center px-4 py-3">
                                                <button
                                                    id="ok-btn"
                                                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                                    onClick={() => navigate("/new-chat", { replace: true })}
                                                >
                                                    OK
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </>
                {/* MOdal */}
                {/* Modal Error */}
                <>
                    {showModalError ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="p-6 text-center">
                                            <div
                                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                                            >
                                                <svg
                                                    className="h-6 w-6 text-red-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-white-900">Error!</h3>
                                            <div className="mt-2 text-center">
                                                <p className="text-sm text-white-500">{messageError}</p>
                                            </div>
                                            <div className="items-center px-4 py-3">
                                                <button
                                                    id="ok-btn"
                                                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                                    onClick={() => setShowModalError(false)}
                                                >
                                                    OK
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </>
            </main>
        </div>
    );
};

export default FaceAutenticate;
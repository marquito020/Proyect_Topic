import { useState, FormEvent, ChangeEvent, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Webcam from "react-webcam";

import { useRegisterNewUserMutation } from "../../services/auth.service";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user", // camera front
};

function Register() {
  const navigate = useNavigate();
  const [registerNewUser, { data, error }] = useRegisterNewUserMutation();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [photo, setphoto] = useState<string | null>(null);
  const webCamRef = useRef<Webcam>(null);
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSucces, setShowModalSucces] = useState(false);
  const [MessageError, setMessageError] = useState<string>("");

  const capture = useCallback(() => {
    const photoSrc = webCamRef.current?.getScreenshot();
    if (photoSrc) {
      setphoto(photoSrc);
      // console.log(photoSrc);
    }
  }, [webCamRef]);

  /* const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (photo) {
      setPhoto(photo);
      const data = await registerNewUser({ name, email, password, photo }).unwrap();
      console.log(data);
      navigate("/login", { replace: true });
    } else {
      const data = await registerNewUser({ name, email, password, photo }).unwrap();
      console.log(data);
      navigate("/login", { replace: true });
    }
  }; */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (photo) {
      try {
        const data = await registerNewUser({ name, email, password, photo }).unwrap();
        console.log(data);
        /* navigate("/login", { replace: true }); */
        setShowModalSucces(true);
      } catch (error) {
        console.log(error);
        const { data } = error as { data: { message: string } };
        if (data) {
          /* alert(data.message); */
          setMessageError(data.message);
          setShowModalError(true);
        } else {
          /* alert("Error"); */
          setMessageError("Error");
          setShowModalError(true);
        }
      }
    } else {
      /* alert("Please take a photo"); */
      setShowModalError(true);
      setMessageError("Please take a photo");
    }
  };


  return (
    <div className="min-h-screen bg-zinc-900 text-gray-300 flex items-center justify-center p-4">
      <div className="max-w-lg ">

        <div className="bg-zinc-800 w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-white">Register</h1>

          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setName(target.value)
                }
                type="text"
                id="name"
                className="bg-zinc-800 w-full border border-neutral-700 py-2 px-10 rounded-md outline-none"
                placeholder="Name"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setEmail(target.value)
                }
                type="email"
                className="bg-zinc-800 w-full border border-neutral-700 py-2 px-10 rounded-md outline-none"
                placeholder="Email"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setPassword(target.value)
                }
                type="password"
                className="bg-zinc-800  w-full border border-neutral-700  py-2 px-10 rounded-md outline-none"
                placeholder="Password"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div className=" w-full flex flex-col items-center ">
              {isCaptureEnable || (
                <button
                  onClick={() => setCaptureEnable(true)}
                  className="bg-green-500 rounded px-4 py-2"
                >
                  Registrar Foto
                </button>
              )}

              <div className="w-full rounded-lg">
                <div className="flex flex-col items-center gap-1 mb-4">
                  {isCaptureEnable && !photo && (
                    <>
                      <div className="relative">
                        <Webcam
                          ref={webCamRef}
                          audio={false}
                          height={480}
                          screenshotFormat="image/jpeg"
                          width={720}
                          videoConstraints={videoConstraints}
                          className="w-full rounded-lg mb-2"
                        />
                      </div>

                      <div className="relative">
                        <button
                          onClick={capture}
                          className="bg-sky-500 rounded px-4 py-2 mr-2"
                        >
                          Capture photo
                        </button>
                        <button
                          onClick={() => setCaptureEnable(false)}
                          className="bg-red-500 rounded px-4 py-2 mr-2"
                        >
                          {"Close camera"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {photo && (
                <div className="flex flex-col items-center gap-1">
                  <img
                    src={photo}
                    alt="Facial recognition photo"
                    className="rounded-lg w-full mb-2"
                  />
                  <button
                    onClick={() => {
                      setphoto(null);
                    }}
                    className="bg-red-500 rounded px-4 py-2 w-full"
                  >
                    Delete photo
                  </button>
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white  py-2 px-4 rounded-md hover:bg-emerald-600  transition-colors"
              >
                {"Save"}
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2 text-[#d1d5db]">
          <Link className="text-blue-500" to={"/login"}>
            Sing In
          </Link>
        </span>
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
                      <p className="text-sm text-white-500">Registro con exito</p>
                    </div>
                    <div className="items-center px-4 py-3">
                      <button
                        id="ok-btn"
                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        onClick={() => navigate("/login", { replace: true })}
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
                      <p className="text-sm text-white-500">
                        {MessageError}
                      </p>
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
    </div>
  );
}

export default Register;

import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import { store } from "./redux/store";
import { Loading } from "./pages";
import Authenticate from "./guards/Authenticate";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const UserChat = lazy(() => import("./pages/Chat/UserChat"))

/* Autenticate */
const FaceAuthenticate = lazy(() => import("./pages/Login/FaceAutenticate"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/face-authenticate" element={<FaceAuthenticate />} />
            <Route element={<Authenticate />}>
              <Route element={<Dashboard />}>
                <Route path="/new-chat" element={<Chat />} />
                <Route path="/chats/:id" element={<UserChat />} />
              </Route>
            </Route>
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;

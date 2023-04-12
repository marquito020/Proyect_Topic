import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, photo } = req.body;
    const newUser = await AuthService.registerNewUser({
      name,
      email,
      password,
      photo,
    });

    if (!newUser)
      return res.status(400).json({ message: "The email already exist" });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login({ email, password });

    if (!user)
      return res.status(400).json({ message: "Email or Password incorrect" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


const loginNotFace = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginNotFace({ email, password });

    if (!user)
      return res.status(400).json({ message: "Email or Password incorrect" });

    // se envia los photo del usuario
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const faceAuth = async (req: Request, res: Response) => {
  try {
    const { email, password, imagen1, imagen2 } = req.body;
    const response = await fetch("http://127.0.0.1:8000/face_recognition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "imagen1": imagen1,
        "imagen2": imagen2
      })
    });
    const data = await response.json();
    const message = data.message;
    if (message === "Valido") {
      const valido = await AuthService.faceAuth({ email, password });
      if (!valido)
        return res.status(400).json({ message: "Error validacion" });
      // se envia la validacion
      res.status(200).json(valido);
    } else {
      res.status(400).json({ message: message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default {
  registerNewUser,
  login,
  logout,
  loginNotFace,
  faceAuth
};

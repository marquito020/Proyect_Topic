import { Auth } from "../interfaces/auth.interface.js";
import { User } from "../interfaces/user.intefaces.js";
import UserModel from "../models/user.model.js";
import { bcrypt, verify } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";
import { cloudinary } from "../utils/cloudinary.js";

const registerNewUser = async ({ name, email, password, photo }: User) => {
  const existUser = await UserModel.findOne({ email });
  if (existUser) return null;

  const passwordHash = await bcrypt(password);
  const result = await cloudinary.uploader.upload(photo, {
    folder: "users",
    use_filename: true,
  });
  const newUser = await UserModel.create({
    name,
    email,
    password: passwordHash,
    photo: result.url,
  });

  return newUser;
};

const login = async ({ email, password }: Auth) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return null;

  const passwordHash = userFound.password;
  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const token = generateToken(userFound);
  const data = {
    token,
    user: { _id: userFound._id, email: userFound.email, name: userFound.name, photo: userFound.photo },
  };
  return data;
};

const loginNotFace = async ({ email, password }: Auth) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return null;

  const passwordHash = userFound.password;
  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const data = {
    user: { _id: userFound._id, email: userFound.email, name: userFound.name, photo: userFound.photo },
    photo: userFound.photo
  }

  return data;
};

const faceAuth = async ({ email }: Auth) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return null;

  const token = generateToken(userFound);
  const data = {
    token,
    user: { _id: userFound._id, email: userFound.email, name: userFound.name, photo: userFound.photo },
  };

  return data;
};



export default {
  registerNewUser,
  login,
  loginNotFace,
  faceAuth,
};

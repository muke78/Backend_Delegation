import { loginService, registerUserService } from "../../services/index.js";

export const Login = (userData) => loginService(userData);

export const Register = (register) => registerUserService(register);

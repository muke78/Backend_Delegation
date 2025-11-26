import { loginService } from "../../services/auth/index.js";
export const Login = (userData) => loginService(userData);

export const Register = (register) => registerUserService(register);

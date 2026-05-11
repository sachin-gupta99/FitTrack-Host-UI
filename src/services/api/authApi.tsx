import { BASE_API_URL } from "@/constants/appConstants";
import type { LoginUserData } from "@/model/LoginUserData";
import type { RegisterUserData } from "@/model/RegisterUserData";
import axios from "axios";

const registerApiRoute = `${BASE_API_URL}/auth/register`;
const loginApiRoute = `${BASE_API_URL}/auth/login`;
const validateTokenApiRoute = `${BASE_API_URL}/auth/validateToken`;

export const registerUserApi = async (userData: RegisterUserData) => {
    try {
        const response = await axios.post(registerApiRoute, userData);
        return response.data;
    } catch (error) {        
        console.error("Registration failed:", error);
        throw error;
    }
};

export const loginUserApi = async (userData: LoginUserData) => {
    try {
        const response = await axios.post(loginApiRoute, userData);
        return response.data;
    } catch (error) {        
        console.error("Login failed:", error);
        throw error;
    }
};

export const validateTokenApi = async (token: string) => {
    try {
        const response = await axios.get(validateTokenApiRoute, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Token validation failed:", error);
        throw error;
    }
};
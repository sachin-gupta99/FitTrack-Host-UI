import { useMutation, useQuery } from "@tanstack/react-query"
import { loginUserApi, registerUserApi, validateTokenApi } from "@/services/api/authApi"
import type { RegisterUserData } from "@/model/RegisterUserData"
import type { LoginUserData } from "@/model/LoginUserData";

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (userData: RegisterUserData) => registerUserApi(userData),
        mutationKey: ["registerUser"],
    })
};

export const useLoginUser = () => {
    return useMutation({
        mutationFn: (userData: LoginUserData) => loginUserApi(userData),
        mutationKey: ["loginUser"],
    })
};

export const useValidateToken = (token: string) => {
    return useQuery({
        queryKey: ["validateToken"],
        queryFn: () => validateTokenApi(token),
        enabled: !!token,
    })
}
"use no memo"

import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

export const setToken = (token: string) => {
    localStorage.setItem("authToken", token)
}

export const getToken = (): string | null => {
    return localStorage.getItem("authToken")
}

export const removeToken = () => {
    localStorage.removeItem("authToken")
}
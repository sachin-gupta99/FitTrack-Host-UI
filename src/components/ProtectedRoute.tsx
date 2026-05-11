import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { getToken, removeToken } from "@/utils";
import { Loader2 } from "lucide-react";
import { useValidateToken } from "@/services/hooks/authHook";
import { useEffect, useRef } from "react";
import { useUserStore } from "@/store/userStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = getToken() || "";
    const { data: isTokenValid, isLoading, isError } = useValidateToken(token);

    const {setUserData} = useUserStore();

    const hasToasted = useRef(false);
    const navigate = useNavigate();

    const isUnauthenticated = !token || isError || (!isLoading && !isTokenValid?.data);

    useEffect(() => {
        if (!isLoading && isUnauthenticated && !hasToasted.current) {
            hasToasted.current = true;
            removeToken();
            navigate("/", { replace: true });
            toast.error("Something went wrong", {
                description: "Please login again",
            });
        }
    }, [isLoading, isUnauthenticated]);

    useEffect(() => {
        if(isTokenValid?.data) {
            setUserData(isTokenValid.data);
        }
    }, [isTokenValid, setUserData]);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-900">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (isUnauthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

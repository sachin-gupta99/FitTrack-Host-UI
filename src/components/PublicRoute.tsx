import { Navigate } from "react-router";
import { getToken } from "@/utils";
import { useValidateToken } from "@/services/hooks/authHook";
import { Loader2 } from "lucide-react";
import { DASHBOARD_BASE_PATH } from "@/constants/appConstants";

interface PublicRouteProps {
    children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const token = getToken() || "";
    const { data: isTokenValid, isLoading } = useValidateToken(token);

    if (!token) {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-900">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (isTokenValid?.data) {
        return <Navigate to={DASHBOARD_BASE_PATH} replace />;
    }

    return <>{children}</>;
}

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Dumbbell, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLoginUser, useRegisterUser } from "@/services/hooks/authHook";
import { toast } from "sonner";
import { setToken } from "@/utils";
import { DASHBOARD_BASE_PATH } from "@/constants/appConstants";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const registerUserMutation = useRegisterUser();
  const loginUserMutation = useLoginUser();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
        registerUserMutation.mutate(form, {
        onSuccess: (data: any) => {
            setIsLoading(false);
            setToken(data?.data?.token); // Save token to localStorage
            toast.success("Registration successful", {
                description: "Welcome to FitTrack!",
            });
            navigate(DASHBOARD_BASE_PATH, { replace: true });
        },
        onError: (error) => {
            setIsLoading(false);
            const message =
            (error as any)?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again.";
            toast.error(isSignUp ? "Registration failed" : "Authentication failed", {
            description: message,
            });
        },
        });
    } else {
        loginUserMutation.mutate(form, {
            onSuccess: (data: any) => {            
                setToken(data?.data?.token); // Save token to localStorage
                setIsLoading(false);
                toast.success("Login successful", {
                    description: "Welcome back!",
                });
                navigate(DASHBOARD_BASE_PATH, { replace: true });
            },
            onError: (error) => {
                setIsLoading(false);
                const message = (error as any)?.response?.data?.message || error?.message ||
                "Something went wrong. Please try again.";
                toast.error(isSignUp ? "Registration failed" : "Authentication failed", {
                    description: message,
                });
            },
        });
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4">
      {/* Animated background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Branding */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/25">
            <Dumbbell className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            FitTrack
          </h1>
          <p className="text-sm text-zinc-400">
            Your personal fitness companion
          </p>
        </div>

        <Card className="border-zinc-700/50 bg-zinc-900/80 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-white">
              {isSignUp ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isSignUp
                ? "Start your fitness journey today"
                : "Log in to continue your fitness journey"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields — visible in sign-up mode */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isSignUp
                    ? "max-h-28 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="grid grid-cols-2 gap-3 p-[3px]">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm text-zinc-300"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm text-zinc-300"
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-zinc-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="border-zinc-700 bg-zinc-800/60 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-zinc-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="border-zinc-700 bg-zinc-800/60 pr-10 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-200"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 font-medium text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900/80 px-2 text-zinc-500">
                  {isSignUp ? "Already have an account?" : "New here?"}
                </span>
              </div>
            </div>

            {/* Toggle sign-up / sign-in */}
            <div className="flex items-center justify-center gap-1 text-sm">
              <span className="text-zinc-400">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          By continuing you agree to our{" "}
          <a
            href="#"
            className="text-zinc-400 underline underline-offset-4 hover:text-zinc-300"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-zinc-400 underline underline-offset-4 hover:text-zinc-300"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

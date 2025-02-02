import { useForm } from "react-hook-form";
import { Input, Button, Card } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axiosInstance from "@/api/axiosInstance";
import DefaultLayout from "@/layouts/default";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post("/auth/login", data);

      // eslint-disable-next-line no-console
      console.log("Login Response:", response);

      if (
        response.data &&
        response.data.tokens &&
        response.data.tokens.access
      ) {
        localStorage.setItem("access_token", response.data.tokens.access.token);
        localStorage.setItem(
          "refresh_token",
          response.data.tokens.refresh.token,
        );

        navigate("/");
      } else {
        throw new Error(
          "Token akses atau refresh tidak ditemukan dalam respons.",
        );
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Login Error:", error);
      setErrorMessage(
        error.response?.data?.message || "Login gagal, silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card className="p-8 w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Email"
                type="email"
                variant="bordered"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Format email tidak valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                variant="bordered"
                {...register("password", { required: "Password wajib diisi" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              className="w-full bg-green-600 text-white"
              disabled={loading}
              type="submit"
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p>
              Belum punya akun?{" "}
              <Link className="text-blue-500 hover:underline" to="/register">
                Daftar
              </Link>
            </p>
          </div>
        </Card>
      </section>
    </DefaultLayout>
  );
}

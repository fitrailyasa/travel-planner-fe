import { useForm } from "react-hook-form";
import { Input, Button, Card } from "@heroui/react";
import { Link } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  /* eslint-disable no-console */
  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Register Data:", data);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-6 md:py-8">
        <Card className="p-8 w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Registrasi
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Name"
                type="name"
                variant="bordered"
                {...register("name", { required: "Nama wajib diisi" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
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
            <Button className="w-full bg-green-600 text-white" type="submit">
              Daftar
            </Button>
          </form>
          <div className="text-center mt-4">
            <p>
              Sudah punya akun?{" "}
              <Link className="text-blue-500 hover:underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </Card>
      </section>
    </DefaultLayout>
  );
}

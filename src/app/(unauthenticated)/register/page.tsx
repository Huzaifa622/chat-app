"use client"

import { api } from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";



const schema = z.object({
  name: z.string().trim().min(8),
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

type User = z.infer<typeof schema>;
const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(schema) });

  const onSubmit = async (data:User) => {
    try {
      console.log(data);
      const res = await api.post("/register",data
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <input {...register("name", { required: true })} placeholder="Name.." />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
        <input
          {...register("email", { required: true })}
          placeholder="Email.."
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
        <input
          {...register("password", { required: true })}
          placeholder="Password.."
        />
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
        <input
          type="submit"
          className="p-2 bg-gray-300 rounded-sm cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Register;

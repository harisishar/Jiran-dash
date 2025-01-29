"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api";
import { useForm } from "react-hook-form";
import { User } from "@/lib/utils";
import Link from "next/link";

export default function NewUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<Partial<User>>();

  const createUserPost = async (userData: Partial<User>) => {
    try {
      const response = await fetch('https://jiran-webapi.onrender.com/User/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: createUserPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      router.push('/users');
    },
  });

  const onSubmit = async (data: Partial<User>) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Add New User</h1>
        <Link
          href="/users"
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Users
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Username</label>
          <input
            {...register("userLogin", { required: "Username is required" })}
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Enter username"
          />
          {errors.userLogin && (
            <p className="text-red-500 text-sm mt-1">{errors.userLogin.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Mobile Number</label>
          <input
            {...register("mobileNo")}
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Enter mobile number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">NRIC</label>
          <input
            {...register("nric", { required: "NRIC is required" })}
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Enter NRIC"
          />
          {errors.nric && (
            <p className="text-red-500 text-sm mt-1">{errors.nric.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Status</label>
          <select {...register("status")} className="w-full p-2 border rounded text-gray-900">
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
} 
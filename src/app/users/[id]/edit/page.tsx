"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api";
import { useForm } from "react-hook-form";
import { User } from "@/lib/utils";
import Link from "next/link";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAllUsers,
  });

  const user = users.find((u) => u.userId === Number(params.id));
  
  const { register, handleSubmit } = useForm<Partial<User>>({
    defaultValues: user
  });

  const updateUserPost = async (userData: Partial<User>) => {
    try {
      const response = await fetch('https://jiran-webapi.onrender.com/User/Update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          ...userData,
          userId: Number(params.id)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: updateUserPost,
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

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Edit User</h1>
        <Link href="/users" className="text-gray-600 hover:text-gray-900">
          Back to Users
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Name</label>
          <input
            {...register("name")}
            defaultValue={user.name}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Username</label>
          <input
            {...register("userLogin")}
            defaultValue={user.userLogin}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Email</label>
          <input
            {...register("email")}
            type="email"
            defaultValue={user.email || ''}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Mobile</label>
          <input
            {...register("mobileNo")}
            defaultValue={user.mobileNo}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Status</label>
          <select 
            {...register("status")} 
            defaultValue={user.status}
            className="w-full p-2 border rounded text-black"
          >
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
} 
"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { visitorApi } from "@/lib/visitorApi";
import { useForm } from "react-hook-form";
import { Visitor } from "@/lib/visitorApi";
import Link from "next/link";

export default function NewVisitorPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Visitor>>();

  const mutation = useMutation({
    mutationFn: visitorApi.registerVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      router.push('/visitors');
    },
  });

  const onSubmit = async (data: Partial<Visitor>) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Add New Visitor</h1>
        <Link
          href="/visitors"
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Visitors
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("visitorName", { required: "Name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorName && <p className="text-red-600">{errors.visitorName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input
            {...register("visitorMobileNo", { required: "Mobile number is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorMobileNo && <p className="text-red-600">{errors.visitorMobileNo.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NRIC</label>
          <input
            {...register("visitorNRIC", { required: "NRIC is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorNRIC && <p className="text-red-600">{errors.visitorNRIC.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose of Visit</label>
          <input
            {...register("visitorPurposeOfVisit", { required: "Purpose is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorPurposeOfVisit && <p className="text-red-600">{errors.visitorPurposeOfVisit.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Visitor
        </button>
      </form>
    </div>
  );
} 
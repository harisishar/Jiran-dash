"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { visitorApi, Visitor } from "@/lib/visitorApi";
import { useForm } from "react-hook-form";
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
          <label className="block text-sm font-medium text-gray-700">Visitor Name</label>
          <input
            {...register("visitorName", { required: "Visitor name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorName && <p className="text-red-600">{errors.visitorName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Visitor Mobile No</label>
          <input
            {...register("visitorMobileNo", { required: "Mobile number is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorMobileNo && <p className="text-red-600">{errors.visitorMobileNo.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Visitor NRIC</label>
          <input
            {...register("visitorNRIC", { required: "NRIC is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorNRIC && <p className="text-red-600">{errors.visitorNRIC.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register("visitorQuantity", { required: "Quantity is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorQuantity && <p className="text-red-600">{errors.visitorQuantity.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose of Visit</label>
          <input
            {...register("visitorPurposeOfVisit", { required: "Purpose is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorPurposeOfVisit && <p className="text-red-600">{errors.visitorPurposeOfVisit.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
          <select
            {...register("visitorVehicleType", { required: "Vehicle type is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Vehicle Type</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
            <option value="3">Type 3</option>
            <option value="4">Type 4</option>
          </select>
          {errors.visitorVehicleType && <p className="text-red-600">{errors.visitorVehicleType.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Plate</label>
          <input
            {...register("visitorVehiclePlate", { required: "Vehicle plate is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.visitorVehiclePlate && <p className="text-red-600">{errors.visitorVehiclePlate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Number ID</label>
          <input
            type="number"
            {...register("unitNumberId", { required: "Unit number ID is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.unitNumberId && <p className="text-red-600">{errors.unitNumberId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Created By ID</label>
          <input
            type="number"
            {...register("createdById", { required: "Created by ID is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.createdById && <p className="text-red-600">{errors.createdById.message}</p>}
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
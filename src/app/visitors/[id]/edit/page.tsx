"use client";

import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { visitorApi, Visitor } from "@/lib/visitorApi";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function EditVisitorPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();

  // Ensure id is a string
  const visitorId = Array.isArray(id) ? id[0] : id;

  const { data: visitor, isLoading, error } = useQuery<Visitor>({
    queryKey: ["visitor", visitorId],
    queryFn: () => visitorApi.getVisitorById(visitorId as string),
    enabled: !!visitorId,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<Visitor>>();

  const mutation = useMutation({
    mutationFn: visitorApi.updateVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      router.push('/visitors');
    },
  });

  const onSubmit = async (data: Partial<Visitor>) => {
    try {
      await mutation.mutateAsync({ ...data, visitorId: parseInt(visitorId as string) });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading visitor data</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Edit Visitor</h1>
        <Link
          href="/visitors"
          className="text-black hover:text-gray-900"
        >
          Back to Visitors
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black">Visitor Name</label>
          <input
            defaultValue={visitor?.visitorName}
            {...register("visitorName", { required: "Visitor name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.visitorName && <p className="text-red-600">{errors.visitorName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Visitor Mobile No</label>
          <input
            defaultValue={visitor?.visitorMobileNo}
            {...register("visitorMobileNo", { required: "Mobile number is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.visitorMobileNo && <p className="text-red-600">{errors.visitorMobileNo.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Visitor NRIC</label>
          <input
            defaultValue={visitor?.visitorNRIC}
            {...register("visitorNRIC", { required: "NRIC is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.visitorNRIC && <p className="text-red-600">{errors.visitorNRIC.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Quantity</label>
          <input
            type="number"
            defaultValue={visitor?.visitorQuantity}
            {...register("visitorQuantity", { required: "Quantity is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.visitorQuantity && <p className="text-red-600">{errors.visitorQuantity.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Purpose of Visit</label>
          <input
            defaultValue={visitor?.visitorPurposeOfVisit}
            {...register("visitorPurposeOfVisit", { required: "Purpose is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.visitorPurposeOfVisit && <p className="text-red-600">{errors.visitorPurposeOfVisit.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Vehicle Type</label>
          <select
            defaultValue={visitor?.visitorVehicleType}
            {...register("visitorVehicleType", { required: "Vehicle type is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
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
          <label className="block text-sm font-medium text-black">Vehicle Plate</label>
          <input
            defaultValue={visitor?.visitorVehiclePlate}
            {...register("visitorVehiclePlate", { required: "Vehicle plate is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.visitorVehiclePlate && <p className="text-red-600">{errors.visitorVehiclePlate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Unit Number ID</label>
          <input
            type="number"
            defaultValue={visitor?.unitNumberId}
            {...register("unitNumberId", { required: "Unit number ID is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.unitNumberId && <p className="text-red-600">{errors.unitNumberId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Created By ID</label>
          <input
            type="number"
            defaultValue={visitor?.createdById}
            {...register("createdById", { required: "Created by ID is required", valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.createdById && <p className="text-red-600">{errors.createdById.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Status</label>
          <input
            defaultValue={visitor?.approvalStatus}
            {...register("approvalStatus", { required: "Status is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          {errors.approvalStatus && <p className="text-red-600">{errors.approvalStatus.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Update Visitor
        </button>
      </form>
    </div>
  );
} 
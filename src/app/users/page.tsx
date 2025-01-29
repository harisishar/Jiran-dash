"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/lib/api";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import Link from "next/link";

export default function UsersPage() {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAllUsers,
  });

  console.log("Users data:", users); // Debug log
  console.log("Loading state:", isLoading); // Debug log
  console.log("Error state:", error); // Debug log

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error loading users: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Users</h1>
        <Link
          href="/users/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add User
        </Link>
      </div>
      <div className="flex justify-end mb-4 text-black">
        <div>Total Users: {users.length}</div>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
} 
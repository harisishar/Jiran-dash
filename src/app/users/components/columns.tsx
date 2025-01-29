"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/utils";
import Link from "next/link";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "userLogin",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "A" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status === "A" ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/users/${user.userId}/edit`}
            className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            Edit
          </Link>
        </div>
      );
    },
  },
]; 
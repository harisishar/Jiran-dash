"use client";

import { useQuery } from "@tanstack/react-query";
import { visitorApi } from "@/lib/visitorApi";
import Link from "next/link";

export default function VisitorsPage() {
  const { data: visitors = [], isLoading, error } = useQuery({
    queryKey: ["visitors"],
    queryFn: visitorApi.getVisitors,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading visitors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error loading visitors: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Visitors</h1>
        <Link
          href="/visitors/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Visitor
        </Link>
      </div>
      <div className="flex justify-end mb-4">
        <div className="text-black">Total Visitors: {visitors.length}</div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-black">Name</th>
            <th className="py-2 text-black">Mobile No</th>
            <th className="py-2 text-black">NRIC</th>
            <th className="py-2 text-black">Purpose</th>
            <th className="py-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.visitorId}>
              <td className="py-2 text-black">{visitor.visitorName}</td>
              <td className="py-2 text-black">{visitor.visitorMobileNo}</td>
              <td className="py-2 text-black">{visitor.visitorNRIC}</td>
              <td className="py-2 text-black">{visitor.visitorPurposeOfVisit}</td>
              <td className="py-2">
                <Link
                  href={`/visitors/${visitor.visitorId}/edit`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
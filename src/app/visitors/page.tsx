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
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Mobile No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">NRIC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visitors.map((visitor) => (
            <tr key={visitor.visitorId} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.visitorName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.visitorMobileNo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.visitorNRIC}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.visitorPurposeOfVisit}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link
                  href={`/visitors/${visitor.visitorId}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 font-medium"
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
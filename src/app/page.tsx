import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Jiran Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your users and their permissions efficiently
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/users"
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              User Management
            </h2>
            <p className="text-gray-600">
              View, add, edit, and manage user accounts and their permissions
            </p>
          </Link>
          <Link
            href="/visitors"
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Visitor Management
            </h2>
            <p className="text-gray-600">
              Register, update, and view visitor information
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

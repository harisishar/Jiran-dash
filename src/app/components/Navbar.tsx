import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold">
          <Link href="/">Home</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/visitors" className="text-white hover:text-gray-300">
            Visitors
          </Link>
          <Link href="/users" className="text-white hover:text-gray-300">
            Users
          </Link>
          
        </div>
      </div>
    </nav>
  );
} 
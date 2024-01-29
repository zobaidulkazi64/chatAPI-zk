// components/NotFoundPage.js
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen fixed w-full bg-gray-200">
      <div className="text-center">
        <h1 className="text-3xl lg:text-6xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-gray-600">The page you are looking for does not exist.</p>
        <Link href="/">
          <p className="text-blue-500 bg-blue-300 rounded-2xl font-bold p-2 text-2xl hover:underline">Go back to home</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

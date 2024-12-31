import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaSync } from 'react-icons/fa';

export default function NotFound() {
  const error = useRouteError();
  const navigate = useNavigate();

  const getErrorMessage = () => {
    if (!error) {
      return "An unexpected error occurred!!";
    } else if (error.status === 404) {
      return "Oops! Page Not Found";
    } else if (error.status === 500) {
      return "Internal Server Error";
    } else if (error.status === 403) {
      return "Access Forbidden";
    }

    return `Error: ${error.status || "Unknown"}, ${error.statusText || "Unexpected Error"}`;
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 text-center transform transition-all hover:scale-105">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle
            size={100}
            className="text-red-500 animate-bounce"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {getErrorMessage()}
        </h1>

        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaHome className="mr-2" size={20} />
            Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaSync className="mr-2" size={20} />
            Reload Page
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
            <p>Technical Details:</p>
            <code>
              Status: {error.status || 'N/A'}
              {error.statusText && ` - ${error.statusText}`}
            </code>
          </div>
        )}
      </div>
    </section>
  );
}
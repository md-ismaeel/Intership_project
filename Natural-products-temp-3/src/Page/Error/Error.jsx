import React from 'react';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';

export default function Error() {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          We apologize for the inconvenience. This could be due to a temporary issue or network connection problem.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleReturnHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </button>

          <button
            onClick={handleRefresh}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>If the problem persists, please contact our support team.</p>
          <p className="mt-1">Error Code: ERR_PAGE_LOAD</p>
        </div>
      </div>
    </div>
  );
}
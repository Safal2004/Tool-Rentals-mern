import React from "react";

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="flex flex-col items-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
        role="status"
      />
      <p className="mt-2 text-gray-700">Loading...</p>
    </div>
  </div>
);

export default Loading;

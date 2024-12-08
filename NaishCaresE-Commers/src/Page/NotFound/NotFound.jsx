import React from "react";
import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  return (
    <section className="w-full h-screen flex justify-center items-start text-xl text-red-500">
      <div className={`mt-20`}>
        {error ? (
          <>
            Error: {error.status || "Unknown!"},{" "}
            {error.statusText || "An unexpected error occurred!!"}!
          </>
        ) : (
          "An unexpected error occurred!!"
        )}
      </div>
    </section>
  );
}

"use client";

export function Spinner() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

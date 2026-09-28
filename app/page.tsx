"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-4xl font-bold">ABQ AI TEST</h1>

      <button
        onClick={() => alert("BUTTON WORKS")}
        className="mt-10 rounded-xl bg-white px-6 py-3 text-black"
      >
        TEST BUTTON
      </button>
    </main>
  );
}

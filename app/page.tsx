"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned ${response.status}: ${
            text || "Empty response"
          }`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setReply(data.reply);
      setMessage("");
    } catch (error) {
      console.error("Chat error:", error);

      setReply(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b12] text-white">
      <header className="border-b border-white/10 px-5 py-4">
        <h1 className="text-xl font-bold">ABQ AI</h1>
      </header>

      <section className="flex min-h-[calc(100vh-73px)] flex-col items-center px-5 py-12">
        <div className="w-full max-w-3xl">

          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">
              What can I help you with?
            </h2>

            <p className="mt-4 text-gray-400">
              Chat, create images, generate videos and analyze files.
            </p>
          </div>

          {reply && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-2 text-sm font-semibold text-gray-400">
                ABQ AI
              </div>

              <div className="whitespace-pre-wrap leading-7">
                {reply}
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              💬
              <div className="mt-2 text-sm">Chat</div>
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              🖼️
              <div className="mt-2 text-sm">Image</div>
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              🎬
              <div className="mt-2 text-sm">Video</div>
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              📄
              <div className="mt-2 text-sm">Files</div>
            </button>
          </div>

          <div className="mt-6 flex items-center rounded-2xl border border-white/10 bg-white/5 p-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask ABQ AI anything..."
              className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={loading}
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
            >
              {loading ? "..." : "➤"}
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            ABQ AI can make mistakes. Check important information.
          </p>

        </div>
      </section>
    </main>
  );
}

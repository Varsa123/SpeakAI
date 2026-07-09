import { useEffect, useRef } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="h-[500px] overflow-y-auto rounded-2xl bg-slate-900 p-6">

      <div className="space-y-5">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] gap-3 ${
                message.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  message.role === "assistant"
                    ? "bg-indigo-600"
                    : "bg-green-600"
                }`}
              >
                {message.role === "assistant" ? (
                  <FaRobot className="text-white" />
                ) : (
                  <FaUser className="text-white" />
                )}
              </div>

              <div
  className={`rounded-2xl px-5 py-4 ${
    message.role === "assistant"
      ? "bg-slate-800 text-white"
      : "bg-indigo-600 text-white"
  }`}
>
  <p>{message.content}</p>

  <p className="mt-2 text-right text-xs text-slate-300">
    {message.time}
  </p>
</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                <FaRobot className="text-white" />
              </div>

              <div className="rounded-2xl bg-slate-800 px-5 py-4 text-slate-300 animate-pulse">
                AI is thinking...
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}

export default ChatWindow;
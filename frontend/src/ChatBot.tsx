import React, { useState } from "react";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{from: "user" | "bot"; text: string}[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);
    // Simple bot reply demo
    setMessages(prev => [...prev, { from: "user", text: input }, { from: "bot", text: `You said: "${input}"` }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-slate-900/90 border border-slate-700 rounded-2xl shadow-lg flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto max-h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded-lg ${msg.from === "user" ? "bg-emerald-500 text-slate-950 self-end" : "bg-slate-700 text-slate-100 self-start"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t border-slate-700 p-2 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:border-emerald-400 border border-slate-600"
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 bg-emerald-500 rounded-lg text-slate-950 font-semibold hover:bg-emerald-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

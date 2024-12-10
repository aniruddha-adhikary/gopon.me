"use client";

import {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {db} from "@/lib/db";

export default function SendMessagePage() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams();

  const handleSendMessage = async () => {
    if (params.id) {
        await db.sendMessage(typeof params.id === 'string' ? params.id : params.id[0], message);
        router.push(`/inbox/${params.id}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-blue-500/10">
        <h1 className="text-2xl font-bold text-blue-500">Send Message to Inbox: {params.id}</h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="input-field"
          placeholder="Type your message here..."
        />
        <div className="flex justify-end gap-4">
          <button 
            onClick={() => router.back()} 
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={handleSendMessage}
            className="btn-primary"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

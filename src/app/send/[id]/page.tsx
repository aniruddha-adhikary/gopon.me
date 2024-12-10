"use client";

import {useState} from "react";
import {useParams} from "next/navigation";
import {db} from "@/lib/db";

export default function SendMessagePage() {
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const params = useParams();

  const handleSendMessage = async () => {
    if (params.id && message.trim()) {
      try {
        await db.sendMessage(typeof params.id === 'string' ? params.id : params.id[0], message);
        setMessage("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="max-w-2xl w-full space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="font-caveat text-3xl text-blue-600 mb-6 text-center">
            Write a Message
          </h1>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="input-field"
            placeholder="Dear friend..."
          />
          <div className="flex justify-end gap-4 mt-8 border-t border-slate-200 pt-4">
            {showSuccess && (
              <div className="text-green-600 font-caveat text-xl">
                Message sent successfully!
              </div>
            )}
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`px-6 py-2 rounded-full transition-colors font-caveat text-xl ${
                message.trim() 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Send Message →
            </button>
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm">
          Sending to inbox: {params.id}
        </p>
      </div>
    </div>
  );
}

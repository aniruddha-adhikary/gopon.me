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
    <div>
      <h1>Send Message to Inbox: {params.id}</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

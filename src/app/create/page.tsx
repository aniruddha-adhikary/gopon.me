"use client";

import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export default function CreateInboxPage() {
  const router = useRouter();

  const handleCreateInbox = async () => {
    const id = await db.createInbox();
    router.push(`/inbox/${id}`);
  };

  return (
    <div>
      <h1>Create Anonymous Inbox</h1>
      <button onClick={handleCreateInbox}>Create Inbox</button>
    </div>
  );
}

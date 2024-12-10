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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-blue-500/10">
        <h1 className="text-2xl font-bold text-center text-blue-500">Create Anonymous Inbox</h1>
        <button 
          onClick={handleCreateInbox}
          className="btn-primary w-full"
        >
          Create New Inbox
        </button>
      </div>
    </div>
  );
}

import { db } from "@/lib/db";

export default async function InboxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const messages = await db.getInboxMessages(params.id);

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-500">Inbox: {params.id}</h1>
          <a href={`/send/${params.id}`} className="btn-primary">
            Send a Message
          </a>
        </div>
        
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="p-4 rounded-lg bg-white/5 border border-blue-500/10">
              {message}
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center text-gray-500 py-8">No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

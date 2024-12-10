import { db } from "@/lib/db";

export default async function InboxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const messages = await db.getInboxMessages(params.id);

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-caveat text-blue-600">Inbox: {params.id}</h1>
          <a href={`/send/${params.id}`} className="btn-primary font-caveat text-xl">
            Send a Message
          </a>
        </div>
        
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="p-6 space-y-2 bg-white rounded-lg shadow-sm">
              <div className="font-caveat text-xl">{message.content}</div>
              <div className="text-sm text-gray-500 font-sans">
                {new Date(message.created_at).toLocaleString()}
              </div>
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

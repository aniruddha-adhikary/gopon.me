import { db } from "@/lib/db";

export default async function InboxPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const messages = await db.getInboxMessages(id);

  return (
    <div>
      <h1>Inbox: {id}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <a href={`/send/${id}`}>Send a Message</a>
    </div>
  );
}

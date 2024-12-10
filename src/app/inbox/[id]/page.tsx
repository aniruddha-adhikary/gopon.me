import { db } from "@/lib/db";

export default async function InboxPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const messages = await db.getInboxMessages(params.id);

  return (
    <div>
      <h1>Inbox: {params.id}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <a href={`/send/${params.id}`}>Send a Message</a>
    </div>
  );
}

import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

type Props = {};

async function HomePage({}: Props) {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;
  return (
    <main className="">
      {/* Message list */}
      <MessageList initialMessages={messages} />
      {/* Chat out */}
      <ChatInput />
    </main>
  );
}

export default HomePage;

import React from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

type Props = {};

function HomePage({}: Props) {
  return (
    <main className="">
      {/* Message list */}
      <MessageList />
      {/* Chat out */}
      <ChatInput />
    </main>
  );
}

export default HomePage;

"use client";

import { useState, FormEvent } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetcMessages";

type Props = {};

function ChatInput({}: Props) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  console.log(messages);
  ///console.log(input);
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const messageToSend = input;
    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Elon Musk",
      profilePic:
        "https://pbs.twimg.com/profile_images/1318823293831548931/MbCjkP55_400x400.jpg",
      email: "pavel@dovhomilja.cz",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());
      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="flex px-10 py-5 space-x-2 border-t fixed bottom-0 z-50 w-full bg-white"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter message here ..."
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;

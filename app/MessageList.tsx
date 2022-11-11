"use client";

import React from "react";
import useSWR from "swr";
import { Message } from "../typings";
import fetcher from "../utils/fetcMessages";
import MessageComponent from "./MessageComponent";

type Props = {};

function MessageList({}: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  return (
    <div>
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

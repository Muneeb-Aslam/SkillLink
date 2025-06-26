"use client";
import Chatbox from "@/app/components/Chatbox";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useParams } from "next/navigation";

export default function Chat() {
   const client = new Ably.Realtime({ authUrl: "/api" });
   const params = useParams();
   const slug = params.slug;

   return (
      <AblyProvider client={client}>
         <ChannelProvider channelName="chat-message">
            <Chatbox slug={slug as string}></Chatbox>
         </ChannelProvider>
      </AblyProvider>
   );
}

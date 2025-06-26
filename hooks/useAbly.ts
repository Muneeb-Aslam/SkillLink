import { useEffect, useRef } from "react";
import ably from "../lib/ably";

export const useAbly = (
   channelName: string,
   callbackOnMessage: (message: any) => void
) => {
   const channel = useRef(ably.channels.get(channelName));

   useEffect(() => {
      const onMessage = (message: any) => {
         callbackOnMessage(message);
      };

      channel.current.subscribe(onMessage);

      return () => {
         channel.current.unsubscribe(onMessage);
      };
   }, [channelName, callbackOnMessage]);

   const sendMessage = (message: any) => {
      channel.current.publish("message", message);
   };

   return { sendMessage };
};

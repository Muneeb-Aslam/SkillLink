"use client";
import Navbar from "@/components/ui/navbar";
import { dummyConversations, dummyMiniConversations } from "../utils/data";
import moment from "moment";
import { icons } from "../utils/icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Rings } from "react-loader-spinner";
import {
   API_CONVERSATION_GETALL,
   API_CONVERSATION_SEND,
} from "@/app/api/api_constants";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { SendMessageBody } from "@/app/api/conversation/send/route";
import user from "@/redux/reducers/user";
import * as Ably from "ably";
import { useAbly } from "@/hooks/useAbly";
import { useChannel } from "ably/react";
import avatar from "@/public/avatar.png";

interface MessagesProps {
   slug: string;
}

const Chatbox: React.FC<MessagesProps> = ({ slug }) => {
   const session = useSession();
   const userId = session.data?.user.id;
   const [searchValue, setSearchValue] = useState("");
   const pathName = usePathname();
   const params = useParams();
   const [allConvs, setAllConvs] = useState<IConversationFrontend[]>([]);
   const filteredConvs = allConvs.filter(
      (conv) =>
         conv.users[0].name.toLowerCase().includes(searchValue.toLowerCase()) ||
         conv.project.name.toLowerCase().includes(searchValue.toLowerCase())
   );
   const chatareaRef = useRef<HTMLDivElement | null>(null);
   const [loadedOnce, setLoadedOnce] = useState(false);

   const convId = slug;
   const selectedConvId = slug;
   const selectedConv = allConvs.find((conv) => conv._id === selectedConvId);
   const [messageToSend, setMessageToSend] = useState("");
   const [messages, setMessages] = useState<IMessage[]>([]);
   const { channel, ably } = useChannel("chat-message", (message) => {
      console.log("message update caleed", message);
      const newConvs = [...allConvs].map((conv) =>
         conv._id !== selectedConvId
            ? conv
            : {
                 ...conv,
                 messages: [...conv.messages, message.data],
                 lastMessage: message.data.text,
                 lastMessageTime: message.data.time,
              }
      );
      setAllConvs(newConvs);
      setMessages([...messages, message.data]);
      // chatareaRef.current?.lastElementChild?.scrollIntoView({
      //    behavior: "smooth",
      // });
   });

   const getAllConvs = async () => {
      try {
         console.log(session, "my session");
         const response = await fetch(`${API_CONVERSATION_GETALL}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: session.data?.user.id }),
         });

         const data = await response.json();
         console.log("my data", data);

         if (response?.ok) {
            setAllConvs(data.data);
            setLoadedOnce(true);
            // toast.success("Password Reset Email Sent");
         }
      } catch (err) {
         toast.error(JSON.stringify(err));
      }
   };
   useEffect(() => {
      if (session.data) {
         getAllConvs();
      }
   }, [session]);
   console.log("all convs", allConvs);
   if (!loadedOnce)
      return (
         <div className="flex h-screen items-center">
            <Rings color="rgba(4, 173, 230, 1)"></Rings>
         </div>
      );
   const sendMessage = async () => {
      const dataToSend: SendMessageBody = {
         convId: convId as string,
         message: {
            time: new Date().getTime().toString(),
            senderId: session.data?.user.id || "",
            text: messageToSend,
         },
      };
      try {
         console.log(session, "my session");
         const response = await fetch(`${API_CONVERSATION_SEND}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
         });

         const data = await response.json();
         await channel.publish({
            name: "chat-message",
            data: dataToSend.message,
         });
         console.log("my data", data);

         if (response?.ok) {
            // toast.success("Password Reset Email Sent");
         }
      } catch (err) {
         toast.error(JSON.stringify(err));
      }
      setMessageToSend("");
   };

   return (
      <div className="grid grid-rows-[min-content_auto] h-screen overflow-auto w-full">
         <Navbar></Navbar>
         <div className="grid grid-cols-[24rem_auto] grid-rows-[auto] w-full h-full overflow-auto">
            <div className="flex flex-col  overflow-auto h-full pb-4 border-r border-r-gray-300">
               <div className="flex gap-4 py-4 px-4 ">
                  {icons.search}
                  <input
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                     className="w-full outline-none border-b pb-2"
                     placeholder="Search the chat "
                  ></input>
               </div>
               {filteredConvs.length === 0 ? (
                  <div className="text-center font-bold text-xl">
                     No Results
                  </div>
               ) : null}
               {filteredConvs.map((conv) => (
                  <Link
                     href={`/messages/${conv._id}`}
                     className={classNames(
                        "flex justify-between cursor-pointer w-full px-4 py-4 ",
                        { "bg-main-500": convId === conv._id }
                     )}
                  >
                     <div className="flex gap-3">
                        <img
                           src={conv.users[0].profileImage || avatar.src}
                           className="h-10 w-10 object-cover aspect-square rounded-full "
                        ></img>
                        <div className="flex flex-col">
                           <div
                              className={classNames(
                                 "font-semibold text-sm whitespace-nowrap",
                                 { "text-white": conv._id === convId }
                              )}
                           >
                              {conv.users[0].name}
                           </div>
                           <div
                              className={classNames(
                                 "text-xs font-semibold text-gray-500 whitespace-nowrap w-60 overflow-hidden text-ellipsis",
                                 { "text-white": convId === conv._id }
                              )}
                           >
                              {conv.project.name}
                           </div>

                           <div
                              className={classNames(
                                 "text-xs text-gray-500 whitespace-nowrap text-ellipsis w-60 overflow-hidden",
                                 { "text-white": convId === conv._id }
                              )}
                           >
                              {conv.lastMessage}
                           </div>
                        </div>
                     </div>
                     <div
                        className={classNames("text-xs whitespace-nowrap  ", {
                           "text-gray-200": conv._id === convId,

                           "text-gray-500": convId !== conv._id,
                        })}
                     >
                        {moment(new Date(+conv.lastMessageTime)).format(
                           "MMM DD"
                        )}
                     </div>
                  </Link>
               ))}
            </div>
            <div className="grid grid-rows-[min-content_auto_min-content] overflow-auto">
               <div className="flex flex-col px-6 py-4 border-b w-full border-b-gray-200 h-fit">
                  <Link
                     href="/"
                     className="cursor-pointer font-semibold text-xl"
                  >
                     {selectedConv?.users[0].name}
                  </Link>
                  <Link href="/" className="text-gray-500 cursor-pointer">
                     {selectedConv?.project.name}
                  </Link>
               </div>
               <div
                  className="flex flex-col overflow-auto gap-4 py-6"
                  ref={chatareaRef}
               >
                  {selectedConv?.messages.map((message) => {
                     const user = selectedConv.users.find(
                        (user) => user.id === message.senderId
                     );
                     const isSender = message.senderId === userId;
                     return (
                        <>
                           <div
                              className={classNames(
                                 "flex w-full justify-start px-4 ",
                                 {
                                    "justify-end": isSender,
                                 }
                              )}
                           >
                              <div className="flex gap-4 ">
                                 {!isSender && (
                                    <img
                                       src={user?.profileImage || avatar.src}
                                       className="rounded-full h-10 w-10"
                                    ></img>
                                 )}

                                 <div className="flex flex-col gap-2 ">
                                    <div
                                       className={classNames(
                                          "rounded px-3 py-4 flex ",
                                          {
                                             "bg-main-500 text-white": isSender,
                                             "bg-gray-300": !isSender,
                                          }
                                       )}
                                    >
                                       {message.text}
                                    </div>
                                    <div className="text-[10px] text-right">
                                       {moment(new Date(+message.time)).format(
                                          "MMM DD HH:mm"
                                       )}
                                    </div>
                                 </div>
                                 {isSender && (
                                    <img
                                       src={user?.profileImage || avatar.src}
                                       className="rounded-full h-10 w-10"
                                    ></img>
                                 )}
                              </div>
                           </div>
                        </>
                     );
                  })}
               </div>
               {allConvs.length ? (
                  <div className="flex gap-8 border-t border-t-gray-300 py-8 px-6 items-center">
                     <input
                        value={messageToSend}
                        onChange={(e) => setMessageToSend(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                        className="w-full outline-none border-b pb-2"
                        placeholder="Send Message"
                     ></input>
                     <div
                        onClick={sendMessage}
                        className="text-white bg-main-500 flex h-fit px-10 py-2 hover:scale-110 transition-all duration-100 cursor-pointer"
                     >
                        Send
                     </div>
                  </div>
               ) : null}
            </div>
         </div>
      </div>
   );
};

export default Chatbox;

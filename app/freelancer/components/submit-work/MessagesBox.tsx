'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const MessagesBox = () => {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            id: 1,
            user: {
                name: "John Doe",
                avatar: "/icons/avatar.svg",
                message: "Hello, I am interested in your project. Can you please provide more details?",
            },
        },
        {
            id: 2,
            user: {
                name: "Jane Doe",
                avatar: "/icons/avatar.svg",
                message: "Hello, I am interested in your project. Can you please provide more details?",
            },
        },
        {
            id: 3,
            user: {
                name: "John Doe",
                avatar: "/icons/avatar.svg",
                message: "Hello, I am interested in your project. Can you please provide more details?",
            },
        },
    ]);
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(newMessage)
        const updatedMessages = [...messages]
        updatedMessages.push({
            id: updatedMessages.length + 1,
            user: {
                name: "Jane Doe",
                avatar: "/icons/avatar.svg",
                message: newMessage,
            },
        })
        setMessages(updatedMessages)
        setNewMessage("")
    }
  return (
    <div className="flex flex-col justify-between border border-[grayish] p-4 rounded-lg h-[30vh]">
        <ul className="flex flex-col gap-2 overflow-y-auto pr-2 ">
            {messages.map((message, index) => (
                <li key={index} className="flex gap-4">
                    <Image src={message.user.avatar} width={12} height={12} alt="avatar" className="text-sm w-12 h-12 rounded-full" />
                    <div>
                        <h3 className="font-bold">{message.user.name}</h3>
                        <p>{message.user.message}</p>
                    </div>
                </li>
                ))
            }
        </ul>
      <form className="flex items-center gap-4 sticky" onSubmit={onSubmitHandler}>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            type="text" placeholder="Type a message..." className="w-full border border-[grayish] p-2 outline-gray-300 rounded-lg mt-4" 
        />
        <Button type="submit" className="mt-4 !w-fit !flex-auto">Send</Button>
      </form>
    </div>
  )
}

export default MessagesBox

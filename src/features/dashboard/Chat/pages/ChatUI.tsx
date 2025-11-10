import { useGetPeriodOfDay } from "../../../../hooks/useGetPeriodOfDay"
import { useGetUsername } from "../../../../hooks/useGetUsername"
import { FaRobot } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import ChatInput from "../components/ChatInput";




const ChatUI = () => {
    const periodOfDay = useGetPeriodOfDay()
    const username = useGetUsername()

    const messages = [
        {
            chatId: "c101",
            messageId: 1,
            text: "Hello",
            sender: "user"
        },
        {
            chatId: "c101",
            messageId: 2,
            text: "Hi there! How can I help you today?",
            sender: "bot"
        },
        {
            chatId: "c101",
            messageId: 3,
            text: "Can you tell me the weather forecast?",
            sender: "user"
        },
        {
            chatId: "c101",
            messageId: 4,
            text: "Sure! Which city are you in?",
            sender: "bot"
        },
        {
            chatId: "c101",
            messageId: 5,
            text: "Lagos",
            sender: "user"
        },
        {
            chatId: "c101",
            messageId: 6,
            text: "Today in Lagos, it’s mostly sunny with a high of 32°C.",
            sender: "bot"
        },
        {
            chatId: "c101",
            messageId: 7,
            text: "Nice! Can you also set a reminder for 6 PM?",
            sender: "user"
        },
        {
            chatId: "c101",
            messageId: 8,
            text: "Got it. Reminder set for 6 PM today.",
            sender: "bot"
        },
        {
            chatId: "c101",
            messageId: 9,
            text: "Thanks a lot!",
            sender: "user"
        },
        {
            chatId: "c101",
            messageId: 10,
            text: "You’re welcome! 😊",
            sender: "bot"
        }
    ];



    return (
        <main className='bg-white rounded-lg p-5 h-[70vh]'>
            {/* For chats */}

            {
                messages.length > 0 && (
                    <section className="flex flex-col space-y-8 w-full">
                        {messages.map((message, idx) => (
                            <div className={`${message.sender === "bot" ? "self-start " : "self-end flex-row-reverse"} flex flex-row w-full`} key={idx}>
                                <span>
                                    {message.sender === "bot"
                                        ? <aside className="bg-[#009781] p-2 w-fit rounded-full">
                                            <FaRobot className=" text-white text-lg " />
                                        </aside>

                                        : <aside className="bg-primaryblue-300/80 p-2 w-fit rounded-full">
                                            <FaUser className=" text-white text-lg " />
                                        </aside>
                                    }
                                </span>
                                <span  className={`${message.sender === "bot" ? "self-start  bg-[#F1F5F9]" : "self-end bg-primaryblue-300 text-white"} w-[70%] md:w-[60%] px-3 py-5 rounded-2xl mx-2`} >{message.text}</span>
                            </div>
                        ))}
                    </section>
                )
            }

            {/* For new chat */}
            {messages.length === 0 && (<section className="flex w-full mx-auto items-center justify-center h-full">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-2xl md:text-3xl text-center font-light text-black/70">Hi {username}! What can I do for you this {periodOfDay}?</h1>
                    <ChatInput/>
                </div>
            </section>)}
        </main>
    )
}

export default ChatUI
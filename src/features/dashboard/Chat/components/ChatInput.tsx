
import { IoSend } from 'react-icons/io5'

const ChatInput = () => {
    return (
        <span className="mt-4 border border-gray-300 w-[90%] bg-black/5 p-4 rounded-full flex flex-row justify-between items-center">
            <textarea placeholder="Ask Anything...." rows={1} className="resize-none break-words whitespace-normal w-full outline-none placeholdder:italic font-light" />
            <button className="p-2 rounded-full text-white text-lg bg-primaryblue-300 cursor-pointer hover:transition-all hover:bg-primaryblue-300/70 hover:duration-200">
                <IoSend />
            </button>
        </span>
    )
}

export default ChatInput
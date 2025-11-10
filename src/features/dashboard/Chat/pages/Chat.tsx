import ChatInput from "../components/ChatInput"
import ChatUI from "./ChatUI"

const Chat = () => {
  return (
    <main className="flex flex-col space-y-4">

      {/* Ai Chat section */}
      <section className="h-[80vh]">
        <div className="bg-white max-h-[80vh] overflow-y-auto">
          <ChatUI />
        </div>
        
        <section className="max-h-[10vh] flex flex-row items-center justify-center mt-5">
          <ChatInput />
        </section>
      </section>



    </main>
  )
}

export default Chat
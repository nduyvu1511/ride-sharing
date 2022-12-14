import { Chat, HeaderMobile, Seo } from "@/components"
import { AuthLayout } from "@/layout"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const ChatPage = () => {
  const roomId = useSelector((state: RootState) => state.chat.currentRoomId)

  return (
    <AuthLayout
      headerClassName={`hidden md:flex`}
      className="md:py-16 lg:py-24 border-t border-border-color border-solid md:border-0 chat-page flex flex-col h-screen md:h-[calc(100vh-80px)] bg-bg"
    >
      <Seo title="Chat" url="chat" />
      <HeaderMobile
        className={`${!roomId ? "" : "hidden"} md:hidden border-none`}
        title="Tin nhắn"
      />

      <div
        className={`container px-0 md:px-16 ${
          roomId ? "" : "mt-[56px]"
        } md:mt-0 lg:px-24 xl:px-0 flex-1 flex flex-col h-full`}
      >
        <Chat />
      </div>
    </AuthLayout>
  )
}

export default ChatPage

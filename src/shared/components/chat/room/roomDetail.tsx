import { Spinner } from "@/components"
import { RootState } from "@/core/store"
import { useDetectWindowFocus, useMessage, useRoomDetail } from "@/hooks"
import {
  LikeMessage,
  MessageRes,
  RoomDetailFunctionHandler,
  RoomType,
  RoomTypingRes,
  SendMessageData,
  UnlikeMessage,
} from "@/models"
import { setCurrentProfileId, setCurrentRoomInfo, setCurrentTyping } from "@/modules"
import { chatAPI } from "@/services"
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Message, MessageForm } from "../message"
import { RoomDetailModals } from "./roomDetailModals"
import { RoomHeader } from "./roomHeader"

type OnForwaredRoomDetail = ForwardedRef<RoomDetailFunctionHandler>

interface RoomDetailProps {
  onSendMessage?: (_: MessageRes) => void
}

export const RoomDetail = forwardRef(function RoomChild(
  { onSendMessage }: RoomDetailProps,
  ref: OnForwaredRoomDetail
) {
  const user = useSelector((state: RootState) => state.chat.profile)
  const dispatch = useDispatch()
  const isWindowFocus = useDetectWindowFocus()

  const socket = useSelector((state: RootState) => state.chat.socket)
  const roomId = useSelector((state: RootState) => state.chat.currentRoomId) as string

  const { changeStatusOfRoom, data, isFirstLoading } = useRoomDetail({ roomId })

  const {
    appendMessage,
    sendMessage,
    confirmReadMessage,
    data: messages,
    likeMessage,
    unlikeMessage,
    mutateByMessageRes,
    getMoreMessages,
    isFetchingMore,
    mutatePartnerReactionMessage,
    resendMessage,
    confirmReadAllMessage,
  } = useMessage({ roomId, initialData: data?.messages })

  useImperativeHandle(ref, () => ({
    appendMessage: appendMessage,
    changeStatusOfRoom: changeStatusOfRoom,
    changeMesageStatus: confirmReadMessage,
    mutateWithMessageRes: mutateByMessageRes,
    mutatePartnerReactionMessage: mutatePartnerReactionMessage,
    confirmReadAllMessage: confirmReadAllMessage,
  }))

  const handleSendMessage = (params: SendMessageData) => {
    sendMessage({
      params,
      onSuccess: (data) => {
        onSendMessage?.(data)
        socket?.emit("send_message", data)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const handleReactionMessage = (params: LikeMessage) => {
    likeMessage(params)
  }

  const handleUndoMesasgeReaction = (params: UnlikeMessage) => {
    unlikeMessage(params)
  }

  const handleReadMessage = ({
    lastMessage,
    messages,
  }: {
    lastMessage: MessageRes
    messages: MessageRes[]
  }) => {
    if (!lastMessage || lastMessage.is_author || lastMessage?.is_read) return

    socket?.emit("read_message", lastMessage)
    confirmReadMessage(lastMessage)

    // Get list message unread except the last message has sent request
    const listMessageUnread = messages
      .filter((item) => !item.is_read)
      .filter((item) => item.message_id !== lastMessage.message_id)

    if (listMessageUnread?.length) {
      confirmReadAllMessage()
      chatAPI.confirmReadAllMessageInRoom(roomId)
    }
  }

  useEffect(() => {
    if (!socket) return
    socket.on("start_typing", (payload: RoomTypingRes) => {
      dispatch(setCurrentTyping(payload))
    })

    socket.on("stop_typing", () => {
      dispatch(setCurrentTyping(undefined))
    })
  }, [socket, dispatch])

  useEffect(() => {
    if (!roomId || !isWindowFocus || !messages?.data?.length) return
    const lastMessage = messages?.data?.[messages?.data?.length - 1]

    if (lastMessage?.message_id && !lastMessage?.is_author && !lastMessage?.is_read) {
      handleReadMessage({
        lastMessage,
        messages: messages.data,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWindowFocus])

  if (!roomId)
    return (
      <div className="flex-1 flex-center text-sm text-gray-color-4">
        Chọn cuộc hội thoại để bắt đầu trò chuyện
      </div>
    )
  return (
    <div className="flex flex-col flex-1 chat-message bg-white-color">
      {isFirstLoading ? (
        <Spinner className="py-40" />
      ) : (
        <>
          <div className="h-[70px] border-b border-border-color border-solid">
            <RoomHeader
              onClick={() => {
                if (data?.room_id) {
                  if (data.room_type === "group") {
                    dispatch(
                      setCurrentRoomInfo({
                        member_count: data?.member_count,
                        members: data.members?.data?.map((item) => ({
                          user_id: item.user_id,
                          user_avatar: item?.avatar?.thumbnail_url,
                          user_name: item.user_name,
                          is_online: item?.is_online,
                        })),
                        room_id: data.room_id,
                        room_name: data.room_name,
                        room_type: data.room_type,
                        room_avatar: data?.room_avatar,
                      })
                    )
                  } else {
                    const partner = data?.members?.data?.find(
                      (item) => item.user_id !== user?.user_id
                    )
                    dispatch(setCurrentProfileId(partner?.user_id))
                  }
                }
              }}
              data={data as any}
            />
          </div>

          {messages?.data?.length ? (
            <Message
              isFetchingMore={isFetchingMore}
              roomType={data?.room_type as RoomType}
              onReactMessage={handleReactionMessage}
              onUndoReactMessage={handleUndoMesasgeReaction}
              data={messages}
              onGetMoreMessage={() => getMoreMessages()}
              onResendMessage={resendMessage}
            />
          ) : (
            <div className="text-sm text-gray-color-3 flex-center py-24 min-h-[300px] flex-1">
              Chưa có tin nhắn nào
            </div>
          )}

          <MessageForm
            className="border-t border-solid border-border-color bg-bg px-12 md:px-16"
            onSubmit={handleSendMessage}
          />

          <RoomDetailModals />
        </>
      )}
    </div>
  )
})

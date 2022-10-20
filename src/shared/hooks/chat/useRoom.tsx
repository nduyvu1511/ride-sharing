import { getLastMessage } from "@/helper"
import { ChangeStatusOfRoom, ListRes, MessageRes, RoomDetailRes, RoomRes } from "@/models"
import { chatAPI } from "@/services"
import { AxiosResponse } from "axios"
import produce from "immer"
import { useState } from "react"
import useSWR, { KeyedMutator } from "swr"

type UseRoomRes = {
  data: ListRes<RoomRes[]> | undefined
  hasMore: boolean
  mutate: KeyedMutator<ListRes<RoomRes[]>>
  isFetchingMore: boolean
  isValidating: boolean
  isFirstLoading: boolean
  messageUnreadhandler: (_: MessageRes) => void
  changeStatusOfRoom: (_: ChangeStatusOfRoom) => void
  appendLastMessage: (_: MessageRes) => void
  changeOrderAndAppendLastMessage: (_: MessageRes) => void
  clearMessagesUnreadFromRoom: (room_id: string) => void
  fetchMoreRooms: () => void
  addRoom: (room: RoomDetailRes) => void
  deleteRoom: (rId: string) => void
  deleteRoomByCompoundingCarId: (rId: number) => void
}

const LIMIT = 30

export const useRoom = (roomId?: string): UseRoomRes => {
  const { isValidating, mutate, data, error } = useSWR<ListRes<RoomRes[]>>("get_room_list", () =>
    chatAPI.getRoomList({ limit: LIMIT }).then((res: AxiosResponse<ListRes<RoomRes[]>>) => {
      setHasMore(res.data?.has_more || false)

      return res.data
    })
  )

  const [hasMore, setHasMore] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)

  const messageUnreadhandler = (params: MessageRes) => {
    if (!data?.data?.length) return

    const index = getRoomIndex(params.room_id)
    if (index === -1) return

    if (roomId !== params.room_id) {
      const lastMessage = getLastMessage(params)
      mutate(
        produce(data, (draft) => {
          const room = { ...draft.data[index], last_message: params }
          if (data.data?.[0]?.room_id === params.room_id) {
            draft.data[index] = {
              ...room,
              message_unread_count: room.message_unread_count + 1,
              last_message: lastMessage,
            }
          } else {
            const newRooms = draft.data.filter((item) => item.room_id !== params.room_id)
            draft.data = [
              {
                ...room,
                message_unread_count: room.message_unread_count + 1,
                last_message: lastMessage,
              },
              ...newRooms,
            ]
          }
        }),
        false
      )
    }
  }

  const roomDetailResToRoomListRes = (params: RoomDetailRes): RoomRes => {
    return {
      is_online: params.is_online,
      compounding_car_id: params.compounding_car_id,
      member_count: params.member_count,
      message_unread_count: 0,
      room_id: params.room_id,
      room_name: params.room_name,
      room_type: params.room_type,
      last_message: null,
      room_avatar: params?.room_avatar?.thumbnail_url,
      top_members: params?.members?.data?.map((item) => ({
        user_avatar: item.avatar.thumbnail_url,
        user_name: item.user_name,
        user_id: item.user_id,
        is_online: item.is_online,
      })),
    }
  }

  const addRoom = (room: RoomDetailRes) => {
    mutate(
      produce(data, (draft) => {
        ;(draft?.data || []).unshift(roomDetailResToRoomListRes(room))
      }),
      false
    )
  }

  const deleteRoom = (rId: string) => {
    if (!data?.data?.length) return

    mutate(
      produce(data, (draft) => {
        draft.data = draft.data.filter(({ room_id }) => room_id !== rId)
      }),
      false
    )
  }

  const deleteRoomByCompoundingCarId = (cId: number) => {
    if (!data?.data?.length) return

    mutate(
      produce(data, (draft) => {
        draft.data = draft.data.filter(({ compounding_car_id }) => compounding_car_id !== cId)
      }),
      false
    )
  }

  const fetchMoreRooms = async () => {
    if (!data?.data?.length) return

    try {
      setFetchingMore(true)
      const res: AxiosResponse<ListRes<RoomRes[]>> = await chatAPI.getRoomList({
        limit: LIMIT,
        offset: (data?.offset || 0) + LIMIT,
      })
      const dataRes = res.data
      setFetchingMore(false)
      setHasMore(dataRes?.has_more)
      mutate(
        produce(data, (draft) => {
          ;(draft.has_more = dataRes.has_more), (draft.limit = dataRes.limit)
          draft.offset = dataRes.offset
          draft.data = draft.data.concat(dataRes.data)
        }),
        false
      )
    } catch (error) {
      setFetchingMore(false)
    }
  }

  const getRoomIndex = (roomId: string): number => {
    const index =
      data && data?.data?.length > 0 ? data.data.findIndex((item) => item.room_id === roomId) : -1

    if (index === -1) {
      mutate()
    }
    return index
  }

  // const increaseMessageUnread = async (
  //   params: MessageRes,
  //   cb?: (_: number) => void,
  //   onErr?: Function
  // ) => {
  //   try {
  //     const res: any = await chatAPI.addMessageUnreadToRoom({ message_id: params.message_id })
  //     if (res?.success) {
  //       cb?.(res?.data?.message_unread_count || 0)
  //     } else {
  //       onErr?.()
  //     }
  //   } catch (error) {}
  // }

  const clearMessagesUnreadFromRoom = async (roomId: string) => {
    if (!data?.data?.length) return
    const index = getRoomIndex(roomId)
    if (index === -1) return

    const room = { ...data.data[index] }
    if (!room.message_unread_count || room.message_unread_count <= 0) return

    mutate(
      produce(data, (draft) => {
        draft.data[index].message_unread_count = 0
      }),
      false
    )
  }

  const appendLastMessage = (params: MessageRes) => {
    if (!data?.data?.length) return

    mutate(
      produce(data, (draft) => {
        const index = getRoomIndex(params.room_id)
        if (index === -1) return
        draft.data[index].last_message = getLastMessage(params)
      }),
      false
    )
  }

  const changeOrderAndAppendLastMessage = (params: MessageRes) => {
    if (!data?.data?.length) return

    const index = getRoomIndex(params.room_id)
    if (index === -1) return

    const last_message = getLastMessage(params)

    if (data?.data?.[0]?.room_id === params.room_id) {
      mutate(
        produce(data, (draft) => {
          draft.data[index].last_message = last_message
        }),
        false
      )
    } else {
      mutate(
        produce(data, (draft) => {
          const newRooms = draft.data.filter((item) => item.room_id !== params.room_id)
          draft.data = [{ ...draft.data[index], last_message }, ...newRooms]
        }),
        false
      )
    }
  }

  const changeStatusOfRoom = (params: ChangeStatusOfRoom) => {
    if (!data?.data?.length) return

    if (params.type === "login") {
      mutate(
        produce(data, (draft) => {
          draft.data = draft.data.map((item) => {
            return params.room_ids.includes(item.room_id) ? { ...item, is_online: true } : item
          })
        }),
        false
      )
    } else {
      mutate(
        produce(data, (draft) => {
          draft.data = draft.data.map((item) => {
            if (!params.room_ids.includes(item.room_id)) {
              return item
            }
            if (
              item.room_type === "single" ||
              (item?.top_members || [])?.filter((item) => item?.is_online)?.length <= 2
            ) {
              return { ...item, is_online: false }
            }
            return item
          })
        }),
        false
      )
    }
  }

  return {
    data,
    fetchMoreRooms,
    hasMore,
    isFetchingMore,
    isValidating,
    mutate,
    appendLastMessage,
    changeStatusOfRoom,
    messageUnreadhandler,
    changeOrderAndAppendLastMessage,
    clearMessagesUnreadFromRoom,
    isFirstLoading: error === undefined && data === undefined,
    addRoom,
    deleteRoom,
    deleteRoomByCompoundingCarId,
  }
}

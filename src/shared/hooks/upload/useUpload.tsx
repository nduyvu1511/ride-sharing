import { AttachmentChildParams, AttachmentItem, AttachmentRouteType } from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface UseUploadAttachmentRes {
  isUploading: boolean
  uploadImages: (params: UploadImagesProps) => void
}

interface UploadImagesProps {
  params: AttachmentChildParams[]
  type?: AttachmentRouteType
  onSuccess?: (params: AttachmentItem[]) => void
  onError?: Function
}

const useUploadAttachment = (): UseUploadAttachmentRes => {
  const dispatch = useDispatch()
  const [isUploading, setUploading] = useState<boolean>(false)

  const uploadImages = async ({
    onSuccess,
    params,
    onError,
    type = "common",
  }: UploadImagesProps) => {
    try {
      setUploading(true)
      let res: AxiosResponse<any>
      if (type === "common") {
        res = await userAPI.createAttachmentCommon({
          attachments: params,
        })
      } else {
        res = await userAPI.createAttachmentAvatar({
          attachments: params,
        })
      }

      setUploading(false)

      if (res?.result?.code !== 200) {
        onError && onError()
        dispatch(notify("Có lỗi khi tải hình, vui lòng thử lại", "error"))
        return
      }

      onSuccess && onSuccess(res?.result?.data || [])
    } catch (error) {
      dispatch(notify("Có lỗi khi tải hình, vui lòng thử lại", "error"))
      onError && onError()
      setUploading(false)
    }
  }

  return { isUploading, uploadImages }
}

export { useUploadAttachment }

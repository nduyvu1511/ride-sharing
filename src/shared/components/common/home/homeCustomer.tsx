import { Modal, RideContainer, Seo, UserInfoForm } from "@/components"
import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { useProfile, useQueryCompoundingCarCustomer, useQueryCompoundingCarParams } from "@/hooks"
import { CompoundingFilterParams, UpdateUserInfoParams, UserInfoFormSubmit } from "@/models"
import { setAuthModalType, setProfile } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

export const HomeCustomer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { updateUserInfo } = useProfile()
  const { getValueFromQuery } = useQueryCompoundingCarParams()
  const authModalType = useSelector((state: RootState) => state.common.authModalType)
  const {
    data: rideList,
    isValidating,
    filterRides,
    hasMore,
    fetchMoreRides,
    isFetchingMore,
    isInitialLoading,
  } = useQueryCompoundingCarCustomer()

  useEffect(() => {
    if (router.isReady) {
      filterRides(getValueFromQuery(router.query))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const handleFilterRides = (params: CompoundingFilterParams | undefined) => {
    const filter = { ...router.query, ...params }
    if (isObjectHasValue(params)) {
      router.push({
        query: {
          ...filter,
        },
      })
    } else {
      router.push({})
    }
  }

  const handleUpdateUserInfo = async (params: UserInfoFormSubmit) => {
    updateUserInfo({
      params: params as UpdateUserInfoParams,
      onSuccess: (userInfo) => {
        dispatch(setProfile(userInfo))
        dispatch(notify("Cập nhật thông tin thành công!", "success"))
        dispatch(setAuthModalType(undefined))
        router.push("/")
      },
    })
  }

  return (
    <>
      <Seo title="Các chuyến đi hiện có" url={""} />

      <RideContainer
        hasMore={hasMore}
        isFetchingMore={isFetchingMore}
        isValidating={isInitialLoading || isValidating}
        list={rideList}
        carAccountType="customer"
        defaultParams={router.query}
        onClickRideItem={(compounding_car_id) =>
          router.push(`/c/ride-sharing/${compounding_car_id}`)
        }
        onFetchMore={() => fetchMoreRides(router.query)}
        onFilterRide={(data) => handleFilterRides(data)}
        key="customer"
      />

      {authModalType === "updateProfile" ? (
        <Modal
          heading="Cập nhật hồ sơ"
          show={true}
          onClose={() => dispatch(setAuthModalType(undefined))}
        >
          <UserInfoForm onSubmit={handleUpdateUserInfo} />
        </Modal>
      ) : null}
    </>
  )
}

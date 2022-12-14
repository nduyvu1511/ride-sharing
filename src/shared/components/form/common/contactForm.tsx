import { contactFormFields, contactSchema } from "@/helper"
import { ContactParams, OnForwaredResetForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { forwardRef, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { CheckboxField } from "../fields"

interface ContactFormProps {
  onSubmit?: (params: ContactParams) => void
}

export const ContactForm = forwardRef(function ContactChild(
  { onSubmit }: ContactFormProps,
  ref: OnForwaredResetForm
) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ContactParams>({
    resolver: yupResolver(contactSchema),
    mode: "all",
  })

  useImperativeHandle(ref, () => ({
    onReset() {
      reset()
    },
  }))

  const onSubmitHandler = (data: ContactParams) => {
    onSubmit?.(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {contactFormFields.map((field) => (
        <div key={field.name} className="form-item mb-16">
          {field.type === "text" ? (
            <input
              className={`form-input h-[50px] border-[transparent] bg-bg-primary ${
                errors?.[field.name] ? "form-input-err" : ""
              }`}
              {...register(field.name, {
                required: true,
              })}
              id={field.name}
              type={field.name === "email" ? "email" : "text"}
              name={field.name}
              placeholder={field.label}
            />
          ) : null}

          {field.type === "textarea" ? (
            <textarea
              maxLength={300}
              className={`form-textarea mb-24 bg-bg-primary border-none ${
                errors?.[field.name] ? "form-input-err" : ""
              }`}
              {...register(field.name, {
                required: true,
              })}
              placeholder={field.label}
              id={field.name}
              name={field.name}
              rows={3}
            ></textarea>
          ) : null}

          {errors?.[field.name] || dirtyFields?.[field.name] ? (
            <p className="form-err-msg">{errors?.[field.name]?.message}</p>
          ) : null}
        </div>
      ))}

      <CheckboxField
        size={20}
        control={control}
        label="T??i ?????ng ?? nh???n b???n tin t??? Exxe.vn v??? c??c ch????ng tr??nh khuy???n m??i s???p t???i, ??u ????i ?????c
          quy???n v?? ti???n h??nh c??c ho???t ?????ng ti???p th???."
        name="receive_news"
      />

      <div className="mt-[40px]">
        <button
          type="submit"
          className={`ml-auto btn-primary  ${isValid ? "" : "btn-disabled-clickable"}`}
        >
          G???i ngay
        </button>
      </div>
    </form>
  )
})

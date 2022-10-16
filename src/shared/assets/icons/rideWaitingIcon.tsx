import React from "react"

export const RideWaitingIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-ember-extension="1"
    >
      <rect x="0.5" width="24" height="24" rx="12" fill="#F3F3F3" />
      <path
        opacity="0.4"
        d="M19.1663 11.9987C19.1663 15.6806 16.1816 18.6654 12.4997 18.6654C8.81778 18.6654 5.83301 15.6806 5.83301 11.9987C5.83301 8.3168 8.81778 5.33203 12.4997 5.33203C16.1816 5.33203 19.1663 8.3168 19.1663 11.9987Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0319 14.2381C14.2272 14.4333 14.5438 14.4333 14.7391 14.2381C14.9343 14.0428 14.9343 13.7262 14.7391 13.531L13.207 11.9989L14.739 10.4669C14.9343 10.2717 14.9343 9.95508 14.739 9.75982C14.5438 9.56455 14.2272 9.56455 14.0319 9.75982L12.4999 11.2918L10.9678 9.75973C10.7726 9.56447 10.456 9.56447 10.2607 9.75973C10.0655 9.95499 10.0655 10.2716 10.2607 10.4668L11.7928 11.9989L10.2607 13.5311C10.0654 13.7263 10.0654 14.0429 10.2607 14.2382C10.456 14.4334 10.7725 14.4334 10.9678 14.2382L12.4999 12.706L14.0319 14.2381Z"
        fill="currentColor"
      />
    </svg>
  )
}

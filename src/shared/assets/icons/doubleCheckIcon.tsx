import React from "react"

export const DoubleCheckIcon = ({ size, className = "" }: { size: number; className?: string }) => {
  return (
    <svg
      className={className}
      width="23"
      height="11"
      viewBox={`0 0 23 11`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0037 0.261383C16.3116 0.538478 16.3365 1.0127 16.0595 1.32058L8.32185 9.91791C7.34732 11.0007 5.69744 11.1357 4.55988 10.2256L1.03346 7.40451C0.710013 7.14575 0.657572 6.67378 0.916329 6.35033C1.17509 6.02689 1.64706 5.97445 1.9705 6.2332L5.49693 9.05434C6.014 9.468 6.76394 9.40665 7.20691 8.91446L14.9445 0.317131C15.2216 0.00924803 15.6958 -0.0157108 16.0037 0.261383Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0037 0.261383C22.3116 0.538478 22.3365 1.0127 22.0595 1.32058L14.3219 9.91791C13.3473 11.0007 11.6974 11.1357 10.5599 10.2256L7.03346 7.40451C6.71001 7.14575 6.65757 6.67378 6.91633 6.35033C7.17509 6.02689 7.64706 5.97445 7.9705 6.2332L11.4969 9.05434C12.014 9.468 12.7639 9.40665 13.2069 8.91446L20.9445 0.317131C21.2216 0.00924803 21.6958 -0.0157108 22.0037 0.261383Z"
        fill="currentColor"
      />
    </svg>
  )
}

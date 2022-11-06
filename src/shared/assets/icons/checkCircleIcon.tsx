import React from "react"

export const CheckCircleIcon = ({
  className = "",
  fill = "#1F8B24",
  opacity = 0.4,
  stroke = "#1F8B24",
}) => {
  return (
    <svg
      className={className}
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M67.3332 34.0001C67.3332 52.4096 52.4093 67.3334 33.9998 67.3334C15.5903 67.3334 0.666504 52.4096 0.666504 34.0001C0.666504 15.5906 15.5903 0.666748 33.9998 0.666748C52.4093 0.666748 67.3332 15.5906 67.3332 34.0001Z"
        fill={"currentColor"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.868 22.0267C49.9579 22.8744 50.1542 24.4451 49.3066 25.535L35.9499 42.7078C33.8709 45.3809 29.9601 45.7278 27.4431 43.4624L18.9941 35.8584C17.9678 34.9347 17.8846 33.354 18.8083 32.3277C19.7319 31.3014 21.3127 31.2182 22.3389 32.1419L30.7879 39.7459C31.1475 40.0695 31.7061 40.02 32.0031 39.6381L45.3598 22.4653C46.2075 21.3754 47.7782 21.1791 48.868 22.0267Z"
        fill={fill}
      />
    </svg>
  )
}

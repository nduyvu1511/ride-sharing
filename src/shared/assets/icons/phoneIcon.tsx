import React from "react"

const PhoneIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 9.66667L8.90194 10.157C9.12304 10.2012 9.34638 10.0919 9.44721 9.89027L9 9.66667ZM4.33333 5L4.10973 4.55279C3.90806 4.65362 3.79882 4.87696 3.84304 5.09806L4.33333 5ZM4.56934 4.88199L4.79295 5.32921H4.79295L4.56934 4.88199ZM5.21103 3.19424L5.67527 3.00854L5.21103 3.19424ZM4.66859 1.83815L4.20435 2.02384V2.02384L4.66859 1.83815ZM12.1619 9.33141L12.3475 8.86717L12.1619 9.33141ZM10.8058 8.78897L10.9915 8.32473L10.8058 8.78897ZM9.11801 9.43066L9.56522 9.65426L9.56522 9.65426L9.11801 9.43066ZM12.5 10.5694V11.6667H13.5V10.5694H12.5ZM2.33333 1.5H3.43062V0.5H2.33333V1.5ZM9 9.66667C9.09806 9.17638 9.0982 9.1764 9.09833 9.17643C9.09837 9.17644 9.0985 9.17647 9.09857 9.17648C9.09872 9.17651 9.09884 9.17653 9.09894 9.17655C9.09913 9.17659 9.09923 9.17661 9.09922 9.17661C9.09921 9.17661 9.09881 9.17653 9.09803 9.17636C9.09645 9.17603 9.09334 9.17537 9.08875 9.17436C9.07957 9.17233 9.06448 9.1689 9.04396 9.16391C9.0029 9.15392 8.94025 9.13772 8.85983 9.11407C8.69877 9.0667 8.46776 8.98982 8.19696 8.87376C7.65306 8.64066 6.96261 8.2555 6.35355 7.64645L5.64645 8.35355C6.37073 9.07783 7.18028 9.52601 7.80304 9.79291C8.11557 9.92685 8.38456 10.0166 8.57767 10.0734C8.67433 10.1019 8.75231 10.1221 8.80761 10.1356C8.83527 10.1423 8.85728 10.1473 8.87316 10.1508C8.8811 10.1526 8.88751 10.154 8.89233 10.155C8.89474 10.1555 8.89675 10.1559 8.89835 10.1562C8.89916 10.1564 8.89986 10.1565 8.90045 10.1567C8.90075 10.1567 8.90103 10.1568 8.90128 10.1568C8.9014 10.1568 8.90157 10.1569 8.90163 10.1569C8.90179 10.1569 8.90194 10.157 9 9.66667ZM6.35355 7.64645C5.7445 7.03739 5.35934 6.34695 5.12624 5.80304C5.01018 5.53224 4.9333 5.30123 4.88593 5.14017C4.86228 5.05975 4.84608 4.9971 4.83609 4.95604C4.8311 4.93553 4.82767 4.92043 4.82564 4.91125C4.82463 4.90666 4.82397 4.90355 4.82364 4.90197C4.82347 4.90119 4.82339 4.90079 4.82339 4.90078C4.82339 4.90078 4.82341 4.90087 4.82345 4.90106C4.82347 4.90116 4.82349 4.90128 4.82352 4.90143C4.82354 4.9015 4.82356 4.90163 4.82357 4.90167C4.8236 4.9018 4.82362 4.90194 4.33333 5C3.84304 5.09806 3.84307 5.09821 3.84311 5.09837C3.84312 5.09843 3.84315 5.0986 3.84318 5.09872C3.84323 5.09897 3.84328 5.09925 3.84334 5.09955C3.84346 5.10014 3.84361 5.10084 3.84377 5.10165C3.8441 5.10325 3.84452 5.10526 3.84502 5.10767C3.84603 5.11249 3.84741 5.1189 3.84916 5.12684C3.85267 5.14272 3.8577 5.16473 3.86443 5.19239C3.87788 5.24769 3.89814 5.32567 3.92657 5.42233C3.98336 5.61544 4.07315 5.88443 4.20709 6.19696C4.47399 6.81972 4.92217 7.62927 5.64645 8.35355L6.35355 7.64645ZM4.55694 5.44721L4.79295 5.32921L4.34574 4.43478L4.10973 4.55279L4.55694 5.44721ZM5.67527 3.00854L5.13283 1.65245L4.20435 2.02384L4.74679 3.37993L5.67527 3.00854ZM12.3475 8.86717L10.9915 8.32473L10.6201 9.25321L11.9762 9.79565L12.3475 8.86717ZM8.67079 9.20705L8.55279 9.44306L9.44721 9.89027L9.56522 9.65426L8.67079 9.20705ZM10.9915 8.32473C10.1062 7.97061 9.09721 8.35422 8.67079 9.20705L9.56522 9.65426C9.75904 9.26661 10.2177 9.09225 10.6201 9.25321L10.9915 8.32473ZM4.79295 5.32921C5.64578 4.90279 6.02939 3.89384 5.67527 3.00854L4.74679 3.37993C4.90775 3.78234 4.73339 4.24096 4.34574 4.43478L4.79295 5.32921ZM3.43062 1.5C3.77138 1.5 4.0778 1.70746 4.20435 2.02384L5.13283 1.65245C4.85441 0.956411 4.18028 0.5 3.43062 0.5V1.5ZM13.5 10.5694C13.5 9.81972 13.0436 9.14559 12.3475 8.86717L11.9762 9.79565C12.2925 9.9222 12.5 10.2286 12.5 10.5694H13.5ZM11.6667 12.5C6.05177 12.5 1.5 7.94823 1.5 2.33333H0.5C0.5 8.50051 5.49949 13.5 11.6667 13.5V12.5ZM11.6667 13.5C12.6792 13.5 13.5 12.6792 13.5 11.6667H12.5C12.5 12.1269 12.1269 12.5 11.6667 12.5V13.5ZM1.5 2.33333C1.5 1.8731 1.8731 1.5 2.33333 1.5V0.5C1.32081 0.5 0.5 1.32081 0.5 2.33333H1.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { PhoneIcon }

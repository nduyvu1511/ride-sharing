import { newsBg, ogImage } from "@/assets"
import { News, Seo } from "@/components"
import { DOMAIN_URL } from "@/helper"
import { StaticLayout } from "@/layout"
import { OpenGraphData } from "@/models"

const NewsPage = () => {
  return (
    <StaticLayout
      bg={newsBg}
      heading="Cập nhật các tin tức mới nhất về Exxe.vn"
      subHeading="Tin tức"
    >
      <Seo
        description="Ứng dụng gọi xe đường dài số 1 Việt Nam"
        thumbnailUrl=""
        title="Tin tức Exxe"
        url="news"
      />
      <News />
    </StaticLayout>
  )
}

export default NewsPage

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          property: "og:image",
          content: ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:width",
          content: "400",
          key: "ogimagewidth",
        },
        {
          property: "og:image:height",
          content: "300",
          key: "ogimageheight",
        },
        {
          property: "og:url",
          content: DOMAIN_URL,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content: ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: "Ứng dụng đặt xe ExxeVn",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content:
            "Ứng dụng ExxeVn là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn thiết lập, quản lý vận tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định của pháp luật hiện hành.",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
      ] as OpenGraphData[],
    },
  }
}

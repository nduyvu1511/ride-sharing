import { ogImage } from "@/assets"
import { NewsSlide, Seo, Spinner } from "@/components"
import { DOMAIN_URL } from "@/helper"
import { StaticLayout } from "@/layout"
import { OpenGraphData, PostDetailRes, PostRes } from "@/models"
import { newsAPI } from "@/services"
import { AxiosResponse } from "axios"
import { GetStaticPropsContext } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"

interface PostDetailProps {
  fallback: {
    "/post/detail": PostDetailRes
  }
}

const PostDetail = (props: PostDetailProps) => {
  const router = useRouter()
  const { postId } = router.query
  const { isValidating, data } = useSWR<PostDetailRes>(
    postId ? `get_post_detail_${postId}` : null,
    () =>
      newsAPI
        .getPostDetail(postId + "")
        .then((res: any) => res.data)
        .catch((err) => console.log(err)),
    { dedupingInterval: 1000, fallback: props.fallback }
  )

  const { data: newsRelated, isValidating: isRelatedLoading } = useSWR<PostRes[]>(
    data?.category?.categoryId ? `get_related_post_${postId}` : null,
    () =>
      newsAPI
        .getPosts({ categoryId: data?.category?.categoryId })
        .then((res: any) => res.data)
        .catch((err) => console.log(err)),
    { dedupingInterval: 1000000 }
  )

  if (router.isFallback)
    return (
      <div className="py-40">
        <Spinner />
      </div>
    )

  return (
    <StaticLayout
      lastNode={
        <>
          {newsRelated ? (
            <div className="">
              <p className="mb-24 text-18 md:text-20 lg:text-24 font-medium">
                Các bài viết liên quan
              </p>
              <NewsSlide isLoading={isRelatedLoading} data={newsRelated} />
            </div>
          ) : null}
        </>
      }
      showLoading={isValidating}
      sticky
      heading={data?.title}
      subHeading="Tin tức"
    >
      <Seo
        description={data?.shortContent || data?.title || ""}
        title={data?.title || "Tin tức"}
        url={`${data?.postId}`}
      />

      {data ? (
        <div className="news__page" dangerouslySetInnerHTML={{ __html: data?.content + "" }}></div>
      ) : null}
    </StaticLayout>
  )
}

export default PostDetail

export async function getStaticPaths() {
  const data: any = await newsAPI
    .getPosts({ limit: 1000 })
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return {
    paths: data?.map((item: PostRes) => ({ params: { postId: item?.postId } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params: { postId = "" } = { params: undefined } } = context
  const data: AxiosResponse<PostDetailRes> = await newsAPI.getPostDetail(postId as string)

  return {
    props: {
      fallback: {
        "/post/detail": data?.data,
      },

      openGraphData: [
        {
          property: "og:image",
          content: data?.data?.thumbnail || ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: data?.data?.thumbnail || ogImage,
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
          content: `DOMAIN_URL/news/${postId}`,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content: data?.data?.thumbnail || ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: data?.data.title,
          key: "ogtitle",
        },
        {
          property: "og:description",
          content: data?.data.title,
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

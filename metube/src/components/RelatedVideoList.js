// hooks
import { useEffect, useState } from "react"

//components
import VideoCard from "./VideoCard/VideoCard"
import { key } from "../api/const"

function RelatedVideoList({ id }) {

    const [videoList, setVideoList] = useState([])

    const getRelatedVideos = async () => {

        if (!id) return

        const getRelatedRes = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&fields=items(id%2FvideoId%2C%20snippet(publishedAt%2Ctitle%2Cthumbnails(medium%2Furl)%2CchannelTitle))&key=${key}`,
            // `/data/relatedTo${id}.json`,
            // `/data/relatedToiMcCbobTycg.json`,
            {
                method: 'GET',
            })

        if (getRelatedRes.ok) {
            console.log("연관 영상 요청은 성공하였습니다.")
            const relatedInfo = await getRelatedRes.json()
            console.log(relatedInfo.items)
            setVideoList(
                relatedInfo.items.map((item) => {
                    const { id, snippet } = item

                    let tmp = {
                        id: id.videoId,
                        date: snippet.publishedAt,
                        title: snippet.title,
                        thumbnail: snippet.thumbnails.medium.url,
                        channel: snippet.channelTitle
                    }

                    return tmp
                }))
        }

        else {
            const errorRes = await getRelatedRes.json()
            getRelatedRes.status === 400 ? console.log(new Error(`요청 오류 : ${errorRes.error.message}`))
                : console.log(new Error(`새로운 오류 발생 : ${errorRes.error.message}`))
        }
    }

    useEffect(() => {
        getRelatedVideos()
        console.log(id)
    }, [id])

    return (
        <section className='RelatedVideoList'>
            {/* params 바뀌는 거 잘 받아오는지 확인하는 용도
            잘 바뀐다면 정보가 있는 살아남는 로맨스 영상 fetch해 줌 */}
            <VideoCard video={{ id: 'iMcCbobTycg', thumbnail: 'https://i.ytimg.com/vi/iMcCbobTycg/mqdefault.jpg', title: '살남로로 돌아가자' }} />
            {videoList && videoList.map((video) => <VideoCard key={video.id} video={video} />)}
        </section>
    )
}

export default RelatedVideoList
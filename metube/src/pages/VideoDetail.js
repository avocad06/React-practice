// hooks
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"

// components
import Channel from "../components/Channel"
import RelatedVideoList from "../components/RelatedVideoList"
import { key } from "../api/const"


function VideoDetail() {

    const { video } = useLocation().state;
    console.log(useLocation())

    // const [video, setVideo] = useState({})

    const { videoId } = useParams()

    const getVideoDetail = async () => {

        if (!videoId) return

        console.log(videoId)

        const getDetailRes = await fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=id%2C%20snippet%2C%20player&hl=ko_KR&id=${videoId}&fields=items(id%2C%20snippet(title%2C%20description%2C%20channelId),player)&key=${key}`,
            // `/data/${videoId}.json`,
            {
                method: 'GET',
            })

        console.log(getDetailRes)

        if (getDetailRes.ok) {
            console.log("상세 페이지 요청은 성공하였습니다.")

            /* 요청은 성공했으나 json 값이 올바르지 않을 경우(찾는 값이 없다.) */
            try {
                const detailInfo = await getDetailRes.json()
                console.log(detailInfo.items[0])
                // setVideo(detailInfo.items[0])
            }
            catch (err) {
                console.log(
                    err, "에러발생"
                )
                // setVideo({})
            }

        }

        else {
            const errorRes = await getDetailRes.json()
            getDetailRes.status === 400 ? console.log(new Error(`요청 오류 : ${errorRes.error.message}`))
                : console.log(new Error(`새로운 오류 발생 : ${errorRes.error.message}`))
        }
    }

    // const timeOut = async () => {
    //     setTimeout(
    //         setVideo
    //     )
    // }

    useEffect(() => {
        console.log(videoId)
        // getVideoDetail()
    }, [videoId])

    if (!video) return <div>data를 가지고 오는 중입니다...</div>

    const videoInfo = { ...video.player, ...video.snippet }

    const { channelId, description, embedHtml: player, title } = videoInfo;


    return (
        <div className='VideoDetails'>
            <h2>{videoId}</h2>
            <section>
                {/* <div dangerouslySetInnerHTML={{ __html: player }} />
                 */}
                <iframe id="player" type="text/html" width="640" height="390"
                    src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
                    frameborder="0"></iframe>
                <h3>{title}</h3>
                {channelId && <Channel id={channelId} />}
                <span>{description}</span>
            </section>
            <RelatedVideoList id={videoId} />
        </div>
    )
}

export default VideoDetail
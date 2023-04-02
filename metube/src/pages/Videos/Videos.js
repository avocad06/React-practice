import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import VideoCard from "../../components/VideoCard/VideoCard";
import style from './Videos.module.css'
import { key } from "../../api/const";

export default function Videos() {

    const [isLoading, setLoading] = useState(true)

    const [data, setData] = useState([])

    const { keyword } = useParams();

    async function fetchData() {
        const res = await fetch(
            // `/data/${keyword ? keyword === 'react' && 'reactsearch' || 'search' : 'popular'}.json`,
            keyword ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=${key}` :
                `https://youtube.googleapis.com/youtube/v3/videos?maxResults=25&part=snippet&chart=mostPopular&regionCode=KR&key=${key}`,
            {
                headers: {
                    "Content-Type": "application / json"
                },
            })
        const resData = await res.json()
        // console.log(resData.items)
        setData(resData.items)
        setLoading(false)
        return
    }

    useEffect(() => {
        fetchData()
    }, [keyword])

    if (isLoading) return <div>데이터를 가져오고 있어요...</div>

    return (
        <div className={style.inner}>
            {data && (
                <ul className={style.ul}>
                    {data.map(video => (
                        <VideoCard key={keyword ? video.id.videoId : video.id} video={video} />))}
                </ul>
            )}
        </div>

    )
}
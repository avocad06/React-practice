import style from './VideoCard.module.css'
import { Link, useParams } from 'react-router-dom'

function VideoCard({ video }) {

    const { keyword } = useParams();

    const { id, date, title, thumbnail, channel } = video
    return (
        <Link to={`/videos/watch/${keyword ? video.id.videoId || id : video.id}`}>
            <li>
                <div className={style.cardImg}>
                    <img src={thumbnail || video.snippet?.thumbnails.default.url} alt="thumbnail" />
                </div>
                <h4 className={style.title}>{title || video.snippet?.title}</h4>
                <div className={style.sub}>{channel || video.snippet?.channelTitle}</div>
                <div className={style.upload}>{date || video.snippet?.publishedAt}</div>
            </li>
        </Link>
    )
}

export default VideoCard
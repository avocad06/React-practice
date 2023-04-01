import { useEffect, useState } from "react"
import { key } from "../api/const"

function Channel({ id }) {

    const [channel, setChannel] = useState({
        name: '',
        avatar: '',
    })

    const { name, avatar } = channel

    const getChannelInfo = async () => {
        const channelRes = await fetch(
            // `/data/${id}.json`,
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&hl=ko_KR&id=${id}&fields=items(snippet(localized(title)%2C%20thumbnails(default/url)))&key=${key}`,
            {
                method: 'GET',
            })

        console.log(channelRes)

        if (channelRes.ok) {
            console.log("요청은 성공하였습니다.")
            const channelInfo = await channelRes.json()
            console.log(channelInfo.items[0].snippet)
            setChannel({
                name: channelInfo.items[0].snippet.localized.title,
                avatar: channelInfo.items[0].snippet.thumbnails.default.url
            })
        }

        else {
            const errorRes = await channelRes.json()
            channelRes.status === 400 ? console.log(new Error(`요청 오류 : ${errorRes.error.message}`))
                : console.log(new Error(`새로운 오류 발생 : ${errorRes.error.message}`))
        }

    }
    console.log(channel)

    useEffect(() => { getChannelInfo() }, [id])

    return (
        <div className='Channel'>
            <div className='avatar'>
                <img src={avatar} />
            </div>
            <h4>{name}</h4>
        </div>
    )
}

export default Channel
// hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserInfo } from "../api/search";

// components
import Navbar from "../components/Navbar"

function User() {
    const [userInfo, setUserInfo] = useState({})
    const { id: userId } = useParams();

    const fetchUserInfo = async () => {
        const userInfoRes = await getUserInfo(userId)

        if (userInfoRes === null) {
            console.log("값이 없습니다.")
            return
        }

        if (userInfoRes.message === 'Not Found') {
            console.log("찾는 유저가 없습니다.")
            setUserInfo(null)
            return
        }

        const {
            avatar_url,
            name,
            login,
            followers,
            following,
            public_repos,
            location,
            blog,
            company,
            twitter_username } = userInfoRes;
        setUserInfo({
            avatar_url,
            name,
            login,
            followers,
            following,
            public_repos,
            location,
            blog,
            company,
            twitter_username
        })
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (userInfo?.length === 0) return (<div>Now Loading...</div>)

    if (!userInfo) return (<div>no matches with {userId}</div>)

    return (
        <>
            <Navbar />
            <div>{userInfo.following}</div>
        </>
    )
}

export default User
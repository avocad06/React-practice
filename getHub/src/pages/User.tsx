// hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserInfo } from "../api/search";
import {userResData, currentUser} from '../types/userData'

// components
import Navbar from "../components/Navbar/Navbar"

function User() {
    const [userInfo, setUserInfo] = useState<currentUser | null>(null)
    const { id: userId } = useParams();

    const fetchUserInfo = async () => {
        let userInfoRes: userResData|null|undefined
        
        userInfoRes = userId ? await getUserInfo(userId): null

        if (userInfoRes === null) {
            console.log("값이 없습니다.")
            return
        }

        if ( "message" in userInfoRes && userInfoRes.message === 'Not Found') {
            console.log("찾는 유저가 없습니다.")
            setUserInfo(null)
            return
        }

        console.log(userInfoRes)

        const {
            avatar_url: avatar,
            name,
            login,
            html_url: url,
            followers,
            following,
            public_repos: repo,
            location,
            blog,
            company,
            twitter_username } = userInfoRes;
        setUserInfo({
            avatar,
            name,
            login,
            url,
            followers,
            following,
            repo,
            location,
            blog,
            company,
            twitter_username
        })
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (!userInfo) {
        console.log("값이 없습니다?")
        return (<div>no matches with {userId}</div>)
    }

    return (
        <>
            <Navbar/>
            <section className="main">
                <div className="userInfo">
                    <div className="imgBox">
                        <img src={userInfo.avatar} alt='profile' />
                    </div>
                    <div className='content'>
                        <div className='details'>
                            <h2>{userInfo.name}<br /><a href={userInfo.url}>@{userInfo.login}</a></h2>
                            <div className='data'>
                                <h3>{userInfo.followers}<br /><span>Followers</span></h3>
                                <h3>{userInfo.following}<br /><span>Following</span></h3>
                                <h3>{userInfo.repo}<br /><span>Repository</span></h3>
                            </div>
                            <div className="description">
                                <div className='info'><span>location</span>{userInfo.location ? userInfo.location : 'not defined.'}</div>
                                <div className='info'><span>blog</span>{userInfo.blog ? <a href={`${userInfo.blog}`}>{userInfo.blog}</a> : 'not defined.'}</div>
                                <div className='info'><span>company</span>{userInfo.company ? userInfo.company : 'not defined.'}</div>
                                <div className='info'><span>twitter_username</span>{userInfo.twitter_username?.length === 0 ? userInfo.twitter_username : 'not defined.'}</div>
                            </div>
                        </div>

                    </div>


                </div>
            </section>
        </>
    )
}

export default User
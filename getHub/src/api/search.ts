import { BASE_URL, KEY } from "./const"
import { searchResData, Item } from "../types/searchData"
import {userResData} from '../types/userData'

export const searchUsers = async (args: string): Promise<Item[] | null> => {
    console.log(args)
    const searchRes = await fetch(
        `${BASE_URL}/search/users?q=${args}`,
        // '/data/searchData.json',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${KEY}`
            },
        })

        const apiRes:searchResData = await searchRes.json()
    
    // 검색결과가 없을 경우
    return apiRes ? apiRes.items : null
}

export const getUserInfo = async (args: string): Promise<userResData | null> => {
    const userInfoRes = await fetch(
        `${BASE_URL}/users/${args}`,
        // '/data/userData.json',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${KEY}`
            },
        })

    console.log("HTTP통신 응답입니다.:", userInfoRes)


    return userInfoRes.ok || userInfoRes.status === 404 ? userInfoRes.json() : null
}
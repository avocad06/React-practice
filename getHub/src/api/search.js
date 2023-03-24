import { BASE_URL, KEY } from "./const"

export const searchUsers = async (args) => {
    console.log(args)
    const searchRes = await fetch(
        `${BASE_URL}/search/users?q=${args}`,
        // '/data/searchData.json',
        {
            method: 'GET',
            headers: {
                // Authorization: `Bearer ${KEY}`
            },
        })

    return searchRes ? searchRes.json() : null
}

export const getUserInfo = async (args) => {
    const userInfoRes = await fetch(
        `${BASE_URL}/users/${args}`,
        // '/data/userData.json',
        {
            method: 'GET',
            headers: {
                // Authorization: `Bearer ${KEY}`
            },
        })

    // console.log("HTTP통신 응답입니다.:", userInfoRes)


    return userInfoRes.ok || userInfoRes.status === 404 ? userInfoRes.json() : null
}
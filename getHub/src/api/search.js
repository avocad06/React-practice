export const searchUsers = async (args) => {
    console.log(args)
    const searchRes = await fetch(`https://api.github.com/search/users?q=${args}`, {
        method: 'GET',
    })

    return searchRes ? searchRes.json() : null
}

export const getUserInfo = async (args) => {
    const userInfoRes = await fetch(`https://api.github.com/users/${args}`, {
        method: 'GET',
    })

    return userInfoRes ? userInfoRes.json() : null
}
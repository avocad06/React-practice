// hooks
import React, { useCallback, useState } from "react"
import { Item } from "../types/searchData"

// components
import Main from "../components/Main/Main"
import Navbar from "../components/Navbar/Navbar"

// 빈 값이 전달될 수도 있고, 아이템이 전달될 수도 있음.
export type searchResultArray = Item[] | []

function Home() {
    // 해당 상태가 어떤 타입을 가지고 있을지 제네릭으로 설정
    const [resultData, setResultData] = useState<searchResultArray>([])

    const getUsers = useCallback((result: searchResultArray) => {
        // 새로운 배열을 만들어서 상태 변경
        const newResultData = [...result]
        setResultData(newResultData)
    }, [])
    return (
        <>
            <Navbar getUsers={getUsers} />
            <Main resultData={resultData} />
        </>
    )
}

export default Home
// hooks
import { useState } from "react"

// components
import Main from "../components/Main/Main"
import Navbar from "../components/Navbar/Navbar"

function Home() {
    const [resultData, setResultData] = useState([])

    const getUsers = (result) => {
        setResultData(result)
    }
    return (
        <>
            <Navbar getUsers={getUsers} />
            <Main resultData={resultData} />
        </>
    )
}

export default Home
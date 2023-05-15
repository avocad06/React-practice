// components
import MainItem from "./MainItem"
import { Item } from "../../types/searchData"

type MainProps = {
    resultData: Item[] | []
}

function Main({ resultData }: MainProps) {

    console.log(typeof(resultData))

    return (
        <main className="main">
            {resultData?.length === 0 ? (
                <div>no user matches...</div>
            ):
                (
                <ul>
                    {resultData.map((data: Item) => 
                    <li>
                        <MainItem key={data.id} {...data} />
                    </li>)}
                </ul>)
                }

        </main>
    )
}

export default Main
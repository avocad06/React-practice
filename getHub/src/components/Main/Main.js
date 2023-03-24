// components
import MainItem from "./MainItem"

import style from './Main.module.css'


function Main({ resultData }) {

    return (
        <main className="main">
            {resultData?.length === 0 ?
                <div>no user matches...</div>
                :
                <ul>
                    {resultData.map((data) => <li key={data.id} ><MainItem {...data} /></li>)}
                </ul>}

        </main>
    )
}

export default Main
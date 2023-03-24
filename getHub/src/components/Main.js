// components
import MainItem from "./MainItem"


function Main({ resultData }) {
    return (
        resultData.map((data) => <MainItem key={data.id} {...data} />)
    )
}

export default Main
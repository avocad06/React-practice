import { Link } from "react-router-dom"

function MainItem({ login }) {
    return (
        <Link to={`/users/${login}`}>상세 정보로 이동하기</Link>
    )
}

export default MainItem
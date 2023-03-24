import { Link } from "react-router-dom"
import { BsArrowUpRight } from 'react-icons/bs'

import style from './Main.module.css'

function MainItem({ login, avatar_url: avatar }) {
    return (
        <Link to={`/users/${login}`}>
            <div className={style.card}>
                <div className={style.imageBox}>
                    <img src={avatar} alt='profile' />
                </div>
                <p>{login}</p>
                <span><BsArrowUpRight /></span>
            </div>
        </Link>
    )
}

export default MainItem
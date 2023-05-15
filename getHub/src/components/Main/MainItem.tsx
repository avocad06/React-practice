import { Link } from "react-router-dom"
import { BsArrowUpRight } from 'react-icons/bs'
import { Item } from "../../types/searchData"

import style from './Main.module.css'

interface MainItemProps extends Item {
}

function MainItem({ login, avatar_url: avatar }: MainItemProps) {
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
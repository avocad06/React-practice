import { useContext } from 'react'
import { CartContext } from '../App'

// import style from './Navbar.module.css'

function Navbar() {
    const { amount } = useContext(CartContext)
    return (
        <>
            <div>네브바 영역입니다.</div>
            <span>{amount}</span>
        </>
    )
}

export default Navbar
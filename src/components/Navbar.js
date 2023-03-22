import style from './Navbar.module.css'

function Navbar({ all }) {
    return (
        <>
            <div>네브바 영역입니다.</div>
            <span>{all}</span>
        </>
    )
}

export default Navbar
// hooks
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchUsers } from "../../api/search";
import { BiSearch } from 'react-icons/bi'

import style from './Navbar.module.css'

function Navbar({ getUsers }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const inputValueRef = useRef();

    const [localState, setLocalState] = useState('')

    // 타이머 선언
    const [timer, setTimer] = useState(null);

    const handleChange = async (e) => {

        setLocalState((prev) =>
            // inputValueRef.current.value
            e.target.value
        )
        console.log('input값과 localState는 다릅니다.',
            'inputValue:', inputValueRef.current.value,
            'localState:', localState)

        // 이전 timer가 존재한다면,
        if (timer) clearTimeout(timer)

        const newTimer = setTimeout(async () => {
            try {
                console.log("요청했습니다.")
                localState && await handleSubmit(e);
            } catch (e) { console.log('error', e) }
        }, 800)
        setTimer(newTimer)
    }

    //handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localState.length === 0) {
            console.log(inputValueRef.current.value, "입력값이 없습니다.")
            if (id) {
                navigate('/')
            } else {
                alert("Please Enter github name.")
            }
            return getUsers([])
        }
        const searchResult = await searchUsers(inputValueRef.current.value)

        console.log(searchResult)
        if (searchResult?.items.length < 1) {
            alert(`Not Found User: ${localState}`)
        }
        getUsers(searchResult?.items)
    }


    return (
        <nav className="Navbar">
            <form onSubmit={handleSubmit}>
                <div className={style.inputBox}>
                    <span><BiSearch /></span>
                    <input
                        type='text'
                        onChange={handleChange}
                        value={localState}
                        ref={inputValueRef}
                        placeholder="search github name" />
                    <button type="submit">search</button>
                </div>
            </form>

        </nav>
    )
}

export default Navbar
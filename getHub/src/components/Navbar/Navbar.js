// hooks
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchUsers } from "../../api/search";
import { BiSearch } from 'react-icons/bi'
import { useQuery } from "@tanstack/react-query";

import style from './Navbar.module.css'

function Navbar({ getUsers }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const inputValueRef = useRef();

    const [localState, setLocalState] = useState('')

    const searchWordRef = useRef(null);

    const { refetch, data: searchResult } = useQuery(
        {
            queryKey: ['search', searchWordRef.current],
            queryFn: async () => {
                const result = await searchUsers(searchWordRef.current)
                return result;
            },
            enabled: false,
            refetchOnWindowFocus: false,
            staleTime: 50000
        })

    // 타이머 선언
    const [timer, setTimer] = useState(null);

    const handleChange = async (e) => {

        setLocalState(() => {
            const newState = e.target.value
            console.log("새로 바뀔 값입니다.", newState)

            // 이전 timer가 존재한다면,
            if (timer) clearTimeout(timer)

            const newTimer = setTimeout(async () => {
                try {
                    await handleSubmit(null, newState);
                } catch (e) { console.log('error', e) }
            }, 600)
            setTimer(newTimer)
            return newState;
        }
            // inputValueRef.current.value
            // e.target.value
        )
        console.log('input값과 localState는 다릅니다.',
            'inputValue:', inputValueRef.current.value,
            'localState:', localState)
    }

    //handleSubmit
    const handleSubmit = async (e, state) => {
        e?.preventDefault();
        console.log("state는 이걸로 들어왔어요", state)

        const searchWord = (e ? localState : state).trim()
        console.log("이걸로 요청 보낼 거예요", searchWord)
        if (searchWord === '') {
            if (id) {
                return navigate('/')
            } else {
                e && alert("Please Enter github name.")
                e && setLocalState('')
                return getUsers([])
            }
        }
        searchWordRef.current = searchWord
        refetch(searchWord)
        console.log(searchResult)

        if (searchResult?.items.length < 1) {
            alert(`Not Found User: ${localState}`)
            return setLocalState('')
        }

        getUsers(searchResult ? searchResult.items : [])
    }


    return (
        <nav className="Navbar" >
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

        </nav >
    )
}

export default Navbar
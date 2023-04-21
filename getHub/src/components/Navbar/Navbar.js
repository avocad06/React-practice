// hooks
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchUsers } from "../../api/search";
import { BiSearch } from 'react-icons/bi'
import { useQuery, useQueryClient } from "@tanstack/react-query";

import style from './Navbar.module.css'

function Navbar({ getUsers }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const [localState, setLocalState] = useState('')

    const [searchWord, setSearchWord] = useState('')

    const queryClient = useQueryClient()

    const { isLoading, data: searchResult } = useQuery(
        {
            queryKey: ['search', searchWord],
            queryFn: async () => {
                console.log("이걸로 data fetch 할 거예요", searchWord)
                const result = await searchUsers(searchWord)
                return result;
            },
            refetchOnWindowFocus: false,
            enabled: true,
            staleTime: 1000 * 60 * 3,
            // new Data를 잘 받아왔을 때 실행되는 함수
            onSuccess: (data) => {
                console.log(data)
                if (data?.items.length < 1) {
                    alert(`Not Found User: ${searchWord}`)
                    getUsers([])
                    return setLocalState('')
                }
                getUsers(data ? data.items : [])
            }
        })

    // 타이머 선언
    const [timer, setTimer] = useState(null);

    const handleChange = async (e) => {

        setLocalState(() => {
            const newState = e.target.value
            // console.log("새로 바뀔 값입니다.", newState)

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
        )
    }

    //handleSubmit
    const handleSubmit = async (e, state) => {
        e?.preventDefault();

        // 검색여 유효성 검사
        const search = (e ? localState : state).trim()
        if (search === '') {
            if (id) {
                return navigate('/')
            } else {
                e && alert("Please Enter github name.")
                e && setLocalState('')
                return getUsers([])
            }
        }

        // searchWord가 변경될 때 = useQuery훅의 실행
        setSearchWord(() => {
            const newSearch = search
            return newSearch
        })
        if (!isLoading) {
            console.log("처음 검색하는 단어가 아닙니다. 캐시된 데이터를 가져옵니다.")
            const cachedData = queryClient.getQueryData(['search', search])
            console.log(cachedData)
            return cachedData && getUsers(cachedData.items)
        }
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
                        placeholder="search github name" />
                    <button type="submit">search</button>
                </div>
            </form>

        </nav >
    )
}

export default Navbar
// hooks
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchUsers } from "../../api/search";
import { BiSearch } from 'react-icons/bi'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchResultArray } from "../../pages/Home";

import style from './Navbar.module.css'

interface NavbarProps {
    getUsers: (result: searchResultArray) => void
}

const Navbar:React.FC<NavbarProps> = ({ getUsers }) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [localState, setLocalState] = useState('')

    const [searchWord, setSearchWord] = useState('')

    const queryClient = useQueryClient()

    const { isLoading } = useQuery(
        {
            queryKey: ['search', searchWord],
            queryFn: async () => {
                console.log("이걸로 data fetch 할 거예요", searchWord)
                const result = await searchUsers(searchWord)
                return result;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 3,
            // new Data를 잘 받아왔을 때 실행되는 함수
            onSuccess: (data: searchResultArray) => {
                console.log(data)
                // 새로 받아온 값의 결과 값 개수가 없다면
                if (data?.length < 1) {
                    alert(`Not Found User: ${searchWord}`)
                    getUsers([])
                    return setLocalState('')
                }
                getUsers(data ? data : [])
            }
        })

    // 타이머 선언
    const timerRef = useRef<NodeJS.Timeout|null>(null);
    // const [timer, setTimer] = useState<number | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setLocalState(() => {
            const newState = e.target.value
            // console.log("새로 바뀔 값입니다.", newState)

            // 이전 timer가 존재한다면,
            if (timerRef.current !== null) clearTimeout(timerRef.current)

            const newTimer = setTimeout(async () => {
                try {
                    await handleSubmit(null, newState);
                } catch (e) { console.log('error', e) }
            }, 600)
            timerRef.current = newTimer
            return newState;
        }
        )
    }

    //handleSubmit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>|null, state:string) => {
        e?.preventDefault();

        // 검색여 유효성 검사
        const search = (e ? localState : state).trim()
        if (search === '') {
            if (id) {
                return navigate('/')
            } else {
                // submit 이벤트 제출 시의 공백만 처리
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
            const cachedData:searchResultArray|undefined = queryClient.getQueryData(['search', search])
            console.log(cachedData)
            return cachedData && getUsers(cachedData)
        }
    }

    return (
        <nav className="Navbar" >
            <form onSubmit={(e) => handleSubmit(e, localState)}>
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
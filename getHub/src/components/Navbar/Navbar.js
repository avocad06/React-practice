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

    //handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localState.length === 0) {
            if (id) {
                navigate('/')
            } else {
                alert("Please Enter github name.")
            }
            return
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
                        onChange={(e) => setLocalState(
                            // inputValueRef.current.value
                            e.target.value
                        )}
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
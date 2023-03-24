import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchUsers } from "../api/search";

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
        <div className="Navbar">
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input
                        type='text'
                        onChange={(e) => setLocalState(
                            // inputValueRef.current.value
                            e.target.value
                        )}
                        value={localState}
                        ref={inputValueRef}
                        placeholder="search github name" />
                    <button>search</button>
                </div>
            </form>

        </div>
    )
}

export default Navbar
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiSearch } from 'react-icons/bi'
export default function SearchHeader() {

    const { keyword } = useParams();

    const navigate = useNavigate();
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(keyword || '')
    }, [keyword])

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/videos/${content}`)
        setContent("")
    }

    return (
        <header>
            <Link to='/'>로고</Link>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Search..." value={content} onChange={handleChange} />
                <button><BiSearch /></button>
            </form>
        </header>
    )
}
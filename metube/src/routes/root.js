import { Outlet } from "react-router-dom";
import SearchHeader from "../components/SearchHeader";

export default function Root() {
    return (
        <>
            <SearchHeader />
            <Outlet />
        </>
    )
}
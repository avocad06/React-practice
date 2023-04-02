// react-router
import { createBrowserRouter } from "react-router-dom"

// components
import Root from "./root"
import NotFound from "../pages/NotFound"
import Videos from "../pages/Videos/Videos"
import VideoDetail from "../pages/VideoDetail"


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            // 인덱스가 true(최상위라면) video 보여주기
            { index: true, element: <Videos /> },
            { path: 'videos', element: <Videos /> },
            { path: 'videos/:keyword', element: <Videos /> },
            {
                path: 'videos/watch/:videoId',
                element: <VideoDetail />
            }
        ]
    },

])

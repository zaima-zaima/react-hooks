import { Outlet } from "react-router-dom";
import "./main.scss";
import SideBar from "../components/SideBar"


export default function Main() {
    return (
        <div className="main-container">
            <div className="side-bar">
                <SideBar />
            </div>
            <div className="route-area">
                <Outlet />
            </div>
        </div>
    )
}

import { useHistory } from "../../hooks/router-push/useHistory";
import { routes } from "../../routes/routes";
import "./index.scss";

export default function SideBar() {

    const history = useHistory(routes);

    return (
        <div className="sidebar-container">

            <button onClick={() => {
                history.push("pageC")
            }}>
                to pageC
            </button>


            <button onClick={() => {
                history.push("pageA", {
                    params: {
                        a: 1,
                        b: 2,
                        c: 3
                    }
                })
            }}>to PageA with params</button>
            <button onClick={() => {
                history.push("pageB", {
                    query: {
                        v: 1,
                        c: "done"
                    }
                })
            }}>to PageB with queries</button>

            <button onClick={() => {
                history.push("pageA", {
                    params: {
                        a: "pa",
                        b: "pb"
                    },
                    query: {
                        q1: 1,
                        q2: "false",
                        q3: "v3"
                    }
                })
            }}>
                to pageA with params and queries
            </button>
        </div>
    )
}

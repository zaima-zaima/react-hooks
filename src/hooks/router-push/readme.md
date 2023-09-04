# instroduce

In normally, you want navigate to A page, the full path is needed. 

```jsx
import { useNavigate } from "react-router-dom";


export function App() {
    const history = useNavigate();
    return (
        <div className="app-container">
              <button onClick={()=> {
                    history("/page/pageA?a=1&b=2")
                }}>
            </button>
        </div> 
    )
}
```



But now you can easily to navigatte by Namming router

# usage

## create router

you can specify a name Each roues

```tsx
// routes.tsx
import { RouteObject, createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import DefaultPage from "../pages/DefaultPage";
import PageA from "../pages/PageA";
import PageB from "../pages/PageB";
import PageC from "../pages/PageC";

export const routes = [
    {
        path: "/", element: <Main />, children: [
            { name: "home", path: "/", element: <DefaultPage /> },
            { name: "pageC", path: "/page/pageC", element: <PageC /> },
            { name: "pageA", path: "/page/pageA/:a/:b", element: <PageA /> },
            { name: "pageB", path: "/page/pageB/c", element: <PageB /> }
        ]
    }
] as RouteObject[]


const router = createBrowserRouter(routes);


export default router; 
```

```tsx
// App.tsx
import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
```

## Navigate

you can use `useHistory` hook to create a history instance and navigate by call push



```ts

interface Options {
    query?:{}
    params?:{}
}

function push(name:string,options?:Options):void
```



```tsx
// A file

import { useHistory } from "../../hooks/router-push/useHistory";
import { routes } from "../../routes/routes";
import "./index.scss";

export default function SideBar() {

    const history = useHistory(routes); // create A history

    return (
        <div className="sidebar-container">

            <button onClick={() => {
                history.push("pageC") // navigate
            }}>
                to pageC
            </button>
        </div>
    )
}



```

## Navigate With params

look at `pageA`, pageA need two params （a、b）

```tsx
export const routes = [
    {
        path: "/", element: <Main />, children: [
            { name: "home", path: "/", element: <DefaultPage /> },
            { name: "pageC", path: "/page/pageC", element: <PageC /> },
            { name: "pageA", path: "/page/pageA/:a/:b", element: <PageA /> },
            { name: "pageB", path: "/page/pageB/c", element: <PageB /> }
        ]
    }
] as RouteObject[]
```

So.... You can

```tsx
import { useHistory } from "../../hooks/router-push/useHistory";
import { routes } from "../../routes/routes";
import "./index.scss";

export default function SideBar() {

    const history = useHistory(routes); // create A history

    return (
        <div className="sidebar-container">

            <button onClick={() => {
                 history.push("pageA", {
                    params: {
                        a: 1,
                        b: 2
                    }
                }) // navigate to : /page/pageA/1/2
            }}>
                to pageC
            </button>
        </div>
    )
}

```

## Navigate With queries

```tsx
import { useHistory } from "../../hooks/router-push/useHistory";
import { routes } from "../../routes/routes";
import "./index.scss";

export default function SideBar() {

    const history = useHistory(routes); // create A history

    return (
        <div className="sidebar-container">

            <button onClick={() => {
                history.push("pageB", {
                    query: {
                        v: 1,
                        c: "done"
                    }
                }) // navigate to : /page/pageB/c?v=1&c=done
            }}>
                to pageC
            </button>
        </div>
    )
}
```

## Navigate With params & queries

```tsx
import { useHistory } from "../../hooks/router-push/useHistory";
import { routes } from "../../routes/routes";
import "./index.scss";

export default function SideBar() {

    const history = useHistory(routes); // create A history

    return (
        <div className="sidebar-container">

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
                }) // navigate to : /page/pageA/pa/pb?q1=1&q2=false&q3=v3
            }}>
                to pageC
            </button>
        </div>
    )
}
```



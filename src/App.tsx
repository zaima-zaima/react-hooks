import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import { useFetchWithCount } from "./hooks/fetch/useFetch"

async function test() {
  return {
    code: 500,
    msg: "失败",
    data: null
  };
}


function fuc1() {
  console.log("fuc1");
}

function func2() {
  console.log("func2");

}

export default function App() {

  const { callback } = useFetchWithCount(test, {
    beforeLoad() {
      console.log("before");
    },
    afterLoad() {
      console.log("after");
    },
    hooks: {
      fuc1,
      func2
    },
    error(code, msg) {
      console.log(code, msg);
    },
  })

  return (<>
    <RouterProvider router={router} />
    <button onClick={() => {
      callback.fuc1();
      callback.func2();
    }}>fasfas</button>
  </>

  )
}


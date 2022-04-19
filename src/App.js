import "./App.css"
import { useNavigate, Routes, Route } from "react-router-dom"
import * as Screens from "./screens/Index"
import TopMenu from "./components/TopMenu"
import Layout from "./app/Layout"
import RequireAuth from "./app/RequireAuth"

//hlavní react component, obsahuje routes pro react-router-dom
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={Screens.Login()} />
        <Route path="/register" element={Screens.Register()} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={TopMenu()}>
            <Route index element={Screens.Dashboard()} />
            <Route path="/tasks" element={Screens.TaskOverview()} />
            <Route path="/userProfile" element={Screens.UserProfile()} />
          </Route>
        </Route>
        <Route path="*" element={Screens.NoMatch()} />
      </Route>
    </Routes>
  )
}

import "./App.css"
import { useNavigate, Routes, Route } from "react-router-dom"
import * as Screens from "./screens/Index"
import TopMenu from "./components/TopMenu"
import Layout from "./app/Layout"
import RequireAuth from "./app/RequireAuth"
import Login from "./screens/Login"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={TopMenu()}>
            <Route index element={Screens.Home()} />
            <Route path="about" element={Screens.About()} />
            <Route path="connect" element={Screens.Connect()} />
            <Route path="userProfile" element={Screens.UserProfile()} />
          </Route>
        </Route>
        <Route path="*" element={Screens.NoMatch()} />
      </Route>
    </Routes>
  )
}

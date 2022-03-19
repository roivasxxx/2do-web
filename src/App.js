import "./App.css"
import { useNavigate, Routes, Route } from "react-router-dom"
import * as Screens from "./screens/Index"
import TopMenu from "./components/TopMenu"

export default function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Routes>
        <Route path="/" element={TopMenu()}>
          <Route index element={Screens.Home()} />
          <Route path="about" element={Screens.About()} />
          <Route path="connect" element={Screens.Connect()} />
          <Route path="userProfile" element={Screens.UserProfile()} />
          <Route path="*" element={Screens.NoMatch()} />
        </Route>
      </Routes>
    </div>
  )
}

import "./App.css"
import { useNavigate, Routes, Route } from "react-router-dom"
import * as Screens from "./screens/Index"
import TopMenu from "./components/TopMenu"

export default function App() {
  return (
    <div className="App" style={{ height: "100%", backgroundColor: "#737373" }}>
      <Routes>
        <Route path="/" element={TopMenu()}>
          <Route index element={Screens.Dashboard()} />
          <Route path="about" element={Screens.About()} />
          <Route path="tasks" element={Screens.TaskOverview()} />
          <Route path="userProfile" element={Screens.UserProfile()} />
          <Route path="*" element={Screens.NoMatch()} />
        </Route>
      </Routes>
    </div>
  )
}

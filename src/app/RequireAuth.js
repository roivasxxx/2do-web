import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppProvider } from "../data/AppProvider"
import { currentUser } from "../firebase/auth"
import Spin from "../components/Spinner"

const RequireAuth = () => {
  const { auth } = useAppProvider()
  const location = useLocation()

  return auth === undefined ? (
    <div>
      <Spin text="Loading data" />
    </div>
  ) : auth?.accessToken || currentUser?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth

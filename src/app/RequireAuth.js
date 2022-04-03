import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppProvider } from "../data/AppProvider"

const RequireAuth = () => {
  const { auth } = useAppProvider()
  const location = useLocation()
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth

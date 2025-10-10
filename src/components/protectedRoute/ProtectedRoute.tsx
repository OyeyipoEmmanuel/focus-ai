import { Navigate, Outlet } from "react-router-dom"
import { useGetUserChanged } from "../../context/UserChangeContext"
import LoadingComponent from "../loadingComponent/LoadingComponent";


const ProtectedRoute = () => {

    const { user, isLoading } = useGetUserChanged()

    if (isLoading) return <LoadingComponent/>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute
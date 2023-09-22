import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { User } from "../server";
import Loading from "../components/loading";

export default function Layout() {

    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const authenticatedUser = localStorage.getItem("todo_user");
        if (authenticatedUser) {
            setLoggedUser(JSON.parse(authenticatedUser))
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem("todo_user")
        setLoggedUser(null)
    }

    function handleLoginSuccess(e: User) {
        setLoggedUser(e)
    }

    return (
        <>
            <Header loggedUser={loggedUser} handleLogout={handleLogout} />
            {loading && <Loading />}
            <Outlet context={[handleLoginSuccess, loggedUser, setLoading]} />
        </>
    )
}
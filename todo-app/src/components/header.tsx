import { Link, NavLink } from "react-router-dom";
import { User } from "../server";
import { useEffect, useState } from "react";


interface Prop {
    loggedUser: User | null,
    handleLogout: any
}
export default function Header({ loggedUser, handleLogout }: Prop) {

    const [menu, setMenu] = useState(false);


    function handleMenuToggle() {
        setMenu(!menu)
    }

    useEffect(() => {
        if (window.innerWidth < 500) {
            setMenu(false)
        } else {
            setMenu(true)
        }
    }, [])

    return (
        <div className="header container">
            <Link to="/" className="logo"><h1>TodoApp</h1></Link>
            <div className="menu-icon" onClick={handleMenuToggle}>Menu</div>
            {menu && <div className="nav-links">
                <NavLink to="/" end>Home</NavLink>
                {loggedUser && <NavLink to="/todos">MyTodos</NavLink>}
                {loggedUser && <NavLink to="/add-todo">Add todo</NavLink>}
                {!loggedUser && <NavLink to="/login">Login</NavLink>}
                {loggedUser && <button onClick={handleLogout}>Logout</button>}
            </div>}
        </div>
    )
}
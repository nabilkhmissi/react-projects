import { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import Card from "../components/card";
import { getTodos, deleteTodo } from "../server";
import { Todo } from "../models/todo";

export default function Todos() {

    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = location.pathname;

    const setLoading = useOutletContext<any>()[2]

    const [todos, setTodos] = useState<Todo[] | null>()

    useEffect(() => {
        const loggedUser = localStorage.getItem("todo_user");
        if (loggedUser == null) {
            navigate('/login?redirectTo=' + redirectTo)
        }
        fetchTodos()
    }, [])


    function fetchTodos() {
        setLoading(true)
        getTodos()
            .then(response => {
                setTodos(processResponse(response))
            })
            .finally(() => setLoading(false))
    }
    function processResponse(response: any) {
        let final = [];
        for (const t in response.data) {
            final.push({ ...response.data[t], id: t, timestamp: formatDate(response.data[t].timestamp) })
        }
        return final;
    }

    function formatDate(timestamp: number) {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

    function handleDelete(id: string) {
        deleteTodo(id).then(() => fetchTodos())
    }
    return (
        <section>
            <div className="todos-container container" >
                {todos && todos.map((e: Todo, i: number) => <Card key={i} handleDelete={() => handleDelete(e.id)} todo={e} />)}
            </div>
        </section>
    )
}
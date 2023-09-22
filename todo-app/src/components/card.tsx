import { useNavigate } from "react-router-dom";
import { Todo } from "../server";

export default function Card({ todo, handleDelete }: { todo: Todo, handleDelete: any }) {

    const navigate = useNavigate();

    function deleteTodo(e: any, id: string) {
        e.preventDefault();
        handleDelete(id)
    }

    function handleUpdate(id: string) {
        navigate(`/update-todo/${id}`)
    }

    return (
        <div className="todo-card">
            <button className="card-delete" onClick={(e) => deleteTodo(e, todo.title)}>X</button>
            <div className="card-body">
                <h1>{todo.title}</h1>
                <h3>{todo.timestamp}</h3>
                <div className="card-content">
                    <p>{todo.content}</p>
                </div>
            </div>
            <div className="card-actions">
                <button style={{ float: "right" }} onClick={() => handleUpdate(todo.id)}>edit</button>
            </div>
        </div >
    )
}
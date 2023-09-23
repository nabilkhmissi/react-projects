import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addTodo, findById, updateTodo } from "../server";
import { Todo } from "../models/todo";

export default function AddTodo() {

    const [form, setForm] = useState<Todo>({ title: '', content: '', timestamp: Date.now(), status: 'undone' })
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState('idle');
    const params = useParams()

    function handleChange(e: any, field: string) {
        switch (field) {
            case 'title':
                setForm({ ...form, title: e.target.value })
                break;
            case 'content':
                setForm({ ...form, content: e.target.value })
                break;
        }
    }

    function handleSubmit(e: Event) {
        e.preventDefault();
        setStatus('submitting');
        setError(null);

        if (!form.title || !form.content) setError("Please fill all fields");

        if (params.id) {
            updateTodo(params.id, { ...form })
                .then(() => setError("Todo updated successfully !"))
                .catch(error => setError(error))
                .finally(() => setStatus('idle'))
        } else {
            addTodo(form)
                .then(() => setError("Todo added successfully !"))
                .catch(error => setError(error))
                .finally(() => setStatus('idle'))

        }
    }

    useEffect(() => {
        if (params.id) {
            findById(params.id)
                .then(res => {
                    setForm({
                        title: res.data.title,
                        content: res.data.content,
                        status: res.data.status,
                        timestamp: res.data.timestamp
                    });
                })
        }
    }, [])



    return (
        <div className="login-card">
            <form className="login-form">
                <h1>Add Todo</h1>
                {error && <div className="alert" >{error}</div>}
                <div className="form-group">
                    <label>title</label>
                    <input onChange={(e) => handleChange(e, 'title')} value={form.title} />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea onChange={(e) => handleChange(e, 'content')} value={form.content} ></textarea>
                </div>
                <div className="form-group">
                    <button onClick={(e) => handleSubmit(e)} disabled={status === 'submitting'} >{status === 'submitting' ? 'Loading...' : params.id ? 'Update Todo' : 'Add Todo'}</button>
                </div>
            </form>
        </div>
    )
}
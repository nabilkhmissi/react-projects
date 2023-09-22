import { useState } from "react"
import { User, userLogin } from "../server"
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";


export default function Login() {

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const navigate = useNavigate();

    const [handleLoginSuccess] = useOutletContext<any>();
    const [searchparams, setSearchParams] = useSearchParams();

    const context = useOutletContext<any>()
    const setLoading = context[2]



    const redirect = searchparams.get("redirectTo")
    function handleChange(e: any, field: string) {
        switch (field) {
            case 'email':
                setForm({ ...form, email: e.target.value })
                break;
            case 'password':
                setForm({ ...form, password: e.target.value })
                break;
        }
    }

    function handleSubmit(e: any) {
        setError(null)
        e.preventDefault();
        setLoading(true)
        setStatus('submitting')
        userLogin(form.email, form.password)
            .then(data => doLogin(data))
            .catch(error => setError(error.message))
            .finally(() => {
                setLoading(false)
                setStatus('idle');
            })
    }

    function doLogin(user: User) {
        localStorage.setItem("todo_user", JSON.stringify(user))
        handleLoginSuccess(user)

        if (redirect) {
            navigate(redirect, { replace: true });
        }
        navigate('/', { replace: true });
    }

    return (
        <div className="login-card">
            <form className="login-form">
                <h1>Login</h1>
                {error && <div className="alert" >{error}</div>}
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={(e) => handleChange(e, 'email')} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e) => handleChange(e, 'password')} />
                </div>
                <div className="form-group">
                    <button onClick={handleSubmit} disabled={status === 'submitting'} >{status === 'submitting' ? 'Loading...' : 'Login'}</button>
                </div>
            </form>
        </div>
    )
}
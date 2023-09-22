import axios from "axios";
import { Todo } from "./models/todo";

const users: User[] = [
    {
        name: "john",
        email: "john@mail.com",
        password: "john",
        todos: [
            {
                title: "Buy groceries",
                content: "Purchase fruits, vegetables, and bread for the week.",
                status: "not done",
                timestamp: "2023-09-21T10:00:00Z"
            },
            {
                title: "Finish work presentation",
                content: "Complete slides and prepare for the meeting tomorrow.",
                status: "not done",
                timestamp: "2023-09-21T11:15:00Z"
            },
            {
                title: "Go for a run",
                content: "Jog in the park for 30 minutes to stay active.",
                status: "not done",
                timestamp: "2023-09-21T13:30:00Z"
            },
            {
                title: "Read a book",
                content: "Read the first few chapters of 'The Great Gatsby'.",
                status: "not done",
                timestamp: "2023-09-21T15:45:00Z"
            },
            {
                title: "Call mom",
                content: "Catch up with mom and discuss weekend plans.",
                status: "not done",
                timestamp: "2023-09-21T17:00:00Z"
            },
            {
                title: "Write in journal",
                content: "Reflect on the day's events and thoughts.",
                status: "not done",
                timestamp: "2023-09-21T18:30:00Z"
            },
            {
                title: "Plan vacation",
                content: "Research potential vacation destinations and costs.",
                status: "not done",
                timestamp: "2023-09-21T20:00:00Z"
            },
            {
                title: "Fix the leaking faucet",
                content: "Call the plumber to repair the bathroom faucet.",
                status: "not done",
                timestamp: "2023-09-21T21:45:00Z"
            }
        ]
    },
    {
        name: "alex",
        email: "alex@mail.com",
        password: "alex"
    }
]

export function userLogin(email: string, password: string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.email === email)
            if (!user) reject({ code: 500, message: 'user with this email not found' });
            if (user?.password !== password) reject({ code: 500, message: 'invalid credentials' })
            resolve(user)
        }, 2000);
    })
}

export function getTodos() {
    return axios.get("https://pizza-api-753ec-default-rtdb.firebaseio.com/todos.json")
}

export function deleteTodo(id: string) {
    return axios.delete(`https://pizza-api-753ec-default-rtdb.firebaseio.com/todos/${id}.json`)
}


export function findById(id: string) {
    return axios.get(`https://pizza-api-753ec-default-rtdb.firebaseio.com/todos/${id}.json`)
}

export function updateTodo(id: string | null, todo: Todo) {
    return axios.put(`https://pizza-api-753ec-default-rtdb.firebaseio.com/todos/${id}.json`, todo)
}

export function addTodo(todo: Todo) {
    return axios.post(`https://pizza-api-753ec-default-rtdb.firebaseio.com/todos.json`, todo)
}

export function deleteTodoByTitle(title: string) {
    users.forEach(user => {
        user.todos = user.todos?.filter(t => t.title !== title)
    })
}


export class User {
    name?: string
    email?: string;
    password?: string;
    todos?: Todo[] | null
}
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({ setAuth }) => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const { email, password } = formData

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password }, { headers: { "Content-Type": "application/json" }})
            
            if (data?.token) {
                localStorage.setItem("token", JSON.stringify(data.token))
                setAuth(true)
                toast.success("login Success")
            } else {
                console.log(data)
                setAuth(false)
                toast.error(data.error)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={handleSubmit}>
                <input className="form-control my-3" type="text" name="email" placeholder="Email" value={email} onChange={handleChange} />
                <input className="form-control my-3" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                <button className="btn btn-success btn-block" onClick={handleSubmit}> Login </button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    )
}

export default Login

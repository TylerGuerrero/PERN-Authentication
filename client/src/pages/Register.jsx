import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = ({ setAuth }) => {
    const [formData, setFormData] = useState({ email: "", name: "", password: "" })
    const { email, name, password } = formData

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/register", { email, name, password }, { headers: {"Content-Type": "application/json" }})
            localStorage.setItem("token", JSON.stringify(data.token))
            setFormData({ email: "", name: "", password: "" })
            setAuth(true)
        } catch (error) {   
            console.error(error.message)
        }
    }

    return (
       <Fragment>
           <h1 className="text-center my-5">Register</h1>
           <form onSubmit={handleSubmit}>
               <input className="form-control my-3" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
               <input className="form-control my-3" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
               <input className="form-control my 3" type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
               <button className="btn btn-success btn-block my-3">Submit</button>
           </form>
           <Link to="/login">Login</Link>
       </Fragment>
    )
}

export default Register

import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DashBoard = ({ setAuth }) => {
    const [user, setUser] = useState("")
    const { name , email } = user

    async function getName () {
        try {
            const { data } = await axios.get("http://localhost:5000/api/dashboard", { headers: { token: JSON.parse(localStorage.getItem("token"))}})
            setUser(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged out Successfully")
    }

    useEffect(() => {
        getName()
    }, [])

    return (
        <Fragment>
            <h1>DashBoard {name} {email} </h1>
            <button className="btn btn-primary" onClick={(e) => logout(e)}>Logout</button>
        </Fragment>
    )
}

export default DashBoard

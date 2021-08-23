import React, { Fragment } from 'react'

const DashBoard = ({ setAuth }) => {
    return (
        <Fragment>
            <h1>DashBoard</h1>
            <button onClick={setAuth}>
                Dashboard
            </button>
        </Fragment>
    )
}

export default DashBoard

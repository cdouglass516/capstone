import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import {GetUserbyEmail} from "../../dataLayer/appAccesss";
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        if(event.target.id === "email"){
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }
    }


    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return GetUserbyEmail(`${loginUser.email}`)
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    // The user id is saved under the key nutshell_user in session Storage. Change below if needed!
                    sessionStorage.setItem("exploreNashvegas_user", exists.id)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="exploreNashville">
                        <h1>Explore Nashville</h1>
                        <h2>Please sign in</h2>
                    </div>
                    <div className='login_form'>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address: </label>
                        <input type="email"
                            id="email"
                            className="form-control email_entry"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPW"> Password: </label>
                        <input type="password"
                            id="password"
                            className="form-control email_entry"
                            placeholder="Password"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    </div>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    )
}

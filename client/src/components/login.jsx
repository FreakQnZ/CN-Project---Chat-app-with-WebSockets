import React, {useRef, useState} from 'react'
import { v4 as uuid } from 'uuid'

const API_HOST = "http://localhost:3001"

const Login = ({handleLogin}) => {
    const userIdRef = useRef()
    const passwordRef = useRef()
    const newUserIdRef = useRef()
    const newPasswordRef = useRef()
    const [newUser, setNewUser] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = userIdRef.current.value
        const password = passwordRef.current.value

        const loginCred = await fetch(`${API_HOST}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userId,
                password
            })
        })

        const res = await loginCred.json()

        if (loginCred.ok) {
            handleLogin([res.accessToken, userIdRef.current.value])
            // setUserName(userIdRef.current.value)
        }
        else {
            alert(res.message)
        }
    }

    const createNewid = async (e) => {
        e.preventDefault()
        const id = uuid()
        const email = newUserIdRef.current.value
        const password = newPasswordRef.current.value
        const newUser = await fetch(`${API_HOST}/user/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: id,
                email,
                password
            })
        })

        const res = await newUser.json()

        if (newUser.ok) {
            document.getElementById('my_modal_1').close()
            setNewUser(true)
        }
        else {
            alert(res.message)
        }
        
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">
                <div className="text-center lg:text-left flex flex-col gap-6">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p>or <span onClick={()=>document.getElementById('my_modal_1').showModal()} className=' link underline-offset-4 px-2 hover:text-gray-500'>create a new id</span> here</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">User Email</span>
                    </label>
                    <input ref={userIdRef} type='text' placeholder="example@chatapp.com" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input ref={passwordRef} type="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        {/* <a href="#" className="label-text-alt link link-hover">Forgot password?</a> */}
                        {newUser && <span className=' text-success'>New user created login now!</span>}
                    </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Login</button>
                    </div>
                </form>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col justify-center items-center">
                    <h1 className='p-2 text-xl'>Create an Account Now</h1>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={createNewid} className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Email</span>
                            </label>
                            <input ref={newUserIdRef} type='text' placeholder="example@chatapp.com" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input ref={newPasswordRef} type="password" placeholder="password" className="input input-bordered" required />
                            {/* <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
  )
}

export default Login
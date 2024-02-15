import React, {useRef} from 'react'
import { v4 as uuid } from 'uuid'

const Login = ({handleLogin}) => {
    const userIdRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const userId = userIdRef.current.value
        // const password = passwordRef.current.value
        handleLogin(userId)
    }

    const createNewid = () => {
        const id = uuid()
        handleLogin(id)
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">
                <div className="text-center lg:text-left flex flex-col gap-6">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p>or <span onClick={createNewid} className=' link underline-offset-4 px-2 hover:text-gray-500'>create a new id</span> here</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">User ID</span>
                    </label>
                    <input ref={userIdRef} type='text' placeholder="example ABCD-1234..." className="input input-bordered" required />
                    </div>
                    {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div> */}
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Login</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
  )
}

export default Login
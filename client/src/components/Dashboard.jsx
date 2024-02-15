import React, { useRef, useState } from 'react'
import { Messages } from './Messages'
import { Contacts } from './Contacts'

const Dashboard = ({id}) => {

  const [tab, setTab] = useState("messages")
  const newId = useRef()
  const newName = useRef()

  const NewContact = (e) => {
    e.preventDefault()
    const name = newName.current.value
    const id = newId.current.value
    console.log(name, id)
    newName.current.value = ""
    newId.current.value = ""
    document.getElementById(tab).close()

  }

  return (
    <div className=' h-dvh flex'>
      <div className='w-1/2 flex flex-col justify-between border-r border-solid'>
        <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setTab("messages")} className={`${tab === "messages" ? "btn-active" : ""}`}>Messages</a></li>
                <li><a onClick={() => setTab("contacts")} className={`${tab === "contacts" ? "btn-active" : ""}`}>Contacts</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl hidden lg:flex">Chat</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <div className=' flex justify-center py-4'>
                <div role="tablist" className=" tabs tabs-bordered lg:tabs-lg">
                  <a role="tab" onClick={() => setTab("messages")} className={`tab ${tab === "messages" ? "tab-active" : ""}`}>Messages</a>
                  <a role="tab" onClick={() => setTab("contacts")} className={`tab ${tab === "contacts" ? "tab-active" : ""}`}>Contacts</a>
                </div>
              </div>
            </ul>
          </div>
          <div className="navbar-end hidden lg:flex">
            <a className="btn btn-primary">Logout</a>
          </div>
        </div>
        {tab === "messages" ? <Messages /> : <Contacts />}
        </div>
        <div>
          <p className='p-4 mt-2 border-t border-solid'>Your Id: <span className=' font-extralight'>{id}</span></p>
          <button onClick={()=>document.getElementById(tab).showModal()} className=' btn w-full btn-info rounded-none'>New {tab === "messages" ? "Message" : "Contact"}</button>
        </div>
      </div>
      <dialog id="messages" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Messages</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
          <form>
            <button className='btn' type='submit'>Create</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="contacts" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
          <form>
            <label className="label">
              <span className="label-text">Id</span>
            </label>
            <input ref={newId} type="text" placeholder="Type here" className="input input-bordered" />
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input ref={newName} type="text" placeholder="Type here" className="input input-bordered" />
            <br />
            <button onClick={NewContact} className='btn my-4' type='submit'>Create</button>
          </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Dashboard
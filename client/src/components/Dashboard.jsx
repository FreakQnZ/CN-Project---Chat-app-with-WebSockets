import React, { useEffect, useRef, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { PostMessages } from './Messages'

const Dashboard = ({setLogin, socket, userName, setUserName}) => {

  const [room, setRoom] = useState(null)
  const [msg, setMsg] = useState([])

  const roomName = useRef()
  const message = useRef()


  const joinRoom = () => {
    if (roomName.current.value != "") {
      setRoom(roomName.current.value)
      socket.emit("join_room", roomName.current.value)
      document.getElementById('roomName').innerHTML = `Room Id : ${roomName.current.value}`
      roomName.current.value = ""
      setMsg([])
    }
  }

  const sendMessage = async () => {
    if (message.current.value != "") {
      const messagePayload = {
        room,
        message: message.current.value,
        userName
      }
      console.log(messagePayload)
      console.log("sender payload")
      setMsg([...msg, messagePayload])
      await socket.emit("send_message", messagePayload)

      message.current.value = ""

    }
  }

  const handleMsgKey = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const handleRoomKey = (e) => {
    if (e.key === "Enter") {
      joinRoom()
    }
  }

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      console.log("reciever payload")
      console.log(data)
      setMsg((prev) => [...prev, data])
    })
  }, [socket])

  return (
    <div className=' h-dvh'>
  
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl hidden lg:flex">{userName}</a>
        </div>
        <div className="navbar-end hidden lg:flex gap-2">
          <a onClick={() => {setLogin(null); setUserName(null)}} className="btn btn-primary">Logout</a>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 p-4">
        <p>Join Room here</p>
        <div className="join">
          <div>
            <div>
              <input ref={roomName} onKeyDown={handleRoomKey} className="input input-bordered join-item" placeholder="Search"/>
            </div>
          </div>
          <div>
            <button onClick={joinRoom} className="btn join-item">Search</button>
          </div>
        </div>
      </div>

      <div className=' flex justify-center mt-12'>
        <div className=" w-3/4 transition-colors ease-linear shadow-md">
          <div className="w-full h-14 rounded-t-lg bg-base-200 flex justify-between items-center space-x-1.5 px-4 ">
            <div className=' flex gap-2'>
              <span className="w-3 h-3 border-2 border-transparent dark:border-red-400 rounded-full bg-red-400 dark:bg-transparent"></span>
              <span className="w-3 h-3 border-2 border-transparent dark:border-yellow-400 rounded-full bg-yellow-400 dark:bg-transparent"></span>
              <span className="w-3 h-3 border-2 border-transparent dark:border-green-400 rounded-full bg-green-400 dark:bg-transparent"></span>
            </div>
            <div className=' flex gap-3 items-center'>
              <span id='roomName'></span>
              <div>
                {room && <button onClick={() => {setRoom(null); document.getElementById('roomName').innerHTML = ""}} className="btn btn-primary">Exit Room</button>}
              </div>
            </div>
          </div>

          <div style={{height: '60vh'}} className=" bg-base-100 border-2 border-solid w-full rounded-b-lg p-2 flex flex-col justify-between">
            {room ? <div className='flex flex-col justify-between h-full'>
              <div style={{height: '50vh'}}>
                <ScrollToBottom className='h-full overflow-y-scroll'>
                  {msg.map((data, index) => (
                    <PostMessages key={index} msgName={data.userName} message={data.message} userName={userName} />
                  ))} 
                </ScrollToBottom>            
              </div>

              <div className="join flex justify-center m-2">
                <div className='w-full'>
                  <div className='w-full'>
                    <input ref={message} onKeyDown={handleMsgKey} className="input input-bordered join-item w-full" placeholder="Message"/>
                  </div>
                </div>
                <div>
                  <button onClick={sendMessage} className="btn join-item">Send</button>
                </div>
              </div>

            </div> : <p className=' text-center'>No Room Joined</p>}
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default Dashboard
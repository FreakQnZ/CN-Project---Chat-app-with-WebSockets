import React from 'react'

export const PostMessages = ({msgName, message, userName}) => {
  return (
    <div>
      {msgName === userName ? 
      <div className="chat chat-end">
        <div className="chat-bubble">{message}</div>
      </div> : 
      
      <div className="chat chat-start">
        <div className="chat-bubble"><span className=' text-xs'>{msgName}</span> <br />{message}</div>
      </div>}
    </div>
  )
}
import React from 'react'

export default function Chat({ username, room, socket }) {
    const [message, setMessage] = React.useState("")
    const [messagesRecieved, setMessagesRecieved] = React.useState([])
  
    const sendMessage = () => {
      socket.emit("sendMessage", { message, room, username })  // emit some event so that another person can listen to it
      setMessagesRecieved(prev => [...prev, {username, message}])
      setMessage("")
    }
    // when event is emitted and socket changes, this will run
    React.useEffect(() => {
      // watch for the recieve message event being emitted, collect the emitted data and do something with it
      socket.on("recieveMessage", (data) => setMessagesRecieved(prev => [...prev, {username: data.username, message: data.message}]))
      return () => { socket.off('recieveMessage')}
    }, [socket])

    const messageEndRef = React.useRef(null)

    // function that will scroll the chat section to the bottom
    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(scrollToBottom, [messagesRecieved]) // when a new message is sent scroll to the bottom
  
    return (
      <div>
        <div className="chat">
          <div className="user-name">
            <h2>
              {username} <span style={{ fontSize: "0.7rem" }}>in {room}</span>
            </h2>
          </div>
          <div className="chat-message">
            {/* Create components for the messages (different appearance depedning on who sent them) */}
            {messagesRecieved.map((i) => {
              if (i.username !== username) {
                return (
                  <div className="message">
                    <p>{i.message}</p>
                    <span>{i.username}</span>
                  </div>
                );
              } else {
                return (
                  <div className="message mess-right">
                    <p>{i.message} </p>
                    <span>{i.username}</span>
                  </div>
                );
              }
            })}
            <div ref={messageEndRef} />
          </div>
          <div className="send">
            <input
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            ></input>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
}

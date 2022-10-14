import React from 'react'
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()

  const [username, setUsername] = React.useState("")
  const [room, setRoom] = React.useState("")

  function joinRoom(){
    // check if there are any inputs, if not then alert the user
    if (username && room){
      
      navigate(`/${room}`, { state: { room, username } })
    } 
      
  }

  return (
    <div className="form--container">
      <div className="input--form">
        <TextField
          label="Username"
          required
          value={username}
          className='input--field'
          onChange={e => setUsername(e.target.value)}
          inputProps={{ maxLength: 20 }}
        />
        <TextField
          label="Room"
          required
          value={room}
          error={false}
          className='input--field'
          onChange={e => setRoom(e.target.value)}
          inputProps={{ maxLength: 20 }}
        />
        <div>
          <Button variant="contained" color="error" onClick={joinRoom}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  )
}

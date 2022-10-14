import React from 'react'
import Chat from './Chat';
import { Grid } from '@mui/material'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client'
import Video from './Video';
import VideoQueue from './VideoQueue';
const socket = io.connect("https://youtubeviewer-server.herokuapp.com/")  // connect to the backend server

export default function Room() {
  // Using this method though, we must ensure user only gains access to Room through the join button and not through the url
  // Implement the on enter method within app for this route
  const {state} = useLocation();
  const { room, username } = state

  const [videoQueue, setVideoQueue] = React.useState([])
  const [currVideo, setCurrVideo] = React.useState("")

  React.useEffect(() => {
    if (room !== ""){
      socket.emit("joinRoom", room) // tell the socket that we want to join a room
    }
    return () => {socket.emit("leaveRoom", room)}
  }, [room])

  React.useEffect(() => {
    // watch for the recieve message event being emitted, collect the emitted data and do something with it
    //console.log("hello" + currVideo)
    // different case for whether currVideo is there or not
    socket.on("updateVideos", (data) => {
      
      if (!currVideo.length){
        //console.log(data.request)
        setCurrVideo(data.request)
      } else {
        if (!videoQueue.includes(data.request) && currVideo !== data.request){
          setVideoQueue(prev => [...prev, data.request])
        }
      }
    })
    return () => { socket.off('updateVideos')}
  }, [socket, currVideo, videoQueue])
  
  //console.log("Parameters Passed: " + room, username)
  return (
      <Grid container spacing={3} style={{width: '100%', height: '100%'}}>
        <Grid item xs={12 /* Takes full width on mobile devices */} md={3 /* Takes 3/12 spaces on medium devices */} style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
          <VideoQueue videoQueue={videoQueue} setVideoQueue={setVideoQueue} currVideo={currVideo} setCurrVideo={setCurrVideo} socket={socket} room={room}/>
        </Grid>
        <Grid item xs={12 /* Takes full width on mobile devices */} md={6 /* Takes 3/12 spaces on medium devices */} style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
          <Video videoQueue={videoQueue} setVideoQueue={setVideoQueue} currVideo={currVideo} setCurrVideo={setCurrVideo}/>
        </Grid>
        <Grid item xs={12 /* Takes full width on mobile devices */} md={3 /* Takes 6/12 spaces on medium devices */} style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
          <Chat username={username} room={room} socket={socket}/>
        </Grid>
      </Grid>
  )
}

/**
 * To Do:
 * Figure out how to get video on same time for everyone that is watching
 * Get video to start playing upon entry
 */

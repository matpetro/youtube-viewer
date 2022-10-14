import React from 'react'
import ReactPlayer from 'react-player/youtube'

export default function Video(props) {

  function videoEnded(){
    if (props.videoQueue.length){
      props.setCurrVideo(props.videoQueue[0])  // if theres anything in the queue make the first item the new curr video
      // remove the first thing in the queue
      let newQueue = [...props.videoQueue]
      props.setVideoQueue(newQueue.slice(1))
    } else {
      props.setCurrVideo("")
    }
  }
  return (
    <>
      {props.currVideo ? 
        <ReactPlayer 
          url={props.currVideo} 
          playing={true} 
          width="100%" 
          height="70%"
          onEnded={videoEnded}
        />
        : 
        <h1> Please add a video to the queue </h1>}
    </>
    
  )
}

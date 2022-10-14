import React from 'react'

export default function VideoQueue(props) {
  const [request, setRequest] = React.useState("")

  function requestVideo(){
    if (!props.currVideo){
      props.setCurrVideo(request)
    } else {
      if (!props.videoQueue.includes(request) && props.currVideo !== request){
        props.setVideoQueue(prev => [...prev, request])
      } else {
        alert("Video already queued!")
      }
    }
    props.socket.emit("addVideo", { room: props.room, request })
    setRequest("")
  }

  let queuedVideos = props.videoQueue.map((vid) => <div className='next--video'>{vid}</div>)
  return (
    <div className='video--queue'>
        <div className='current--video'> Current Video:
            <p>{props.currVideo}</p>
        </div>
        <div className='next--videos'>
            {queuedVideos}
        </div>
        <div className='request'>
            <input 
              className='request--input' 
              placeholder='Enter Youtube url'
              onChange={e => setRequest(e.target.value)}
              value={request}
            />
            <button className='request--button' onClick={requestVideo}>Request</button>
        </div>
    </div>
  )
}

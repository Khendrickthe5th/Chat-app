import { Phone, VideoCamera, MapPin, Smiley, Paperclip, PaperPlaneTilt } from "@phosphor-icons/react";
import React, { useEffect, useState, useRef } from "react";
import socketIO from 'socket.io-client'
import "./ChatCont.css";
const socket = socketIO.connect('http://localhost:3100');


function ChatCont(props) {
const chatCanvasRef = useRef()
const inputFieldVal = useRef()


const [messages, setMessages] = useState([])

//   useEffect(() => {
//     fetch("http://localhost:3100/getAllData", {
//       method: "GET",
//       mode: "cors",
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data));
//   });

  useEffect(()=>{
    socket.emit("join", props.username)
    socket.on("userList", (userList)=>{console.log(userList)})
    chatCanvasRef.current.scrollBy(0, chatCanvasRef.current.scrollHeight)
  })

  socket.on("message", (data)=>{
        setMessages([...messages, data])
    })

  const emitMessages = ()=>{
    try{
      socket.emit("message",
        {
          "message": inputFieldVal.current.value,
          "sender": props.username,
          "timeStamp": `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}PM`,
      })
        inputFieldVal.current.value = ""
        inputFieldVal.current.focus()
    }
    catch(error){
        console.log("Oppps :", error)
    }
  }



// ===========================================================================================
  return (
    <section className="chatCont">
      <div className="chatInfoPanel">
        <span>
          <div className="chatPartnerInfo">
            <div>{props.username}</div>
            <div>
              <div>
                <MapPin size={15} />
                Trans Ekulu, Enugu
              </div>
            </div>
          </div>
          <div className="chatPartnerActive">
            <span></span>
            <span>Active now</span>
          </div>
        </span>

        <span className="chatPanelIconsCont">
          <span className="chatPanelVideoIcon">
            <VideoCamera size={20} />
          </span>

          <span className="chatPanelPhoneIcon">
            <Phone size={20} />
          </span>
        </span>
      </div>

      <div className="chatCanvas" ref={chatCanvasRef}>

        {messages && messages.map((item, index)=>{
          return (<div key={index} className={item.sender !== props.username ? "chat-appreceiver" : "chat-appsender"}>
          <p className="mesageVal">{item.message}</p>
          <p className="messageTime">{item.timeStamp}</p>
        </div>)
        })}
      </div>

      <div className="chatActionsPanel">
        <div>
          <span>
            <Smiley size={25} />
          </span>{" "}
          <input ref={inputFieldVal} type="text" placeholder="Your message here..." />
        </div>
        <div>
          <span>
            <Paperclip size={25} />
          </span>
          <span onClick={emitMessages}>
            <PaperPlaneTilt size={25} fill={"#fff"} />
          </span>
        </div>
      </div>
    </section>
  );
}

export default ChatCont;

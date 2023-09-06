import { Phone, VideoCamera, MapPin, Smiley, Paperclip, PaperPlaneTilt } from "@phosphor-icons/react";
import React, { useEffect, useState, useRef } from "react";
import socketIO from 'socket.io-client'
import "./ChatCont.css";
const socket = socketIO.connect('http://localhost:3100');


function ChatCont(props) {
const [messages, setMessages] = useState([])
const inputFieldVal = useRef()

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
    socket.on("message", (data)=>{
        setMessages([...messages, data])
    })
    console.log(messages)
    socket.on("userList", (userList)=>{console.log(userList)})
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

      <div className="chatCanvas">
      <div>
        <p className="mesageVal">How are you doing, buddy?</p>
        <p className="messageTime">7:19PM</p>
      </div>
        {messages && messages.map((message)=>{
          return (<div>
          <p className="mesageVal">{message.message}</p>
          <p className="messageTime">{message.timeStamp}</p>
        </div>)
        })}

        {/* <div><p>Hello😂😂</p></div>
        <div><p>Hi😂😂</p></div>
        <div><p>How are you doing, buddy?</p></div>
        <div><p>Yo im good just tired man!</p></div>
        <div><p>Odd and even are keywords that can be used to match child elements whose index is odd or even (the index of the first child is 1</p></div>
        <div><p>If you're behind a reverse proxy such as apache or nginx please take a look at the documentation for it.If you're hosting your app in a folder that is not the root of your website e.g., https://example.com/chatappthen you also need to specify the path in both the server and the client.</p></div> */}
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

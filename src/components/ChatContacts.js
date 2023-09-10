import "./ChatContacts.css"
import { MagnifyingGlass } from "@phosphor-icons/react"
import React, { useState, useEffect, useRef } from "react"
import socketIO from "socket.io-client"
const socket = socketIO.connect("http://localhost:3100")


function ChatContacts(props){
    const [onlineUsers, setOnlineUsers] = useState()
    const allConvo = useRef()
    const chatHeadName = useRef()


    useEffect(()=>{
        socket.on("userListRen", (userList)=>{
        setOnlineUsers(userList)
    })
    },[ onlineUsers])

    const addClickEvent = (e)=>{
        socket.emit("join", {"roomId": e.target.innerText})
            props.setCurrentChatRecvr(e.target.innerText)
            console.log(props.username)
    }

    return(
        <section className="ChatContactsCont">
            <div className="searchBoxCont">
                    <span>
                    <MagnifyingGlass />
                    <input type="text" placeholder="Search"/>
                    </span>
                </div>

            <div className="chat" ref={allConvo}>
            {onlineUsers && Object.entries(onlineUsers).map((item, index)=>{
                return(
                    <div key={index} className="convoHeaderCont" onClick={addClickEvent}>
            <div className="convoHeader">
                <div className="dpImgCont">
                    <p></p>
                </div>
                <div className="lastConvoDetail">
                    <div className="usrnameAndTime">
                        <span ref={chatHeadName}>{item[0]}</span>
                        <span>4:54PM</span>
                    </div>
                    <div className="textPeek">
                        <p>So where are we hanging out next?, i really wanna meet you again</p>
                    </div>
                </div>
            </div>
            </div>
                )
            })}

            </div>
        </section>
    )
}

export default ChatContacts;
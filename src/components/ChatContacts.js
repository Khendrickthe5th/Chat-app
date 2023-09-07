import "./ChatContacts.css"
import { MagnifyingGlass } from "@phosphor-icons/react"
import React, { useState, useEffect, useRef } from "react"
import socketIO from "socket.io-client"
const socket = socketIO.connect("http://localhost:3100")


function ChatContacts(props){
    const [onlineUsers, setOnlineUsers] = useState()
    const allConvo = useRef()

    socket.on("userList", (userList)=>{setOnlineUsers(userList)})
    socket.emit("join", props.username + "fAbx6GFvxf6(")

    useEffect(()=>{
        console.log("Chat heads rendered!")
    for(const item of allConvo.current.children){
        item.addEventListener("click", (e)=>{
            socket.emit("join", props.username + "fAbx6GFvxf6(")
            console.log("join request event emitted!")
    })}
    })


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
                    <div key={index} className="convoHeaderCont">
            <div className="convoHeader">
                <div className="dpImgCont">
                    <p></p>
                </div>
                <div className="lastConvoDetail">
                    <div className="usrnameAndTime">
                        <span>{item[1]}</span>
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
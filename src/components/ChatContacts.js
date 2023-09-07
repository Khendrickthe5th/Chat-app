import "./ChatContacts.css"
import { MagnifyingGlass } from "@phosphor-icons/react"
import React, { useState } from "react"

function ChatContacts(){
const [chats, setChats] = useState(["Datiffy", "Erico", "Dubem"])


    return(
        <section className="ChatContactsCont">
            <div className="chat">
                <div className="searchBoxCont">
                    <span>
                    <MagnifyingGlass />
                    <input type="text" placeholder="Search"/>
                    </span>
                </div>
            
            <div className="convoHeader">
                <div className="dpImgCont">
                    <p></p>
                </div>
                <div className="lastConvoDetail">
                    <div className="usrnameAndTime">
                        <span>Dubem</span>
                        <span>4:54PM</span>
                    </div>
                    <div className="textPeek">
                        <div>So where are we hanging out next?, i really wanna meet you again</div>
                    </div>
                </div>
            </div>
            </div>

        </section>
    )
}

export default ChatContacts;
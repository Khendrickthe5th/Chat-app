import "./ChatContacts.css"
import { MagnifyingGlass } from "@phosphor-icons/react"

function ChatContacts(){

    return(
        <section className="ChatContactsCont">
            <div className="chat">
                <div className="searchBoxCont">
                    <span>
                    <MagnifyingGlass />
                    <input type="text" placeholder="Search"/>
                    </span>
                </div>
            
            </div>

        </section>
    )
}

export default ChatContacts;
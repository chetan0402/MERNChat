import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Chat(){
    const {roomid} = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const ws = new WebSocket(`ws://localhost:3000/chat`);
        ws.onopen = (event)=>{
            ws.send(JSON.stringify({roomid: roomid, name: localStorage.getItem("name")}));
        }
        ws.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            setMessages([...messages, message]);
        }
    });

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message,index)=>{
                    return <div key={index}>{message}</div>
                })}
            </div>
        </div>
    );
}

export default Chat;
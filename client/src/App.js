import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleRoomCodeChange(event) {
    setRoomCode(event.target.value);
  }

  function newChat(event) {
    event.preventDefault();
    fetch(`${backendUrl}/new`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    }).then((res)=>{res.json()}).then((data)=>{
      localStorage.setItem("name",name);
      window.location.href = `/chat/${data.roomid}`;
    }).catch((err)=>{alert("Error creating chat")});
  }

  function joinChat(event) {
    event.preventDefault();
    fetch(`${backendUrl}/join`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        roomid: roomCode
      })
    }).then((res)=>{res.json()}).then((data)=>{
      localStorage.setItem("name",name);
      window.location.href = `/chat/${data.roomid}`;
    }).catch((err)=>{alert("Error joining chat")});
  }

  return (
    <div>
      <div>
        <h1>New chat</h1>
        <form onSubmit={newChat}>
          <input type="text" placeholder="Enter your name" onInput={handleNameChange}/>
          <button type="submit">Join</button>
        </form>
      </div>
      <div>
        <h1>Join chatroom</h1>
        <form onSubmit={joinChat}>
          <input type="text" placeholder="Enter your name" onInput={handleNameChange}/>
          <input type="text" placeholder="Enter room code" onInput={handleRoomCodeChange}/>
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
}

export default App;

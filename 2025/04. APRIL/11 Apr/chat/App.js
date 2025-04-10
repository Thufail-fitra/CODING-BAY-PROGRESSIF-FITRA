import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", { message });
            setMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });
    }, []);

    return ( <
        div style = {
            { padding: 20 } } >
        <
        h2 > Realtime Chat < /h2> <
        div style = {
            { marginBottom: 10 } } > {
            chat.map((msg, index) => ( <
                div key = { index } > { msg.message } < /div>
            ))
        } <
        /div> <
        input value = { message }
        onChange = {
            (e) => setMessage(e.target.value) }
        onKeyDown = {
            (e) => e.key === "Enter" && sendMessage() }
        /> <
        button onClick = { sendMessage } > Send < /button> <
        /div>
    );
}

export default App;
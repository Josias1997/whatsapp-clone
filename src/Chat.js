import React, {useState, useEffect} from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <span className="chat__name">Josias</span>
                    Hey Guys
                    <span className="chat__timestamp">
                        3:25pm
                    </span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input type="text" value={input}placeholder="Type a message" onChange={e => setInput(e.target.value)} />
                    <button onClick={sendMessage} type="submit">Send Message</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat

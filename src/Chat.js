import React, {useState, useEffect} from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined, Sync } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            })

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {
                        messages.length !==0 ? <p>{new Date(messages[messages.length - 1].data.timestamp?.toDate()).toUTCString()}</p> : <Sync />
                    }
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
                {
                    messages.map(({id, data}) => 
                    <p className={`chat__message ${data.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{data.name}</span>
                        {data.message}
                        <span className="chat__timestamp">
                            {new Date(data.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                )
                }
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

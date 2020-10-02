import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import  { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';

import SidebarChat from './SidebarChat';
import { db } from './firebase';

import { useStateValue } from './StateProvider';

const Sidebar = () => {
    const [{user}, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id, 
                    data: doc.data()
                })
            ))
        })
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={`${user ? user.photoURL : ''}`} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat={true} />
                {rooms.map(({id, data})=> <SidebarChat key={id} name={data.name} id={id} />)}
            </div>
        </div>
    )
};

export default Sidebar;
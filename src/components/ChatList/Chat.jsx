import React, { useContext } from 'react'
import { ChatContext } from '../../context/Context'

export default function Chat({ styles, chat }) {
    const chatContext = useContext(ChatContext)

    const handleClick = () => chatContext.setActiveChat(chat)

    const formatDate = (dateString) => {
        if (!dateString) return null

        const date = new Date(dateString)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString().slice(-2)
        return `${hours}:${minutes}, ${day}.${month}.${year}`
    }

    return (
        <div 
            className={`${styles.chatList__body__chats__chat} ${chatContext?.activeChat?._id === chat._id ? styles.active : ''}`} 
            onClick={handleClick}
        >
            <div className={styles.chatList__body__chats__chat__avatar}>
                <img src={chat.avatar} alt="" />
            </div>
            <div className={styles.chatList__body__chats__chat__text}>
                <h4>{chat.name} {chat.surname}</h4>
                <p>{chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages yet.'}</p>
            </div>
            <div className={styles.chatList__body__chats__chat__date}>
                <p>{formatDate(chat.messages[chat.messages.length - 1]?.date)}</p>
            </div>
        </div>
    )
}

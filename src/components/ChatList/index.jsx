import React, { useContext, useEffect, useState } from 'react'
import styles from './сhatList.module.scss'
import Chat from './Chat'
import NewChatPopup from '../NewChatPopup'
import icons from '../icons'
import { ChatContext } from '../../context/Context'

export default function ChatList() {
    const chatContext = useContext(ChatContext)
    const [searchText, setSearchText] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (chatContext?.chatsData) setIsLoading(false)
    }, [chatContext])

    const handleInputChange = (e) => setSearchText(e.target.value)
    const onClose = () => setIsPopupOpen(false)

    const sortedChats = (chatContext?.chatsData || []).sort((a, b) => {
        const latestMessageDateA = a.messages && a.messages.length > 0
            ? new Date(Math.max(...a.messages.map(msg => new Date(msg.date))))
            : new Date(0)
        const latestMessageDateB = b.messages && b.messages.length > 0
            ? new Date(Math.max(...b.messages.map(msg => new Date(msg.date))))
            : new Date(0)

        return latestMessageDateB - latestMessageDateA
    })

    const filteredChats = sortedChats.filter(chat => {
        const name = chat.name ? chat.name.toLowerCase() : ''
        const surname = chat.surname ? chat.surname.toLowerCase() : ''
        const lastMessage = chat.lastMessage ? chat.lastMessage.toLowerCase() : ''
        const searchTerms = searchText.toLowerCase().split(' ').filter(term => term.trim() !== '')

        return searchTerms.every(term =>
            name.includes(term) ||
            surname.includes(term) ||
            lastMessage.includes(term)
        )
    })

    return (
        <div className={styles.chatList}>
            <div className={styles.chatList__header}>
                <div className={styles.chatList__header__panel}>
                    <img src={icons.user} alt="User icon" />
                    <span onClick={() => setIsPopupOpen(true)}>+</span>
                    <button><span>Log in</span></button>
                </div>
                <div className={styles.chatList__header__search}>
                    <img src={icons.search} alt="Search icon" />
                    <input
                        type="text"
                        placeholder='Search or start new chat'
                        value={searchText}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className={styles.chatList__body}>
                <h3>Chats</h3>
                <div className={styles.chatList__body__chats}>
                    {isLoading ?
                        <p className={styles.chatList__body__loading}>Loading...</p>
                        :
                        filteredChats.length === 0 ?
                            <p className={styles.chatList__body__noChats}>No chats</p>
                            :
                            filteredChats.map((chat) => (
                                <Chat key={chat._id} styles={styles} chat={chat} />
                            ))
                    }
                </div>
            </div>
            {isPopupOpen && <NewChatPopup onClose={onClose} />}
        </div>
    )
}

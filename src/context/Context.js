import React, { createContext, useEffect, useState } from 'react'
import { getChats } from '../api/chats'
import { getQuote } from '../api/messages'

export const ChatContext = createContext(null)

export default function Context({ children }) {
    const [chatsData, setChatsData] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [quote, setQuote] = useState('')

    const getChatsData = async () => getChats(setChatsData)

    const generateQuote = async () => getQuote(setQuote)

    useEffect(() => {
        generateQuote()
        getChatsData()
    }, [])

    useEffect(() => {
        if (activeChat) {
            getChatsData()
        }
    }, [activeChat])

    const value = {
        chatsData,
        setChatsData,
        activeChat,
        setActiveChat,
        quote,
        generateQuote
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

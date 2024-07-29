import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './сhatWindow.module.scss';
import { ChatContext } from '../../context/Context';
import icons from '../icons';
import { sendMessage } from '../../api/messages';
import { deleteChat } from '../../api/chats';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';

export default function ChatWindow() {
    const chatContext = useContext(ChatContext);
    const [messageText, setMessageText] = useState('');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const dropdownRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => dropdownRef.current && !dropdownRef.current.contains(event.target) && setOpenDropdown(false);

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatContext.activeChat?.messages]);

    const onClose = () => {
        if (isEditModalOpen) setIsEditModalOpen(false)
        if (isDeleteModalOpen) setIsDeleteModalOpen(false)
    }

    if (!chatContext || !chatContext.activeChat) {
        return (
            <div className={styles.chatWindow}>
                <div className={styles.chatWindow__placeholder}>
                    <p>Choose the chat to start to talk</p>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => setMessageText(e.target.value);

    const handleSendMessage = async () => await sendMessage(messageText, setMessageText, chatContext);

    const handleDeleteChat = async (chatId) => await deleteChat(chatContext, chatId)

    const handleKeyPress = (e) => e.key === 'Enter' && handleSendMessage();

    const sortedMessages = chatContext.activeChat.messages.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatWindow__header}>
                <div className={styles.chatWindow__header__user}>
                    <img src={chatContext.activeChat.avatar} alt="" />
                    <h3>{chatContext.activeChat.name} {chatContext.activeChat.surname}</h3>
                </div>
                <div className={styles.chatWindow__header__options} onClick={() => setOpenDropdown(true)}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    {openDropdown && (
                        <div className={styles.chatWindow__header__options__dropdown} ref={dropdownRef}>
                            <p onClick={() => setIsEditModalOpen(true)}>Edit</p>
                            <p onClick={() => setIsDeleteModalOpen(true)}>Delete</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.chatWindow__body}>
                {sortedMessages.map((message, index) => (
                    <div key={index} className={`
                        ${styles.chatWindow__body__message} 
                        ${message.sender === 'user' ? styles.chatWindow__body__userMessage : styles.chatWindow__body__otherMessage}
                    `}>
                        <div className={styles.chatWindow__body__message__user}>
                            {message.sender === 'other' && <img src={chatContext.activeChat.avatar} alt='' />}
                            <p>{message.text}</p>
                        </div>
                        <span>{new Date(message.date).toLocaleString()}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.chatWindow__footer}>
                <input
                    type="text"
                    placeholder='Type your message'
                    value={messageText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <img src={icons.send} alt="" onClick={handleSendMessage} />
            </div>
            {isEditModalOpen && <EditModal onClose={onClose} chatContext={chatContext} />}
            {isDeleteModalOpen && <DeleteModal onClose={onClose} handleDeleteChat={handleDeleteChat} chatContext={chatContext} />}
        </div>
    );
}

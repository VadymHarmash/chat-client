export const getChats = async (setChatsData) => {
    try {
        const response = await fetch('https://chat-server-f5en.onrender.com/chats', {
            method: "GET"
        })
        const data = await response.json()
        setChatsData(data)
    } catch (error) {
        console.error(error)
    }
}

export const addNewChat = async (validateChatFields, name, surname, chatData, onClose, setErrors) => {
    const validationErrors = validateChatFields(name, surname);
    if (Object.keys(validationErrors).length === 0) {
        try {
            await fetch("https://chat-server-f5en.onrender.com/chats", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chatData)
            })
                .then((response) => response.json())
                .then((result) => console.log(result))
                .then(() => {
                    onClose();
                    window.location.reload();
                });
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        setErrors(validationErrors);
    }
}

export const editChat = async (validateChatFields, chatContext, name, surname, onClose, setErrors) => {
    const validationErrors = validateChatFields(name, surname);
    if (Object.keys(validationErrors).length === 0) {
        console.log('Sending data:', {
            id: chatContext.activeChat._id,
            name,
            surname
        });

        try {
            const response = await fetch(`https://chat-server-f5en.onrender.com/chats/${chatContext.activeChat._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surname })
            });

            if (response.ok) {
                const updatedChat = await response.json();
                console.log('Chat updated:', updatedChat);
                onClose();
                window.location.reload();
            } else {
                console.error('Error updating chat:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating chat:', error);
        }
    } else {
        setErrors(validationErrors);
    }
};


export const deleteChat = async (chatContext, chatId) => {
    try {
        const response = await fetch(`https://chat-server-f5en.onrender.com/chats/${chatId}`, {
            method: 'DELETE',
        })
        const data = await response.json()

        data.message === 'Chat deleted successfully' ? 
            chatContext.setChatsData(prevChats => prevChats.filter(chat => chat._id !== chatId)) 
                : 
            console.error('Error deleting chat:', data.error)

        chatContext.setActiveChat(null)
    } catch (error) {
        console.error('Error deleting chat:', error)
    }
}

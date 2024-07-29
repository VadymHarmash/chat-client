export const sendMessage = async (messageText, setMessageText, chatContext) => {
    if (messageText && messageText.trim()) {
        const newMessage = {
            sender: 'user',
            text: messageText,
            date: new Date().toISOString(),
        }

        try {
            const response = await fetch(`http://localhost:5000/chats/${chatContext.activeChat._id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            })

            const updatedChat = await response.json()
            chatContext.setActiveChat(updatedChat)
            setMessageText('')

            setTimeout(() => {
                const quoteMessage = {
                    sender: 'other',
                    text: chatContext.quote.text,
                    date: new Date().toISOString(),
                }
                fetch(`http://localhost:5000/chats/${chatContext.activeChat._id}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(quoteMessage),
                }).then((response) => response.json())
                    .then((updatedChat) => {
                        chatContext.setActiveChat(updatedChat)
                        setMessageText(prev => prev)
                        chatContext.generateQuote()
                    })
            }, 3000)
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }
}

export const getQuote = async (setQuote) => {
    try {
        const response = await fetch("https://type.fit/api/quotes", {
            method: "GET"
        })
        const data = await response.json()

        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length)
            const randomQuote = data[randomIndex]
            setQuote(randomQuote)
        }
    } catch (error) {
        console.error(error)
    }
}
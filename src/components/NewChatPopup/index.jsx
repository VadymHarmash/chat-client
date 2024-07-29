import React, { useState } from 'react'
import styles from './popup.module.scss'
import { validateChatFields } from '../../utils/validation'
import { addNewChat } from '../../api/chats'

const avatarLinks = ['https://res.cloudinary.com/ddqqnpdos/image/upload/v1722182578/male_fptfb3.svg', 'https://res.cloudinary.com/ddqqnpdos/image/upload/v1722182577/female_u9dcuu.svg']

export default function NewChatPopup({ onClose }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [errors, setErrors] = useState({})
    const [avatarType, setAvatarType] = useState('male')

    const handleNameChange = (e) => setName(e.target.value)
    const handleSurnameChange = (e) => setSurname(e.target.value)
    const handleAvatarChange = (e) => setAvatarType(e.target.value)

    const chatData = {
        avatar: avatarType === 'male' ? avatarLinks[0] : avatarLinks[1],
        name: name,
        surname: surname,
        messages: []
    }

    const handleAddNewChat = async () => await addNewChat(validateChatFields, name, surname, chatData, onClose, setErrors)

    return (
        <div className={styles.popup}>
            <div className={styles.popup__wrapper}>
                <div className={styles.popup__content}>
                    <div className={styles.popup__header}>
                        <span className={styles.popup__header__close} onClick={onClose}>X</span>
                        <h2>Create new chat</h2>
                    </div>
                    <div className={styles.popup__body}>
                        <span>Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                        <span>Surname</span>
                        <input
                            type="text"
                            value={surname}
                            onChange={handleSurnameChange}
                        />
                        {errors.surname && <p className={styles.error}>{errors.surname}</p>}

                        <div className={styles.popup__body__avatarSelection}>
                            <span>Select sex</span>
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={avatarType === 'male'}
                                    onChange={handleAvatarChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={avatarType === 'female'}
                                    onChange={handleAvatarChange}
                                />
                                Female
                            </label>
                        </div>

                        <button className={styles.popup__body__btn} onClick={handleAddNewChat}>Add chat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

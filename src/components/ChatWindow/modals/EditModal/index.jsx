import React, { useState } from 'react';
import styles from '../modal.module.scss';
import { editChat } from '../../../../api/chats';
import { validateChatFields } from '../../../../utils/validation';

export default function EditModal({ onClose, chatContext }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errors, setErrors] = useState({});

    const handleEditChat = async () => await editChat(validateChatFields, chatContext, name, surname, onClose, setErrors);

    return (
        <div className={styles.modal}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <span className={styles.modal__header__close} onClick={onClose}>X</span>
                        <h2>Change name or surname</h2>
                    </div>
                    <div className={styles.modal__body}>
                        <p>Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                        <p>Surname</p>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        {errors.surname && <span className={styles.error}>{errors.surname}</span>}
                        <button className={styles.modal__body__btn} onClick={handleEditChat}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

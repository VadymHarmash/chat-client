import React from 'react'
import styles from '../modal.module.scss'

export default function DeleteModal({ onClose, handleDeleteChat, chatContext }) {
    const handleDelete = () => {
        handleDeleteChat(chatContext.activeChat._id)
        onClose()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <span className={styles.modal__header__close} onClick={onClose}>X</span>
                        <h2>Are you sure?</h2>
                    </div>
                    <div className={styles.modal__body}>
                        <button className={styles.modal__body__btn} onClick={handleDelete}>Delete chat</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const validateChatFields = (name, surname) => {
    const errors = {}

    if (!name.trim()) errors.name = 'Name is required'
    if (!surname.trim()) errors.surname = 'Surname is required'

    return errors
}

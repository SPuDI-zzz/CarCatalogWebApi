import * as yup from 'yup';
import {editUserFormSchema} from '../edit-user'

export const createUserFormShema = editUserFormSchema.shape({
    password: yup
        .string()
        .required('Пароль обязательное поле!')
        .min(8, 'Минимальная длина пароля 8 символов!')
        .max(255, 'Максимальная длина пароля 255 символов!')
        .matches(/[a-z]/, 'Пароль должен содержать символ нижнего регистра!')
        .matches(/[A-Z]/, 'Пароль должен содержать символ верхнего регистра!')
        .matches(/[0-9]/, 'Пароль должен содержать цифру!')
        .matches(/[!@#%&]/, 'Пароль должен содержать специальный символ!'),
});

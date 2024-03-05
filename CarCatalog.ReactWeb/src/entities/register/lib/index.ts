import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
    userName: yup
        .string()
        .required('Имя пользователя обязательное поле!')
        .min(4, 'Минимальная длина имени пользователя 4 символов!')
        .max(255, 'Максимальная длина имени пользователя 255 символов!'),
    password: yup
        .string()
        .required('Пароль обязательное поле!')
        .min(8, 'Минимальная длина пароля 8 символов!')
        .max(255, 'Максимальная длина пароля 255 символов!')
        .matches(/[a-z]/, 'Пароль должен содержать символ нижнего регистра!')
        .matches(/[A-Z]/, 'Пароль должен содержать символ верхнего регистра!')
        .matches(/[0-9]/, 'Пароль должен содержать цифру!')
        .matches(/[!@#%&]/, 'Пароль должен содержать специальный символ!'),
    confirmationPassword: yup
        .string()
        .required('Confirmation is required field')
        .oneOf(
            [yup.ref('password')],
            'Поле пароля подтверждения должно совпадать с полем пароля'
        ),
});
  
export type RegisterFormType = yup.InferType<typeof registerFormSchema>;

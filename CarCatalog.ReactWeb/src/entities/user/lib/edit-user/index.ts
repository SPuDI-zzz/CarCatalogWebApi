import * as yup from 'yup';

export const editUserFormSchema = yup.object().shape({
    login: yup
        .string()
        .required('Имя пользователя обязательное поле!')
        .min(4, 'Минимальная длина имени пользователя 4 символов!')
        .max(255, 'Максимальная длина имени пользователя 255 символов!'),
    roles: yup
        .array().of(
            yup.string()
            .required('Роль обязательное поле!')
        )
        .required('Роли обязательное поле!')
        .min(1, 'Роли обязательное поле!')
});

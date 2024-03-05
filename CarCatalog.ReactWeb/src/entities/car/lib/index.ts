import * as yup from 'yup';

export const carFormSchema = yup.object().shape({
    mark: yup
        .string()
        .required('Марка автомобиля обязательное поле!')
        .max(100, 'Максимальная длина марки автомобиля 100 символов!'),
    model: yup
        .string()
        .required('Модель автомобиля обязательное поле!')
        .max(100, 'Максимальная длина модели автомобиля 100 символов!'),
    color: yup
        .string()
        .required('Цвет автомобиля обязательное поле!')
        .max(100, 'Максимальная длина цвета автомобиля 100 символов!'),
    id: yup
        .number(),
    userId: yup
        .number(),
});

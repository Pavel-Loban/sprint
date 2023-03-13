import * as Yup from 'yup';

export const SchemaFormStep1 = Yup.object().shape({
    username: Yup.string().required('Поле не может быть пустым')
        .matches(
            (/^[a-z0-9]+$/i),
            'Поле не может быть пустым',)
            .matches((/[a-zA-Z]/), '')

            ,
    password: Yup.string()
        .required('Поле не может быть пустым')
        .min(8, 'Пароль должен быть более 8 символов')
        .max(16)
        .matches(
            /(?=.*[A-Z])\w+/,
            'Пароль должен содержать как минимум одну прописную',
        )
        .matches(/\d/, 'Пароль должен содержать как минимум одну цифру'),
});



export const SchemaStep2 = Yup.object().shape({
    firstName: Yup.string().required('Поле не может быть пустым')
        .matches(/^\S*$/, 'Не заполнено')
        .max(16),
    lastName: Yup.string()
        .required('Поле не может быть пустым')
        .matches(/^\S*$/, 'Не заполнено')
        .max(25),

});

export const SchemaLastStep = Yup.object().shape({
    phone: Yup.string().required('Поле не может быть пустым')
     .matches(/(?:\+375)\s?\(?29|25|33|44\)?\s?\d\d(?:\d[-\s]\d\d[-\s]\d\d|[-\s]\d\d[-\s]\d\d\d|\d{5})/, 'В формате +375 (xx) xxx-xx-xx')
     .matches(/^([^\\s*]+)/g,'poiuyt')
     .matches(/(.*\d.*){12}/, 'В формате +375 (xx) xxx-xx-xx')
     ,
     email: Yup.string().required('Поле не может быть пустым')
     .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Введите корректный e-mail'),
 });


 export const SchemaSignIn = Yup.object().shape({
    identifier: Yup.string().required('Поле не может быть пустым')
    ,
    password: Yup.string()
        .required('Поле не может быть пустым')

});
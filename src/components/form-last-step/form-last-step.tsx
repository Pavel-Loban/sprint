import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setEmail, setErrorReg,setPhone,setStep1, setStep2, setStep3 } from '../../store/form-slice';
import { FormButton } from '../form-button/form-button';
import { InputNameOrLastName } from '../inputs/input-name-or-last-name/input';
import { InputPhone } from '../inputs/input-phone/input-phone';

import styles from '../form/form.module.scss';



export const Schema = Yup.object().shape({
   phone: Yup.string().required('В формате +375 (xx) xxx-xx-xx')
    .matches(/(?:\+375)\s?\(?29|25|33|44\)?\s?\d\d(?:\d[-\s]\d\d[-\s]\d\d|[-\s]\d\d[-\s]\d\d\d|\d{5})/, 'В формате +375 (xx) xxx-xx-xx')
    .matches(/^([^\\s*]+)/g,'poiuyt')
    .matches(/(.*\d.*){12}/, 'В формате +375 (xx) xxx-xx-xx')
    ,
    email: Yup.string().email().required('Введите корректный E-mail')
    .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Введите корректный E-mail'),
});


export const FormLastStep: React.FC = () => {


    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { step1,  step3, password, userName, lastName, firstName, email, phone } = useAppSelector((state: RootState) => state.form);


    const saveToken = (token:string) => {
        localStorage.setItem('tokenData', token);
    }
    const baseUrl = 'https://strapi.cleverland.by/api/auth/local/register'

    // const b = async (paramEmail:string, paramPhone:string) => {
    //     dispatch(setEmail(paramEmail));
    //     dispatch(setPhone(paramPhone ));
    // }
    const getReg = async (paramEmail:string, paramPhone:string) => {
        // b(paramEmail,paramPhone)
        dispatch(setEmail(paramEmail));
        dispatch(setPhone(paramPhone ));

        const user = {
            'email': paramEmail,
            'username': userName,
            'password': password,
            'firstName': firstName,
            'lastName': lastName,
            'phone':paramPhone,
        }

        console.log(user)
        await axios
                .post(baseUrl, {
                    user
                }).then((data) => {
                    console.log(data)

                    // const tokenData = data.data.user.token;

                    // saveToken(tokenData);
                    // console.log(localStorage.getItem('tokenData'))
                    console.log(user)
                    dispatch(setStep3(false))
                    dispatch(setErrorReg('false'));
                }).catch((err) => {
                    console.log(err);
                    dispatch(setStep3(false))
                    dispatch(setErrorReg('true'));
                })
    }

    const getRegistration = (phone: string, email: string, getReg: () => void) =>  {
        dispatch(setPhone(phone ));
        dispatch(setEmail(email));
        getReg();
        // if(!param1 && !param2 && phone && email){
        //     console.log('uraStep3');
        //     dispatch(setStep3(false))
        //     dispatch(setPhone(phone ));
        //     dispatch(setEmail(email));
        //     dispatch(setErrorReg('false'))
        // }

        // else{
        //     console.log('neuraStep3');
        //     dispatch(setErrorReg('true'));
        // }

    }

    const getSignInPage = () => {
        push('/auth');
        dispatch(setStep1(true))
        dispatch(setStep2(false))
        dispatch(setStep3(false))
    }




    return (
        <section className={styles.auth_wrapper} >

            <Formik
                initialValues={{
                    phone: '',
                    email: '',
                }}
                validationSchema={Schema}
                onSubmit={(values) => getReg(values.email,values.phone)}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    dirty,
                    touched,
                    isValid,
                }) => {
                    const d = new Date();


                    return (
                        <form className={styles.auth_form}
                            onSubmit={handleSubmit}
                        >
                            <div className={styles.form_header}>
                                <h3 className={styles.auth_title}>Регистрация</h3>
                                <p className={styles.auth_sub_title}>3 из 3</p>
                            </div>


                            <InputPhone step1={step1} value={values.phone} touched={touched?.phone} error={errors.phone} handleBlur={handleBlur} handleChange={handleChange} label='Номер телефона' name='phone'
                            />



<InputNameOrLastName step1={step1} value={values.email} touched={touched?.email} error={errors.email} handleBlur={handleBlur} handleChange={handleChange} label='E-mail' name='email'
                            />


                            <footer className={styles.footer_form}>

                                    <FormButton buttonText='ЗАРЕГИСТРИРОВАТЬСЯ' typeSubmit={true}
                                    getNextStep={() =>  console.log('Step3')}
                                    // getNextStep={() =>  getRegistration(!!errors.phone, !!errors.email, values.phone, values.email, getReg)}
                                    />


                                <div className={styles.footer_link_signin}>
                                    <p className={styles.description_link}>
                                        Есть учётная запись?
                                    </p>
                                    <div className={styles.wrapper_link_to_signin}
                                    onClick={getSignInPage} role='presentation'
                                    >
                                        <p className={styles.link_to_signin}>Войти</p>
                                        <ArrowRight
                                            width={18} height={12} className={styles.icon_arrow} />
                                    </div>

                                </div>
                            </footer>

                        </form>

                    );
                }}
            </Formik>

        </section>

    )
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setAuthLoader,setEmail, setErrorReg,setIdFormStep1,setIdFormStep3, setPhone,setStep1, setStep2, setStep3} from '../../store/form-slice';
import { SchemaLastStep } from '../../validations-shema';
import { FormButton } from '../form-button/form-button';
import { InputNameOrLastName } from '../inputs/input-name-or-last-name/input';
import { InputPhone } from '../inputs/input-phone/input-phone';

import styles from '../form/form.module.scss';
import { TitleForm } from '../title-form/title-form';




export const FormLastStep: React.FC = () => {


    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { step1,  step3, password, userName, lastName, firstName, email, phone, idFormStep3 } = useAppSelector((state: RootState) => state.form);



    const baseUrl = 'https://strapi.cleverland.by/api/auth/local/register'


    const getReg = async (paramEmail:string, paramPhone:string) => {

        dispatch(setEmail(paramEmail));
        dispatch(setPhone(paramPhone ));
        dispatch(setAuthLoader(true));
        await axios
                .post(baseUrl, {
                    'email': paramEmail,
                    'username': userName,
                    'password': password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'phone':paramPhone,
                }).then((data) => {
                    dispatch(setStep3(false));
                    dispatch(setErrorReg('false'));
                    dispatch(setIdFormStep3(''));
                    dispatch(setIdFormStep1('register-form'))
                    dispatch(setAuthLoader(false));
                }).catch((err) => {
                    dispatch(setAuthLoader(false));
                    dispatch(setStep3(false));
                    if(err.response.status === 400) {
                        dispatch(setErrorReg('true'));
                    }
                    if(err.response?.status !== 400){
                        dispatch(setErrorReg('errorNot400'));
                    }

                })
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
                validationSchema={SchemaLastStep}
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
                            data-test-id={idFormStep3}
                        >
                            {/* <div className={styles.form_header}>
                                <h3 className={styles.auth_title}>Регистрация</h3>
                                <p className={styles.auth_sub_title}>3 из 3</p>
                            </div> */}
                            <TitleForm step='3' title='Регистрация'/>

                            <section className={styles.inputs_wrapper}>
                            <InputPhone step1={step1} value={values.phone} touched={touched?.phone} error={errors.phone} handleBlur={handleBlur} handleChange={handleChange} label='Номер телефона' name='phone'
                            />



<InputNameOrLastName step1={step1} value={values.email} touched={touched?.email} error={errors.email} handleBlur={handleBlur} handleChange={handleChange} label='E-mail' name='email' axiosEmailError=''
                            />
                            </section>

                            <footer className={styles.footer_form}>

                                    <FormButton buttonText='ЗАРЕГИСТРИРОВАТЬСЯ' typeSubmit={true} disabledButton={errors.phone || errors.email ? true : false }
                                    getNextStep={() => {}}

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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setPassword,setStep1, setStep2, setStep3, setUserName } from '../../store/form-slice';
import { FormButton } from '../form-button/form-button';
import { Input2span } from '../inputs/input-2span/input-2span';
import { Input3span } from '../inputs/input-3span/input-3span';

import styles from './form.module.scss'



export const Schema = Yup.object().shape({
    username: Yup.string().required('')
        .matches(
            (/^[a-z0-9]+$/i),
            '',
        ),
    password: Yup.string()
        .required('')
        .min(8, 'Пароль должен быть более 8 символов')
        .max(16)
        .matches(
            /(?=.*[A-Z])\w+/,
            'Пароль должен содержать как минимум одну прописную',
        )
        .matches(/\d/, 'Пароль должен содержать как минимум одну цифру'),
});


export const Form: React.FC = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { step1, step2, step3 } = useAppSelector((state: RootState) => state.form);
    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);
    const [step, setStep] = React.useState<string>('1');


    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }


    const getStep2 = (username: string, password: string) => {

        dispatch(setUserName(username));
        dispatch(setPassword(password))
        dispatch(setStep1(false));
        dispatch(setStep2(true))
    }

    const getSignInPage = () => {
        push('/auth')
    }



    return (
        <section className={styles.auth_wrapper} >





            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Schema}
                onSubmit={(values) => getStep2(values.username, values.password)}
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
                                <p className={styles.auth_sub_title}>{step} шаг из 3</p>
                            </div>

                            <section className={styles.inputs_wrapper}>

                            <Input2span step1={step1} value={values.username} touched={touched?.username} error={errors.username} handleBlur={handleBlur} handleChange={handleChange}
                            />


                            <Input3span step1={step1} value={values.password} touched={touched?.password} error={errors.password}
                            name='password' label='Пароль' handleBlur={handleBlur} handleChange={handleChange}
                                visiblePass={visiblePass} getVisibilityPassword={getVisibilityPassword} />
                            </section>





                            <footer className={styles.footer_form}>

                                <FormButton buttonText='СЛЕДУЮЩИЙ ' typeSubmit={true} disabledButton={false}
                                    getNextStep={() => { }}
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

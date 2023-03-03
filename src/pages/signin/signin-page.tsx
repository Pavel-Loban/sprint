import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { FormButton } from '../../components/form-button/form-button';
import { InputSignInName } from '../../components/inputs/input-signin-name/input-signin-name';
import { InputSignInPass } from '../../components/inputs/input-signin-pass/input-signin-pass';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';

import styles from './signin.module.scss';


export const Schema = Yup.object().shape({
    username: Yup.string().required('')
        // .matches(
        //     (/^[a-z0-9]+$/i),
        //     '',
        // )
        ,
    password: Yup.string()
        .required('Пароль должен быть более')
        // .min(8, 'Пароль должен быть более 8 символов')
        // .max(16)
        // .matches(
        //     /(?=.*[A-Z])\w+/,
        //     'Пароль должен содержать как минимум одну прописную',
        // )
        // .matches(/\d/, 'Пароль должен содержать как минимум одну цифру'),
});

export const SigninPage = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    // const { errorReg } = useAppSelector((state: RootState) => state.form);

    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);

    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }

    const [err, setErr] = React.useState<boolean>(false)

    const getSignIn = (param1: boolean, username:string, password:string) =>  {
        if(!param1){
            console.log('uraVhod')
            // dispatch(setUserName(username));
            // dispatch(setPassword(password))
            // dispatch(setStep1(false));
            // dispatch(setStep2(true))
            setErr(false);
        }else{
            console.log('neuraVhod');
            setErr(true);
        }
    }

    const getRegistrationPage = () => {
        push('/registration')
    }

    React.useEffect(() => {

    },[err])

    return (
        <div className={styles.auth_wrapper}>
            <h1 className={styles.wrapper_title}>Cleverland</h1>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Schema}
                onSubmit={values => console.log(values)}
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
                                <h3 className={styles.auth_title}>Вход в личный кабинет</h3>
                            </div>


                            <InputSignInName  value={values.username} touched={touched?.username} error={err} handleBlur={handleBlur} handleChange={handleChange}
                            />


<InputSignInPass  value={values.password} touched={touched?.password} error={err} handleBlur={handleBlur} handleChange={handleChange}
visiblePass={visiblePass} getVisibilityPassword={getVisibilityPassword}
                            />



                            <footer className={styles.footer_form}>

                                    <FormButton buttonText='ВХОД ' typeSubmit={true} getNextStep={() =>  getSignIn(err, values.username, values.password)} />


                                <div className={styles.footer_link_signin}>
                                    <p className={styles.description_link}>
                                        Нет учётной записи?
                                    </p>
                                    <div className={styles.wrapper_link_to_signin}
                                    onClick={getRegistrationPage} role='presentation' >
                                        <p className={styles.link_to_signin}>РЕГИСТРАЦИЯ</p>
                                        <ArrowRight
                                            width={18} height={12} className={styles.icon_arrow} />
                                    </div>

                                </div>
                            </footer>

                        </form>

                    );
                }}
            </Formik>

        </div>
    )
}

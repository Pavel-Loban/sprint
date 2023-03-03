import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { FormButton } from '../../components/form-button/form-button';
import { InputSignInName } from '../../components/inputs/input-signin-name/input-signin-name';
import { InputSignInPass } from '../../components/inputs/input-signin-pass/input-signin-pass';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setUser } from '../../store/user-slice';

import styles from './signin.module.scss';


export const Schema = Yup.object().shape({
    identifier: Yup.string().required('')

    ,
    password: Yup.string()
        .required('Пароль должен быть более')

});

export const SigninPage = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    // const {  } = useAppSelector((state: RootState) => state.user);

    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);

    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }

    const [err, setErr] = React.useState<boolean>(false)

    const baseUrl = 'https://strapi.cleverland.by/api/auth/local'

    const getAuth = async (param1: string, param2: string) => {


        await axios
            .post(baseUrl, {
                'identifier': param1,
                'password': param2,
            }).then((data) => {
                console.log(data)

                const tokenData = data.data.jwt;

                localStorage.setItem('tokenData', tokenData);

                // axios.interceptors.request.use(config => {

                //   config.headers.Authorization = `Bearer ${tokenData}`;
                //   return config;
                // });
                dispatch(setUser(data.data.user))
                // push('/');
            }).catch((err) => {
                console.log(err);
                if(err.response.status === 400){
                    setErr(true);
                }

                if(err){
                    console.log('другая ошибка')
                }


            })
    }


    const getRegistrationPage = () => {
        push('/registration')
    }

    React.useEffect(() => {

    }, [err])

    return (
        <div className={styles.auth_wrapper}>
            <h1 className={styles.wrapper_title}>Cleverland</h1>

            <Formik
                initialValues={{
                    identifier: '',
                    password: '',
                }}
                validationSchema={Schema}
                onSubmit={values => getAuth(values.identifier, values.password)}
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


                            <InputSignInName value={values.identifier} touched={touched?.identifier} error={err} handleBlur={handleBlur} handleChange={handleChange}
                            />


                            <InputSignInPass value={values.password} touched={touched?.password} error={err} handleBlur={handleBlur} handleChange={handleChange}
                                visiblePass={visiblePass} getVisibilityPassword={getVisibilityPassword}

                            />



                            <footer className={styles.footer_form}>

                                <FormButton buttonText='ВХОД ' typeSubmit={true}

                                    getNextStep={() => { }} />


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

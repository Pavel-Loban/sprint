
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { Flow } from '../../components/flow/flow';
import { FormButton } from '../../components/form-button/form-button';
import { InputSignInName } from '../../components/inputs/input-signin-name/input-signin-name';
import { InputSignInPass } from '../../components/inputs/input-signin-pass/input-signin-pass';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {instance} from '../../services'
import { RootState } from '../../store';
import { authorize,setAuthLoader,setErrFlow } from '../../store/form-slice';
import { setUser } from '../../store/user-slice';

import styles from './signin.module.scss';




export const Schema = Yup.object().shape({
    identifier: Yup.string().required('Поле не может быть пустым')
    // .matches(/^\S*$/, 'Поле не может быть пустым')
    ,
    password: Yup.string()
        .required('Поле не может быть пустым')

});

export const SigninPage = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    // const { errAuth, errFlow } = useAppSelector((state: RootState) => state.form);

    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);

    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }

    const [err, setErr] = React.useState<boolean>(false)
    const [errFlow, setErrFlow] = React.useState<boolean>(false)
    // console.log(errAuth,errFlow)
    const baseUrl = 'https://strapi.cleverland.by/api/auth/local'


    const token = localStorage.getItem('tokenData');



     const authorize = async (username: string, password: string, resetForm: () => void) => {
        try {
            dispatch(setAuthLoader(true))
          const { data } = await instance.post('/api/auth/local', {
            'identifier':username,
            'password':password
          });

          console.log(data)

          localStorage.setItem('tokenData', data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          const userLocalStorage= localStorage.getItem('user');
          const user = userLocalStorage ? JSON.parse(userLocalStorage) : null;

          console.log(user)
          dispatch(setUser(data.user))

          push('/books/all');
          dispatch(setAuthLoader(false))

        } catch (error) {
            const err = error as AxiosError

          console.log('ERROR', err);
          if(err.response?.status === 400){
            setErr(true);
            dispatch(setAuthLoader(false))
        }

        if(err.response?.status !== 400){
            console.log('другая ошибка')
            setErrFlow(true);
            resetForm()
            dispatch(setAuthLoader(false))
        }
        }
      };


    const getRegistrationPage = () => {
        if(!token){
            push('/registration')
        }

    }

    const getSignInForm = (res: () => void) => {
        setErrFlow(false);
        // dispatch(setErrFlow(false))
        res();
    }

    const getForgotPassPage = () => {
        if(!token){
            push('/forgot-pass')
        }
    }

    React.useEffect(() => {

    }, [err])

    return (
    token ? <Navigate to='/books/all'/>
     :  <div className={styles.auth_wrapper}>


            <Formik
                initialValues={{
                    identifier: '',
                    password: '',
                }}
                validationSchema={Schema}
                onSubmit={(values,{resetForm}) => {authorize(values.identifier, values.password, resetForm)}}
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
                    resetForm,
                }) => {
                    const d = new Date();


                    return (
                    errFlow
                    ?
                     <Flow title='Вход не выполнен' getPage={() =>  getSignInForm(resetForm)} buttonText='ПОВТОРИТЬ' flowText='Что-то пошло не так. Попробуйте еще раз' />
                    :
                    <section className={styles.auth_form}>
                     <div className={styles.form_header}>
                                <h3 className={styles.auth_title}>Вход в личный кабинет</h3>
                            </div>
                    <form className={styles.form}
                            onSubmit={handleSubmit}
                            data-test-id='auth-form'
                        >
                            {/* <div className={styles.form_header}>
                                <h3 className={styles.auth_title}>Вход в личный кабинет</h3>
                            </div> */}

                            <section className={styles.inputs_wrapper}>
                            <InputSignInName value={values.identifier} touched={touched?.identifier} error={errors.identifier} handleBlur={handleBlur} handleChange={handleChange}
                            />


                            <InputSignInPass value={values.password} touched={touched?.password} error={errors.password}
                            errAxios={err}
                             handleBlur={handleBlur} handleChange={handleChange}
                                visiblePass={visiblePass} getVisibilityPassword={getVisibilityPassword}
                                getForgotPassPage={getForgotPassPage}
                            />
                            </section>


                            <footer className={styles.footer_form}>

                                <FormButton buttonText='ВХОД ' typeSubmit={true} disabledButton={false}

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
                        </section>


                    );
                }}
            </Formik>


        </div>
    )
}

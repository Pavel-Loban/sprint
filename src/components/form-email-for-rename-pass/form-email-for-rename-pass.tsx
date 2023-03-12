import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setAuthLoader} from '../../store/form-slice';
import { Flow } from '../flow/flow';
import { FormButton } from '../form-button/form-button';
import { InputNameOrLastName } from '../inputs/input-name-or-last-name/input';

import styles from './form-email-for-rename-pass.module.scss';



export const Schema = Yup.object().shape({

     email: Yup.string().required('Поле не может быть пустым')
     .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Введите корректный e-mail'),
 });


 export const FormEmailForRenamePass: React.FC = () => {

    const push = useNavigate();
    const dispatch = useAppDispatch();
    const [postEmailOk, setPostEmailOk] = React.useState<boolean>(false);
    const [axiosEmailError, setAxiosEmailError] = React.useState<string>('')

     const baseUrl = 'https://strapi.cleverland.by/api/auth/forgot-password'

     const getForgot = async (paramEmail:string) => {

        dispatch(setAuthLoader(true));
         await axios
                 .post(baseUrl, {
                     'email': paramEmail,
                 }).then((data) => {
                    console.log(data)
                    setPostEmailOk(true);
                    dispatch(setAuthLoader(false));
                 }).catch((error) => {
                    const err = error as AxiosError

                    console.log(err)
                    setAxiosEmailError(err.message)
                    dispatch(setAuthLoader(false));
                 })
     }




    const token = localStorage.getItem('tokenDATA')
    const getRegistrationPage = () => {
        if(!token){
            push('/registration')
        }
    }

    const getAuthPage = () => {
        if(!token){
            push('/auth')
        }
    }

    React.useEffect(() => {

    },[axiosEmailError])

     return (
         <React.Fragment >

{!postEmailOk  &&   <Formik
                 initialValues={{
                     email: '',
                 }}
                 validationSchema={Schema}
                 onSubmit={(values) => getForgot(values.email)}
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


                     const token = localStorage.getItem('tokenData');

                     return token ? <Navigate to='/books/all'/> : (
                    <form className={styles.auth_form}
                             onSubmit={handleSubmit}
                             data-test-id='send-email-form'
                         >
                            <div className={styles.nav_to_registration}>
                            <ArrowRight
                                             width={18} height={12} className={styles.icon_arrow_nav}
                                             onClick={getAuthPage} />
                                <nav>Вход в личный кабинет</nav>
                            </div>
                             <div className={styles.form_header}>

                                 <h3 className={styles.auth_title}>Восстановление пароля</h3>
                             </div>


                             <section className={styles.inputs_wrapper}>
 <InputNameOrLastName step1={false} value={values.email} touched={touched?.email} error={errors.email} handleBlur={handleBlur} handleChange={handleChange} label='E-mail' name='email'
 axiosEmailError={axiosEmailError}
                             />
<span className={styles.input_email_span}>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
</section>

                             <footer className={styles.footer_form}>

                                     <FormButton buttonText='ВОССТАНОВИТЬ' typeSubmit={true} disabledButton={false}
                                     getNextStep={() => {}}

                                     />


                                 <div className={styles.footer_link_signin}>
                                     <p className={styles.description_link}>
                                         Нет учетной записи?
                                     </p>
                                     <div className={styles.wrapper_link_to_signin}
                                     onClick={getRegistrationPage} role='presentation'
                                     >
                                         <p className={styles.link_to_signin}
                                         >Регистрация</p>
                                         <ArrowRight
                                             width={18} height={12} className={styles.icon_arrow} />
                                     </div>

                                 </div>
                             </footer>

                         </form>

                     );
                 }}
             </Formik>
 }
            {postEmailOk && <Flow title='Письмо выслано' flowText='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля' buttonText=''  getPage={() => {}}/> }
         </React.Fragment>
    )
                }


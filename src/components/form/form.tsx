import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setIdFormStep1, setIdFormStep2,setPassword,setStep1, setStep2, setUserName } from '../../store/form-slice';
import { SchemaFormStep1 } from '../../validations-shema';
import { FormButton } from '../form-button/form-button';
import { Input2span } from '../inputs/input-2span/input-2span';
import { InputRenamePass } from '../inputs/input-rename-pass/input-rename-pass';

import styles from './form.module.scss';
import { TitleForm } from '../title-form/title-form';






export const Form: React.FC = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { step1, idFormStep1 } = useAppSelector((state: RootState) => state.form);
    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);
    const [step, setStep] = React.useState<string>('1');


    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }


    const getStep2 = (username: string, password: string) => {

        dispatch(setUserName(username));
        dispatch(setPassword(password));
        dispatch(setStep1(false));
        dispatch(setStep2(true));
        dispatch(setIdFormStep1(''));
        dispatch(setIdFormStep2('register-form'));
        setStep('2');
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
                validationSchema={SchemaFormStep1}
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
                }) => {
                    const d = new Date();




                    return (
                        <form className={styles.auth_form}
                            onSubmit={handleSubmit}
                            data-test-id={idFormStep1}
                        >
                            {/* <div className={styles.form_header}>
                                <h3 className={styles.auth_title}>Регистрация</h3>
                                <p className={styles.auth_sub_title}>{step} шаг из 3</p>
                            </div> */}
                            <TitleForm step='1 шаг из 3' title='Регистрация'/>

                            <section className={styles.inputs_wrapper}>

                            <Input2span step1={step1} value={values.username} touched={touched?.username} error={errors.username} handleBlur={handleBlur} handleChange={handleChange} dirty={dirty} name='username' label='Придумайте логин для входа'
                            />



<InputRenamePass step1={step1} value={values.password} touched={touched?.password} error={errors.password} handleBlur={handleBlur} dirty={dirty}
                              name='password' label='Пароль' handleChange={handleChange}
                                  visiblePass={visiblePass} getVisibilityPassword={getVisibilityPassword} />
                            </section>





                            <footer className={styles.footer_form}>

                                <FormButton buttonText='СЛЕДУЮЩИЙ ШАГ' typeSubmit={true} disabledButton={errors.password || errors.username ? true : false}
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

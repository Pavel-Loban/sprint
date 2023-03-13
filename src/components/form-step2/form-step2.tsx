import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { ReactComponent as ArrowRight } from '../../assets/image/arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setFirstName, setIdFormStep2, setIdFormStep3,setLastName, setStep1, setStep2, setStep3 } from '../../store/form-slice';
import { SchemaStep2 } from '../../validations-shema';
import { FormButton } from '../form-button/form-button';
import { InputNameOrLastName } from '../inputs/input-name-or-last-name/input';

import styles from '../form/form.module.scss';
import { TitleForm } from '../title-form/title-form';





export const FormStep2: React.FC = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { step1, step2, step3, idFormStep2 } = useAppSelector((state: RootState) => state.form);
    const [step, setStep] = React.useState<string>('1');







    const getStep3 = (lastName: string, firstName: string) => {

        dispatch(setLastName(lastName));
        dispatch(setFirstName(firstName));
        dispatch(setStep2(false));
        dispatch(setStep3(true));
        dispatch(setIdFormStep2(''))
        dispatch(setIdFormStep3('register-form'))
    }

    const getSignInPage = () => {
        push('/auth');
        dispatch(setStep1(true));
        dispatch(setStep2(false));
        dispatch(setStep3(false));

    }



    return (
        <section className={styles.auth_wrapper} >


            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                }}
                validationSchema={SchemaStep2}
                onSubmit={values => getStep3(values.firstName, values.lastName)}
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
                            data-test-id={idFormStep2}
                        >
                            {/* <div className={styles.form_header}>
                                <h3 className={styles.auth_title}>Регистрация</h3>
                                <p className={styles.auth_sub_title}>2 шаг из 3</p>
                            </div> */}

<TitleForm step='2 шаг из 3' title='Регистрация'/>




                            <section className={styles.inputs_wrapper}>
                                <InputNameOrLastName step1={step1} value={values.firstName} touched={touched?.firstName} error={errors.firstName} handleBlur={handleBlur} handleChange={handleChange} label='Имя' name='firstName' axiosEmailError=''
                                />



                                <InputNameOrLastName step1={step1} value={values.lastName} touched={touched?.lastName} error={errors.lastName} handleBlur={handleBlur} handleChange={handleChange} label='Фамилия' name='lastName'
                                axiosEmailError=''
                                />

                            </section>



                            <footer className={styles.footer_form}>


                                <FormButton buttonText='ПОСЛЕДНИЙ ШАГ' typeSubmit={true} disabledButton={values.firstName && values.lastName ? false : true}

                                    getNextStep={() => { }}

                                />

                                <div className={styles.footer_link_signin}>
                                    <p className={styles.description_link}>
                                        Есть учётная запись?
                                    </p>
                                    <div className={styles.wrapper_link_to_signin}
                                        onClick={getSignInPage} role='presentation'>
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

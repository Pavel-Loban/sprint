import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Flow } from '../../components/flow/flow';
import { Form } from '../../components/form/form';
import { FormLastStep } from '../../components/form-last-step/form-last-step';
import { FormStep2 } from '../../components/form-step2/form-step2';
// import { Form } from '../../components/form/form';
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {setStep1, setStep2, setStep3} from '../../store/form-slice';

import styles from './registration-page.module.scss';

export const RegistrationPage: React.FC = () => {


    const dispatch = useAppDispatch();
    const push = useNavigate();
    const [topValue, setTopValue] = React.useState<string>('');
    const [bottomValue, setBottomValue] = React.useState<string>('');
    const [visiblyPassword, setVisiblyPassword] = React.useState<boolean>(false);
    const { step1, step2, step3, errorReg } = useAppSelector((state: RootState) => state.form);

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = (data: any) => {

        console.log(JSON.stringify(data));
    }

    const getVisibilityPassword = () => {
        setVisiblyPassword(!visiblyPassword);
    }
    const getForm = () => {

       dispatch(setStep1(false));
       dispatch(setStep2(true))
    }

    const getSignInPage = () => {
        push('/auth')
    }

    const getRegistrationPage = () => {
        push('/registration')
    }

console.log(step2)


    React.useEffect(() => {

    },[step1, step2])

    return (
        <section className={styles.auth_wrapper} >

            <h1 className={styles.wrapper_title}>Cleverland</h1>

{step1 &&
    <Form/>
}


{step2 &&
    <FormStep2/>
}

{step3 &&
    <FormLastStep />
}


{errorReg === 'false' && <Flow title='РЕГИСТРАЦИЯ УСПЕШНА' getPage={getSignInPage} /> }
{errorReg === 'true' && <Flow title='ДАННЫЕ НЕ СОХРАНИЛИСЬ' getPage={getRegistrationPage} /> }


        {/* <Form labelTop='Придумайте логин для входа' labelBottom='Пароль' step='1' visibleForm={step1} getForm={getForm} visiblePassword={false}

        /> */}

        {/* <Form labelTop='Имя' labelBottom='Фамилия' step='2'  visibleForm={step2} getForm={() =>(console.log('tt'))} visiblePassword={false}/> */}
            {/* <form className={styles.auth_form} onSubmit={handleSubmit(onSubmit)} >
                <div className={styles.form_header}>
                    <h3 className={styles.auth_title}>Регистрация</h3>
                    <p className={styles.auth_sub_title}>1 шаг из 3</p>
                </div>

                <div className={styles.top_input_wrapper}>
                    <input className={styles.top_input}
                        id='form-text'
                        // value={topValue}
                        // onChange={(e) => setTopValue(e.target.value)}
                        {...register('login',
                    {
                        required: 'латинский алфавит',
                        minLength:{
                            value: 5,
                            message: 'латинский алфавит'
                        }
                    }
    )}
                    />
                    <label className={topValue ? styles.top_label_value : styles.top_label} htmlFor="form-text">Придумайте логин для входа</label>
                    <span className={styles.top_input_span}>Используйте для логина латинский алфавит и цифры</span>
                </div>


                <div className={styles.bottom_input_wrapper}>
                    <input type={visiblyPassword ? 'text' : 'password' } className={styles.bottom_input}
                        id='bottom-text'
                        // value={bottomValue}
                        // onChange={(e) => setBottomValue(e.target.value)}

                    />
                    <label className={bottomValue ? styles.bottom_label_value : styles.bottom_label} htmlFor="bottom-text">Пароль</label>
                    <span className={styles.bottom_input_span}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                    {visiblyPassword ? <EyeOpen className={styles.icon_eye} onClick={getVisibilityPassword} /> :
                    <EyeClosed className={styles.icon_eye} onClick={getVisibilityPassword}/> }

                </div>



                <footer className={styles.footer_form}>
                    <button type='submit' className={styles.form_button} >
                        СЛЕДУЮЩИЙ ШАГ
                    </button>
                    <div className={styles.footer_link_signin}>
                        <p className={styles.description_link}>
                        Есть учётная запись?
                        </p>
                    <div className={styles.wrapper_link_to_signin}>
                    <p className={styles.link_to_signin}>Войти</p>
                        <ArrowRight
            width={18} height={12} className={styles.icon_arrow}  />
                    </div>

                    </div>
                </footer>

            </form> */}
        </section>
    )
}

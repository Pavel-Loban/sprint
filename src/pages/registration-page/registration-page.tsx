import React from 'react';
import { Navigate,useNavigate  } from 'react-router-dom';

import { Flow } from '../../components/flow/flow';
import { Form } from '../../components/form/form';
import { FormLastStep } from '../../components/form-last-step/form-last-step';
import { FormStep2 } from '../../components/form-step2/form-step2';
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {setErrorReg,setStep1} from '../../store/form-slice';

import styles from './registration-page.module.scss';

export const RegistrationPage: React.FC = () => {


    const dispatch = useAppDispatch();
    const push = useNavigate();
    const { step1, step2, step3, errorReg } = useAppSelector((state: RootState) => state.form);


    const getSignInPage = () => {
        push('/auth')
    }

    const getRegistrationPage = () => {
       dispatch(setErrorReg(''));
       dispatch(setStep1(true));
    }





const token = localStorage.getItem('tokenData');

return token ? <Navigate to='/books/all'/> : (
        <section className={styles.auth_wrapper} >



{step1 &&
    <Form/>
}


{step2 &&
    <FormStep2/>
}

{step3 &&
    <FormLastStep />
}


{errorReg === 'false' && <Flow title='Регистрация успешна' getPage={getSignInPage} buttonText='ВХОД' flowText='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль' /> }
{errorReg === 'true' && <Flow title='ДАННЫЕ НЕ СОХРАНИЛИСЬ' getPage={getRegistrationPage} buttonText='НАЗАД К РЕГИСТРАЦИИ' flowText='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail' /> }

{errorReg === 'errorNot400' && <Flow title='ДАННЫЕ НЕ СОХРАНИЛИСЬ' getPage={getRegistrationPage} buttonText='ПОВТОРИТЬ' flowText='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз' /> }

        </section>
    )
}

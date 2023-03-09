import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import { Flow } from '../../components/flow/flow';
import { FormEmailForRenamePass } from '../../components/form-email-for-rename-pass/form-email-for-rename-pass';
import { FormRenamePass } from '../../components/form-rename-pass/form-rename-pass';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setServerResponse} from '../../store/form-slice';

import styles from './renamePass.module.scss';



 export const RenamePasswordPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const  location  = useLocation()
    const code = location.search.split('=')[1]

    const { serverResponse } = useAppSelector((state: RootState) => state.form);

    // console.log(code)

    const getSignInPage = () => {
        push('/auth');
    }

    const getPageRenamePassword = () => {
        dispatch(setServerResponse(''))
    }

     return (
         <React.Fragment >
{!code &&
<FormEmailForRenamePass/>
}

{code && serverResponse === '' &&  <FormRenamePass code={code} />}

{serverResponse === 'ok' && <Flow title='Новые данные сохранены' getPage={getSignInPage} buttonText='ВХОД' flowText='Зайдите в личный кабинет, используя свои логин и новый пароль'/>}

{serverResponse === 'error' && <Flow title='Данные не сохранились' getPage={getPageRenamePassword} buttonText='ПОВТОРИТЬ' flowText='Что-то пошло не так. Попробуйте ещё раз'/>}
         </React.Fragment>
    )
                }


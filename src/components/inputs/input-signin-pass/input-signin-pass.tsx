import React from 'react';

import { ReactComponent as EyeOpen } from '../../../assets/image/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../../assets/image/EyeClosed.svg';

import styles from './input-signin-pass.module.scss';

interface Props {
    value: string,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e: any) => void,
    handleChange: (e: any) => void,
    visiblePass: boolean,
    getVisibilityPassword: () => void,
    getForgotPassPage: () => void,
    errAxios:boolean,
}



export const InputSignInPass: React.FC<Props> = ({ value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword, getForgotPassPage, errAxios }) => (

    <div className={styles.bottom_input_wrapper}>
        <input type={visiblePass ? 'text' : 'password'} className={error ? styles.bottom_input_error : styles.bottom_input}
            id='bottom-text'
            name='password'
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.bottom_label_value : styles.bottom_label} htmlFor="bottom-text">Пароль</label>


        <span className={error ? styles.bottom_input_span_error : styles.bottom_input_span} >
            {error ? <span style={{paddingLeft:'12px', marginTop: '-20px'}} ><span data-test-id='hint'>{value === '' ? error : ''}</span>

            {/* {errAxios && <span style={{paddingLeft:'12px', marginTop: '-20px'}} ><span data-test-id='hint'>{value === '' ? error : ''}
            Неверный логин или пароль! */}


            <p style={{color: 'gray', marginLeft: '12px' }} onClick={getForgotPassPage} role='presentation'>Восстановить?</p></span>   : <span onClick={getForgotPassPage} role='presentation' data-test-id='hint'>Забыли логин или пароль?</span> }
        </span>
        <EyeOpen className={visiblePass ? styles.icon_eye : styles.hide} onClick={getVisibilityPassword}  data-test-id='eye-opened'/>
            <EyeClosed className={visiblePass ? styles.hide : styles.icon_eye} onClick={getVisibilityPassword} data-test-id='eye-closed' />

    </div>
)


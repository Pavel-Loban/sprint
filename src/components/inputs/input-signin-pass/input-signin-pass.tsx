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
    errAxios?:boolean,
}



export const InputSignInPass: React.FC<Props> = ({ value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword, getForgotPassPage, errAxios }) => (

    <div className={styles.bottom_input_wrapper}>
        <input type={visiblePass ? 'text' : 'password'} className={error ? styles.bottom_input_error : styles.bottom_input}
            id='password'
            name='password'
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.bottom_label_value : styles.bottom_label} htmlFor='password'>Пароль</label>


        <span className={error ? styles.bottom_input_span_error : styles.bottom_input_span} >
           {errAxios && <span style={{paddingLeft:'12px',color: 'rgb(244, 44, 79)'}} ><span data-test-id='hint'>{value === '' ? error : ''}
            Неверный логин или пароль!</span></span>}
            {/* {error ? <span style={{paddingLeft:'12px', marginTop: '-20px'}} ><span data-test-id='hint'>{value === '' ? error : ''}</span> */}

            {touched && error && <span className={styles.top_input_span_error} data-test-id='hint'>{error}</span>}


            <span style={{color: 'gray', marginLeft: '12px' }}  onClick={getForgotPassPage} role='presentation' data-test-id='hint'>{errAxios ? 'Восстановить?' : 'Забыли логин или пароль?'}</span>

            {/* </span>   : <span onClick={getForgotPassPage} role='presentation' data-test-id='hint'>Забыли логин или пароль?</span> } */}
        </span>

            {visiblePass && value && (
      <EyeOpen
        className={visiblePass && value !== '' ? styles.icon_eye : styles.hide}
        onClick={getVisibilityPassword}
        data-test-id='eye-opened'
      />
    )}
    {!visiblePass && value && (
      <EyeClosed
        className={visiblePass && value !== '' ? styles.hide : styles.icon_eye}
        onClick={getVisibilityPassword}
        data-test-id='eye-closed'
      />
    )}

    </div>
)


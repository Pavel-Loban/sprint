import React from 'react';

import { ReactComponent as EyeOpen } from '../../../assets/image/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../../assets/image/EyeClosed.svg';

import styles from './input-signin-pass.module.scss';

interface Props {
    value: string,
    touched: boolean | undefined,
    error: boolean,
    handleBlur: (e: any) => void,
    handleChange: (e: any) => void,
    visiblePass: boolean,
    getVisibilityPassword: () => void,

}

export const InputSignInPass: React.FC<Props> = ({ value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword }) => (

    <div className={styles.bottom_input_wrapper}>
        <input type={visiblePass ? 'text' : 'password'} className={styles.bottom_input}
            id='bottom-text'
            name='password'
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.bottom_label_value : styles.bottom_label} htmlFor="bottom-text">Пароль</label>


        <span className={error ? styles.bottom_input_span_error : styles.bottom_input_span}>
            {error ? <div style={{paddingLeft:'12px', marginTop: '-20px'}} ><p>Не верный пароль или логин</p>
            <p style={{color: 'gray' }} >Восстановить?</p></div>   : 'Забыли логин или пароль?' }
        </span>
        {visiblePass ? <EyeOpen className={styles.icon_eye} onClick={getVisibilityPassword} /> :
            <EyeClosed className={styles.icon_eye} onClick={getVisibilityPassword} />}

    </div>
)


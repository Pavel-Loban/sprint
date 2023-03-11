import React from 'react';

import { ReactComponent as ValidPasswordOk } from '../../../assets/image/CheckOk.svg';
import { ReactComponent as EyeOpen } from '../../../assets/image/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../../assets/image/EyeClosed.svg';
import { LabelInput } from '../../label-input/label-input';

import styles from './input-3span.module.scss';

interface Props {
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e: any) => void,
    handleChange: (e: any) => void,
    visiblePass: boolean,
    getVisibilityPassword: () => void,
    name: string,
    label: string,
}

export const Input3span: React.FC<Props> = ({ step1, value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword, name, label }) => (

    <div className={styles.bottom_input_wrapper}>
        <input type={visiblePass ? 'text' : 'password'} className={styles.bottom_input}
            id={name}
            name={name}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        {/* <LabelInput value={value} name={name} label={label} touched={touched}/> */}
        <label className={value ? styles.bottom_label_value : styles.bottom_label} htmlFor={name}>{label}</label>


        {name !== 'changepassword' && <span className={touched && error ? styles.bottom_input_span_error : styles.bottom_input_span}>Пароль
            {touched && value.length < 8 ? <span style={{ color: 'red' }}> не менее 8 символов</span> : ' не менее 8 символов'}
            , с
            {touched && !value.match(/(?=.*[A-Z])\w+/) ? <span style={{ color: 'red' }}> заглавной буквой </span> : ' заглавной буквой '}

            и
            {touched && !value.match(/\d/) ? <span style={{ color: 'red' }}> цифрой </span> : ' цифрой '}
        </span>}
        {name === 'changepassword' && <span className={error ? styles.bottom_input_span_error : styles.bottom_input_span}>{error}</span>}
        {name !== 'changepassword' && !error && value && <ValidPasswordOk className={styles.icon_check} data-test-id='checkmark' />}



        {visiblePass && value && (
            <EyeOpen
                className={ styles.icon_eye}
                onClick={getVisibilityPassword}
                data-test-id='eye-opened'
            />
        )}
        {!visiblePass && value && (
            <EyeClosed
                className={styles.icon_eye}
                onClick={getVisibilityPassword}
                data-test-id='eye-closed'
            />
        )}




    </div>
)


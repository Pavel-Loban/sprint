import React from 'react';

import styles from './input-signin-name.module.scss';

interface Props {
    value: string,
    touched: boolean | undefined,
    error: string  | undefined,
    handleBlur: (e:React.InputHTMLAttributes<HTMLInputElement>) => void,
    handleChange: (e:React.InputHTMLAttributes<HTMLInputElement>) => void,
}


export const InputSignInName:React.FC<Props> = ({value, touched, error, handleBlur, handleChange}) =>

   (

    <div className={styles.top_input_wrapper}>
        <input className={
            touched && error ?
            styles.top_input_error
        :
        styles.top_input
    }
            id='form-text'
            name="identifier"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.top_label_value : styles.top_label} htmlFor="form-text">Логин</label>


        {touched && error && <span className={styles.top_input_span_error} data-test-id='hint'>{error}</span>}
    </div>
)


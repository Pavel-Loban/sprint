import React from 'react';

import styles from './input-signin-name.module.scss';

interface Props {
    value: string,
    touched: boolean | undefined,
    error: boolean,
    handleBlur: (e:any) => void,
    handleChange: (e:any) => void,
}

export const InputSignInName:React.FC<Props> = ({value, touched, error, handleBlur, handleChange}) => (

    <div className={styles.top_input_wrapper}>
        <input className={
            touched && error ?
            styles.top_input_error
        :
        styles.top_input
    }
            id='form-text'
            name="username"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.top_label_value : styles.top_label} htmlFor="form-text">Логин</label>
        {/* <span className={touched && error ? styles.top_input_span_error : styles.top_input_span}> Используйте для логина
            {touched && !value?.match(/[a-zA-Z]/) ? <span style={{ color: 'red' }} > латинский алфавит</span> : ' латинский алфавит'} и  {touched && !value?.match(/[0-9]/) ? <span style={{ color: 'red' }} > цифры</span> : 'цифры'}
        </span> */}
    </div>
)


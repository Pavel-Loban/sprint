import React from 'react';

import styles from './input-span2.module.scss';

interface Props {
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e:any) => void,
    handleChange: (e:any) => void,
}

export const Input2span:React.FC<Props> = ({step1,value, touched, error, handleBlur, handleChange}) => (

    <div className={styles.top_input_wrapper}>
        <input className={styles.top_input}
            id='form-text'
            name="username"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.top_label_value : styles.top_label} htmlFor="form-text">Придумайте логин для входа</label>
        <span   className={touched && error ? styles.top_input_span_error : styles.top_input_span}> Используйте для логина
            {touched && !value?.match(/[a-zA-Z]/) ? <span style={{ color: 'red' }} data-test-id='hint'> латинский алфавит</span> : ' латинский алфавит'} и  {touched && !value?.match(/[0-9]/) ? <span style={{ color: 'red' }} data-test-id='hint'> цифры</span> : 'цифры'}
        </span>
    </div>
)


import React from 'react';

import styles from './input-span2.module.scss';

interface Props {
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e: any) => void,
    handleChange: (e: any) => void,
    dirty: boolean,
}

export const Input2span: React.FC<Props> = ({ step1, value, touched, error, handleBlur, handleChange, dirty}) => (

    <div className={styles.top_input_wrapper}>
        <input className={styles.top_input}
            id='username'
            name="username"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        {/* <label className={value ? styles.top_label_value : styles.top_label} htmlFor="username">Придумайте логин для входа</label> */}
        {/* {!value && touched && <span className={styles.top_input_span_error} data-test-id='hint'>{error}</span>} */}


        {/* { touched && !value &&   */}
        {(!value && dirty) || (touched && !value)
            ?
            <span className={styles.top_input_span_error} data-test-id='hint'>{error}</span>
            :
            <span className={styles.top_input_span} data-test-id='hint'> <span className={error ? styles.top_input_span_error : styles.top_input_span}>Используйте для логина</span>
                {/* {dirty && !value?.match(/[a-zA-Z]/) ? <span style={{ color: 'rgb(244, 44, 79)' }} data-test-id='hint'> латинский алфавит</span> : ' латинский алфавит'} */}


                <span className={dirty && !value?.match(/[a-zA-Z]/) ? styles.span_red : ''}data-test-id='hint'> латинский алфавит</span>

                <span className={error ? styles.span_red : ''}> и</span>

                {/* {dirty && !value?.match(/[0-9]/) ? <span style={{ color: 'rgb(244, 44, 79)' }} data-test-id='hint'> цифры</span> : 'цифры'} */}

                <span className={dirty && !value?.match(/[0-9]/) || (touched && !value?.match(/[a-zA-Z]/))  ? styles.span_red : styles.span_gray} data-test-id='hint'> цифры</span>


            </span>
        }
        {/* (touched  && value) ? styles.top_input_span_error : */}

    </div>
)


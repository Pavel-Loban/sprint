import React from 'react';

import styles from '../input-2span/input-span2.module.scss';

interface Props {
    label:string,
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e:any) => void,
    handleChange: (e:any) => void,
    name:string,
    axiosEmailError: string,
}

export const InputNameOrLastName:React.FC<Props> = ({step1,axiosEmailError,value, touched, error, handleBlur, handleChange, label, name}) => (

    <div className={styles.top_input_wrapper}>
        <input className={styles.top_input}
            id={name}
            name={name}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.top_label_value : styles.top_label} htmlFor={name}>{label}</label>
       {touched && error &&
       <span className={ styles.top_input_span_error}  data-test-id='hint'>
       {error}
   </span>}

   <span className={axiosEmailError ? styles.top_input_span_error : styles.hide }  data-test-id='hint'>
   error
</span>


    </div>
)


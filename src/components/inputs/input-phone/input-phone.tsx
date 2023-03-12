import React from 'react';
import MaskedInput from 'react-text-mask';

import styles from '../input-2span/input-span2.module.scss';

interface Props {
    label:string,
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name:string,
}



export const InputPhone:React.FC<Props> = ({step1,value, touched, error, handleBlur, handleChange, label, name}) => (



    <div className={styles.top_input_wrapper}>
        <MaskedInput className={styles.top_input}
        mask={['+','3','7','5', ' ','(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]}
        guide={true}
        placeholderChar='x'
        showMask={value  ? true : false}
            id={name}
            name={name}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.top_label_value : styles.top_label} htmlFor={name}>{label}</label>
       {touched && error &&
       <span className={ styles.top_input_span_error} data-test-id='hint'>
       {error}
   </span>}

   {!error && <span className={ styles.top_input_span_phone} data-test-id='hint'>
   В формате +375 (xx) xxx-xx-xx
   </span>}


    </div>
)



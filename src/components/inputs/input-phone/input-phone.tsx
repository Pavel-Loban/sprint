import React from 'react';
import MaskedInput from 'react-text-mask';

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
}

const mask = '+63(9XX) XXX-XX-XX';
const maskGenerator = {
  rules: new Map([['X', /\d/]]),
  generateMask: () => mask
};

export const InputPhone:React.FC<Props> = ({step1,value, touched, error, handleBlur, handleChange, label, name}) => {




const [values, setValues] = React.useState('');
const [focus,setFocus] = React.useState<boolean>(false)

    return(



    <div className={styles.top_input_wrapper}>
        <MaskedInput className={styles.top_input}
        mask={['+','3','7','5','(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]}
        guide={true}
        placeholderChar='*'
        showMask={value  ? true : false}
        // mask = {['+63(9XX) XXX-XX-XX']}
        // maskGenerator={maskGenerator}
            id={name}
            name={name}
            value={value}
            // onFocus={setFocus(true)}
            onBlur={handleBlur}
            onChange={handleChange}
        />
        <label className={value ? styles.top_label_value : styles.top_label} htmlFor={name}>{label}</label>
       {touched && error &&
       <span className={ styles.top_input_span_error} >
       {error}
   </span>

       }
    </div>
)
    }


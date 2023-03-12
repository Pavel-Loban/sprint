import React from 'react';

import styles from './input-span2.module.scss';

interface Props {
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    dirty: boolean,
    name: string,
    label: string,
}

export const Input2span: React.FC<Props> = ({ step1, value, touched, error, handleBlur, handleChange, dirty, name, label}) => {

    const [focus, setFocus] = React.useState<boolean>(false);

    const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        handleBlur(e);
    }
    const onFocusInput = () => {
        setFocus(true)
    }

    React.useEffect(() => {
    },[focus])

    return(

    <div className={styles.top_input_wrapper}>
        <input className={styles.top_input}
            id={name}
            name={name}
            value={value}
            onBlur={(e) => onBlurInput(e)}
            onChange={handleChange}
            onFocus={onFocusInput}
            placeholder={focus ? '' : 'Придумайте логин для входа'}
        />
        {focus && <label className={value ? styles.top_label_value : styles.top_label} htmlFor={name}>{label}</label>}




        {(!value && dirty && !focus ) || (touched && !value && !focus )
            ?
            <span className={styles.top_input_span_error} data-test-id='hint'>{error}</span>
            :
             <span className={touched && error && !focus  ? styles.top_input_span_error : styles.top_input_span} data-test-id='hint'> <span >Используйте для логина</span>



                <span className={error && dirty && !value?.match(/[a-zA-Z]/) ? styles.span_red : ''}data-test-id='hint'> латинский алфавит</span>

                <span > и</span>



                <span className={dirty && (!focus || focus) && !value?.match(/[0-9]/)   ? styles.span_red : styles.span_gray} data-test-id='hint'> цифры</span>


            </span>
        }


    </div>
)
    }

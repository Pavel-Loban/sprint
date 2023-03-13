import React from 'react';

import { VisiblePass } from '../../visible-pass/visible-pass';

import styles from '../input-rename-pass/input-rename.module.scss';

interface Props {
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    visiblePass: boolean,
    getVisibilityPassword: () => void,
    name: string,
    label: string,
    dirty: boolean,
}

export const InputRepeatPass: React.FC<Props> = ({ step1, value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword, name, label, dirty }) => {


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

    return (

    <div className={styles.bottom_input_wrapper}>
        <input type={visiblePass ? 'text' : 'password'} className={styles.bottom_input}
            id={name}
            name={name}
            value={value}
            onBlur={(e) => onBlurInput(e)}
            onChange={handleChange}
            onFocus={onFocusInput}
        />

        <label className={value ? styles.bottom_label_value : styles.bottom_label} htmlFor={name}>{label}</label>


        {
        (!value && touched && !focus ) || (touched && !value && focus)
        ?

            <span className={styles.bottom_input_span_error } data-test-id='hint'>{error}</span>

            :

            !focus && <span className={styles.bottom_input_span_error } data-test-id='hint'>{error}</span>
}

        <VisiblePass visiblePass={visiblePass} value={value} getVisibilityPassword={getVisibilityPassword} />




    </div>
)
    }

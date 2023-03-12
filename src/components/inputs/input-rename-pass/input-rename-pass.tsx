import React from 'react';

import { ReactComponent as ValidPasswordOk } from '../../../assets/image/CheckOk.svg';
import { VisiblePass } from '../../visible-pass/visible-pass';

import styles from '../input-3span/input-3span.module.scss';

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

export const InputRenamePass: React.FC<Props> = ({ step1, value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword, name, label, dirty }) => {


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


        {(!value && (dirty || touched) && !focus )

            ?
            <span className={error ? styles.bottom_input_span_error : styles.bottom_input_span} data-test-id='hint'>{error}</span>
            :
        <span className={touched && error && !focus  ? styles.bottom_input_span_error : styles.bottom_input_span} data-test-id='hint'>Пароль
            <span className={touched && value.length < 8  ? styles.span_red : styles.span_gray} data-test-id='hint' > не менее 8 символов</span>
            , с
            <span className={touched && !value.match(/(?=.*[A-Z])\w+/)  ? styles.span_red : styles.span_gray} data-test-id='hint' > заглавной буквой </span>

            и
            <span className={touched && !value.match(/\d/)  ?  styles.span_red : styles.span_gray} data-test-id='hint'> цифрой</span>
        </span>}




        {!error && value && <ValidPasswordOk className={styles.icon_check} data-test-id='checkmark' />}


        <VisiblePass visiblePass={visiblePass} value={value} getVisibilityPassword={getVisibilityPassword} />




    </div>
)
    }

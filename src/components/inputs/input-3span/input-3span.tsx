import React from 'react';

import { ReactComponent as EyeOpen } from '../../../assets/image/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../../assets/image/EyeClosed.svg';

import styles from './input-3span.module.scss';

interface Props {
    value: string,
    step1: boolean,
    touched: boolean | undefined,
    error: string | undefined,
    handleBlur: (e:any) => void,
    handleChange: (e:any) => void,
    visiblePass: boolean,
    getVisibilityPassword: () => void,
}

export const Input3span:React.FC<Props> = ({step1,value, touched, error, handleBlur, handleChange, visiblePass, getVisibilityPassword}) => (

    <div className={styles.bottom_input_wrapper }>
                                <input type={visiblePass ? 'text' : 'password'} className={styles.bottom_input}
                                    id='bottom-text'
                                    name='password'
                                    value={value}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <label className={value ? styles.bottom_label_value : styles.bottom_label} htmlFor="bottom-text">Пароль</label>


                                <span className={touched && error ? styles.bottom_input_span_error : styles.bottom_input_span}>Пароль
                                    {touched && value.length < 8 ? <span style={{ color: 'red' }}> не менее 8 символов</span> : ' не менее 8 символов'}
                                    , с
                                    {touched && !value.match(/(?=.*[A-Z])\w+/) ? <span style={{ color: 'red' }}> заглавной буквой </span> : ' заглавной буквой '}

                                    и
                                    {touched && !value.match(/\d/) ? <span style={{ color: 'red' }}> цифрой </span> : ' цифрой '}
                                </span>
                                {visiblePass ? <EyeOpen className={styles.icon_eye} onClick={getVisibilityPassword} /> :
                                    <EyeClosed className={styles.icon_eye} onClick={getVisibilityPassword} />}

                            </div>
)


import React from 'react';

// import styles from './label.module.scss';
import styles from '../inputs/input-3span/input-3span.module.scss';


interface Props {
    value: string,
    label: string,
    name: string,
    touched: boolean | undefined,
}

export const LabelInput:React.FC<Props> = ({value,label,name, touched}) =>  (
    <label className={value || touched ? styles.bottom_label_value : styles.bottom_label} htmlFor={name}>{label}</label>
  )


import React from 'react';

import styles from './title-form.module.scss';

interface Props{
    step?: string,
    title:string,
}

export const TitleForm:React.FC<Props> = ({step, title}) => (
    <div className={styles.form_header}>
        <h3 className={styles.auth_title}>{title}</h3>
        <p className={styles.auth_sub_title}>{step}</p>
    </div>
)


import React from 'react';

import { FormButton } from '../form-button/form-button';

import styles from './flow.module.scss';

interface Props{
    title: string,
    getPage: () => void,
}

export const Flow:React.FC<Props> = ({title, getPage}) => {


    const getSignIn = () => {

    }

    return (

    <div className={styles.auth_form}>
        <p className={styles.auth_title}>{title}</p>
        <FormButton buttonText='ВХОД' typeSubmit={false}  getNextStep={getPage} />
    </div>
  )
    }

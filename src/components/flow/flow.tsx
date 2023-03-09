import React from 'react';

import { FormButton } from '../form-button/form-button';

import styles from './flow.module.scss';

interface Props{
    title: string,
    getPage: () => void,
    buttonText:string,
    flowText:string
}

export const Flow:React.FC<Props> = ({title, getPage, buttonText, flowText}) => {


    const getSignIn = () => {

    }

    return (

    <div className={styles.auth_form}>
        <p className={styles.auth_title}>{title}</p>
        <p className={styles.sub_title}>{flowText}</p>
    {buttonText !== '' && <FormButton buttonText={buttonText} typeSubmit={false} disabledButton={false}  getNextStep={getPage} />}
    </div>
  )
    }

import React from 'react';

import styles from './form-button.module.scss';


interface Props {
    buttonText: string,
    typeSubmit: boolean,
    getNextStep: () => void,
}

export const FormButton: React.FC<Props> = ({buttonText,typeSubmit, getNextStep}) =>


    (


        <button type={typeSubmit ? 'submit' : 'button'} className={styles.form_button}
        onClick={getNextStep}
        >
            {buttonText}
        </button>
)

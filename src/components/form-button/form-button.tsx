import React from 'react';

import styles from './form-button.module.scss';


interface Props {
    buttonText: string,
    typeSubmit: boolean,
    getNextStep: () => void,
    disabledButton: boolean,
}

export const FormButton: React.FC<Props> = ({buttonText,typeSubmit, getNextStep, disabledButton}) => (
        <button type={typeSubmit ? 'submit' : 'button'} disabled={disabledButton} className={disabledButton ? styles.form_button_disabled : styles.form_button}
        onClick={getNextStep}
        >
            {buttonText}
        </button>
)

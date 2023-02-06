import React from 'react';
import styles from './button.module.scss';


interface Props {
    buttonText: string,
    free: boolean,
}

export const Button: React.FC<Props> = ({buttonText,free}) => (
    <button type='button'    className={!free ? styles.book_button_rezerv_list :  styles.book_button_free} >
        {buttonText}
    </button>
)


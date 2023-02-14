import React from 'react';
import styles from './button.module.scss';

interface Booking {
    customerFirstName: string,
    customerId: number,
    customerLastName:string,
    dateOrder: string,
    id: number,
    order: boolean,
}
interface Props {
    buttonText: string,
    delivery: boolean | null,
    booking: Booking | null,
    order: boolean | undefined,
}

export const Button: React.FC<Props> = ({buttonText,delivery, booking, order}) =>


    (


    <button type='button'    className={booking === null && delivery === null  ?  styles.book_button_free : (booking !== null && order  ?  styles.book_button_rezerv_list  :  styles.book_button_free )    } >
        {buttonText}
    </button>
)



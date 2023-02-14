import React from 'react';

import { ReactComponent as Error } from '../../assets/image/error.svg';
import { ReactComponent as CloseError } from '../../assets/image/icon-close-error.svg';
import {useAppDispatch,useAppSelector} from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {setCloseError } from '../../store/card-slice';

import styles from './styles.module.scss';

export const Message: React.FC = () => {

  const { view, isLoading, closeError } = useAppSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();

  const closeModalError = () => {
    dispatch(setCloseError(false))
}

  return(

  <div className={closeError ? styles.wrapper_error : styles.hide } data-test-id='error'>
    <div className={styles.block_error}>
      <div className={styles.message_error}>
        <Error width={32} height={32} className={styles.icon_error}/>
        <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
      </div>
    <CloseError width={24} height={24} className={styles.close_error}
    onClick={closeModalError} />
    </div>

  </div>
)
  };

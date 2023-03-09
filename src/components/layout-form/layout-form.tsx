import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import {ReactComponent as  Preloader} from '../../assets/image/preloader.svg';
import styles from './layout-form.module.scss';

export const LayoutForm:React.FC = () => (

    <React.Fragment>


    {/* <div className={styles.wrapper_preloader} data-test-id='loader'
> <Preloader className={styles.preloader} width={68.7} height={68.7} /></div> */}

    <section className={styles.layout_wrapper}>
        <h1 className={styles.wrapper_title}>Cleverland</h1>
        <Outlet/>
    </section>
    </React.Fragment>
  )


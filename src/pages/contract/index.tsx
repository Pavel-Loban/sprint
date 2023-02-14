import React from 'react';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Sample } from '../../components/sample';
import { Sections } from '../../components/sections';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';

import styles from './contract.module.scss';

export const Contract:React.FC  = () => {

    const { menuIsOpen} = useAppSelector((state: RootState) => state.burger);

return(

<section className={styles.contract_page}>
        <Header />
        <section className={styles.content}>

        <div
            onClick={e => e.stopPropagation() } role='presentation'
            className={ menuIsOpen ? styles.burger_menu_active :styles.burger_menu}>
            <Sections dataId1='burger-showcase' dataId2='burger-books' isDesktop={false}/>
            </div>
            <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' isDesktop={true}/>
            </div>

        <div className={styles.container}>
        <Sample title='Договор оферты'  />
        </div>

        </section>

        <Footer/>
    </section>
  )
}

import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

import Avatar from '../../assets/image/avatar.png';
import Logo from '../../assets/image/logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setMenuIsOpen } from '../../store/burger-slice';
import { ModalHelpAndLogout } from '../modal-help-and-logout/modal-help-and-logout';

import styles from './header.module.scss';




export const Header: React.FC = () => {

  const push = useNavigate();
  const boxBurgerRef = React.useRef<HTMLElement>(null);
  const box = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { menuIsOpen } = useAppSelector((state: RootState) => state.burger);
  const { user } = useAppSelector((state: RootState) => state.user);

  const getMenuBurger = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
    boxBurgerRef.current?.scrollTo(0, 0);
  };

  const getMenuBurgerSpan = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    dispatch(setMenuIsOpen(!menuIsOpen));
  };



  React.useEffect(() => {
    document.body.scrollIntoView()
    if (menuIsOpen) {

      document.body.classList.add('menu_burger_open');
    } else {
      document.body.classList.remove('menu_burger_open');
    }

    boxBurgerRef.current?.scrollTo(0, 0);
  }, [menuIsOpen]);

  const [modal, setModal] = React.useState<boolean>(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const avatarRef = React.useRef<HTMLImageElement>(null);


  React.useEffect(() => {
    const onClickOutsideBurger = (e: MouseEvent) => {
      const ee = e;

      if (ee.target !== boxBurgerRef.current && ee.target !== box.current) {
        dispatch(setMenuIsOpen(false));
      }


    }

    document.body.addEventListener('click', onClickOutsideBurger)

    return () => {
      document.body.removeEventListener('click', onClickOutsideBurger);
    };

  }, [dispatch])



  const getModal = () => {
    setModal(!modal);
  }

  const logout = () => {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('user');
    push('/auth');
    setModal(!modal);
}

React.useEffect(() => {

  const onClickOutsideModal = (e: MouseEvent) => {
    const ee = e;

    if (ee.target !== modalRef.current && ee.target !== avatarRef.current ) {
      setModal(false);
    }


  }

  document.body.addEventListener('click', onClickOutsideModal)

  return () => {
    document.body.removeEventListener('click', onClickOutsideModal);
  };
},[modal])


  return (

    <section className={styles.wrapper}>




      <Link to='/' className={styles.logo} >
        <img src={Logo} alt='Logo' className={styles.logo_img} />
        <span className={styles.logo_text}>Cleverland</span>
      </Link>

      <section className={styles.title_block}>

        <div data-test-id='button-burger' ref={box} className={menuIsOpen ? `${styles.icon_burger} ${styles.icon_burger_active}` : styles.icon_burger} onClick={getMenuBurger} role='presentation'><span onClick={(e) => getMenuBurgerSpan(e)} role='presentation' /></div>
        <h1 className={styles.title_text}>Библиотека</h1>
        <header className={styles.title_user}>
          <h3 className={styles.user_name}>Привет, {user?.username}!</h3>
          <img ref={avatarRef} src={Avatar} alt='avatar' className={styles.user_avatar} onClick={getModal} role='presentation' />

        {modal &&  <div ref={modalRef} className={styles.wrapper_modal_help_logout} >
            <ul>
              <li onClick={getModal} role='presentation'>Помощь</li>
              <li onClick={logout} role='presentation' >Выход</li>
            </ul>
          </div>}

        </header>
      </section>
    </section>
  )
};





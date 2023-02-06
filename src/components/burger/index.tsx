import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { links } from '../../data';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setMenuIsOpen, setCategoriesBooks} from '../../store/burger-slice';
import { ReactComponent as IconArrow } from '../../assets/image/icon-list-sections.svg';
import styles from './burger.module.scss';

interface Books {
    subSectionsBooks: string,
    count: number | null,
    active: boolean,
    subLink: string,
    testId:string | null,
    testIdBoorger:string,
}

interface Text {
    title: string,
    active: boolean,
    link: string,
    id: number,
    testId:string,
    testIdBoorger:string,
    sectionsBooks: Books[],
}



export const Burger: React.FC = () => {

    const box = React.useRef<HTMLUListElement>(null);
    const push = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const { menuIsOpen, categoriesBooks, linksBurger  } = useAppSelector((state: RootState) => state.burger);

    const getBook = (sublink: string) => {
        push(`/books/${sublink}`);
        dispatch(setMenuIsOpen(false));
        dispatch(setCategoriesBooks(!categoriesBooks));
    }

    const [text, setText] = React.useState<Text[]>(links)




    const getActiveTextLink = (id: number,link:string) => {
        const activeLink = text.map((item) =>
            item.id === id ? { ...item, active: true } : { ...item, active: false }
        )
        setText(activeLink);
        push(`${link}`);
        dispatch(setMenuIsOpen(false));
    }

    React.useEffect(() => {

    }, [])

    const [arrowUp,setArrowUp] = React.useState<boolean>(false)

    const getRotateIconArrow = () =>  {
        setArrowUp(!arrowUp);
        dispatch(setCategoriesBooks(!categoriesBooks));
    }



    return (
        <section className={styles.wrapper}>
           <IconArrow
           onClick={getRotateIconArrow}
           className={arrowUp ?  styles.image_arrow : (location.pathname.includes(`/books`) ? styles.image_arrow_rotate : styles.image_arrow_rotate_black) } width={35} height={24}   />
            <ul ref={box}>
                {text.map((item, i) => (
                    <li data-test-id={menuIsOpen ? item.testIdBoorger : item.testId} key={item.title} className={
                        location.pathname.includes(`${item.link}books`)
                            ||
                            location.pathname === item.link

                            ? styles.subTitle_active : styles.subTitle} >
                       {item.title !== 'Витрина книг' ? <p
                        onClick={() => getActiveTextLink(item.id, item.link)} role='presentation'>{item.title}
                        </p>
                        : <p
                        onClick={getRotateIconArrow}
                        role='presentation'>{item.title}
                        </p>}



                        <div className={styles.divFirst}>
                            {item.sectionsBooks.map((item) => !categoriesBooks && (
                                item.testId !== null ?
                                <p data-test-id={menuIsOpen ? item.testIdBoorger : item.testId} key={item.subSectionsBooks} className={location.pathname.includes(item.subLink) ? styles.sectionsBooksActive : styles.sectionsBooks} onClick={() => getBook(item.subLink)} role='presentation'>{item.subSectionsBooks} <span>{item.count}</span></p>
                                :
                                <p  key={item.subSectionsBooks} className={location.pathname.includes(item.subLink) ? styles.sectionsBooksActive : styles.sectionsBooks} onClick={() => getBook(item.subLink)} role='presentation'>{item.subSectionsBooks} <span>{item.count}</span></p>
                            ))}
                        </div>

                    </li>
                ))}
            </ul>
        </section>
    )
}














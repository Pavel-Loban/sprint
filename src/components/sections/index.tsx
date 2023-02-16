import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IconArrow } from '../../assets/image/icon-list-sections.svg';
import { links } from '../../data';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {fetchBooks, fetchCategories} from '../../store/books-slice';
import { setCategoriesBooks, setMenuIsOpen } from '../../store/burger-slice';

import styles from './sections.module.scss';

interface Books {
    subSectionsBooks: string,
    count: number | null,
    active: boolean,
    subLink: string,
    testId: string | null,
    testIdBoorger: string,
}

interface Text {
    title: string,
    active: boolean,
    link: string,
    id: number,
    testId: string,
    testIdBoorger: string,
    sectionsBooks: Books[],
}

interface Props {
    dataId1: string,
    dataId2: string,
    isDesktop?: boolean,
}

interface Categories {
    id: number,
    path: string,
    name: string,
}

export const Sections: React.FC<Props> = ({ dataId1, dataId2, isDesktop }) => {

    const box = React.useRef<HTMLUListElement>(null);
    const push = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const { categoriesBooksShowOrHide } = useAppSelector((state: RootState) => state.burger);
    const {books, status, booksCategories, statusCategories} = useAppSelector((state: RootState) => state.books);
    const getBook = (path: string) => {
        push(`/books/${path}`);

        dispatch(setMenuIsOpen(false));
        dispatch(setCategoriesBooks(!categoriesBooksShowOrHide));

    }

    const baseUrl = 'https://strapi.cleverland.by/api/books';

    const getAllBook = (path: string) => {
        const baseUrl = 'https://strapi.cleverland.by/api/books';

        push(`/books/${path}`);

        dispatch(setMenuIsOpen(false));
        dispatch(setCategoriesBooks(!categoriesBooksShowOrHide));

        dispatch(fetchBooks(baseUrl))


    }


    const [text, setText] = React.useState<Text[]>(links)




    const getActiveTextLink = (id: number, link: string) => {
        const activeLink = text.map((item) =>
            item.id === id ? { ...item, active: true } : { ...item, active: false }
        )

        setText(activeLink);
        push(`${link}`);
        dispatch(setMenuIsOpen(false));
        dispatch(setCategoriesBooks(true));
    }


    const [arrowUp, setArrowUp] = React.useState<boolean>(false)

    const getRotateIconArrow = () => {
        setArrowUp(!arrowUp);
        dispatch(setCategoriesBooks(!categoriesBooksShowOrHide));
    }


    const URLCategories = 'https://strapi.cleverland.by/api/categories';

    React.useEffect(() => {


        if(status === 'loading'){

            document.body.classList.add('preloader_true');
        }else{
            document.body.classList.remove('preloader_true');
        }

    },[status, statusCategories])


    React.useEffect(() => {

        dispatch(fetchCategories(URLCategories))
        dispatch(fetchBooks(baseUrl))
    }, [dispatch])




    return (
        <section
            className={styles.wrapper}
        >
            <IconArrow
                onClick={getRotateIconArrow}
                className={arrowUp ? styles.image_arrow : (location.pathname.includes('/books') ? styles.image_arrow_rotate : styles.image_arrow_rotate_black)} width={35} height={24} />

            <ul ref={box}>

                {text.map((item) => (
                    <li

                        key={item.title} className={
                            location.pathname.includes(`${item.link}books`)
                                ||
                                location.pathname === item.link

                                ? styles.subTitle_active : styles.subTitle} >
                        {item.title !== 'Витрина книг' ? <p
                            data-test-id={!isDesktop ? item.testIdBoorger : item.testId}
                            onClick={() => getActiveTextLink(item.id, item.link)} role='presentation'>{item.title}
                        </p>
                            :
                            <p
                                data-test-id={dataId1}
                                onClick={getRotateIconArrow}
                                role='presentation'
                            >{item.title}
                            </p>}


                        {item.title === 'Витрина книг' ?
                        <div className={status === 'success' ?  styles.divFirst : styles.hide }>
                        <p data-test-id={dataId2}
                                         className={location.pathname.includes('all') ? styles.sectionsBooksActive : styles.sectionsBooks} onClick={() => getAllBook('all')} role='presentation'
                                        style={{ display: categoriesBooksShowOrHide ? 'none' : 'block' }}
                                    >Все книги </p>

                                {booksCategories.map((item) => (

                                    <p key={item.path} className={location.pathname.includes(item.path) ? styles.sectionsBooksActive : styles.sectionsBooks} onClick={() => getBook(item.path)} role='presentation'
                                        style={{ display: categoriesBooksShowOrHide ? 'none' : 'block' }}
                                    >{item.name}
                                    <span>{books.filter((book)  => book.categories[0] === item.name).length }</span>
                                    </p>
                            ))}

                        </div>
                        :
                        ''
                    }


                    </li>



                ))}
            </ul>
        </section>
    )
}


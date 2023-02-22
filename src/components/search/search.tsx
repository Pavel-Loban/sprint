
import React from 'react';
import cnBind from 'classnames/bind';

import { ReactComponent as CloseSearch } from '../../assets/image/close-search.svg';
import { ReactComponent as List } from '../../assets/image/list2.svg';
import IconSearch from '../../assets/image/search.svg';
// import IconSelect from '../../assets/image/select.svg';
import { ReactComponent as IconSelectDown} from '../../assets/image/select.svg';
import { ReactComponent as IconSelectUp} from '../../assets/image/selectUp.svg';
import { ReactComponent as Tile } from '../../assets/image/tile2.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { Book,setBooks } from '../../store/books-slice';
import { setView,setViewList } from '../../store/card-slice';
import {setSearch, setIsDescSort } from '../../store/filter-books-slice';
import { setSort } from '../../store/sort-slice';

import styles from './search.module.scss';

interface Lists{
    name:string,
}

const cx = cnBind.bind(styles);



export const Search:React.FC = () => {

    const sortRef = React.useRef<HTMLImageElement>(null);
    const sortRefPopup = React.useRef<HTMLSpanElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const inputBlockRef = React.useRef<HTMLElement>(null);
    const inputIconRef = React.useRef<HTMLImageElement>(null);
    const dispatch = useAppDispatch();
    const { view } = useAppSelector((state: RootState) => state.card);
    const { status,books} = useAppSelector((state: RootState) => state.books);
    const { sort } = useAppSelector((state: RootState) => state.sort);

    const { search,isDescSort } = useAppSelector((state: RootState) => state.filter);


    const getView = () => {
        dispatch(setView(true));
    }
    const getViewList = () => {
        dispatch(setViewList(false));
    }

    React.useEffect(() => {

    },[view])


    const [isVisibleInput,setIsVisibleInput] = React.useState(false);


    const getSortBooks = () => {
        dispatch(setIsDescSort(!isDescSort));
    }



    const hideAndShowInputSearch = () => {
        setIsVisibleInput(true)
    }

    const closeInputSearch = () => {
        setIsVisibleInput(false);
    }



    React.useEffect(() => {
        if(isVisibleInput){
            inputRef.current?.focus()
        }
    },[isVisibleInput])



return(
    <section className={ status === 'success' ? styles.main_search : styles.hide}>
        <section
        className={cx('search', {search_active : isVisibleInput})}
        >
           {isVisibleInput && <div data-test-id='button-search-close'
 className={styles.close_search} onClick={closeInputSearch} role='presentation' >
            <CloseSearch />
            </div>}
            <section data-test-id='button-search-open' ref={inputBlockRef} className={isVisibleInput ? styles.hide :  styles.section_icon_search}
            onClick={hideAndShowInputSearch} role='presentation'>
                <img ref={inputIconRef} src={IconSearch} alt='search' className={styles.icon_search} onClick={hideAndShowInputSearch} role='presentation'/>
            </section>





            <input data-test-id='input-search' ref={inputRef} className={ isVisibleInput ? styles.input_visible : styles.input}
                name='text'
                type='text'
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                placeholder='Поиск книги или автора'
            />





{!isVisibleInput && <section  className={styles.section_icon_select}
data-test-id='sort-rating-button'
onClick={getSortBooks} role='presentation'>

                {isDescSort
                ?
                <React.Fragment>
                <IconSelectUp className={styles.icon_select}
                onClick={getSortBooks} role='presentation'/>
                <span ref = {sortRefPopup}
                onClick={getSortBooks} role='presentation'
                >{sort.name}</span>
                </React.Fragment>

                :
                <React.Fragment>
                <IconSelectDown className={styles.icon_select}
                onClick={getSortBooks} role='presentation'/>
                <span ref = {sortRefPopup}
                onClick={getSortBooks} role='presentation'
                >{sort.name}</span>
                </React.Fragment>

            }


            </section>
}
        </section>
        {!isVisibleInput && <section className={styles.icon}>
            <div data-test-id='button-menu-view-window'  className={ view ? styles.button_tile_active : styles.button_tile } onClick={getView} role='presentation'
            >
            <Tile
            width={19} height={19} className={styles.image_tile}     fill={view ? 'white' : '#A7A7A7' } />
            </div>
            <div data-test-id='button-menu-view-list'  className={ view ? styles.button_tile : styles.button_tile_active}
            onClick={getViewList} role='presentation'>
            <List
            className={styles.image_list} width={19} height={19}   fill={!view ? 'white' : '#A7A7A7'  } />
            </div>

        </section>
}

    </section>
)};


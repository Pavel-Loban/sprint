import React from 'react';
import cn from 'classnames';
import cnBind from 'classnames/bind';
import IconSearch from '../../assets/image/search.svg';
import IconSelect from '../../assets/image/select.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import { setView,setViewList } from '../../store/card-slice';
import { setSort } from '../../store/sort-slice';
import { ReactComponent as Tile } from '../../assets/image/tile2.svg';
import { ReactComponent as List } from '../../assets/image/list2.svg';
import { ReactComponent as CloseSearch } from '../../assets/image/close-search.svg';

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
    const { sort } = useAppSelector((state: RootState) => state.sort);


    const getView = () => {
        dispatch(setView(true));
    }
    const getViewList = () => {
        dispatch(setViewList(false));
    }
    React.useEffect(() => {

    },[view])


    const [isVisiblePopup,setIsVisiblePopup] = React.useState(false);
    const [isVisibleInput,setIsVisibleInput] = React.useState(false);
    const list = [
        {name:'По рейтингу' },
        {name:'По популярности '},
        ];

    const getPopupVisible = () => {
        setIsVisiblePopup(true);
    }

    const getPopupHide = (key:string,list:Lists) => {
        setIsVisiblePopup(false);

        if(key===list.name){
            dispatch(setSort(list.name));
        }
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


    React.useEffect(() => {
        const onClickOutsideSort = (e: MouseEvent) => {
        const ee = e;
            if(ee.target !== sortRef.current &&  ee.target !== sortRefPopup.current){
                setIsVisiblePopup(false);
            }
        }

        document.body.addEventListener('click',onClickOutsideSort)
        return () => {
          document.body.removeEventListener('click',onClickOutsideSort);
        };
      },[])


return(
    <section className={styles.main_search}>
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
                placeholder='Поиск книги или автора'
            />

{!isVisibleInput && <section  className={styles.section_icon_select} >
                <img ref = {sortRef} src={IconSelect} alt='select' className={styles.icon_select}
                onClick={getPopupVisible} role='presentation'
                />
                <span ref = {sortRefPopup}
                onClick={getPopupVisible} role='presentation'
                >{sort.name}</span>
                { isVisiblePopup && (
            <div className={styles.sort__popup}>
         <ul >
          {list.map((obj)=> <li  key={obj.name}
            onClick={() => getPopupHide(obj.name, obj)} role='presentation'
          >
            {obj.name}
            </li>)}
         </ul>
       </div>
)}
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


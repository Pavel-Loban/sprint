import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import { ReactComponent as Facebook } from '../../assets/image/footer/facebook.svg';
import { ReactComponent as Insta } from '../../assets/image/footer/insta.svg';
import { ReactComponent as Vk } from '../../assets/image/footer/vk.svg';
import { ReactComponent as Linkedin } from '../../assets/image/footer/in.svg';


export const Footer: React.FC = () => (

    <section className={styles.wrapper}>
        <p className={styles.content} >&copy; 2020-2023 Cleverland. Все права защищены.
        </p>
        <section className={styles.links}>
            <Link to='#' className={styles.heart}><Facebook width={24} height={24}   /></Link>
            <Link to='#' className={styles.heart}><Insta width={24} height={24}   /></Link>
            <Link to='#' className={styles.heart}><Vk width={24} height={24}   /></Link>
            <Link to='#' className={styles.heart}><Linkedin width={24} height={24}   /></Link>
        </section>
    </section>
);

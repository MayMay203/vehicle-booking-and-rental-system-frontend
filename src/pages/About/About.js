import styles from './About.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function About() {
    return (<div className={cx('wrapper')}>
        About Page
    </div>);
}

export default About;
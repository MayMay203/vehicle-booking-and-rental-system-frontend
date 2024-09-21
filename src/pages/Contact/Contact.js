import styles from './Contact.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function Contact() {
    return (<div className={cx('wrapper')}>
        Contact Page
    </div>);
}

export default Contact;
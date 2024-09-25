import PropTypes from 'prop-types';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function Form({ children, onSubmit, className}) {
  return (
    <form onSubmit={onSubmit} className={cx('form',{[className]:className})}>
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  method: PropTypes.string,
}

export default Form;
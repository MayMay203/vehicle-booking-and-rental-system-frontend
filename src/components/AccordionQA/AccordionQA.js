import classNames from 'classnames/bind' 
import styles from './AccordionQA.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons' 
import { Button } from 'react-bootstrap'

const cx = classNames.bind(styles)

function AccordionQA({ question,answer, active, toggleAccordion }) {
  return (
    <div className={cx('wrapper')}>
      <Button className={cx('question', { active })} variant="none" onClick={toggleAccordion}>
        <p className="p-1">{question}</p>
        <FontAwesomeIcon className={cx('nav-button', { rotate: active })} icon={faCaretRight} />
      </Button>
      {active && <p className={cx('accordion-body')}>{answer}</p>}
    </div>
  )
}

export default AccordionQA

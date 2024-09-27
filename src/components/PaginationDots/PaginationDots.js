import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './PaginationDots.module.scss'

const cx = classNames.bind(styles)

function PaginationDots({ totalPages, currentPage, onPageChange }) {
  return (
    <div className={cx('pagination-dots')}>
      {Array(totalPages)
        .fill()
        .map((_, index) => (
          <button
            key={index}
            className={cx('dot', { active: index === currentPage })}
            onClick={() => onPageChange(index)}
          >
          </button>
        ))}
    </div>
  )
}

PaginationDots.propTypes = {
  totalPages: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired,
}

export default PaginationDots

import { useState, forwardRef, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types';

import { images } from '~/assets/images';
import styles from './Image.module.scss'

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
  const [fallback, setFallback] = useState('')

  useEffect(() => {
    setFallback('')
  },[src])

  const handleError = () => {
    setFallback(customFallback)
  }

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallback || src || images.noImage}
      alt={alt}
      {...props}
      onError={handleError}
    ></img>
  )
})

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string
}

export default Image

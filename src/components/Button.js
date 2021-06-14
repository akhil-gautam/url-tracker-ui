import React, { useContext } from 'react'
import classNames from 'classnames'

import { ThemeContext } from '../ThemeContext'

const Button = React.forwardRef((props, ref) => {
  const {
    color = 'neutral',
    variant = 'default',
    LeftIcon,
    RightIcon,
    className,
    children,
    ...rest
  } = props

  const {
    theme: { button },
  } = useContext(ThemeContext)

  const classes = classNames(
    button[variant].base,
    button[variant][color],
    className
  )

  return (
    <button className={classes} ref={ref} {...rest}>
      {LeftIcon && (
        <span className='h-6 w-6'>
          <LeftIcon />
        </span>
      )}
      <span>{children}</span>
      {RightIcon && (
        <span className='h-6 w-6'>
          <RightIcon />
        </span>
      )}
    </button>
  )
})

export default Button

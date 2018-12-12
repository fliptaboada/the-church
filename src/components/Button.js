import React from 'react'
import './Button.css'
import classnames from 'classnames'

const Button = (props) => {
    const { className, ...rest } = props
    return (
        <button className={classnames('button', className)} {...rest}></button>
    )
}

export default Button
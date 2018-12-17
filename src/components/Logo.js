import React from 'react'
import './Logo.css'
import { ReactComponent as LogoSvg } from '../images/logo-thechurch.svg'
import classnames from 'classnames'

const Logo = (props) => {
    return (
        <LogoSvg fill='white' width={96} height={124} className={classnames('logo', props.className)} />
    )
}

export default Logo
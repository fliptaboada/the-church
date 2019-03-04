import React, { useEffect, useState } from 'react'
import Button from './Button';
import './FloatingBackButton.css';
import classnames from 'classnames'
import { RouteComponentProps, withRouter } from 'react-router';

export default withRouter((props: RouteComponentProps) => {
    const shouldShow = () => window.scrollY + window.innerHeight + 300 < window.document.body.scrollHeight
    const [showButton, setShowButton] = useState(false)
    useEffect(() => {
        const watchScroll = () => {
            setShowButton(shouldShow())
        }

        window.addEventListener('scroll', watchScroll)

        return () => window.removeEventListener('scroll', watchScroll)
    }, [])
    const onClick = () => props.history.push('/')
    return (
        <Button
            className={classnames('floating-back-button', { 'show': showButton })}
            onClick={onClick}
        >
            VOLTAR
        </Button>
    )
})
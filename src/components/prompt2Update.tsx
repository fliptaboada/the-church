import React from 'react'
import { toast } from 'react-toastify';

interface ButtonsProps {
    closeToast?: any
    registration: ServiceWorkerRegistration
}

const Buttons = (props: ButtonsProps) => {
    const reload = () => props.registration.waiting.postMessage('skipWaiting')

    return (
        <>
            <button onClick={reload}>Recarregar</button>
            <button onClick={props.closeToast}>Fechar</button>
        </>
    )
}

export default (registration: ServiceWorkerRegistration) => toast('Existe uma nova versão disponível', {
    position: 'top-center',
    className: 'default-toast',
    closeButton: <Buttons registration={registration} />,
    hideProgressBar: true,
    autoClose: false,
})
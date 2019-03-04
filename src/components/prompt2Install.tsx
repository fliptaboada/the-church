import React from 'react'
import { toast } from 'react-toastify';

interface ButtonsProps {
    deferredPrompt: any
    closeToast?: any
}

const Buttons = (props: ButtonsProps) => {
    const install = () => {
        props.deferredPrompt.prompt()
        props.deferredPrompt.userChoice
            .then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
            });
    }
    return (
        <>
            <button onClick={install}>Adicionar</button>
            <button onClick={props.closeToast}>Fechar</button>
        </>
    )
}

export default (e: any) => toast('Este app pode ser adicionar à sua home', {
    position: 'top-center',
    className: 'default-toast',
    closeButton: <Buttons deferredPrompt={e} />,
    hideProgressBar: true,
    autoClose: 10000,
})
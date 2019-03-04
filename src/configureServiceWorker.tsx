import * as serviceWorker from './serviceWorker';
import prompt2Install from './components/prompt2Install';
import prompt2Update from './components/prompt2Update';

export default () => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.register({
        onUpdate: (registration: ServiceWorkerRegistration) => prompt2Update(registration)
    });

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        prompt2Install(e)
    })
}

import {
    fetchData
} from './data'

// data response handler - pass custom event after data is received
export const generateCustomEvent = (data, eventName) => {

    if (eventName == null || data == null) return;
    if (typeof eventName !== 'string' || typeof data !== 'object') return;

    // create and dispatch the event
    const gaData = new CustomEvent(eventName, {
        detail: data
    });
    window.dispatchEvent(gaData);
}

// load handler to fetch ga data
export const loadHandler = (e) => {
    const isHomeTemplate = location.pathname.match(/^\/$/);
    const event = e;
    if (isHomeTemplate !== null) {
        if (!event) return 'initLoadHandler';
        return fetchData('http://localhost:3000/api/v1/analytics', 'POST')
            .then(result => {
                if (!result) {
                    return generateCustomEvent({
                        err: 'I\'m sorry, you have invalid permissions to access data'
                    }, 'dataResponse');
                }
                generateCustomEvent(result, 'dataResponse');
            })
            .catch(err => {
                console.log(err)
            })
    }
    return null;
}

// event init 
export const wireUpEvents = (eventType = null, parentElement = null, handler = null) => {
    if (eventType == null || parentElement == null || handler == null) return;
    if (typeof eventType !== 'string' || typeof parentElement !== 'object' || typeof handler !== 'function');
    // check if handler is null, if null do not attach listener - for all non-home templates. 
    // This prevents the GA API from being called if the template isn't home
    if (handler() === null) return null;
    parentElement.addEventListener(eventType, handler);
}
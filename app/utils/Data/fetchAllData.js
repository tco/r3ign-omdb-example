function fetchAllData(components, getState, dispatch, subscribe, location, params, deferred) {
    const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';
    return components
        .filter((component) => component && !component.fetchInClientOnly && component[methodName]) // only look at ones with a static fetchData()
        .map((component) => component[methodName])    // pull out fetch data methods
        .map(fetchData => fetchData(getState, dispatch, subscribe, location, params));  // call fetch data methods and save promises
}

export default (components, getState, dispatch, subscribe, location, params) => {
    return new Promise(resolve => {
        const doTransition = () => {
            Promise.all(fetchAllData(components, getState, dispatch, subscribe, location, params, true))
                .then(resolve)
                .catch(error => {
                    // TODO: You may want to handle errors for fetchDataDeferred here
                    console.warn('Warning: Error in fetchDataDeferred', error);
                    return resolve();
                });
        };

        Promise.all(fetchAllData(components, getState, dispatch, subscribe, location, params))
            .then(doTransition)
            .catch(error => {
                // TODO: You may want to handle errors for fetchData here
                console.warn('Warning: Error in fetchData', error);
                return doTransition();
            });
    });
};

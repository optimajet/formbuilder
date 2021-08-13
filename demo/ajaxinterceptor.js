// based on https://github.com/slorber/ajax-interceptor

// restore prototype chain: https://github.com/HubSpot/pace/issues/261

const XMLHttpRequestProto = Object.getPrototypeOf(new XMLHttpRequest);
if (XMLHttpRequestProto !== XMLHttpRequest.prototype) {
    XMLHttpRequest.prototype = XMLHttpRequestProto;
}

const RealXHRSend = XMLHttpRequest.prototype.send;
const RealXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

let authToken = null;
const browserFetch = window.fetch;

const requestCallbacks = [];
let onRequestCallback = null;

let wired = false;

function arrayRemove(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    } else {
        throw new Error('Could not remove ' + item + ' from array');
    }
}

function fireCallbacks(callbacks, xhr) {
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](xhr);
    }
}

const ajaxInterceptor = {
    addRequestCallback: function (callback) {
        requestCallbacks.push(callback);
    },
    removeRequestCallback: function (callback) {
        arrayRemove(requestCallbacks, callback);
    },

    isWired: function () {
        return wired;
    },

    wire: function () {
        if (wired) {
            throw new Error('Ajax interceptor already wired');
        }

        // Override send method of all XHR requests
        XMLHttpRequest.prototype.send = function () {

            // Fire request callbacks before sending the request
            fireCallbacks(requestCallbacks, this);

            if (this.authToken) { // setting Authorization header for the last saved token
                RealXHRSetRequestHeader.apply(this, ['Authorization', this.authToken]);
            }

            RealXHRSend.apply(this, arguments);
        };

        XMLHttpRequest.prototype.setRequestHeader = function (name, value) {

            if (name === 'Authorization') {
                this.authToken = value; //saving authToken instead of creating the header
                authToken = this.authToken;
            } else {
                RealXHRSetRequestHeader.apply(this, arguments);
            }
        };


        wired = true;
    },

    unwire: function () {
        if (!wired) {
            throw new Error('Ajax interceptor not currently wired');
        }
        XMLHttpRequest.prototype.send = RealXHRSend;
        XMLHttpRequest.prototype.setRequestHeader = RealXHRSetRequestHeader;
        wired = false;
    },

    fetch: function (resource, init) {
        const newInit = init || {};
        const headers = newInit.headers || new Headers();
        if (authToken) {
            headers.append('Authorization', authToken);
        }
        newInit.headers = headers;
        return browserFetch(resource, newInit);
    },

    configureHeaders: function (accessToken) {
        let options = null;

        if (window.globalFetchOptions) {
            options = window.globalFetchOptions();
        }

        if (!options) {
            options = {headers : {}};
        }

        const bearerHeader = accessToken ? ('Bearer ' + accessToken) : null;

        options.headers = {
            ...options.headers,
            'Authorization': bearerHeader
        };

        if (onRequestCallback) {
            ajaxInterceptor.removeRequestCallback(onRequestCallback);
        } else {
            ajaxInterceptor.wire();
        }

        onRequestCallback = (xhr) => {
            xhr.setRequestHeader('Authorization', bearerHeader);
        };

        ajaxInterceptor.addRequestCallback(onRequestCallback);
    }

};

export default ajaxInterceptor;
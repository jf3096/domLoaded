/*
 * Since window variable is global any consider can be used anywhere,
 * below declaration is used to patch Typescript could not recognize window.attachEvent
 */
declare let attachEvent:any;

module dom {
    /* compression purpose */
    let doc = document;
    let FASLE = false;

    let isLoaded:boolean = !!(window || doc);
    let callbackQueue = [];

    /**
     * Execute queued callback function
     */
    function executeCallbacks() {
        let callbacks = callbackQueue;
        if (!isLoaded) {
            isLoaded = true;
            /*
             * Clear callbackQueue or actually reset callbackQueue
             * memory pointer,prevent duplicate calls
             */
            callbackQueue = [];
            while (callbacks.length) {
                /**
                 * execute the shifted function
                 */
                callbacks.shift()();
            }
        }
    }

    (function loadedCallback() {
        /*
         * Supported by IE8+ and Opera 5.0+
         * Refer to: http://javascript.info/tutorial/onload-ondomcontentloaded
         */
        if (doc.addEventListener) {
            doc.addEventListener("DOMContentLoaded", executeCallbacks, FASLE);
            addEventListener("load", executeCallbacks, FASLE);
        } else if (attachEvent) {
            attachEvent("onload", executeCallbacks);
        }
        /*
         * Document might complete before event binding
         */
        doc.readyState === "complete" && executeCallbacks();
    }())

    export function domReady(callback:Function) {
        /*
         * "isLoaded" variable is used to indicate function should be directly
         * execute or push to an queue to execute till dom is ready.
         */
        isLoaded ? callback() : callbackQueue.push(callback);
        return domReady;
    }
}


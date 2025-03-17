// VanillaJS Library
// A lightweight JavaScript utility library for DOM manipulation, events, styling, and more.

const VanillaJS = {
//Utils: Namespace for utility functions
/**
 * Creates a debounced version of a function that delays its execution.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
},

/**
 * Creates a throttled version of a function that only executes once per interval.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The time interval in milliseconds.
 * @returns {Function} - The throttled function.
 */
throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return (...args) => {
        const now = Date.now();
        if (!lastRan) {
            func(...args);
            lastRan = now;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (now - lastRan >= limit) {
                    func(...args);
                    lastRan = now;
                }
            }, limit - (now - lastRan));
        }
    };
},

/**
 * Checks if an object or array is empty.
 * @param {Object|Array} obj - The object or array to check.
 * @returns {boolean} - True if empty, false otherwise.
 */
isEmpty(obj) {
    return Object.keys(obj).length === 0;
},

/**
 * Deeply merges two objects.
 * @param {Object} target - The target object.
 * @param {Object} source - The source object.
 * @returns {Object} - The merged object.
 */
mergeObjects(target, source) {
    for (let key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], this.mergeObjects(target[key], source[key]));
        }
    }
    return { ...target, ...source };
},

//UI: Namespace for user interface manipulation

/** 
 * Creates a new DOM element, assigns an ID and/or class, appends it to a parent, 
 * and extends it with chainable methods.
 * @param {string} tag - The tag name of the element to create (e.g., 'div', 'span').
 * @param {Object} options - Options for creating the element.
 * @param {string} [options.id] - The ID to assign to the element.
 * @param {string} [options.className] - The class(es) to assign to the element.
 * @param {string|Element} [options.parent] - The parent to append the element to (CSS selector or DOM element).
 * @returns {Element} - The created and extended DOM element.
 */
createElement(tag, { id, className, parent } = {}) {
    const element = document.createElement(tag);

    // Assign ID and class if provided
    if (id) element.id = id;
    if (className) element.className = className;

    // Append to the parent element if specified
    if (parent) {
        const parentElement = typeof parent === "string" ? document.querySelector(parent) : parent;
        if (parentElement) {
            parentElement.appendChild(element);
        } else {
            console.error(`Parent element not found: ${parent}`);
        }
    }

    // Extend the element with chainable methods
    return VanillaJS.extendElement(element);
},
/**
 * Selects the first matching element and returns an extended object for chaining.
 * @param {string} selector - A valid CSS selector.
 */
querySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`No element found for selector: ${selector}`);
        return null;
    }

    return this.extendElement(element);
},

/**
 * Selects all matching elements and returns an array of extended objects for chaining.
 * @param {string} selector - A valid CSS selector.
 */
querySelectorAll(selector) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(this.extendElement.bind(this));
},

/**
 * Extends a DOM element with additional methods for chaining.
 * @param {Element} element - A DOM element to extend.
 */
extendElement(element) {
    element.addClass = function(className) {
        this.classList.add(className);
        return this;
    };

    element.removeClass = function(className) {
        this.classList.remove(className);
        return this;
    };

    element.toggleClass = function(className) {
        this.classList.toggle(className);
        return this;
    };

    element.css = function(property, value) {
        this.style[property] = value;
        return this;
    };

    element.html = function(content) {
        if (content === undefined) return this.innerHTML;
        this.innerHTML = content;
        return this;
    };

    element.text = function(content) {
        if (content === undefined) return this.textContent;
        this.textContent = content;
        return this;
    };

    element.on = function(event, callback) {
        this.addEventListener(event, callback);
        return this;
    };

    element.off = function(event, callback) {
        this.removeEventListener(event, callback);
        return this;
    };

    element.once = function(event, callback) {
        const onceCallback = (e) => {
            callback(e);
            this.removeEventListener(event, onceCallback);
        };
        this.addEventListener(event, onceCallback);
        return this;
    };

    element.trigger = function(eventType) {
        const event = new Event(eventType);
        this.dispatchEvent(event);
        return this;
    };
    
    element.show = function() {
        this.style.display = '';
        return this;
    };

    element.hide = function() {
        this.style.display = 'none';
        return this;
    };

    return element;
},

/**
 * Adds an event listener with delegation.
 * @param {string} parentSelector - Selector for the parent element.
 * @param {string} childSelector - Selector for the child elements.
 * @param {string} event - Event type (e.g., "click").
 * @param {Function} callback - Callback function for the event.
 */
delegate(parentSelector, childSelector, event, callback) {
    const parent = document.querySelector(parentSelector);
    if (!parent) {
        console.error(`No parent element found for selector: ${parentSelector}`);
        return;
    }

    parent.addEventListener(event, (e) => {
        if (e.target.matches(childSelector)) {
            callback(e);
        }
    });
},

/** AJAX utility functions for HTTP requests.*/
/**
 * Performs a GET request to the specified URL.
 * @param {string} url - The URL to send the request to.
 * @param {Function} callback - Callback function for the response.
 */
get(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => callback(data))
        .catch((error) => console.error("GET request failed:", error));
},

/**
 * Performs a POST request with data to the specified URL.
 * @param {string} url - The URL to send the request to.
 * @param {Object} data - Data to send in the body of the request.
 * @param {Function} callback - Callback function for the response.
 */
post(url, data, callback) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => callback(data))
        .catch((error) => console.error("POST request failed:", error));
},

/**
 * Executes a callback once the DOM is fully loaded.
 * @param {Function} callback - Function to execute when the DOM is ready.
 */
ready(callback) {
    if (document.readyState !== "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
},
// Example usage:
// VanillaJS.ready(() => {
//     VanillaJS.querySelector('#example')
//         .addClass('active')
//         .on('click', () => console.log('Clicked!'))
//         .html('<p>Hello World</p>');
// });  
};

//allow exports for library use.
module.exports = VanillaJS;

# answer-now-library
Vanilla JS Library + Website calculators



Vanilla JS READ ME

# VanillaJS Library

VanillaJS is a lightweight JavaScript utility library for DOM manipulation, event handling, styling, and AJAX requests.
It simplifies common tasks with a clean, chainable API, and includes helpful utilities for building modern web applications.

---

## Getting Started

### 1. Include the Library

Add the `vanilla-js-library.js` file to your project and import or link it in your HTML file:

```html
<script src="vanilla-js-library.js"></script>
```

### 2. Initialize

Use the `VanillaJS.ready` method to ensure the DOM is loaded before executing your code:

```javascript
VanillaJS.ready(() => {
    console.log('DOM is ready!');
});
```

### 3. Basic Example

```javascript
VanillaJS.ready(() => {
    VanillaJS.UI.querySelector('#example')
        .addClass('active')
        .css('color', 'blue')
        .html('<p>Hello World!</p>');
});
```

---

## Features and API

### DOM Manipulation

#### `VanillaJS.UI.querySelector(selector)`
Selects a single DOM element and enhances it with chainable methods.

Example:
```javascript
VanillaJS.UI.querySelector('#example')
    .addClass('highlight')
    .css('color', 'blue')
    .html('Hello!');
```

#### `VanillaJS.UI.querySelectorAll(selector)`
Selects multiple DOM elements and returns an array of enhanced elements.

Example:
```javascript
VanillaJS.UI.querySelectorAll('.items').forEach(item => {
    item.addClass('selected');
});
```

### Event Handling

#### `on(event, callback)`
Adds an event listener to an element.

Example:
```javascript
VanillaJS.UI.querySelector('#button')
    .on('click', () => console.log('Button clicked!'));
```

#### `once(event, callback)`
Adds an event listener that triggers only once.

Example:
```javascript
VanillaJS.UI.querySelector('#button')
    .once('click', () => console.log('Clicked once!'));
```

#### `delegate(parent, childSelector, event, callback)`
Adds a delegated event listener to a parent element for child elements.

Example:
```javascript
VanillaJS.UI.delegate('#list', 'li', 'click', (e) => {
    console.log('List item clicked:', e.target.textContent);
});
```

### Utilities

#### `VanillaJS.debounce(func, delay)`
Creates a debounced function that delays execution until after a specified time has passed.

Example:
```javascript
const log = VanillaJS.debounce(() => console.log('Debounced!'), 300);
log(); // Waits 300ms to execute
```

#### `VanillaJS.isEmpty(obj)`
Checks if an object or array is empty.

Example:
```javascript
console.log(VanillaJS.isEmpty({})); // true
console.log(VanillaJS.isEmpty({ key: 'value' })); // false
```

### Creating and Extending New Elements

#### `VanillaJS.createElement(tag, options)`
Quickly create, configure, append, and extend new DOM elements.

**Parameters:**
- `tag`: The tag name of the element (e.g., `'div'`, `'span'`).
- `options`: An object with the following optional properties:
  - `id`: Assign an ID to the element.
  - `className`: Assign CSS classes.
  - `parent`: Append the element to a parent (CSS selector or DOM element).

**Example:**
```javascript
const newDiv = VanillaJS.UI.createElement('div', {
    id: 'customDiv',
    className: 'styled-div',
    parent: '#container',
});

newDiv
    .addClass('highlight')
    .css('backgroundColor', 'lightblue')
    .html('<p>Custom content!</p>');
```

---

## FAQ

### What happens if `querySelector` doesn’t find an element?
The method logs an error and returns `null`. Always check for null before chaining.

Example:
```javascript
const element = VanillaJS.UI.querySelector('#nonExistent');
if (element) {
    element.addClass('active');
}
```

### Can I use this library with other frameworks?
Yes! VanillaJS is designed to be lightweight and framework-agnostic. You can use it alongside frameworks like React or Vue without interference.

---

## License
This library is open-source and licensed under the MIT License.


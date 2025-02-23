console.log("hello world!")

const VanillaJS = {
    // future utilities
    utils: {},
    // sub-namespace for UI manipulation
    UI: {

        //automated the 'Query Selector' logic in JS to capture the first element that matches the query,
        querySelector(element) { 
            // ensures the input is a string, and doesn't break the logic if not typed correctly.
            if (typeof element !== "string") {
                console.log ('Invalid Selector - provide a present valid CSS selector');
                return null;
            }

            //saves the input to a const which is ran through the standard vanilla query Selector logic to then return.
            const selectedElement = document.querySelector(element);

            //If the entry isn't found in the DOM, keeps it from breaking the script and warns the user.
            if (!selectedElement) {
                console.warn(`No Element found for QuerySelector for ${element}`);
                return null;
            }

            //If the element exists, return it as the selected item.
            console.log(`${element} has been saved in the query selection method for this value.`);
            return selectedElement;
        },

        //automated query selector all function in JS to allow a Nodelist of all elements matching the query.
        querySelectorAll(element) {
            // ensures the input is a string, and doesn't break the logic if not typed correctly.
            if (typeof element !== "string"){
                console.log ('Invalid Selector(All) - provide a present valid CSS selector');
                return null;
            }

            //saves the input to an NODELIST. i.e., mulitiple elements.
            const selectedElement = document.querySelectorAll(element);

            //If the entry isn't found in the DOM, keeps it from breaking the script and warns the user.
            if (!selectedElement.length === 0) {
                console.warn(`No elements found for the selector(All): ${element}`);
                return null;
            }

            //If the element exists, iterate over all of them return it as the selected item.
            console.log(`${element} has been saved from QuerySelector as a NODELIST of multiple elements.`);
            return selectedElement;
        },
        
        //Adding Classes onto a saved Element - add more dot notation chains as needed!
        addClass(element, classToAdd) {
            // checks to see if element exists in the DOM
            if (!(element instanceof HTMLElement)) {
                console.warn(`Invalid Element - ${element} does not exist.`);
                return this; // return this is referencing the object of my library and returns the element for chaining purposes.
            }

            // checks to ensure the class being added is a string
            if (typeof classToAdd !== "string" || classToAdd === "") {
                console.warn(`Invalid class name - make sure input is a string.`);
                return this;
            }

            // adds the class to the element, allows chaining more edits to the element.
            element.classList.add(classToAdd.trim());
            console.log(`Class ${classToAdd} was added to element <${element.tagName}>`); // tagName drills down to just the name instead of all the details logged.
            return this;

        }
        // Removing a Class from an Element - separate with comma as needed.

        // Toggle a Class on an Element

    },
    FUNC: {}
};

//checking structure:
const header1 = VanillaJS.UI.querySelector('h1');
VanillaJS.UI.addClass(header1, "newClass");
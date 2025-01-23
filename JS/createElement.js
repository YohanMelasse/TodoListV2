const createElement = (tag, attributes = {}) => {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)){
        element.setAttribute(key, value);
    }
    return element;
}
createElement();

export {createElement};
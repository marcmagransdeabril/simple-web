/**
 * Minimal one-way data binder for interpolation (Component -> View).
 * Uses Proxy to detect data changes and updates a single target element.
 */
export class Binder {
    /**
     * @param {HTMLElement} element - The single element containing the binding.
     * @param {Object} initialData - The initial state { property: value }.
     * @param {string} propertyName - The name of the property to bind (e.g., 'name').
     */
    constructor(element, initialData, propertyName) {
        this.element = element;
        this.prop = propertyName;
        
        // Store the original template (e.g., 'Hello {{ name }}')
        this.template = element.innerHTML;
        
        this.data = this._createReactiveData(initialData);
        this._updateView(); // Initial render
    }

    // Creates a reactive data object using Proxy
    _createReactiveData(initialData) {
        const handler = {
            set: (target, key, value) => {
                const success = Reflect.set(target, key, value);
                if (success && key === this.prop) {
                    this._updateView();
                }
                return success;
            }
        };
        return new Proxy(initialData, handler);
    }

    // Updates the element's innerHTML with current data
    _updateView() {
        const interpolationRegex = new RegExp(`\{\{\\s*${this.prop}\\s*\}\}`, 'g');
        this.element.innerHTML = this.template.replace(
            interpolationRegex, 
            this.data[this.prop]
        );
    }
}
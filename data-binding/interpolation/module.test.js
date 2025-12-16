// module.test.js
import { describe, it, expect } from 'vitest';
import { Binder } from './module';

describe('Minimal Binder', () => {
    it('should correctly bind and update the element content', () => {
        // Setup JSDOM environment
        const rootElement = document.createElement('p');
        rootElement.id = 'output';
        rootElement.innerHTML = 'Value is: {{ val }}';
        document.body.appendChild(rootElement);

        const initialData = { val: 'A' };
        
        // Initialize the binder for the 'val' property
        const binder = new Binder(rootElement, initialData, 'val');

        // 1. Check Initial Render
        expect(rootElement.innerHTML).toBe('Value is: A');

        // 2. Update Data
        binder.data.val = 'B';

        // 3. Check Update
        expect(rootElement.innerHTML).toBe('Value is: B');
    });
});
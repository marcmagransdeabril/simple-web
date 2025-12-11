/**
 * Unit tests for DataTable Web Component
 * Run with: npm test
 */

// Import the component
import './data-table.js';

describe('DataTable Web Component', () => {
  let element;

  beforeEach(() => {
    // Create a fresh instance before each test
    element = document.createElement('data-table');
    document.body.appendChild(element);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(element);
  });

  describe('Initialization', () => {
    test('should be defined', () => {
      expect(customElements.get('data-table')).toBeDefined();
    });

    test('should create shadow root', () => {
      expect(element.shadowRoot).not.toBeNull();
    });

    test('should initialize with empty data', () => {
      expect(element.data).toEqual([]);
    });

    test('should show empty state when no data', () => {
      const emptyState = element.shadowRoot.querySelector('.empty-state');
      expect(emptyState).not.toBeNull();
      expect(emptyState.textContent).toContain('No data available');
    });
  });

  describe('Data Setting', () => {
    test('should accept data via property', () => {
      const testData = [
        { id: 1, name: 'Test User' }
      ];
      
      element.data = testData;
      
      expect(element.data).toEqual(testData);
    });

    test('should render table when data is set', () => {
      element.data = [
        { id: 1, name: 'John', age: 30 }
      ];

      const table = element.shadowRoot.querySelector('table');
      expect(table).not.toBeNull();
    });

    test('should extract columns from data', () => {
      element.data = [
        { id: 1, name: 'John', email: 'john@test.com' }
      ];

      expect(element._columns).toEqual(['id', 'name', 'email']);
    });

    test('should handle empty array', () => {
      element.data = [];
      
      const emptyState = element.shadowRoot.querySelector('.empty-state');
      expect(emptyState).not.toBeNull();
    });

    test('should handle non-array input gracefully', () => {
      element.data = null;
      expect(element.data).toEqual([]);
      
      element.data = undefined;
      expect(element.data).toEqual([]);
      
      element.data = 'not an array';
      expect(element.data).toEqual([]);
    });
  });

  describe('Table Rendering', () => {
    test('should render correct number of headers', () => {
      element.data = [
        { id: 1, name: 'John', age: 30 }
      ];

      const headers = element.shadowRoot.querySelectorAll('th');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent).toBe('id');
      expect(headers[1].textContent).toBe('name');
      expect(headers[2].textContent).toBe('age');
    });

    test('should render correct number of rows', () => {
      element.data = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' }
      ];

      const rows = element.shadowRoot.querySelectorAll('tbody tr');
      expect(rows.length).toBe(3);
    });

    test('should render cell values correctly', () => {
      element.data = [
        { id: 1, name: 'John Doe', age: 30 }
      ];

      const cells = element.shadowRoot.querySelectorAll('tbody td');
      expect(cells[0].textContent).toBe('1');
      expect(cells[1].textContent).toBe('John Doe');
      expect(cells[2].textContent).toBe('30');
    });

    test('should handle null and undefined values', () => {
      element.data = [
        { id: 1, name: null, age: undefined }
      ];

      const cells = element.shadowRoot.querySelectorAll('tbody td');
      expect(cells[1].textContent).toBe('-');
      expect(cells[2].textContent).toBe('-');
    });

    test('should handle object values', () => {
      element.data = [
        { id: 1, metadata: { key: 'value' } }
      ];

      const cells = element.shadowRoot.querySelectorAll('tbody td');
      expect(cells[1].textContent).toBe('{"key":"value"}');
    });
  });

  describe('Data Loading from URL', () => {
    beforeEach(() => {
      // Mock fetch
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should load data from URL', async () => {
      const mockData = [
        { id: 1, name: 'Test' }
      ];

      global.fetch.mockResolvedValueOnce({
        json: async () => mockData
      });

      await element.loadData('https://api.example.com/data');

      expect(element.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data');
    });

    test('should handle fetch errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await element.loadData('https://api.example.com/data');

      const errorDiv = element.shadowRoot.querySelector('.error');
      expect(errorDiv).not.toBeNull();
      expect(errorDiv.textContent).toContain('Network error');
    });

    test('should load data via data-source attribute', async () => {
      const mockData = [{ id: 1, name: 'Test' }];
      
      global.fetch.mockResolvedValueOnce({
        json: async () => mockData
      });

      element.setAttribute('data-source', 'https://api.example.com/data');
      
      // Wait for async operation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(element.data).toEqual(mockData);
    });
  });

  describe('Styling', () => {
    test('should include styles in shadow root', () => {
      const style = element.shadowRoot.querySelector('style');
      expect(style).not.toBeNull();
      expect(style.textContent).toContain('table');
    });

    test('should be encapsulated in shadow DOM', () => {
      element.data = [{ id: 1, name: 'Test' }];
      
      // Table should be in shadow root, not in light DOM
      expect(document.querySelector('table')).toBeNull();
      expect(element.shadowRoot.querySelector('table')).not.toBeNull();
    });
  });

  describe('Update Behavior', () => {
    test('should re-render when data changes', () => {
      element.data = [{ id: 1, name: 'John' }];
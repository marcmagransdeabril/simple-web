class DataTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = [];
    this._columns = [];
  }

  static get observedAttributes() {
    return ['data-source'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-source' && newValue) {
      this.loadData(newValue);
    }
  }

  set data(value) {
    this._data = Array.isArray(value) ? value : [];
    this.extractColumns();
    this.render();
  }

  get data() {
    return this._data;
  }

  extractColumns() {
    if (this._data.length > 0) {
      this._columns = Object.keys(this._data[0]);
    }
  }

  async loadData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.data = data;
    } catch (error) {
      this.renderError(error.message);
    }
  }

  render() {
    const style = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        th {
          background-color: #4CAF50;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          text-transform: capitalize;
        }
        
        td {
          padding: 10px 12px;
          border-bottom: 1px solid #ddd;
        }
        
        tr:hover {
          background-color: #f5f5f5;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .empty-state {
          padding: 20px;
          text-align: center;
          color: #666;
        }
        
        .error {
          padding: 20px;
          background-color: #ffebee;
          color: #c62828;
          border-radius: 4px;
        }
      </style>
    `;

    const content = this._data.length > 0 
      ? this.renderTable() 
      : '<div class="empty-state">No data available</div>';

    this.shadowRoot.innerHTML = style + content;
  }

  renderTable() {
    const headers = this._columns
      .map(col => `<th>${col}</th>`)
      .join('');

    const rows = this._data
      .map(row => {
        const cells = this._columns
          .map(col => `<td>${this.formatCell(row[col])}</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    return `
      <table>
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  formatCell(value) {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  }

  renderError(message) {
    this.shadowRoot.innerHTML = `
      <style>
        .error {
          padding: 20px;
          background-color: #ffebee;
          color: #c62828;
          border-radius: 4px;
        }
      </style>
      <div class="error">Error loading data: ${message}</div>
    `;
  }
}

customElements.define('data-table', DataTable);
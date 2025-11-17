import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { increment } from './app.js';
import fs from 'fs';

describe('CounterApp', () => {
  beforeEach(() => {
    const html = fs.readFileSync('./app.html', 'utf-8');
    const dom = new JSDOM(html);
    global.document = dom.window.document;
    document.getElementById('increment-btn').addEventListener('click', increment);
  });

  it('should retrieve counter element', () => {
    expect(document.getElementById('counter').textContent).toBe('0');
  });

  it('should have btn CSS class on button', () => {
    const button = document.getElementById('increment-btn');
    expect(button.classList.contains('btn')).toBe(true);
  });

  it('should increment on button click', () => {
    document.getElementById('increment-btn').click();
    expect(document.getElementById('counter').textContent).toBe('1');
  });

  it('should execute increment function', () => {
    expect(increment()).toBe(1);
  });
});
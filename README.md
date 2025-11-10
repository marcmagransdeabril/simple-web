# How to build Frontend Applications without Frameworks?

The basic idea is to write a guide to develop frontend applications with a minimal overhead of libraries and frameworks. That is, instead of using complex frameworks, leverage as much as possible the latest CSS, HTML, and Javascript standards (implemented in the four major browsers: Chrome, Edge, Firefox, and Safari), and minimize the number of external dependencies. This is mean to simplify the overall frontend design, optimize long-term maintainability, and potentially improve the performance by reducing the number of software layers used.

Most likely, there are lots of people that hate the approach 😡. It is likely they have good reasons for it.

## 📄 Table of Contents

 * [Modules](modules)
 * [Unit Testing](#unit-testing)
   * [JavaScript Module Testing](#javascript-module-testing)
 * [HTML Includes](#html-includes)
 * [Namespaces](#namespaces)
 * [(Web)Components](#webcomponents)
 * [Data binding](#data-binding)
 * [Reactivity](#reactivity)
 * [Pipes](#pipes)
 * [Signals](#signals)
 * [Routing and Navigation](#routing-and-navigation)
 * [HTTP Client](#http-client)
 * [Directives](#directives)
 * [Interceptors](#interceptors)
 * [Templates](#templates)
 * [Multiple environments](#multiple-environments)
 * [Minimization](#minimization)
 * [State management](#state-management)
 * [Dependency injection](#dependency-injection)
 * [Epilogue: Douglas Crockford's Insights](#epilogue-douglas-crockfords-insights)
      
## Type Checking and Linting

For example, innetHtml or innerHTML

## Modules

A software module is a self-contained part of a computer program that performs a specific function or task. It helps organize complex programs by breaking them down into manageable sections, making the code easier to understand and reuse.

Since EcmaScript standard 6 (2015) JavaScript also has modules which allow to structure complex applications from simpler parts as most programming languages. 

```html
<html>
<head>
   <script type="module" defer>
      "use strict";
      import { helloWorld } from "./module.js";

      const element = document.getElementById('includeHtml');
      element.innerHTML=helloWorld();
      
   </script>
</head>
<body>
  <h2>Program to use a Javascript <i>Module</i></h2>
  <p>Before the inclusion</p>
  <div id="includeHtml"></div>
  <p>After the fragment</p>
</body>
</html>
```

```JavaScript
"use strict";

export function helloWorld() {  
  return "<p>innerHTML provided by the <var>helloWorld()</var> method exported from module.js</p>";
}
```


See a [module example](https://marcmagransdeabril.github.io/simple-web/includes/main.html).

For more information about modules, you can check [Mozilla documentation about JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

## Unit Testing

Once you have modules, the next step is how to test them. 

For the sake of concisnsess, I would focus on threee scenarios: black box, mocking, dependency injection, browser.

### JavaScript Module Testing

1. Initilize `npm` package manager and install the [Vitest](https://vitest.dev/) dependency (note: the most widely used [Jest](https://jestjs.io/) has not been used for not suppoting standard ES6 modules, and requiring extra configuration for its support):
```bash
# Initialize package.json if you haven't already
npm init -y

# Install Jest as a dev dependency
npm install --save-dev vitest
```

2. Add `vitest` in the `package.json` `test` target script:
```json

  "name": "js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "vitest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vitest": "^4.0.8"
  }
}
```

3. Create a JavaScript module like the following [math.js](https://marcmagransdeabril.github.io/simple-web/unit-test/js/math.js):
```JavaScript
// Simple math functions to test
export function add(a, b) {
  return a + b;
}
```

4. Create a test file for the module [math.test.js](https://marcmagransdeabril.github.io/simple-web/unit-test/js/math.test.js):
```JavaScript
import  { add } from './math.js';
import { test, expect, describe } from 'vitest';

describe('Math functions', () => {
  // Test the add function
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('adds negative numbers correctly', () => {
    expect(add(-1, -2)).toBe(-3);
  });

});
```

### Browser Mock-up Testing


## HTML Includes

How can we have modular definitions of HTML pages, allowing the reuse, for example, of header and footer HTML?

The simplest solution seems to be the use of an external library, like [jQuery](https://jquery.com/) (although [other JavaScript libraries exist](https://css-tricks.com/the-simplest-ways-to-handle-html-includes/) for this purpose).

We basically inject an external resource into a `<div>` element:

```html
<html>
<head>
   <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
   <script>
      $(function() {
         $("#includeHtml").load("included.html");
      });
   </script>
</head>
<body>
  <h2>Program to include another HTML file in this HTML using <i>JQuery load</i></h2>
  <p>Before the <a href="https://marcmagransdeabril.github.io/simple-web/includes/included.html">included.html</a> fragment</p>
  <div id="includeHtml"></div>
  <p>After the fragment</p>
</body>
</html>
```

Where the `$(function() { ... });` is the standard jQuery shorthand for `$(document).ready(function() { ... });`. It ensures that the code inside the function only runs after the browser has fully loaded and parsed the main HTML document (the DOM is ready). This is crucial because the script needs to locate the element with the ID `includeHtml` before trying to manipulate it.

see an [includes example](https://marcmagransdeabril.github.io/simple-web/includes/main.html).

Advantages:
* Parsimonious (Minimal code required for the task).
* Relies on one of the oldest and best-maintained JavaScript libraries (since 2006).
* The JavaScript code inside the embedded HTML can directly access the parent page's JavaScript context because the content is injected into the parent DOM.

Disadvantages:
* It is not a fully native HTML/CSS/JavaScript approach, as it relies on a third-party library (jQuery).
* Adds an external dependency. Although, a native approach is possible [with fetch and Vanilla JavaScript](https://marcmagransdeabril.github.io/simple-web/includes/mainVanillaJS.html).

```html
<html>
<head>
   <script>
      document.addEventListener('DOMContentLoaded', function() {
         const targetElement = document.getElementById('includeHtml'); 
         fetch('included.html')
           .then(response => response.text()) // Convert Promise to text string
           .then(htmlContent => {
               targetElement.innerHTML = htmlContent; // Inject text string
           });
      });
   </script>
</head>
<body>
  <h2>Program to include another HTML file in this HTML using <i>Vanilla JavaScript event listener and fetch</i></h2>
  <p>Before the <a href="https://marcmagransdeabril.github.io/simple-web/includes/included.html">included.html</a> fragment</p>
  <div id="includeHtml"></div>
  <p>After the fragment</p>
</body>
</html>
```

## Namespaces 

While technically not a "namespace" in the classic sense, ES Modules are the modern, built-in solution for managing dependencies and preventing global scope pollution. Every module file has its own isolated scope by default.

Implementation (File 1: math.js)
```JavaScript

// math.js - Everything here is private unless exported
const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

Usage (File 2: main.js)
```JavaScript

// main.js - Import only what you need
import { add, subtract } from './math.js';
// To import everything under a namespace-like object:
import * as MathOps from './math.js'; 

const sum = add(5, 3); // 8
const diff = MathOps.subtract(10, 4); // 6
```

## (Web)Components

Modularize the design by using components.

What about directives?

## Interceptors

In JavaScript, network requests are primarily handled by two native APIs: XMLHttpRequest (the older standard) and the Fetch API (the modern standard).

To create an interceptor, you essentially "monkey patch" or wrap these native functions to execute custom logic before the request is sent and/or after the response is received.

1. Intercepting the Modern Fetch API
The fetch function is promise-based, making it relatively straightforward to wrap.

JavaScript

// Store the original fetch function
const originalFetch = window.fetch;

// Define your custom interceptor function
window.fetch = function (resource, options) {
    // --- REQUEST INTERCEPTION LOGIC (executed BEFORE the request is sent) ---
    console.log('Intercepting request:', resource);

    // 1. Modify the request: Add a standard header (e.g., for authentication)
    const newOptions = {
        ...options,
        headers: {
            'Authorization': 'Bearer YOUR_TOKEN_HERE',
            ...(options && options.headers)
        }
    };
    
    // Call the original fetch function
    return originalFetch(resource, newOptions)
        .then(response => {
            // --- RESPONSE INTERCEPTION LOGIC (executed AFTER the response is received) ---
            
            // 2. Handle global errors (e.g., log out on 401 Unauthorized)
            if (response.status === 401) {
                console.error('401 Unauthorized: User must be logged out or token refreshed.');
                // Add logic to redirect, refresh token, etc.
            }

            // You must clone the response if you need to read the body here,
            // as the body can only be read once.
            // const responseClone = response.clone(); 
            
            return response;
        })
        .catch(error => {
            // --- ERROR INTERCEPTION LOGIC (executed if the network request fails) ---
            console.error('Network request failed:', error);
            throw error; // Re-throw the error so the calling code can handle it
        });
};
2. Intercepting XMLHttpRequest (XHR)
While less common for new projects, many older libraries and some browser features still rely on XMLHttpRequest. Intercepting it is more complex as it involves overriding prototype methods.

JavaScript

// Store the original open and send methods
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;

// 1. Intercept `open()` to read/modify the request URL and method
XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    console.log(`XHR Request about to open: ${method} ${url}`);
    
    // You could modify the URL here before calling the original open
    // this.requestURL = url; // Store for later use
    
    originalOpen.apply(this, [method, url, ...rest]);
};

// 2. Intercept `send()` to read/modify request data and add headers
XMLHttpRequest.prototype.send = function(data) {
    // Add a custom request header
    this.setRequestHeader('X-Custom-ID', '12345');
    
    // Set up a listener for the response
    this.addEventListener('readystatechange', () => {
        if (this.readyState === 4) {
            // --- RESPONSE INTERCEPTION LOGIC ---
            if (this.status >= 400) {
                console.warn(`XHR Error: ${this.status} on ${this.responseURL}`);
            }
        }
    });
    
    // Call the original send method
    originalSend.call(this, data);
};
Key Differences from Frameworks
Frameworks (e.g., Axios, Angular): Provide a clean, declarative API (e.g., axios.interceptors.request.use(...)) to register multiple interceptor functions without needing to deal with monkey-patching.

Vanilla JS: Requires direct manipulation of native browser functions, which can be fragile, especially if multiple scripts try to override the same function.

## Directives
Structural Directives (e.g., *ngIf, *ngFor) modify the structure of the DOM by adding, removing, or manipulating elements.

Attribute Directives (e.g., ngClass, ngStyle) change the appearance or behavior of an existing element.

## Templates

1. Conditional Rendering (The *ngIf Equivalent)
For conditional rendering, you use jQuery's fundamental selection and manipulation methods:

To show/hide elements: You rely on the CSS display property using .show() and .hide(). However, this is more like Angular's [hidden] attribute, as the element remains in the DOM.

To add/remove elements (True *ngIf):

JavaScript

if (shouldShow) {
    // Element is currently removed, so add it back
    $('#parent-container').append($copiedElement); 
} else {
    // Element is currently visible, so remove it
    $('#content-container').remove(); 
}
2. Iteration (The *ngFor Equivalent)
For iteration, you combine a standard JavaScript loop with jQuery's DOM insertion or a separate templating utility:

Direct Iteration:

JavaScript

const users = [{ name: 'Alice' }, { name: 'Bob' }];
const $list = $('#list-container');
$list.empty(); // Clear the list first

users.forEach(user => {
    // Create new HTML on each loop and append it
    const $li = $('<li>').text(user.name);
    $list.append($li);
});
Templating Libraries: The most common way to handle complex iteration and conditionals outside of a full framework is by integrating a separate, dedicated templating library. Widely used examples include:

Handlebars.js

Mustache.js

EJS (Embedded JavaScript)

These libraries introduce their own specialized syntax for loops and conditionals within the HTML string (e.g., {{#each items}}...{{/each}} or {{#if condition}}...{{/if}}). You render the entire template string once and then use jQuery to insert the resulting HTML into the DOM.

## Multiple environments

## Minimization

## State management

## Epilogue: Douglas Crockford's Insights

Request data --> Change data --> Update web page elements --> post updated data




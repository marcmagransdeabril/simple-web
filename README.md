# How to build Frontend Applications without Frameworks?

The basic idea is to write a guide to develop frontend applications with a minimal overhead of libraries and frameworks. That is, instead of using complex frameworks, leverage as much as possible the latest CSS, HTML, and Javascript standards (implemented in the four major browsers: Chrome, Edge, Firefox, and Safari), and minimize the number of external dependencies. This is mean to simplify the overall frontend design, optimize long-term maintainability, and potentially improve the performance by reducing the number of software layers used.

## Includes

There are several ways to do this, but always through external libaries. 

An attractive example is using [jQuery](https://jquery.com/) which do not have the syntactic sweetness of an `<include>` tag or attribute, but it is likely to perdure given its long history:
```html
<html>
<head>
   <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
   <script>
      $(function() {
         $("#includeHtml").load("result.html");
      });
   </script>
</head>
<body>
   <h2>Program to include another HTML file in this HTML using <i>JQuery load</i></h2>
   <div id="includeHtml"></div>
</body>
</html>
```

Other [alternatives exist usign different libraries](https://css-tricks.com/the-simplest-ways-to-handle-html-includes/).


## Templates

## Multiple environments

## Minimization

## State management

Request data --> Change data --> Update web page elements --> post updated data




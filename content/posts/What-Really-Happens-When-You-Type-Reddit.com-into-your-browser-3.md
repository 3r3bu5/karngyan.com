---
id: 7
title: What Happens When You Type Reddit.com Into Your Browser ? Part(3) (Browser)
createdAt: "2022-12-14 5:00:00"
# image field is not mandatory
# you can skip it to keep the size of blog cards small
image: /images/whathappens/browser.jpg
tags:
  - network
  - browser
category: dev
author:
  name: Ashraf
  twitter: Er3bu5_
  image: /images/portfolio.png
---

This article is **part 3** of How Internet Works article series.

**[Part 1 (DNS)](https://a4raf-gehad.netlify.app/blog/What-Really-Happens-When-You-Type-Reddit.com-into-your-browser-1)**

**[Part 2 (Network)](https://a4raf-gehad.netlify.app/blog/What-Really-Happens-When-You-Type-Reddit.com-into-your-browser-2)**

---  

## How do browsers render the data returned from the server?  
Finally, we have received data from reddit.com. I am escaping the fact that the data is encrypted, but I will assume the data we have is magically decrypted somehow (maybe I will write an article about the encryption and decryption in the future). Also, the response is as simple as the following:  
```HTML  
<!DOCTYPE html>  
<html lang="en-US">  
  <head>  
    <meta charset="UTF-8" />  
    <title>reddit</title>  
link rel="stylesheet" href="styles.css" />  
    <script src="myscript.js"></script>  
  </head>  
  <body>  
    <h1 class="heading">reddit web page</h1>  
    <p>A paragraph with a <a href="https://example.com/about">link</a></p>  
    <div>  
img src="image.jpg" alt="image description" />  
    </div>  
    <script src="anotherscript.js"></script>  
  </body>  
</html>
```

To view the response we got from reddit.com the same way we usually see it printed on the screen,  
A browser has to go through three main steps:  
 **1- Parsing  
 2- Render   
 3- Interactivity**  
#### 1: Parsing  
##### 1.1 Building the HTML DOM tree  
The first step is processing and parsing HTML, which involves HTML DOM tree construction.  
DOM tree construction includes:  
    - HTML start and end tags `<div> , </div>`  
    - HTML attribute name and value: "div $attributeName=$value>"  
    - HTML tag content / child / token  `<div> $content </div>`  
![/images/whathappens/html-dom.gif](/images/whathappens/html-dom.gif)

The DOM tree:  
1:  Describes the content of the HTML document; the "html>" tag is the root node and the first node to be constructed.  
2:  Reflects the relationship and hierarchy between different element tags and nested tags.  
![/images/whathappens/dom.png](/images/whathappens/dom.png)

Here is a screenshot of the parsing HTML DOM step result for reddit.com.  
![/images/whathappens/parse-html.png](/images/whathappens/parse-html.png)

**The browser took  240 ms to build the DOM tree.**  
##### 1.2 Building the CSSOM tree  
The browser converts the CSS rules into a map of styles it can understand and work with. The browser goes through each rule set in the CSS, creating a tree of nodes with parent, child, and sibling relationships based on the CSS selectors.  
![/images/whathappens/Pasted-image-20221209151054.png](/images/whathappens/Pasted-image-20221209151054.png)

**The browser took 184 ms to parse CSS and construct the CSSOM tree.**  
##### 1.3 Preload Scanner  
It will parse through the external content available and request high-priority resources like CSS, JS, web fonts, images,.... So we don't have to wait until the parser finds a reference to an external resource to request it.  
Instead, the preload scanner will fetch them in the background so that the main parser reaches those resources, which may have already been downloaded.

External resource illustration:  
``` HTML
<link rel="stylesheet" href="styles.css" />  
<script src="myscript.js"></script>  
<img src="image.jpg" alt="image description" />  
<script src="anotherscript.js"></script>
```

##### 1.4 JS Compilation  
While the CSS is being parsed and the CSSOM is being created, other assets, including JavaScript files, are downloading (thanks to the preload scanner). JavaScript is interpreted, compiled, parsed, and executed.

#### 2: Render  
After the CSSOM and HTML DOM are constructed, they are combined into something called a "render tree," which is used to build the layout of every element painted on the screen.

The render tree decides which node to print on the screen. examples:  
* Any node with the "display: none" CSS attribute will not be printed on the screen.  
*  `<head>`  Tag and its children elements.  
* `<script>` Tags also are not printed on the screen.

Each node has its own CSSOM applied to it, and the render tree matches all elements with their corresponding styles defined in the CSSOM.

![/images/whathappens/render.jpg](/images/whathappens/render.jpg)

##### 2.1 Layout  
It is the process by which  
* the width,  
* height,  
*  And location on the screen  
of each node is determined, plus the size and position of each object on the page, the browser starts with the root node and traverses it. "Reflow" is any subsequent size and position determination of any part of the page or the entire document.  
![/images/whathappens/layout.png](/images/whathappens/layout.png)

**The layout phase took  161 ms to complete.**  
##### 2.2 Paint  
The last step in the critical path is painting the individual nodes on the screen. Each box calculated in the layout phase is converted to actual pixels on the screen in the painting or browser.Painting involves drawing every visual part of an element to the screen, including text, colors, borders, shadows, and replaced elements like buttons and images. The browser needs to do this very quickly.  
![/images/whathappens/paint.png](/images/whathappens/paint.png)

**The paint phase took  49 ms to complete, which is fast. **

##### 2.3 Compositing  
Consider it a reflow of all steps taken earlier to ensure that nodes are painted in the right order and content is rendered correctly.

#### 3- Interactivity  
Once the main thread is done painting the page, you would think we would be "all set." That isn't necessarily the case. If the load includes JavaScript, which was correctly deferred and only executed after the "onload" event fires, the main thread might be busy and not available for scrolling, touch, or other interactions.  
![/images/whathappens/browser.jpg](/images/whathappens/browser.jpg)

Finally, elements are printed on the browser screen as pixels. Now, you can interact with the webpage.
![/images/whathappens/Pasted-image-20221209164522.png](/images/whathappens/Pasted-image-20221209164522.png)

**It took the browser 10.22 seconds to do all this magic.**



#### References:   
https://www.cloudflare.com/learning/ssl/what-is-https/  
https://hpbn.co/transport-layer-security-tls/  
https://hacks.mozilla.org/2017/09/building-the-dom-faster-speculative-parsing-async-defer-and-preload/  
https://web.dev/howbrowserswork/  
https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#parsing

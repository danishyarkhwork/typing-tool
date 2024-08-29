export const htmlSteps = [
  // Level 1: Basic HTML
  {
    level: 1,
    instruction: "Step 1: Create a paragraph element with some text.",
    code: "<p>This is a simple paragraph.</p>",
  },
  {
    level: 1,
    instruction: "Step 2: Create a main heading followed by a subheading.",
    code: "<h1>This is a main heading</h1>\n<h2>This is a subheading</h2>",
  },
  {
    level: 1,
    instruction: "Step 3: Add a hyperlink that opens in a new tab.",
    code: '<a href="https://www.asantyping.com" target="_blank">Visit Example</a>',
  },
  {
    level: 1,
    instruction:
      "Step 4: Insert an image with alt text and set the width to 150px.",
    code: '<img src="https://via.placeholder.com/150" alt="Placeholder Image" width="150">',
  },
  {
    level: 1,
    instruction:
      "Step 5: Create a bold and italicized text inside a paragraph.",
    code: "<p>This is <b>bold</b> and <i>italicized</i> text.</p>",
  },

  // Level 2: Intermediate HTML
  {
    level: 2,
    instruction: "Step 6: Create an unordered list with three items.",
    code: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>",
  },
  {
    level: 2,
    instruction: "Step 7: Create an ordered list with steps for a process.",
    code: "<ol>\n  <li>Step 1</li>\n  <li>Step 2</li>\n  <li>Step 3</li>\n</ol>",
  },
  {
    level: 2,
    instruction: "Step 8: Create a table with a header row and two data rows.",
    code: `<table border="1">\n  <tr>\n    <th>Header 1</th>\n    <th>Header 2</th>\n  </tr>\n  <tr>\n    <td>Data 1</td>\n    <td>Data 2</td>\n  </tr>\n  <tr>\n    <td>Data 3</td>\n    <td>Data 4</td>\n  </tr>\n</table>`,
  },
  {
    level: 2,
    instruction: "Step 9: Add a blockquote with citation information.",
    code: '<blockquote cite="https://www.asantyping.com">\n  This is a blockquote from Asan Typing.\n</blockquote>',
  },
  {
    level: 2,
    instruction: "Step 10: Add a preformatted code snippet.",
    code: "<pre><code>\nfunction greet() {\n  console.log('Hello, World!');\n}\ngreet();\n</code></pre>",
  },

  // Level 3: Forms and Input
  {
    level: 3,
    instruction:
      "Step 11: Create a simple contact form with text inputs and a submit button.",
    code: `<form action="/submit" method="post">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name"><br><br>\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email"><br><br>\n  <input type="submit" value="Submit">\n</form>`,
  },
  {
    level: 3,
    instruction:
      "Step 12: Add checkboxes and radio buttons for selecting preferences.",
    code: `<form>\n  <label for="newsletter">Subscribe to newsletter</label>\n  <input type="checkbox" id="newsletter" name="newsletter"><br><br>\n  <label for="gender">Male</label>\n  <input type="radio" id="male" name="gender" value="male"><br>\n  <label for="female">Female</label>\n  <input type="radio" id="female" name="gender" value="female">\n</form>`,
  },
  {
    level: 3,
    instruction: "Step 13: Create a select dropdown with multiple options.",
    code: `<form>\n  <label for="cars">Choose a car:</label>\n  <select id="cars" name="cars">\n    <option value="volvo">Volvo</option>\n    <option value="saab">Saab</option>\n    <option value="mercedes">Mercedes</option>\n    <option value="audi">Audi</option>\n  </select>\n</form>`,
  },
  {
    level: 3,
    instruction: "Step 14: Create a text area for user comments.",
    code: `<form>\n  <label for="comments">Comments:</label><br>\n  <textarea id="comments" name="comments" rows="4" cols="50"></textarea>\n</form>`,
  },

  // Level 4: Multimedia
  {
    level: 4,
    instruction: "Step 15: Embed an audio file with playback controls.",
    code: '<audio controls>\n  <source src="audio.mp3" type="audio/mp3">\n  Your browser does not support the audio element.\n</audio>',
  },
  {
    level: 4,
    instruction:
      "Step 16: Embed a video file with controls and custom dimensions.",
    code: '<video width="320" height="240" controls>\n  <source src="movie.mp4" type="video/mp4">\n  Your browser does not support the video tag.\n</video>',
  },
  {
    level: 4,
    instruction: "Step 17: Add a YouTube video using an iframe.",
    code: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
  },

  // Level 5: Semantic HTML
  {
    level: 5,
    instruction:
      "Step 18: Create a semantic header and footer with navigation links.",
    code: `<header>\n  <h1>My Website</h1>\n  <nav>\n    <ul>\n      <li><a href="#home">Home</a></li>\n      <li><a href="#about">About</a></li>\n      <li><a href="#contact">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n<footer>\n  <p>© 2024 My Website</p>\n</footer>`,
  },
  {
    level: 5,
    instruction:
      "Step 19: Use section and article elements to structure content.",
    code: `<section>\n  <article>\n    <h2>Article Title</h2>\n    <p>This is the content of the article.</p>\n  </article>\n  <article>\n    <h2>Another Article Title</h2>\n    <p>This is another article's content.</p>\n  </article>\n</section>`,
  },
  {
    level: 5,
    instruction: "Step 20: Create an aside element for related content.",
    code: `<aside>\n  <h3>Related Content</h3>\n  <p>This is some related content placed in an aside.</p>\n</aside>`,
  },

  // Level 6: Advanced Topics
  {
    level: 6,
    instruction: "Step 21: Create a canvas element and draw a rectangle.",
    code: `<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>\n<script>\n  var c = document.getElementById("myCanvas");\n  var ctx = c.getContext("2d");\n  ctx.fillStyle = "#FF0000";\n  ctx.fillRect(20, 20, 150, 100);\n</script>`,
  },
  {
    level: 6,
    instruction: "Step 22: Create an SVG graphic with a circle and rectangle.",
    code: `<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />\n  <rect x="10" y="10" width="30" height="30" stroke="blue" stroke-width="3" fill="yellow" />\n</svg>`,
  },
  {
    level: 6,
    instruction:
      "Step 23: Use data attributes to store additional information.",
    code: `<button data-user-id="123" data-role="admin">Click Me</button>`,
  },
  {
    level: 6,
    instruction:
      "Step 24: Add a simple HTML5 video player with custom controls.",
    code: `<video id="videoPlayer" width="400" controls>\n  <source src="movie.mp4" type="video/mp4">\n  Your browser does not support HTML5 video.\n</video>\n<script>\n  var video = document.getElementById("videoPlayer");\n  function playPause() {\n    if (video.paused) video.play();\n    else video.pause();\n  }\n</script>`,
  },
];

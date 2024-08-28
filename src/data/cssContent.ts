export const cssSteps = [
  // Level 1: Basic CSS
  {
    level: 1,
    instruction: "Step 1: Change the background color of a paragraph.",
    code: "p {\n  background-color: lightblue;\n}",
  },
  {
    level: 1,
    instruction: "Step 2: Center-align the text inside an h1 element.",
    code: "h1 {\n  text-align: center;\n}",
  },
  {
    level: 1,
    instruction: "Step 3: Add padding and a border to a div element.",
    code: "div {\n  padding: 20px;\n  border: 2px solid black;\n}",
  },
  {
    level: 1,
    instruction: "Step 4: Set a fixed width and height for an image.",
    code: "img {\n  width: 150px;\n  height: 150px;\n}",
  },
  {
    level: 1,
    instruction: "Step 5: Change the color and font size of a link.",
    code: "a {\n  color: red;\n  font-size: 18px;\n}",
  },

  // Level 2: Intermediate CSS
  {
    level: 2,
    instruction: "Step 6: Create a two-column layout using floats.",
    code: ".left {\n  float: left;\n  width: 50%;\n}\n.right {\n  float: right;\n  width: 50%;\n}",
  },
  {
    level: 2,
    instruction: "Step 7: Add a hover effect to a button.",
    code: "button:hover {\n  background-color: green;\n  color: white;\n}",
  },
  {
    level: 2,
    instruction: "Step 8: Create a navigation bar with horizontal links.",
    code: `nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  background-color: #333;\n}\nnav ul li {\n  float: left;\n}\nnav ul li a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}`,
  },
  {
    level: 2,
    instruction: "Step 9: Add a box shadow to a card element.",
    code: ".card {\n  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n  padding: 16px;\n}",
  },
  {
    level: 2,
    instruction: "Step 10: Use the border-radius property to round corners.",
    code: ".box {\n  border-radius: 10px;\n  background-color: lightgray;\n  padding: 20px;\n}",
  },

  // Level 3: CSS Layout Techniques
  {
    level: 3,
    instruction: "Step 11: Create a flex container with evenly spaced items.",
    code: `.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}`,
  },
  {
    level: 3,
    instruction: "Step 12: Create a grid layout with three equal columns.",
    code: `.grid-container {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n}\n.grid-item {\n  background-color: #f0f0f0;\n  padding: 20px;\n  text-align: center;\n}`,
  },
  {
    level: 3,
    instruction: "Step 13: Create a responsive layout using media queries.",
    code: `@media only screen and (max-width: 600px) {\n  .container {\n    flex-direction: column;\n  }\n}`,
  },
  {
    level: 3,
    instruction: "Step 14: Add a sticky header to a webpage.",
    code: `header {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  background-color: yellow;\n  padding: 10px;\n  font-size: 20px;\n}`,
  },

  // Level 4: Advanced CSS Techniques
  {
    level: 4,
    instruction: "Step 15: Create a CSS animation for a loading spinner.",
    code: `.spinner {\n  border: 16px solid #f3f3f3;\n  border-top: 16px solid #3498db;\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  animation: spin 2s linear infinite;\n}\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}`,
  },
  {
    level: 4,
    instruction: "Step 16: Add a transition effect to a button.",
    code: `button {\n  background-color: blue;\n  color: white;\n  padding: 14px 20px;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\nbutton:hover {\n  background-color: darkblue;\n}`,
  },
  {
    level: 4,
    instruction: "Step 17: Create a keyframe animation for a fading text.",
    code: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.text {\n  animation: fadeIn 2s ease-in;\n}`,
  },

  // Level 5: CSS Grid and Flexbox Advanced Topics
  {
    level: 5,
    instruction: "Step 18: Create a complex grid layout with nested grids.",
    code: `.grid-container {\n  display: grid;\n  grid-template-areas: \n    "header header header"\n    "menu main main"\n    "menu footer footer";\n  grid-gap: 10px;\n}\n.grid-container > div {\n  padding: 20px;\n  background-color: rgba(255, 255, 255, 0.8);\n}\n.header { grid-area: header; }\n.menu { grid-area: menu; }\n.main { grid-area: main; }\n.footer { grid-area: footer; }`,
  },
  {
    level: 5,
    instruction: "Step 19: Use Flexbox to create a responsive navbar.",
    code: `nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #333;\n  padding: 10px;\n}\nnav a {\n  color: white;\n  padding: 14px 20px;\n  text-decoration: none;\n  text-align: center;\n}\nnav a:hover {\n  background-color: #ddd;\n  color: black;\n}`,
  },
  {
    level: 5,
    instruction: "Step 20: Create a CSS grid-based gallery layout.",
    code: `.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));\n  grid-gap: 10px;\n}\n.gallery img {\n  width: 100%;\n  height: auto;\n}`,
  },
];

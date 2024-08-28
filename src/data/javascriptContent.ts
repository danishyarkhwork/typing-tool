export const jsSteps = [
  // Level 1: Basic JavaScript
  {
    level: 1,
    instruction: "Step 1: Declare a variable and assign it a value.",
    code: `let myVar = 10;`,
  },
  {
    level: 1,
    instruction: "Step 2: Write a function that adds two numbers.",
    code: `function addNumbers(a, b) {\n  return a + b;\n}`,
  },
  {
    level: 1,
    instruction: "Step 3: Create an array of numbers.",
    code: `let numbers = [1, 2, 3, 4, 5];`,
  },
  {
    level: 1,
    instruction: "Step 4: Create an object with properties and values.",
    code: `let person = {\n  name: "John",\n  age: 30,\n  city: "New York"\n};`,
  },
  {
    level: 1,
    instruction: "Step 5: Write a loop that logs numbers 1 through 5.",
    code: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
  },

  // Level 2: Intermediate JavaScript
  {
    level: 2,
    instruction:
      "Step 6: Write a function that returns the square of a number.",
    code: `function square(num) {\n  return num * num;\n}`,
  },
  {
    level: 2,
    instruction:
      "Step 7: Use an array method to find the first number greater than 10.",
    code: `let numbers = [5, 12, 8, 130, 44];\nlet first = numbers.find(num => num > 10);`,
  },
  {
    level: 2,
    instruction:
      "Step 8: Write a function that converts a string to uppercase.",
    code: `function toUpperCase(str) {\n  return str.toUpperCase();\n}`,
  },
  {
    level: 2,
    instruction: "Step 9: Create an array of objects and sort them by age.",
    code: `let people = [\n  { name: "John", age: 25 },\n  { name: "Jane", age: 30 },\n  { name: "Peter", age: 20 }\n];\npeople.sort((a, b) => a.age - b.age);`,
  },
  {
    level: 2,
    instruction:
      "Step 10: Use a regular expression to validate an email address.",
    code: `function validateEmail(email) {\n  let regex = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;\n  return regex.test(email);\n}`,
  },

  // Level 3: JavaScript DOM Manipulation
  {
    level: 3,
    instruction:
      "Step 11: Change the text content of an HTML element by its ID.",
    code: `document.getElementById("myElement").textContent = "Hello World!";`,
  },
  {
    level: 3,
    instruction: "Step 12: Add a new item to an unordered list.",
    code: `let ul = document.getElementById("myList");\nlet li = document.createElement("li");\nli.textContent = "New Item";\nul.appendChild(li);`,
  },
  {
    level: 3,
    instruction:
      "Step 13: Change the background color of a div when a button is clicked.",
    code: `document.getElementById("myButton").addEventListener("click", function() {\n  document.getElementById("myDiv").style.backgroundColor = "lightblue";\n});`,
  },
  {
    level: 3,
    instruction:
      "Step 14: Show an alert with a message when a form is submitted.",
    code: `document.getElementById("myForm").addEventListener("submit", function(event) {\n  event.preventDefault();\n  alert("Form submitted!");\n});`,
  },
  {
    level: 3,
    instruction:
      "Step 15: Toggle a CSS class on an element when it is clicked.",
    code: `document.getElementById("myElement").addEventListener("click", function() {\n  this.classList.toggle("active");\n});`,
  },

  // Level 4: JavaScript Events and Callbacks
  {
    level: 4,
    instruction:
      "Step 16: Write a callback function that logs a message after a delay.",
    code: `function logMessage() {\n  console.log("This is a delayed message.");\n}\nsetTimeout(logMessage, 2000);`,
  },
  {
    level: 4,
    instruction:
      "Step 17: Create a simple event listener that logs a key press.",
    code: `document.addEventListener("keydown", function(event) {\n  console.log("Key pressed: " + event.key);\n});`,
  },
  {
    level: 4,
    instruction:
      "Step 18: Write a function that runs when the window is resized.",
    code: `window.addEventListener("resize", function() {\n  console.log("Window resized to " + window.innerWidth + "x" + window.innerHeight);\n});`,
  },
  {
    level: 4,
    instruction:
      "Step 19: Create a function that is executed every second using setInterval.",
    code: `let counter = 0;\nsetInterval(function() {\n  counter++;\n  console.log("Counter: " + counter);\n}, 1000);`,
  },
  {
    level: 4,
    instruction:
      "Step 20: Write a function that changes the image source when a button is clicked.",
    code: `document.getElementById("changeImage").addEventListener("click", function() {\n  document.getElementById("myImage").src = "https://via.placeholder.com/150";\n});`,
  },

  // Level 5: Advanced JavaScript Concepts
  {
    level: 5,
    instruction:
      "Step 21: Write a function that returns a promise which resolves after 2 seconds.",
    code: `function delay() {\n  return new Promise(resolve => setTimeout(resolve, 2000));\n}\ndelay().then(() => console.log("Promise resolved!"));`,
  },
  {
    level: 5,
    instruction:
      "Step 22: Use async/await to call a function that returns a promise.",
    code: `async function asyncCall() {\n  console.log("Calling...");\n  await delay();\n  console.log("Done!");\n}`,
  },
  {
    level: 5,
    instruction:
      "Step 23: Create a function that uses the fetch API to get data from a public API.",
    code: `fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));`,
  },
  {
    level: 5,
    instruction:
      "Step 24: Write a function that uses local storage to save and retrieve data.",
    code: `function saveData(key, value) {\n  localStorage.setItem(key, value);\n}\nfunction getData(key) {\n  return localStorage.getItem(key);\n}`,
  },
  {
    level: 5,
    instruction:
      "Step 25: Write a function that dynamically creates and appends elements to the DOM.",
    code: `function createElement(tag, text) {\n  let element = document.createElement(tag);\n  element.textContent = text;\n  document.body.appendChild(element);\n}\ncreateElement("p", "This is a dynamically created paragraph.");`,
  },
];

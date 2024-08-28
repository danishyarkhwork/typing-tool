export const tailwindSteps = [
  // Level 1: Basic Tailwind
  {
    level: 1,
    instruction: "Step 1: Create a centered paragraph with a blue background.",
    code: `<div class="flex justify-center items-center h-screen">\n  <p class="bg-blue-500 text-white p-4 rounded">This is a centered paragraph.</p>\n</div>`,
  },
  {
    level: 1,
    instruction: "Step 2: Create a heading with custom font size and color.",
    code: `<h1 class="text-3xl font-bold text-purple-600">This is a custom heading</h1>`,
  },
  {
    level: 1,
    instruction:
      "Step 3: Create a button with padding, rounded corners, and hover effect.",
    code: `<button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">Click Me</button>`,
  },
  {
    level: 1,
    instruction:
      "Step 4: Create an image with rounded-full class and a shadow.",
    code: `<img src="https://via.placeholder.com/150" alt="Placeholder" class="rounded-full shadow-lg">`,
  },
  {
    level: 1,
    instruction: "Step 5: Create a link with underline and hover effect.",
    code: `<a href="#" class="text-blue-600 underline hover:text-blue-800">Visit Link</a>`,
  },

  // Level 2: Tailwind Layouts
  {
    level: 2,
    instruction:
      "Step 6: Create a two-column layout using Tailwind's grid system.",
    code: `<div class="grid grid-cols-2 gap-4">\n  <div class="bg-gray-200 p-4">Column 1</div>\n  <div class="bg-gray-200 p-4">Column 2</div>\n</div>`,
  },
  {
    level: 2,
    instruction: "Step 7: Create a flexbox container with centered items.",
    code: `<div class="flex justify-center items-center h-screen bg-gray-100">\n  <div class="bg-white p-10 rounded-lg shadow-lg">\n    Centered Box\n  </div>\n</div>`,
  },
  {
    level: 2,
    instruction: "Step 8: Create a responsive navbar with flexbox.",
    code: `<nav class="flex justify-between items-center p-4 bg-gray-800 text-white">\n  <div class="text-lg font-bold">Brand</div>\n  <div class="space-x-4">\n    <a href="#" class="hover:text-gray-400">Home</a>\n    <a href="#" class="hover:text-gray-400">About</a>\n    <a href="#" class="hover:text-gray-400">Contact</a>\n  </div>\n</nav>`,
  },
  {
    level: 2,
    instruction: "Step 9: Create a card with an image, title, and description.",
    code: `<div class="max-w-sm rounded overflow-hidden shadow-lg">\n  <img class="w-full" src="https://via.placeholder.com/300x200" alt="Placeholder">\n  <div class="px-6 py-4">\n    <div class="font-bold text-xl mb-2">Card Title</div>\n    <p class="text-gray-700 text-base">This is a card description.</p>\n  </div>\n</div>`,
  },
  {
    level: 2,
    instruction: "Step 10: Create a button group with space between buttons.",
    code: `<div class="space-x-4">\n  <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">Button 1</button>\n  <button class="px-4 py-2 bg-gray-500 text-white rounded-lg">Button 2</button>\n</div>`,
  },

  // Level 3: Tailwind Responsive Design
  {
    level: 3,
    instruction:
      "Step 11: Create a responsive grid layout with different column counts on mobile and desktop.",
    code: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">\n  <div class="bg-red-200 p-4">Item 1</div>\n  <div class="bg-red-200 p-4">Item 2</div>\n  <div class="bg-red-200 p-4">Item 3</div>\n</div>`,
  },
  {
    level: 3,
    instruction:
      "Step 12: Create a responsive text that changes size based on screen width.",
    code: `<p class="text-sm md:text-lg lg:text-xl">This text changes size based on screen width.</p>`,
  },
  {
    level: 3,
    instruction:
      "Step 13: Create a hidden sidebar on mobile that becomes visible on desktop.",
    code: `<div class="hidden md:block md:w-1/4 bg-gray-800 text-white p-4">\n  Sidebar Content\n</div>`,
  },
  {
    level: 3,
    instruction:
      "Step 14: Create a sticky header that stays at the top on scroll.",
    code: `<header class="sticky top-0 bg-white shadow-md p-4">\n  Sticky Header\n</header>`,
  },

  // Level 4: Tailwind Advanced Techniques
  {
    level: 4,
    instruction: "Step 15: Create a custom utility class for a glowing effect.",
    code: `<div class="glow p-4 text-white rounded-lg bg-blue-500">\n  Glowing Box\n</div>\n\n<style>\n  .glow {\n    box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);\n  }\n</style>`,
  },
  {
    level: 4,
    instruction: "Step 16: Create a dropdown menu that appears on hover.",
    code: `<div class="relative group">\n  <button class="px-4 py-2 bg-gray-800 text-white rounded-lg">Menu</button>\n  <div class="absolute hidden group-hover:block bg-white text-gray-900 p-4 rounded-lg shadow-lg">\n    <a href="#" class="block px-4 py-2">Option 1</a>\n    <a href="#" class="block px-4 py-2">Option 2</a>\n    <a href="#" class="block px-4 py-2">Option 3</a>\n  </div>\n</div>`,
  },
  {
    level: 4,
    instruction:
      "Step 17: Create a pulse animation using Tailwind's animation utilities.",
    code: `<div class="animate-pulse p-4 bg-red-500 text-white rounded-lg">\n  Pulsing Box\n</div>`,
  },

  // Level 5: Tailwind Grid and Flexbox
  {
    level: 5,
    instruction: "Step 18: Create a responsive grid with auto-fill columns.",
    code: `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">\n  <div class="bg-blue-200 p-4">Grid Item 1</div>\n  <div class="bg-blue-200 p-4">Grid Item 2</div>\n  <div class="bg-blue-200 p-4">Grid Item 3</div>\n  <div class="bg-blue-200 p-4">Grid Item 4</div>\n</div>`,
  },
  {
    level: 5,
    instruction:
      "Step 19: Create a centered flexbox container with evenly spaced items.",
    code: `<div class="flex justify-evenly items-center h-64 bg-gray-100">\n  <div class="bg-blue-500 text-white p-4 rounded-lg">Item 1</div>\n  <div class="bg-blue-500 text-white p-4 rounded-lg">Item 2</div>\n  <div class="bg-blue-500 text-white p-4 rounded-lg">Item 3</div>\n</div>`,
  },
  {
    level: 5,
    instruction:
      "Step 20: Create a responsive gallery layout with Tailwind CSS.",
    code: `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">\n  <div class="bg-gray-300 p-4">Gallery Item 1</div>\n  <div class="bg-gray-300 p-4">Gallery Item 2</div>\n  <div class="bg-gray-300 p-4">Gallery Item 3</div>\n  <div class="bg-gray-300 p-4">Gallery Item 4</div>\n</div>`,
  },
];

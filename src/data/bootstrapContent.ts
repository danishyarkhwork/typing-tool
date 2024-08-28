export const bootstrapSteps = [
  // Level 1: Basic Bootstrap
  {
    level: 1,
    instruction: "Step 1: Add a Bootstrap container with a responsive design.",
    code: `<div class="container">\n  <p>This is a responsive container.</p>\n</div>`,
  },
  {
    level: 1,
    instruction: "Step 2: Create a Bootstrap button with primary style.",
    code: `<button type="button" class="btn btn-primary">Primary Button</button>`,
  },
  {
    level: 1,
    instruction: "Step 3: Create a Bootstrap alert with a close button.",
    code: `<div class="alert alert-warning alert-dismissible fade show" role="alert">\n  <strong>Warning!</strong> This is a warning alert.\n  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\n</div>`,
  },
  {
    level: 1,
    instruction: "Step 4: Create a Bootstrap card with an image and text.",
    code: `<div class="card" style="width: 18rem;">\n  <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">\n  <div class="card-body">\n    <h5 class="card-title">Card Title</h5>\n    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\n    <a href="#" class="btn btn-primary">Go somewhere</a>\n  </div>\n</div>`,
  },
  {
    level: 1,
    instruction: "Step 5: Create a Bootstrap navbar with a brand and links.",
    code: `<nav class="navbar navbar-expand-lg navbar-light bg-light">\n  <a class="navbar-brand" href="#">Navbar</a>\n  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n    <span class="navbar-toggler-icon"></span>\n  </button>\n  <div class="collapse navbar-collapse" id="navbarNav">\n    <ul class="navbar-nav">\n      <li class="nav-item">\n        <a class="nav-link active" href="#">Home</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Features</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Pricing</a>\n      </li>\n    </ul>\n  </div>\n</nav>`,
  },

  // Level 2: Bootstrap Grid System
  {
    level: 2,
    instruction:
      "Step 6: Create a two-column layout using Bootstrap's grid system.",
    code: `<div class="container">\n  <div class="row">\n    <div class="col-md-6">Column 1</div>\n    <div class="col-md-6">Column 2</div>\n  </div>\n</div>`,
  },
  {
    level: 2,
    instruction: "Step 7: Create a Bootstrap form with inline form controls.",
    code: `<form class="row g-3">\n  <div class="col-auto">\n    <label for="inputEmail" class="visually-hidden">Email</label>\n    <input type="email" class="form-control" id="inputEmail" placeholder="Email">\n  </div>\n  <div class="col-auto">\n    <label for="inputPassword" class="visually-hidden">Password</label>\n    <input type="password" class="form-control" id="inputPassword" placeholder="Password">\n  </div>\n  <div class="col-auto">\n    <button type="submit" class="btn btn-primary mb-3">Submit</button>\n  </div>\n</form>`,
  },
  {
    level: 2,
    instruction: "Step 8: Create a Bootstrap modal with a title and body text.",
    code: `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>\n\n<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>\n        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n      </div>\n      <div class="modal-body">\n        This is the body text of the modal.\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>`,
  },
  {
    level: 2,
    instruction: "Step 9: Create a Bootstrap list group with badges.",
    code: `<ul class="list-group">\n  <li class="list-group-item d-flex justify-content-between align-items-center">\n    Cras justo odio\n    <span class="badge bg-primary rounded-pill">14</span>\n  </li>\n  <li class="list-group-item d-flex justify-content-between align-items-center">\n    Dapibus ac facilisis in\n    <span class="badge bg-primary rounded-pill">2</span>\n  </li>\n  <li class="list-group-item d-flex justify-content-between align-items-center">\n    Morbi leo risus\n    <span class="badge bg-primary rounded-pill">1</span>\n  </li>\n</ul>`,
  },
  {
    level: 2,
    instruction: "Step 10: Create a Bootstrap table with a striped style.",
    code: `<table class="table table-striped">\n  <thead>\n    <tr>\n      <th scope="col">#</th>\n      <th scope="col">First</th>\n      <th scope="col">Last</th>\n      <th scope="col">Handle</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">1</th>\n      <td>Mark</td>\n      <td>Otto</td>\n      <td>@mdo</td>\n    </tr>\n    <tr>\n      <th scope="row">2</th>\n      <td>Jacob</td>\n      <td>Thornton</td>\n      <td>@fat</td>\n    </tr>\n    <tr>\n      <th scope="row">3</th>\n      <td>Larry</td>\n      <td>the Bird</td>\n      <td>@twitter</td>\n    </tr>\n  </tbody>\n</table>`,
  },

  // Level 3: Bootstrap Components
  {
    level: 3,
    instruction: "Step 11: Create a Bootstrap carousel with three slides.",
    code: `<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">\n  <div class="carousel-inner">\n    <div class="carousel-item active">\n      <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="...">\n    </div>\n    <div class="carousel-item">\n      <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="...">\n    </div>\n    <div class="carousel-item">\n      <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="...">\n    </div>\n  </div>\n  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">\n    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n    <span class="visually-hidden">Previous</span>\n  </button>\n  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">\n    <span class="carousel-control-next-icon" aria-hidden="true"></span>\n    <span class="visually-hidden">Next</span>\n  </button>\n</div>`,
  },
  {
    level: 3,
    instruction: "Step 12: Create a Bootstrap accordion with three items.",
    code: `<div class="accordion" id="accordionExample">\n  <div class="accordion-item">\n    <h2 class="accordion-header" id="headingOne">\n      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\n        Accordion Item #1\n      </button>\n    </h2>\n    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">\n      <div class="accordion-body">\n        This is the first item's accordion body.\n      </div>\n    </div>\n  </div>\n  <div class="accordion-item">\n    <h2 class="accordion-header" id="headingTwo">\n      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">\n        Accordion Item #2\n      </button>\n    </h2>\n    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">\n      <div class="accordion-body">\n        This is the second item's accordion body.\n      </div>\n    </div>\n  </div>\n  <div class="accordion-item">\n    <h2 class="accordion-header" id="headingThree">\n      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">\n        Accordion Item #3\n      </button>\n    </h2>\n    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">\n      <div class="accordion-body">\n        This is the third item's accordion body.\n      </div>\n    </div>\n  </div>\n</div>`,
  },
  {
    level: 3,
    instruction: "Step 13: Create a Bootstrap progress bar with a label.",
    code: `<div class="progress">\n  <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>\n</div>`,
  },
  {
    level: 3,
    instruction: "Step 14: Create a Bootstrap breadcrumb navigation.",
    code: `<nav aria-label="breadcrumb">\n  <ol class="breadcrumb">\n    <li class="breadcrumb-item"><a href="#">Home</a></li>\n    <li class="breadcrumb-item"><a href="#">Library</a></li>\n    <li class="breadcrumb-item active" aria-current="page">Data</li>\n  </ol>\n</nav>`,
  },

  // Level 4: Bootstrap Utility Classes
  {
    level: 4,
    instruction:
      "Step 15: Create a Bootstrap responsive layout with utility classes.",
    code: `<div class="container">\n  <div class="row">\n    <div class="col-12 col-md-8">Main content area</div>\n    <div class="col-6 col-md-4">Sidebar</div>\n  </div>\n</div>`,
  },
  {
    level: 4,
    instruction:
      "Step 16: Create a Bootstrap text alignment with utility classes.",
    code: `<p class="text-center">This text is centered.</p>\n<p class="text-end">This text is aligned to the right.</p>`,
  },
  {
    level: 4,
    instruction:
      "Step 17: Create a Bootstrap margin and padding with utility classes.",
    code: `<div class="p-5 mb-4 bg-light rounded-3">\n  <div class="container-fluid py-5">\n    <h1 class="display-5 fw-bold">Bootstrap Utility Classes</h1>\n    <p class="col-md-8 fs-4">Quickly apply margin, padding, color, and more with Bootstrap's utility classes.</p>\n  </div>\n</div>`,
  },

  // Level 5: Advanced Bootstrap Components
  {
    level: 5,
    instruction: "Step 18: Create a Bootstrap tooltip on hover.",
    code: `<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">\n  Tooltip on top\n</button>\n\n<script>\n  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));\n  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {\n    return new bootstrap.Tooltip(tooltipTriggerEl);\n  });\n</script>`,
  },
  {
    level: 5,
    instruction: "Step 19: Create a Bootstrap toast notification.",
    code: `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">\n  <div class="toast-header">\n    <strong class="me-auto">Bootstrap</strong>\n    <small>11 mins ago</small>\n    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>\n  </div>\n  <div class="toast-body">\n    Hello, world! This is a toast message.\n  </div>\n</div>`,
  },
  {
    level: 5,
    instruction: "Step 20: Create a Bootstrap offcanvas sidebar.",
    code: `<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">\n  Toggle Offcanvas\n</button>\n\n<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">\n  <div class="offcanvas-header">\n    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>\n    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>\n  </div>\n  <div class="offcanvas-body">\n    <div>\n      Some placeholder text for the offcanvas sidebar.\n    </div>\n  </div>\n</div>`,
  },
];

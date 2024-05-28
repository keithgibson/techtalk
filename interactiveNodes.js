import * as Zdog from "zdog";

import { animate } from "./neuralNetworkAnimation.js";

const YELLOW = "#EBCB8B";
const GREY_LIGHT = "#D0D6E1";
const BLINK_DURATION = 70;
let TICKS = 0;

// Create a new Zdog illustration
const ILLO = new Zdog.Illustration({
  element: "#zdog-canvas",
  dragRotate: true,
  resize: true,
  onResize: function (width, height) {
    let minSize = Math.min(width, height);
    this.zoom = minSize / 300;
  },
});

// Define the node properties
const NODE_DIAMETER = 0;
const NODE_STROKE = 8;
const NODE_COLOR = GREY_LIGHT + "dd";

// Define the link properties
const LINK_STROKE = 1.5;
const LINK_COLOR = GREY_LIGHT + "30";

// Create the first node
const NODE1 = new Zdog.Ellipse({
  addTo: ILLO,
  diameter: NODE_DIAMETER,
  stroke: 0,
  color: NODE_COLOR,
  translate: {
    x: (Math.random() * 100 - 100) - 30,
    y: (Math.random() * 100 - 100) - 30,
    z: (Math.random() * 100 - 100) - 30,
  },
});

// Create the second node
const NODE2 = new Zdog.Ellipse({
  addTo: ILLO,
  diameter: NODE_DIAMETER,
  stroke: 0,
  color: NODE_COLOR,
  translate: {
    x: (Math.random() * 100 - 50) - 60,
    y: (Math.random() * 100 - 50) - 10,
    z: (Math.random() * 100 - 50) - 60,
  },
});

// Create the link between the nodes
const LINK = new Zdog.Shape({
  addTo: ILLO,
  path: [
    { x: NODE1.translate.x, y: NODE1.translate.y, z: NODE1.translate.z },
    { x: NODE2.translate.x, y: NODE2.translate.y, z: NODE2.translate.z },
  ],
  stroke: 0,
  color: LINK_COLOR + "00",
});

// Define the animation loop
function animateNode(stopAnimation = false) {
  TICKS++;

  // Rotate the whole illustration slowly
  rotate();

  ILLO.updateRenderGraph();
  // requestAnimationFrame(animateNode);
  requestAnimationFrame(() => animateNode(stopAnimation));

}

function rotate() {
  ILLO.rotate.y += 0.001;
  ILLO.rotate.x += 0.001;
  ILLO.rotate.z += 0.001;
}

// Function to show the link
function showLink() {
  LINK.stroke = LINK_STROKE;
  LINK.color = LINK_COLOR;
}

function hideLink() {
  LINK.stroke = 0;
  LINK.color = LINK_COLOR;
}

function showNode1() {
  NODE1.stroke = NODE_STROKE;
  NODE1.color = NODE_COLOR;
}

function showNode2() {
  NODE2.stroke = NODE_STROKE;
  NODE2.color = NODE_COLOR;
}

function hideNode2() {
  NODE2.stroke = 0;
  NODE2.color = NODE_COLOR;
}


let clickCount = 0;
function handleClick() {
  console.log('handleClick called');

  // console.log('clickCount = ' + clickCount);
  if (clickCount === 0) {
    showNode1();
    // createIllustration({ numNodes: 100, numLinks: 0 }, true);
    console.log('clickCount should be 0', clickCount);
    showNode2();
    showLink();
  }
  if (clickCount === 1) {
    // hideNode2();
    // hideLink();
    animate();
  }
  if (clickCount === 2) {
  }

  if (clickCount === 3) {
    clickCount = -1;

  }
  clickCount++;
}

// Start the animation
// createIllustration({ numNodes: 100, numLinks: 0 });
// animateNode();
// showNode1();
animate();

// document.addEventListener("DOMContentLoaded", function() {
//   document.addEventListener("click", handleClick);
// });

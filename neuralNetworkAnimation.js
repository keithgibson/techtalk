// @ts-nocheck
// neuralNetworkAnimation.js
// forked from https://hungyi.net/posts/pseudo-3d-force-graph/#fn.2

import * as Zdog from "zdog";
import {
  forceSimulation,
  forceLink,
  forceManyBody
} from "d3-force-3d";

const YELLOW = '#EBCB8B';
const GREY_LIGHT = '#D0D6E1';
const BLINK_DURATION = 70;
let TICKS = 0;

class Node {
  constructor(id, { x, y, z }) {
    this.id = id;
    this.position = { x, y, z };
  }

  // This interface ensures D3 can work with us
  get x() { return this.position.x }
  set x(v) { this.position.x = v }
  get y() { return this.position.y }
  set y(v) { this.position.y = v }
  get z() { return this.position.z }
  set z(v) { this.position.z = v }

  blink() {
    this._blinkT0 = TICKS;
  }

  render() {
    if (!this._renderable) {
      this._renderable = new Zdog.Ellipse({
        addTo: ILLO,
        diameter: 0,
        stroke: 8,
        color: GREY_LIGHT + 'dd',
      });
    }

    this._renderable.translate = { ...this.position };

    this.renderBlink();
  }

  renderBlink() {
    const blinkProgress = (TICKS - this._blinkT0) / BLINK_DURATION;
    if (blinkProgress <= 1) {
      const alpha = Zdog.easeInOut(blinkProgress, 3);
      if (!this._blinkRenderable) {
        this._blinkRenderable = new Zdog.Ellipse({
          addTo: this._renderable,
          diameter: 0,
          stroke: this._renderable.stroke - 5 ,
          color: YELLOW + '00',
        });
      }
      this._blinkRenderable.color = YELLOW + alphaToOpacity(1 - alpha);
      this._blinkRenderable.diameter = alpha * this._renderable.stroke * 7;
      this._blinkRenderable.stroke = alpha * this._renderable.stroke * 3;
    } else {
      if (this._blinkRenderable) {
        this._renderable.removeChild(this._blinkRenderable);
        this._blinkRenderable = null;
      }
    }
  }
}

class Link {
  constructor(sourceId, targetId) {
    this.id = `${sourceId}->${targetId}`;
    this.source = NODE_MAP.get(sourceId);
    this.target = NODE_MAP.get(targetId);
  }

  blink() {
    this._blinkT0 = TICKS;
    this.source.blink();
    this.target.blink();
  }

  render() {
    if (!this._renderable) {
      this._renderable = new Zdog.Shape({
        addTo: ILLO,
        path: [
          { ...this.source.position },
          { ...this.target.position },
        ],
        stroke: 1,
        color: GREY_LIGHT + '16',
      });
    }

    this.renderBlink();

    this._renderable.path = [
      { ...this.source.position },
      { ...this.target.position },
    ];
    this._renderable.updatePath();
  }

  renderBlink() {
    const blinkProgress = (TICKS - this._blinkT0) / BLINK_DURATION;
    if (blinkProgress <= 1) {
      // Fade in and out with easing
      const alpha = (0.5 - Math.abs(Zdog.easeInOut(blinkProgress, 3) - 0.5)) / 2;

      // If nothing rendered for the blink effect, create the shape
      if (!this._blinkRenderable) {
        this._blinkRenderable = new Zdog.Shape({
          addTo: this._renderable,
          path: [
            { ...this.source.position },
            { ...this.target.position },
          ],
          stroke: 3,
          color: YELLOW + '00',
        });
      }

      // Update colors for blink effect and main Link shape
      this._blinkRenderable.color = YELLOW + alphaToOpacity(alpha);
      this._renderable.color = YELLOW + alphaToOpacity(0.2 + alpha)
    } else {
      // If not blinking or blinking done, remove the blink effect shape
      if (this._blinkRenderable) {
        this._renderable.removeChild(this._blinkRenderable);
        this._blinkRenderable = null;
        this._renderable.color = GREY_LIGHT + '16';
      }
    }
  }
}

const ILLO = new Zdog.Illustration({
  element: '#zdog-canvas',
  dragRotate: true,
  resize: true,
  onResize: function (width, height) {
    let minSize = Math.min(width, height);
    this.zoom = minSize / 2 / 200;
  },
});

// Generate random nodes and space them out reasonably randomly
const NODES = new Array(850)
  .fill(null)
  .map((_, i) => new Node(
    i,
    {
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      z: Math.random() * 400 - 200
    }
  ));

// Easier ways to access nodes quickly
const NODE_MAP = new Map(NODES.map(n => [n.id, n]));
const NODE_IDS = Array.from(NODE_MAP.keys());

// Generate links with some "clustering" structure
const LINKS = new Array(150).fill(null).flatMap(() => {
  // Choose a random start node
  const startNodeId = NODE_IDS[Math.floor(Math.random() * NODE_IDS.length)];
  // Link the start node to one or more end nodes.
  // One outgoing link will be way more likely than
  // 10+ outgoing links by using Math.pow distribution
    return new Array(Math.ceil(Math.pow(Math.random() * 1.8, 4)))
      .fill(null)
      .map(() => new Link(
        startNodeId,
        NODE_IDS[Math.floor(Math.random() * NODE_IDS.length)]
      ));
  });
//   const numLinks = Math.ceil(Math.pow(Math.random() * 1.8, 4));
//   return new Array(numLinks)
//     .fill(null)
//     .map(() => new Link(
//       startNodeId,
//       NODE_IDS[Math.floor(Math.random() * NODE_IDS.length)]
//     ));
// })
//   .filter((link, i, links) => {
//     // Make sure each node has a minimum of two links
//     const nodeId = link.sourceId === link.targetId ? link.sourceId : link.targetId;
//     const nodeLinks = links.filter(l => l.sourceId === nodeId || l.targetId === nodeId);
//     return nodeLinks.length >= 2;
//   });



// Apply 3d force-directed layout using D3.js
forceSimulation(NODES, 1.5)
  .force("link", forceLink(LINKS).id(d => d.id))
  .force("charge", forceManyBody());

// Update & render
function animate(stopAnimation = false) {
  if (stopAnimation) {
    console.log('stopAnimation = true');
    location.reload();
    return;
  }

  // Each update is one tick
  TICKS++;

  // Update the rendering for nodes and links
  NODES.forEach(node => node.render());
  LINKS.forEach(link => {
    link.render();

    // Small chance to randomly blink each link
    if (Math.random() > 0.9995) {
      link.blink();
    }
  });

  // Rotate the whole illustration slowly
  ILLO.rotate.y += 0.0001;
  ILLO.rotate.x += 0.0002;
  ILLO.rotate.z += 0.00015;

  ILLO.updateRenderGraph();
  requestAnimationFrame(() => animate(stopAnimation));
}


// // Converts an alpha value [0,1] to a hex string
// // for appending to a hex color string
function alphaToOpacity(alpha) {
  return Math.floor(alpha * 256).toString(16).padStart(2, '0')
}


// ... (previous code remains unchanged)

function createIllustration(options, stopAnimation = false) {
  if (stopAnimation) {
    return;
  }
  const {
    numNodes = 450,
    numLinks = 150,
    nodeSpacing = 400,
    linkChance = 0.9995,
    rotationSpeed = { x: 0.0008, y: 0.0004, z: 0.0006 },
  } = options;

  const NODES = new Array(numNodes)
    .fill(null)
    .map((_, i) => new Node(
      i,
      {
        x: Math.random() * nodeSpacing - nodeSpacing / 2,
        y: Math.random() * nodeSpacing - nodeSpacing / 2,
        z: Math.random() * nodeSpacing - nodeSpacing / 2
      }
    ));

  const NODE_MAP = new Map(NODES.map(n => [n.id, n]));
  const NODE_IDS = Array.from(NODE_MAP.keys());

  const LINKS = new Array(numLinks).fill(null).flatMap(() => {
    const startNodeId = NODE_IDS[Math.floor(Math.random() * NODE_IDS.length)];
    const numOutgoingLinks = Math.ceil(Math.pow(Math.random() * 1.8, 4));
    return new Array(numOutgoingLinks)
      .fill(null)
      .map(() => new Link(
        startNodeId,
        NODE_IDS[Math.floor(Math.random() * NODE_IDS.length)]
      ));
  })
    .filter((link, i, links) => {
      const nodeId = link.sourceId === link.targetId ? link.sourceId : link.targetId;
      const nodeLinks = links.filter(l => l.sourceId === nodeId || l.targetId === nodeId);
      return nodeLinks.length >= 2;
    });

  forceSimulation(NODES, 2)
    .force("link", forceLink(LINKS).id(d => d.id))
    .force("charge", forceManyBody());

  function animate() {
    TICKS++;

    NODES.forEach(node => node.render());
    LINKS.forEach(link => {
      link.render();

      if (Math.random() > linkChance) {
        link.blink();
      }
    });

    // ILLO.rotate.y += rotationSpeed.y;
    // ILLO.rotate.x += rotationSpeed.x;
    // ILLO.rotate.z += rotationSpeed.z;
    ILLO.rotate.y += 0.0001;
    ILLO.rotate.x += 0.0002;
    ILLO.rotate.z += 0.00015;

    ILLO.updateRenderGraph();
    requestAnimationFrame(() => animate(stopAnimation));
  }
  animate();
}


// a) Execute with current values
// createIllustration({});

// // b) Show only one node, no links
// createIllustration({ numNodes: 1, numLinks: 0 });

// // c) Show two nodes
// createIllustration({ numNodes: 2, numLinks: 0 });

// // e) Show many nodes without links
// createIllustration({ numNodes: 100, numLinks: 0 });

export { animate, createIllustration };

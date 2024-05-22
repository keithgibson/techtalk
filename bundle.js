(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var js = {exports: {}};

	var boilerplate = {exports: {}};

	/*!
	 * Zdog v1.1.3
	 * Round, flat, designer-friendly pseudo-3D engine
	 * Licensed MIT
	 * https://zzz.dog
	 * Copyright 2020 Metafizzy
	 */

	var hasRequiredBoilerplate;

	function requireBoilerplate () {
		if (hasRequiredBoilerplate) return boilerplate.exports;
		hasRequiredBoilerplate = 1;
		(function (module) {
			/**
			 * Boilerplate & utils
			 */

			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory();
			  } else {
			    // browser global
			    root.Zdog = factory();
			  }
			}( commonjsGlobal, function factory() {

			var Zdog = {};

			Zdog.TAU = Math.PI * 2;

			Zdog.extend = function( a, b ) {
			  for ( var prop in b ) {
			    a[ prop ] = b[ prop ];
			  }
			  return a;
			};

			Zdog.lerp = function( a, b, alpha ) {
			  return ( b - a ) * alpha + a;
			};

			Zdog.modulo = function( num, div ) {
			  return ( ( num % div ) + div ) % div;
			};

			var powerMultipliers = {
			  2: function( a ) {
			    return a * a;
			  },
			  3: function( a ) {
			    return a * a * a;
			  },
			  4: function( a ) {
			    return a * a * a * a;
			  },
			  5: function( a ) {
			    return a * a * a * a * a;
			  },
			};

			Zdog.easeInOut = function( alpha, power ) {
			  if ( power == 1 ) {
			    return alpha;
			  }
			  alpha = Math.max( 0, Math.min( 1, alpha ) );
			  var isFirstHalf = alpha < 0.5;
			  var slope = isFirstHalf ? alpha : 1 - alpha;
			  slope /= 0.5;
			  // make easing steeper with more multiples
			  var powerMultiplier = powerMultipliers[ power ] || powerMultipliers[2];
			  var curve = powerMultiplier( slope );
			  curve /= 2;
			  return isFirstHalf ? curve : 1 - curve;
			};

			return Zdog;

			} ) ); 
		} (boilerplate));
		return boilerplate.exports;
	}

	var canvasRenderer = {exports: {}};

	/**
	 * CanvasRenderer
	 */

	var hasRequiredCanvasRenderer;

	function requireCanvasRenderer () {
		if (hasRequiredCanvasRenderer) return canvasRenderer.exports;
		hasRequiredCanvasRenderer = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory();
			  } else {
			    // browser global
			    root.Zdog.CanvasRenderer = factory();
			  }
			}( commonjsGlobal, function factory() {

			var CanvasRenderer = { isCanvas: true };

			CanvasRenderer.begin = function( ctx ) {
			  ctx.beginPath();
			};

			CanvasRenderer.move = function( ctx, elem, point ) {
			  ctx.moveTo( point.x, point.y );
			};

			CanvasRenderer.line = function( ctx, elem, point ) {
			  ctx.lineTo( point.x, point.y );
			};

			CanvasRenderer.bezier = function( ctx, elem, cp0, cp1, end ) {
			  ctx.bezierCurveTo( cp0.x, cp0.y, cp1.x, cp1.y, end.x, end.y );
			};

			CanvasRenderer.closePath = function( ctx ) {
			  ctx.closePath();
			};

			CanvasRenderer.setPath = function() {};

			CanvasRenderer.renderPath = function( ctx, elem, pathCommands, isClosed ) {
			  this.begin( ctx, elem );
			  pathCommands.forEach( function( command ) {
			    command.render( ctx, elem, CanvasRenderer );
			  } );
			  if ( isClosed ) {
			    this.closePath( ctx, elem );
			  }
			};

			CanvasRenderer.stroke = function( ctx, elem, isStroke, color, lineWidth ) {
			  if ( !isStroke ) {
			    return;
			  }
			  ctx.strokeStyle = color;
			  ctx.lineWidth = lineWidth;
			  ctx.stroke();
			};

			CanvasRenderer.fill = function( ctx, elem, isFill, color ) {
			  if ( !isFill ) {
			    return;
			  }
			  ctx.fillStyle = color;
			  ctx.fill();
			};

			CanvasRenderer.end = function() {};

			return CanvasRenderer;

			} ) ); 
		} (canvasRenderer));
		return canvasRenderer.exports;
	}

	var svgRenderer = {exports: {}};

	/**
	 * SvgRenderer
	 */

	var hasRequiredSvgRenderer;

	function requireSvgRenderer () {
		if (hasRequiredSvgRenderer) return svgRenderer.exports;
		hasRequiredSvgRenderer = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory();
			  } else {
			    // browser global
			    root.Zdog.SvgRenderer = factory();
			  }
			}( commonjsGlobal, function factory() {

			var SvgRenderer = { isSvg: true };

			// round path coordinates to 3 decimals
			var round = SvgRenderer.round = function( num ) {
			  return Math.round( num * 1000 ) / 1000;
			};

			function getPointString( point ) {
			  return round( point.x ) + ',' + round( point.y ) + ' ';
			}

			SvgRenderer.begin = function() {};

			SvgRenderer.move = function( svg, elem, point ) {
			  return 'M' + getPointString( point );
			};

			SvgRenderer.line = function( svg, elem, point ) {
			  return 'L' + getPointString( point );
			};

			SvgRenderer.bezier = function( svg, elem, cp0, cp1, end ) {
			  return 'C' + getPointString( cp0 ) + getPointString( cp1 ) +
			    getPointString( end );
			};

			SvgRenderer.closePath = function( /* elem */) {
			  return 'Z';
			};

			SvgRenderer.setPath = function( svg, elem, pathValue ) {
			  elem.setAttribute( 'd', pathValue );
			};

			SvgRenderer.renderPath = function( svg, elem, pathCommands, isClosed ) {
			  var pathValue = '';
			  pathCommands.forEach( function( command ) {
			    pathValue += command.render( svg, elem, SvgRenderer );
			  } );
			  if ( isClosed ) {
			    pathValue += this.closePath( svg, elem );
			  }
			  this.setPath( svg, elem, pathValue );
			};

			SvgRenderer.stroke = function( svg, elem, isStroke, color, lineWidth ) {
			  if ( !isStroke ) {
			    return;
			  }
			  elem.setAttribute( 'stroke', color );
			  elem.setAttribute( 'stroke-width', lineWidth );
			};

			SvgRenderer.fill = function( svg, elem, isFill, color ) {
			  var fillColor = isFill ? color : 'none';
			  elem.setAttribute( 'fill', fillColor );
			};

			SvgRenderer.end = function( svg, elem ) {
			  svg.appendChild( elem );
			};

			return SvgRenderer;

			} ) ); 
		} (svgRenderer));
		return svgRenderer.exports;
	}

	var vector = {exports: {}};

	/**
	 * Vector
	 */

	var hasRequiredVector;

	function requireVector () {
		if (hasRequiredVector) return vector.exports;
		hasRequiredVector = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Vector = factory( Zdog );
			  }

			}( commonjsGlobal, function factory( utils ) {

			function Vector( position ) {
			  this.set( position );
			}

			var TAU = utils.TAU;

			// 'pos' = 'position'
			Vector.prototype.set = function( pos ) {
			  this.x = pos && pos.x || 0;
			  this.y = pos && pos.y || 0;
			  this.z = pos && pos.z || 0;
			  return this;
			};

			// set coordinates without sanitizing
			// vec.write({ y: 2 }) only sets y coord
			Vector.prototype.write = function( pos ) {
			  if ( !pos ) {
			    return this;
			  }
			  this.x = pos.x != undefined ? pos.x : this.x;
			  this.y = pos.y != undefined ? pos.y : this.y;
			  this.z = pos.z != undefined ? pos.z : this.z;
			  return this;
			};

			Vector.prototype.rotate = function( rotation ) {
			  if ( !rotation ) {
			    return;
			  }
			  this.rotateZ( rotation.z );
			  this.rotateY( rotation.y );
			  this.rotateX( rotation.x );
			  return this;
			};

			Vector.prototype.rotateZ = function( angle ) {
			  rotateProperty( this, angle, 'x', 'y' );
			};

			Vector.prototype.rotateX = function( angle ) {
			  rotateProperty( this, angle, 'y', 'z' );
			};

			Vector.prototype.rotateY = function( angle ) {
			  rotateProperty( this, angle, 'x', 'z' );
			};

			function rotateProperty( vec, angle, propA, propB ) {
			  if ( !angle || angle % TAU === 0 ) {
			    return;
			  }
			  var cos = Math.cos( angle );
			  var sin = Math.sin( angle );
			  var a = vec[ propA ];
			  var b = vec[ propB ];
			  vec[ propA ] = a * cos - b * sin;
			  vec[ propB ] = b * cos + a * sin;
			}

			Vector.prototype.isSame = function( pos ) {
			  if ( !pos ) {
			    return false;
			  }
			  return this.x === pos.x && this.y === pos.y && this.z === pos.z;
			};

			Vector.prototype.add = function( pos ) {
			  if ( !pos ) {
			    return this;
			  }
			  this.x += pos.x || 0;
			  this.y += pos.y || 0;
			  this.z += pos.z || 0;
			  return this;
			};

			Vector.prototype.subtract = function( pos ) {
			  if ( !pos ) {
			    return this;
			  }
			  this.x -= pos.x || 0;
			  this.y -= pos.y || 0;
			  this.z -= pos.z || 0;
			  return this;
			};

			Vector.prototype.multiply = function( pos ) {
			  if ( pos == undefined ) {
			    return this;
			  }
			  // multiple all values by same number
			  if ( typeof pos == 'number' ) {
			    this.x *= pos;
			    this.y *= pos;
			    this.z *= pos;
			  } else {
			    // multiply object
			    this.x *= pos.x != undefined ? pos.x : 1;
			    this.y *= pos.y != undefined ? pos.y : 1;
			    this.z *= pos.z != undefined ? pos.z : 1;
			  }
			  return this;
			};

			Vector.prototype.transform = function( translation, rotation, scale ) {
			  this.multiply( scale );
			  this.rotate( rotation );
			  this.add( translation );
			  return this;
			};

			Vector.prototype.lerp = function( pos, alpha ) {
			  this.x = utils.lerp( this.x, pos.x || 0, alpha );
			  this.y = utils.lerp( this.y, pos.y || 0, alpha );
			  this.z = utils.lerp( this.z, pos.z || 0, alpha );
			  return this;
			};

			Vector.prototype.magnitude = function() {
			  var sum = this.x * this.x + this.y * this.y + this.z * this.z;
			  return getMagnitudeSqrt( sum );
			};

			function getMagnitudeSqrt( sum ) {
			  // PERF: check if sum ~= 1 and skip sqrt
			  if ( Math.abs( sum - 1 ) < 0.00000001 ) {
			    return 1;
			  }
			  return Math.sqrt( sum );
			}

			Vector.prototype.magnitude2d = function() {
			  var sum = this.x * this.x + this.y * this.y;
			  return getMagnitudeSqrt( sum );
			};

			Vector.prototype.copy = function() {
			  return new Vector( this );
			};

			return Vector;

			} ) ); 
		} (vector));
		return vector.exports;
	}

	var anchor = {exports: {}};

	/**
	 * Anchor
	 */

	var hasRequiredAnchor;

	function requireAnchor () {
		if (hasRequiredAnchor) return anchor.exports;
		hasRequiredAnchor = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireVector(),
			        requireCanvasRenderer(), requireSvgRenderer() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Anchor = factory( Zdog, Zdog.Vector, Zdog.CanvasRenderer,
			        Zdog.SvgRenderer );
			  }
			}( commonjsGlobal, function factory( utils, Vector, CanvasRenderer, SvgRenderer ) {

			var TAU = utils.TAU;
			var onePoint = { x: 1, y: 1, z: 1 };

			function Anchor( options ) {
			  this.create( options || {} );
			}

			Anchor.prototype.create = function( options ) {
			  this.children = [];
			  // set defaults & options
			  utils.extend( this, this.constructor.defaults );
			  this.setOptions( options );

			  // transform
			  this.translate = new Vector( options.translate );
			  this.rotate = new Vector( options.rotate );
			  this.scale = new Vector( onePoint ).multiply( this.scale );
			  // origin
			  this.origin = new Vector();
			  this.renderOrigin = new Vector();

			  if ( this.addTo ) {
			    this.addTo.addChild( this );
			  }
			};

			Anchor.defaults = {};

			Anchor.optionKeys = Object.keys( Anchor.defaults ).concat([
			  'rotate',
			  'translate',
			  'scale',
			  'addTo',
			]);

			Anchor.prototype.setOptions = function( options ) {
			  var optionKeys = this.constructor.optionKeys;

			  for ( var key in options ) {
			    if ( optionKeys.indexOf( key ) != -1 ) {
			      this[ key ] = options[ key ];
			    }
			  }
			};

			Anchor.prototype.addChild = function( shape ) {
			  if ( this.children.indexOf( shape ) != -1 ) {
			    return;
			  }
			  shape.remove(); // remove previous parent
			  shape.addTo = this; // keep parent reference
			  this.children.push( shape );
			};

			Anchor.prototype.removeChild = function( shape ) {
			  var index = this.children.indexOf( shape );
			  if ( index != -1 ) {
			    this.children.splice( index, 1 );
			  }
			};

			Anchor.prototype.remove = function() {
			  if ( this.addTo ) {
			    this.addTo.removeChild( this );
			  }
			};

			// ----- update ----- //

			Anchor.prototype.update = function() {
			  // update self
			  this.reset();
			  // update children
			  this.children.forEach( function( child ) {
			    child.update();
			  } );
			  this.transform( this.translate, this.rotate, this.scale );
			};

			Anchor.prototype.reset = function() {
			  this.renderOrigin.set( this.origin );
			};

			Anchor.prototype.transform = function( translation, rotation, scale ) {
			  this.renderOrigin.transform( translation, rotation, scale );
			  // transform children
			  this.children.forEach( function( child ) {
			    child.transform( translation, rotation, scale );
			  } );
			};

			Anchor.prototype.updateGraph = function() {
			  this.update();
			  this.updateFlatGraph();
			  this.flatGraph.forEach( function( item ) {
			    item.updateSortValue();
			  } );
			  // z-sort
			  this.flatGraph.sort( Anchor.shapeSorter );
			};

			Anchor.shapeSorter = function( a, b ) {
			  return a.sortValue - b.sortValue;
			};

			// custom getter to check for flatGraph before using it
			Object.defineProperty( Anchor.prototype, 'flatGraph', {
			  get: function() {
			    if ( !this._flatGraph ) {
			      this.updateFlatGraph();
			    }
			    return this._flatGraph;
			  },
			  set: function( graph ) {
			    this._flatGraph = graph;
			  },
			} );

			Anchor.prototype.updateFlatGraph = function() {
			  this.flatGraph = this.getFlatGraph();
			};

			// return Array of self & all child graph items
			Anchor.prototype.getFlatGraph = function() {
			  var flatGraph = [ this ];
			  return this.addChildFlatGraph( flatGraph );
			};

			Anchor.prototype.addChildFlatGraph = function( flatGraph ) {
			  this.children.forEach( function( child ) {
			    var childFlatGraph = child.getFlatGraph();
			    Array.prototype.push.apply( flatGraph, childFlatGraph );
			  } );
			  return flatGraph;
			};

			Anchor.prototype.updateSortValue = function() {
			  this.sortValue = this.renderOrigin.z;
			};

			// ----- render ----- //

			Anchor.prototype.render = function() {};

			// TODO refactor out CanvasRenderer so its not a dependency within anchor.js
			Anchor.prototype.renderGraphCanvas = function( ctx ) {
			  if ( !ctx ) {
			    throw new Error( 'ctx is ' + ctx + '. ' +
			      'Canvas context required for render. Check .renderGraphCanvas( ctx ).' );
			  }
			  this.flatGraph.forEach( function( item ) {
			    item.render( ctx, CanvasRenderer );
			  } );
			};

			Anchor.prototype.renderGraphSvg = function( svg ) {
			  if ( !svg ) {
			    throw new Error( 'svg is ' + svg + '. ' +
			      'SVG required for render. Check .renderGraphSvg( svg ).' );
			  }
			  this.flatGraph.forEach( function( item ) {
			    item.render( svg, SvgRenderer );
			  } );
			};

			// ----- misc ----- //

			Anchor.prototype.copy = function( options ) {
			  // copy options
			  var itemOptions = {};
			  var optionKeys = this.constructor.optionKeys;
			  optionKeys.forEach( function( key ) {
			    itemOptions[ key ] = this[ key ];
			  }, this );
			  // add set options
			  utils.extend( itemOptions, options );
			  var ItemClass = this.constructor;
			  return new ItemClass( itemOptions );
			};

			Anchor.prototype.copyGraph = function( options ) {
			  var clone = this.copy( options );
			  this.children.forEach( function( child ) {
			    child.copyGraph({
			      addTo: clone,
			    });
			  } );
			  return clone;
			};

			Anchor.prototype.normalizeRotate = function() {
			  this.rotate.x = utils.modulo( this.rotate.x, TAU );
			  this.rotate.y = utils.modulo( this.rotate.y, TAU );
			  this.rotate.z = utils.modulo( this.rotate.z, TAU );
			};

			// ----- subclass ----- //

			function getSubclass( Super ) {
			  return function( defaults ) {
			    // create constructor
			    function Item( options ) {
			      this.create( options || {} );
			    }

			    Item.prototype = Object.create( Super.prototype );
			    Item.prototype.constructor = Item;

			    Item.defaults = utils.extend( {}, Super.defaults );
			    utils.extend( Item.defaults, defaults );
			    // create optionKeys
			    Item.optionKeys = Super.optionKeys.slice( 0 );
			    // add defaults keys to optionKeys, dedupe
			    Object.keys( Item.defaults ).forEach( function( key ) {
			      if ( !Item.optionKeys.indexOf( key ) != 1 ) {
			        Item.optionKeys.push( key );
			      }
			    } );

			    Item.subclass = getSubclass( Item );

			    return Item;
			  };
			}

			Anchor.subclass = getSubclass( Anchor );

			return Anchor;

			} ) ); 
		} (anchor));
		return anchor.exports;
	}

	var dragger = {exports: {}};

	/**
	 * Dragger
	 */

	var hasRequiredDragger;

	function requireDragger () {
		if (hasRequiredDragger) return dragger.exports;
		hasRequiredDragger = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory();
			  } else {
			    // browser global
			    root.Zdog.Dragger = factory();
			  }
			}( commonjsGlobal, function factory() {

			// quick & dirty drag event stuff
			// messes up if multiple pointers/touches

			// check for browser window #85
			var hasWindow = typeof window != 'undefined';
			// event support, default to mouse events
			var downEvent = 'mousedown';
			var moveEvent = 'mousemove';
			var upEvent = 'mouseup';
			if ( hasWindow ) {
			  if ( window.PointerEvent ) {
			    // PointerEvent, Chrome
			    downEvent = 'pointerdown';
			    moveEvent = 'pointermove';
			    upEvent = 'pointerup';
			  } else if ( 'ontouchstart' in window ) {
			    // Touch Events, iOS Safari
			    downEvent = 'touchstart';
			    moveEvent = 'touchmove';
			    upEvent = 'touchend';
			  }
			}

			function noop() {}

			function Dragger( options ) {
			  this.create( options || {} );
			}

			Dragger.prototype.create = function( options ) {
			  this.onDragStart = options.onDragStart || noop;
			  this.onDragMove = options.onDragMove || noop;
			  this.onDragEnd = options.onDragEnd || noop;

			  this.bindDrag( options.startElement );
			};

			Dragger.prototype.bindDrag = function( element ) {
			  element = this.getQueryElement( element );
			  if ( !element ) {
			    return;
			  }
			  // disable browser gestures #53
			  element.style.touchAction = 'none';
			  element.addEventListener( downEvent, this );
			};

			Dragger.prototype.getQueryElement = function( element ) {
			  if ( typeof element == 'string' ) {
			    // with string, query selector
			    element = document.querySelector( element );
			  }
			  return element;
			};

			Dragger.prototype.handleEvent = function( event ) {
			  var method = this[ 'on' + event.type ];
			  if ( method ) {
			    method.call( this, event );
			  }
			};

			Dragger.prototype.onmousedown =
			Dragger.prototype.onpointerdown = function( event ) {
			  this.dragStart( event, event );
			};

			Dragger.prototype.ontouchstart = function( event ) {
			  this.dragStart( event, event.changedTouches[0] );
			};

			Dragger.prototype.dragStart = function( event, pointer ) {
			  event.preventDefault();
			  this.dragStartX = pointer.pageX;
			  this.dragStartY = pointer.pageY;
			  if ( hasWindow ) {
			    window.addEventListener( moveEvent, this );
			    window.addEventListener( upEvent, this );
			  }
			  this.onDragStart( pointer );
			};

			Dragger.prototype.ontouchmove = function( event ) {
			  // HACK, moved touch may not be first
			  this.dragMove( event, event.changedTouches[0] );
			};

			Dragger.prototype.onmousemove =
			Dragger.prototype.onpointermove = function( event ) {
			  this.dragMove( event, event );
			};

			Dragger.prototype.dragMove = function( event, pointer ) {
			  event.preventDefault();
			  var moveX = pointer.pageX - this.dragStartX;
			  var moveY = pointer.pageY - this.dragStartY;
			  this.onDragMove( pointer, moveX, moveY );
			};

			Dragger.prototype.onmouseup =
			Dragger.prototype.onpointerup =
			Dragger.prototype.ontouchend =
			Dragger.prototype.dragEnd = function( /* event */) {
			  window.removeEventListener( moveEvent, this );
			  window.removeEventListener( upEvent, this );
			  this.onDragEnd();
			};

			return Dragger;

			} ) ); 
		} (dragger));
		return dragger.exports;
	}

	var illustration = {exports: {}};

	/**
	 * Illustration
	 */

	var hasRequiredIllustration;

	function requireIllustration () {
		if (hasRequiredIllustration) return illustration.exports;
		hasRequiredIllustration = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireAnchor(),
			        requireDragger() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Illustration = factory( Zdog, Zdog.Anchor, Zdog.Dragger );
			  }
			}( commonjsGlobal, function factory( utils, Anchor, Dragger ) {

			function noop() {}
			var TAU = utils.TAU;

			var Illustration = Anchor.subclass({
			  element: undefined,
			  centered: true,
			  zoom: 1,
			  dragRotate: false,
			  resize: false,
			  onPrerender: noop,
			  onDragStart: noop,
			  onDragMove: noop,
			  onDragEnd: noop,
			  onResize: noop,
			});

			utils.extend( Illustration.prototype, Dragger.prototype );

			Illustration.prototype.create = function( options ) {
			  Anchor.prototype.create.call( this, options );
			  Dragger.prototype.create.call( this, options );
			  this.setElement( this.element );
			  this.setDragRotate( this.dragRotate );
			  this.setResize( this.resize );
			};

			Illustration.prototype.setElement = function( element ) {
			  element = this.getQueryElement( element );
			  if ( !element ) {
			    throw new Error( 'Zdog.Illustration element required. Set to ' + element );
			  }

			  var nodeName = element.nodeName.toLowerCase();
			  if ( nodeName == 'canvas' ) {
			    this.setCanvas( element );
			  } else if ( nodeName == 'svg' ) {
			    this.setSvg( element );
			  }
			};

			Illustration.prototype.setSize = function( width, height ) {
			  width = Math.round( width );
			  height = Math.round( height );
			  if ( this.isCanvas ) {
			    this.setSizeCanvas( width, height );
			  } else if ( this.isSvg ) {
			    this.setSizeSvg( width, height );
			  }
			};

			Illustration.prototype.setResize = function( resize ) {
			  this.resize = resize;
			  // create resize event listener
			  if ( !this.resizeListener ) {
			    this.resizeListener = this.onWindowResize.bind( this );
			  }
			  // add/remove event listener
			  if ( resize ) {
			    window.addEventListener( 'resize', this.resizeListener );
			    this.onWindowResize();
			  } else {
			    window.removeEventListener( 'resize', this.resizeListener );
			  }
			};

			// TODO debounce this?
			Illustration.prototype.onWindowResize = function() {
			  this.setMeasuredSize();
			  this.onResize( this.width, this.height );
			};

			Illustration.prototype.setMeasuredSize = function() {
			  var width, height;
			  var isFullscreen = this.resize == 'fullscreen';
			  if ( isFullscreen ) {
			    width = window.innerWidth;
			    height = window.innerHeight;
			  } else {
			    var rect = this.element.getBoundingClientRect();
			    width = rect.width;
			    height = rect.height;
			  }
			  this.setSize( width, height );
			};

			// ----- render ----- //

			Illustration.prototype.renderGraph = function( item ) {
			  if ( this.isCanvas ) {
			    this.renderGraphCanvas( item );
			  } else if ( this.isSvg ) {
			    this.renderGraphSvg( item );
			  }
			};

			// combo method
			Illustration.prototype.updateRenderGraph = function( item ) {
			  this.updateGraph();
			  this.renderGraph( item );
			};

			// ----- canvas ----- //

			Illustration.prototype.setCanvas = function( element ) {
			  this.element = element;
			  this.isCanvas = true;
			  // update related properties
			  this.ctx = this.element.getContext('2d');
			  // set initial size
			  this.setSizeCanvas( element.width, element.height );
			};

			Illustration.prototype.setSizeCanvas = function( width, height ) {
			  this.width = width;
			  this.height = height;
			  // up-rez for hi-DPI devices
			  var pixelRatio = this.pixelRatio = window.devicePixelRatio || 1;
			  this.element.width = this.canvasWidth = width * pixelRatio;
			  this.element.height = this.canvasHeight = height * pixelRatio;
			  var needsHighPixelRatioSizing = pixelRatio > 1 && !this.resize;
			  if ( needsHighPixelRatioSizing ) {
			    this.element.style.width = width + 'px';
			    this.element.style.height = height + 'px';
			  }
			};

			Illustration.prototype.renderGraphCanvas = function( item ) {
			  item = item || this;
			  this.prerenderCanvas();
			  Anchor.prototype.renderGraphCanvas.call( item, this.ctx );
			  this.postrenderCanvas();
			};

			Illustration.prototype.prerenderCanvas = function() {
			  var ctx = this.ctx;
			  ctx.lineCap = 'round';
			  ctx.lineJoin = 'round';
			  ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
			  ctx.save();
			  if ( this.centered ) {
			    var centerX = this.width / 2 * this.pixelRatio;
			    var centerY = this.height / 2 * this.pixelRatio;
			    ctx.translate( centerX, centerY );
			  }
			  var scale = this.pixelRatio * this.zoom;
			  ctx.scale( scale, scale );
			  this.onPrerender( ctx );
			};

			Illustration.prototype.postrenderCanvas = function() {
			  this.ctx.restore();
			};

			// ----- svg ----- //

			Illustration.prototype.setSvg = function( element ) {
			  this.element = element;
			  this.isSvg = true;
			  this.pixelRatio = 1;
			  // set initial size from width & height attributes
			  var width = element.getAttribute('width');
			  var height = element.getAttribute('height');
			  this.setSizeSvg( width, height );
			};

			Illustration.prototype.setSizeSvg = function( width, height ) {
			  this.width = width;
			  this.height = height;
			  var viewWidth = width / this.zoom;
			  var viewHeight = height / this.zoom;
			  var viewX = this.centered ? -viewWidth/2 : 0;
			  var viewY = this.centered ? -viewHeight/2 : 0;
			  this.element.setAttribute( 'viewBox', viewX + ' ' + viewY + ' ' +
			    viewWidth + ' ' + viewHeight );
			  if ( this.resize ) {
			    // remove size attributes, let size be determined by viewbox
			    this.element.removeAttribute('width');
			    this.element.removeAttribute('height');
			  } else {
			    this.element.setAttribute( 'width', width );
			    this.element.setAttribute( 'height', height );
			  }
			};

			Illustration.prototype.renderGraphSvg = function( item ) {
			  item = item || this;
			  empty( this.element );
			  this.onPrerender( this.element );
			  Anchor.prototype.renderGraphSvg.call( item, this.element );
			};

			function empty( element ) {
			  while ( element.firstChild ) {
			    element.removeChild( element.firstChild );
			  }
			}

			// ----- drag ----- //

			Illustration.prototype.setDragRotate = function( item ) {
			  if ( !item ) {
			    return;
			  } else if ( item === true ) {
			    /* eslint consistent-this: "off" */
			    item = this;
			  }
			  this.dragRotate = item;

			  this.bindDrag( this.element );
			};

			Illustration.prototype.dragStart = function( /* event, pointer */) {
			  this.dragStartRX = this.dragRotate.rotate.x;
			  this.dragStartRY = this.dragRotate.rotate.y;
			  Dragger.prototype.dragStart.apply( this, arguments );
			};

			Illustration.prototype.dragMove = function( event, pointer ) {
			  var moveX = pointer.pageX - this.dragStartX;
			  var moveY = pointer.pageY - this.dragStartY;
			  var displaySize = Math.min( this.width, this.height );
			  var moveRY = moveX/displaySize * TAU;
			  var moveRX = moveY/displaySize * TAU;
			  this.dragRotate.rotate.x = this.dragStartRX - moveRX;
			  this.dragRotate.rotate.y = this.dragStartRY - moveRY;
			  Dragger.prototype.dragMove.apply( this, arguments );
			};

			return Illustration;

			} ) ); 
		} (illustration));
		return illustration.exports;
	}

	var pathCommand = {exports: {}};

	/**
	 * PathCommand
	 */

	var hasRequiredPathCommand;

	function requirePathCommand () {
		if (hasRequiredPathCommand) return pathCommand.exports;
		hasRequiredPathCommand = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireVector() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.PathCommand = factory( Zdog.Vector );
			  }
			}( commonjsGlobal, function factory( Vector ) {

			function PathCommand( method, points, previousPoint ) {
			  this.method = method;
			  this.points = points.map( mapVectorPoint );
			  this.renderPoints = points.map( mapNewVector );
			  this.previousPoint = previousPoint;
			  this.endRenderPoint = this.renderPoints[ this.renderPoints.length - 1 ];
			  // arc actions come with previous point & corner point
			  // but require bezier control points
			  if ( method == 'arc' ) {
			    this.controlPoints = [ new Vector(), new Vector() ];
			  }
			}

			function mapVectorPoint( point ) {
			  if ( point instanceof Vector ) {
			    return point;
			  } else {
			    return new Vector( point );
			  }
			}

			function mapNewVector( point ) {
			  return new Vector( point );
			}

			PathCommand.prototype.reset = function() {
			  // reset renderPoints back to orignal points position
			  var points = this.points;
			  this.renderPoints.forEach( function( renderPoint, i ) {
			    var point = points[i];
			    renderPoint.set( point );
			  } );
			};

			PathCommand.prototype.transform = function( translation, rotation, scale ) {
			  this.renderPoints.forEach( function( renderPoint ) {
			    renderPoint.transform( translation, rotation, scale );
			  } );
			};

			PathCommand.prototype.render = function( ctx, elem, renderer ) {
			  return this[ this.method ]( ctx, elem, renderer );
			};

			PathCommand.prototype.move = function( ctx, elem, renderer ) {
			  return renderer.move( ctx, elem, this.renderPoints[0] );
			};

			PathCommand.prototype.line = function( ctx, elem, renderer ) {
			  return renderer.line( ctx, elem, this.renderPoints[0] );
			};

			PathCommand.prototype.bezier = function( ctx, elem, renderer ) {
			  var cp0 = this.renderPoints[0];
			  var cp1 = this.renderPoints[1];
			  var end = this.renderPoints[2];
			  return renderer.bezier( ctx, elem, cp0, cp1, end );
			};

			var arcHandleLength = 9/16;

			PathCommand.prototype.arc = function( ctx, elem, renderer ) {
			  var prev = this.previousPoint;
			  var corner = this.renderPoints[0];
			  var end = this.renderPoints[1];
			  var cp0 = this.controlPoints[0];
			  var cp1 = this.controlPoints[1];
			  cp0.set( prev ).lerp( corner, arcHandleLength );
			  cp1.set( end ).lerp( corner, arcHandleLength );
			  return renderer.bezier( ctx, elem, cp0, cp1, end );
			};

			return PathCommand;

			} ) ); 
		} (pathCommand));
		return pathCommand.exports;
	}

	var shape = {exports: {}};

	/**
	 * Shape
	 */

	var hasRequiredShape;

	function requireShape () {
		if (hasRequiredShape) return shape.exports;
		hasRequiredShape = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireVector(),
			        requirePathCommand(), requireAnchor() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Shape = factory( Zdog, Zdog.Vector, Zdog.PathCommand, Zdog.Anchor );
			  }
			}( commonjsGlobal, function factory( utils, Vector, PathCommand, Anchor ) {

			var Shape = Anchor.subclass({
			  stroke: 1,
			  fill: false,
			  color: '#333',
			  closed: true,
			  visible: true,
			  path: [ {} ],
			  front: { z: 1 },
			  backface: true,
			});

			Shape.prototype.create = function( options ) {
			  Anchor.prototype.create.call( this, options );
			  this.updatePath();
			  // front
			  this.front = new Vector( options.front || this.front );
			  this.renderFront = new Vector( this.front );
			  this.renderNormal = new Vector();
			};

			var actionNames = [
			  'move',
			  'line',
			  'bezier',
			  'arc',
			];

			Shape.prototype.updatePath = function() {
			  this.setPath();
			  this.updatePathCommands();
			};

			// place holder for Ellipse, Rect, etc.
			Shape.prototype.setPath = function() {};

			// parse path into PathCommands
			Shape.prototype.updatePathCommands = function() {
			  var previousPoint;
			  this.pathCommands = this.path.map( function( pathPart, i ) {
			    // pathPart can be just vector coordinates -> { x, y, z }
			    // or path instruction -> { arc: [ {x0,y0,z0}, {x1,y1,z1} ] }
			    var keys = Object.keys( pathPart );
			    var method = keys[0];
			    var points = pathPart[ method ];
			    // default to line if no instruction
			    var isInstruction = keys.length == 1 && actionNames.indexOf( method ) != -1;
			    if ( !isInstruction ) {
			      method = 'line';
			      points = pathPart;
			    }
			    // munge single-point methods like line & move without arrays
			    var isLineOrMove = method == 'line' || method == 'move';
			    var isPointsArray = Array.isArray( points );
			    if ( isLineOrMove && !isPointsArray ) {
			      points = [ points ];
			    }

			    // first action is always move
			    method = i === 0 ? 'move' : method;
			    // arcs require previous last point
			    var command = new PathCommand( method, points, previousPoint );
			    // update previousLastPoint
			    previousPoint = command.endRenderPoint;
			    return command;
			  } );
			};

			// ----- update ----- //

			Shape.prototype.reset = function() {
			  this.renderOrigin.set( this.origin );
			  this.renderFront.set( this.front );
			  // reset command render points
			  this.pathCommands.forEach( function( command ) {
			    command.reset();
			  } );
			};

			Shape.prototype.transform = function( translation, rotation, scale ) {
			  // calculate render points backface visibility & cone/hemisphere shapes
			  this.renderOrigin.transform( translation, rotation, scale );
			  this.renderFront.transform( translation, rotation, scale );
			  this.renderNormal.set( this.renderOrigin ).subtract( this.renderFront );
			  // transform points
			  this.pathCommands.forEach( function( command ) {
			    command.transform( translation, rotation, scale );
			  } );
			  // transform children
			  this.children.forEach( function( child ) {
			    child.transform( translation, rotation, scale );
			  } );
			};

			Shape.prototype.updateSortValue = function() {
			  // sort by average z of all points
			  // def not geometrically correct, but works for me
			  var pointCount = this.pathCommands.length;
			  var firstPoint = this.pathCommands[0].endRenderPoint;
			  var lastPoint = this.pathCommands[ pointCount - 1 ].endRenderPoint;
			  // ignore the final point if self closing shape
			  var isSelfClosing = pointCount > 2 && firstPoint.isSame( lastPoint );
			  if ( isSelfClosing ) {
			    pointCount -= 1;
			  }

			  var sortValueTotal = 0;
			  for ( var i = 0; i < pointCount; i++ ) {
			    sortValueTotal += this.pathCommands[i].endRenderPoint.z;
			  }
			  this.sortValue = sortValueTotal/pointCount;
			};

			// ----- render ----- //

			Shape.prototype.render = function( ctx, renderer ) {
			  var length = this.pathCommands.length;
			  if ( !this.visible || !length ) {
			    return;
			  }
			  // do not render if hiding backface
			  this.isFacingBack = this.renderNormal.z > 0;
			  if ( !this.backface && this.isFacingBack ) {
			    return;
			  }
			  if ( !renderer ) {
			    throw new Error( 'Zdog renderer required. Set to ' + renderer );
			  }
			  // render dot or path
			  var isDot = length == 1;
			  if ( renderer.isCanvas && isDot ) {
			    this.renderCanvasDot( ctx, renderer );
			  } else {
			    this.renderPath( ctx, renderer );
			  }
			};

			var TAU = utils.TAU;
			// Safari does not render lines with no size, have to render circle instead
			Shape.prototype.renderCanvasDot = function( ctx ) {
			  var lineWidth = this.getLineWidth();
			  if ( !lineWidth ) {
			    return;
			  }
			  ctx.fillStyle = this.getRenderColor();
			  var point = this.pathCommands[0].endRenderPoint;
			  ctx.beginPath();
			  var radius = lineWidth/2;
			  ctx.arc( point.x, point.y, radius, 0, TAU );
			  ctx.fill();
			};

			Shape.prototype.getLineWidth = function() {
			  if ( !this.stroke ) {
			    return 0;
			  }
			  if ( this.stroke == true ) {
			    return 1;
			  }
			  return this.stroke;
			};

			Shape.prototype.getRenderColor = function() {
			  // use backface color if applicable
			  var isBackfaceColor = typeof this.backface == 'string' && this.isFacingBack;
			  var color = isBackfaceColor ? this.backface : this.color;
			  return color;
			};

			Shape.prototype.renderPath = function( ctx, renderer ) {
			  var elem = this.getRenderElement( ctx, renderer );
			  var isTwoPoints = this.pathCommands.length == 2 &&
			    this.pathCommands[1].method == 'line';
			  var isClosed = !isTwoPoints && this.closed;
			  var color = this.getRenderColor();

			  renderer.renderPath( ctx, elem, this.pathCommands, isClosed );
			  renderer.stroke( ctx, elem, this.stroke, color, this.getLineWidth() );
			  renderer.fill( ctx, elem, this.fill, color );
			  renderer.end( ctx, elem );
			};

			var svgURI = 'http://www.w3.org/2000/svg';

			Shape.prototype.getRenderElement = function( ctx, renderer ) {
			  if ( !renderer.isSvg ) {
			    return;
			  }
			  if ( !this.svgElement ) {
			    // create svgElement
			    this.svgElement = document.createElementNS( svgURI, 'path' );
			    this.svgElement.setAttribute( 'stroke-linecap', 'round' );
			    this.svgElement.setAttribute( 'stroke-linejoin', 'round' );
			  }
			  return this.svgElement;
			};

			return Shape;

			} ) ); 
		} (shape));
		return shape.exports;
	}

	var group = {exports: {}};

	/**
	 * Group
	 */

	var hasRequiredGroup;

	function requireGroup () {
		if (hasRequiredGroup) return group.exports;
		hasRequiredGroup = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireAnchor() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Group = factory( Zdog.Anchor );
			  }
			}( commonjsGlobal, function factory( Anchor ) {

			var Group = Anchor.subclass({
			  updateSort: false,
			  visible: true,
			});

			// ----- update ----- //

			Group.prototype.updateSortValue = function() {
			  var sortValueTotal = 0;
			  this.flatGraph.forEach( function( item ) {
			    item.updateSortValue();
			    sortValueTotal += item.sortValue;
			  } );
			  // average sort value of all points
			  // def not geometrically correct, but works for me
			  this.sortValue = sortValueTotal / this.flatGraph.length;

			  if ( this.updateSort ) {
			    this.flatGraph.sort( Anchor.shapeSorter );
			  }
			};

			// ----- render ----- //

			Group.prototype.render = function( ctx, renderer ) {
			  if ( !this.visible ) {
			    return;
			  }

			  this.flatGraph.forEach( function( item ) {
			    item.render( ctx, renderer );
			  } );
			};

			// actual group flatGraph only used inside group
			Group.prototype.updateFlatGraph = function() {
			  // do not include self
			  var flatGraph = [];
			  this.flatGraph = this.addChildFlatGraph( flatGraph );
			};

			// do not include children, group handles rendering & sorting internally
			Group.prototype.getFlatGraph = function() {
			  return [ this ];
			};

			return Group;

			} ) ); 
		} (group));
		return group.exports;
	}

	var rect = {exports: {}};

	/**
	 * Rect
	 */

	var hasRequiredRect;

	function requireRect () {
		if (hasRequiredRect) return rect.exports;
		hasRequiredRect = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireShape() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Rect = factory( Zdog.Shape );
			  }
			}( commonjsGlobal, function factory( Shape ) {

			var Rect = Shape.subclass({
			  width: 1,
			  height: 1,
			});

			Rect.prototype.setPath = function() {
			  var x = this.width / 2;
			  var y = this.height / 2;
			  /* eslint key-spacing: "off" */
			  this.path = [
			    { x: -x, y: -y },
			    { x:  x, y: -y },
			    { x:  x, y:  y },
			    { x: -x, y:  y },
			  ];
			};

			return Rect;

			} ) ); 
		} (rect));
		return rect.exports;
	}

	var roundedRect = {exports: {}};

	/**
	 * RoundedRect
	 */

	var hasRequiredRoundedRect;

	function requireRoundedRect () {
		if (hasRequiredRoundedRect) return roundedRect.exports;
		hasRequiredRoundedRect = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireShape() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.RoundedRect = factory( Zdog.Shape );
			  }
			}( commonjsGlobal, function factory( Shape ) {

			var RoundedRect = Shape.subclass({
			  width: 1,
			  height: 1,
			  cornerRadius: 0.25,
			  closed: false,
			});

			RoundedRect.prototype.setPath = function() {
			  /* eslint
			     id-length: [ "error", { "min": 2, "exceptions": [ "x", "y" ] }],
			     key-spacing: "off" */
			  var xA = this.width / 2;
			  var yA = this.height / 2;
			  var shortSide = Math.min( xA, yA );
			  var cornerRadius = Math.min( this.cornerRadius, shortSide );
			  var xB = xA - cornerRadius;
			  var yB = yA - cornerRadius;
			  var path = [
			    // top right corner
			    { x: xB, y: -yA },
			    { arc: [
			      { x: xA, y: -yA },
			      { x: xA, y: -yB },
			    ] },
			  ];
			  // bottom right corner
			  if ( yB ) {
			    path.push({ x: xA, y: yB });
			  }
			  path.push({ arc: [
			    { x: xA, y:  yA },
			    { x: xB, y:  yA },
			  ] });
			  // bottom left corner
			  if ( xB ) {
			    path.push({ x: -xB, y: yA });
			  }
			  path.push({ arc: [
			    { x: -xA, y:  yA },
			    { x: -xA, y:  yB },
			  ] });
			  // top left corner
			  if ( yB ) {
			    path.push({ x: -xA, y: -yB });
			  }
			  path.push({ arc: [
			    { x: -xA, y: -yA },
			    { x: -xB, y: -yA },
			  ] });

			  // back to top right corner
			  if ( xB ) {
			    path.push({ x: xB, y: -yA });
			  }

			  this.path = path;
			};

			return RoundedRect;

			} ) ); 
		} (roundedRect));
		return roundedRect.exports;
	}

	var ellipse = {exports: {}};

	/**
	 * Ellipse
	 */

	var hasRequiredEllipse;

	function requireEllipse () {
		if (hasRequiredEllipse) return ellipse.exports;
		hasRequiredEllipse = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireShape() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Ellipse = factory( Zdog.Shape );
			  }

			}( commonjsGlobal, function factory( Shape ) {

			var Ellipse = Shape.subclass({
			  diameter: 1,
			  width: undefined,
			  height: undefined,
			  quarters: 4,
			  closed: false,
			});

			Ellipse.prototype.setPath = function() {
			  var width = this.width != undefined ? this.width : this.diameter;
			  var height = this.height != undefined ? this.height : this.diameter;
			  var x = width/2;
			  var y = height/2;
			  this.path = [
			    { x: 0, y: -y },
			    { arc: [ // top right
			      { x: x, y: -y },
			      { x: x, y: 0 },
			    ] },
			  ];
			  // bottom right
			  if ( this.quarters > 1 ) {
			    this.path.push({ arc: [
			      { x: x, y: y },
			      { x: 0, y: y },
			    ] });
			  }
			  // bottom left
			  if ( this.quarters > 2 ) {
			    this.path.push({ arc: [
			      { x: -x, y: y },
			      { x: -x, y: 0 },
			    ] });
			  }
			  // top left
			  if ( this.quarters > 3 ) {
			    this.path.push({ arc: [
			      { x: -x, y: -y },
			      { x: 0, y: -y },
			    ] });
			  }
			};

			return Ellipse;

			} ) ); 
		} (ellipse));
		return ellipse.exports;
	}

	var polygon = {exports: {}};

	/**
	 * Shape
	 */

	var hasRequiredPolygon;

	function requirePolygon () {
		if (hasRequiredPolygon) return polygon.exports;
		hasRequiredPolygon = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireShape() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Polygon = factory( Zdog, Zdog.Shape );
			  }
			}( commonjsGlobal, function factory( utils, Shape ) {

			var Polygon = Shape.subclass({
			  sides: 3,
			  radius: 0.5,
			});

			var TAU = utils.TAU;

			Polygon.prototype.setPath = function() {
			  this.path = [];
			  for ( var i = 0; i < this.sides; i++ ) {
			    var theta = i / this.sides * TAU - TAU/4;
			    var x = Math.cos( theta ) * this.radius;
			    var y = Math.sin( theta ) * this.radius;
			    this.path.push({ x: x, y: y });
			  }
			};

			return Polygon;

			} ) ); 
		} (polygon));
		return polygon.exports;
	}

	var hemisphere = {exports: {}};

	/**
	 * Hemisphere composite shape
	 */

	var hasRequiredHemisphere;

	function requireHemisphere () {
		if (hasRequiredHemisphere) return hemisphere.exports;
		hasRequiredHemisphere = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireVector(),
			        requireAnchor(), requireEllipse() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Hemisphere = factory( Zdog, Zdog.Vector, Zdog.Anchor, Zdog.Ellipse );
			  }
			}( commonjsGlobal, function factory( utils, Vector, Anchor, Ellipse ) {

			var Hemisphere = Ellipse.subclass({
			  fill: true,
			});

			var TAU = utils.TAU;

			Hemisphere.prototype.create = function( /* options */) {
			  // call super
			  Ellipse.prototype.create.apply( this, arguments );
			  // composite shape, create child shapes
			  this.apex = new Anchor({
			    addTo: this,
			    translate: { z: this.diameter / 2 },
			  });
			  // vector used for calculation
			  this.renderCentroid = new Vector();
			};

			Hemisphere.prototype.updateSortValue = function() {
			  // centroid of hemisphere is 3/8 between origin and apex
			  this.renderCentroid.set( this.renderOrigin )
			    .lerp( this.apex.renderOrigin, 3/8 );
			  this.sortValue = this.renderCentroid.z;
			};

			Hemisphere.prototype.render = function( ctx, renderer ) {
			  this.renderDome( ctx, renderer );
			  // call super
			  Ellipse.prototype.render.apply( this, arguments );
			};

			Hemisphere.prototype.renderDome = function( ctx, renderer ) {
			  if ( !this.visible ) {
			    return;
			  }
			  var elem = this.getDomeRenderElement( ctx, renderer );
			  var contourAngle = Math.atan2( this.renderNormal.y, this.renderNormal.x );
			  var domeRadius = this.diameter / 2 * this.renderNormal.magnitude();
			  var x = this.renderOrigin.x;
			  var y = this.renderOrigin.y;

			  if ( renderer.isCanvas ) {
			    // canvas
			    var startAngle = contourAngle + TAU/4;
			    var endAngle = contourAngle - TAU/4;
			    ctx.beginPath();
			    ctx.arc( x, y, domeRadius, startAngle, endAngle );
			  } else if ( renderer.isSvg ) {
			    // svg
			    contourAngle = ( contourAngle - TAU/4 ) / TAU * 360;
			    this.domeSvgElement.setAttribute( 'd', 'M ' + -domeRadius + ',0 A ' +
			        domeRadius + ',' + domeRadius + ' 0 0 1 ' + domeRadius + ',0' );
			    this.domeSvgElement.setAttribute( 'transform',
			        'translate(' + x + ',' + y + ' ) rotate(' + contourAngle + ')' );
			  }

			  renderer.stroke( ctx, elem, this.stroke, this.color, this.getLineWidth() );
			  renderer.fill( ctx, elem, this.fill, this.color );
			  renderer.end( ctx, elem );
			};

			var svgURI = 'http://www.w3.org/2000/svg';

			Hemisphere.prototype.getDomeRenderElement = function( ctx, renderer ) {
			  if ( !renderer.isSvg ) {
			    return;
			  }
			  if ( !this.domeSvgElement ) {
			    // create svgElement
			    this.domeSvgElement = document.createElementNS( svgURI, 'path' );
			    this.domeSvgElement.setAttribute( 'stroke-linecap', 'round' );
			    this.domeSvgElement.setAttribute( 'stroke-linejoin', 'round' );
			  }
			  return this.domeSvgElement;
			};

			return Hemisphere;

			} ) ); 
		} (hemisphere));
		return hemisphere.exports;
	}

	var cylinder = {exports: {}};

	/**
	 * Cylinder composite shape
	 */

	var hasRequiredCylinder;

	function requireCylinder () {
		if (hasRequiredCylinder) return cylinder.exports;
		hasRequiredCylinder = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(),
			        requirePathCommand(), requireShape(), requireGroup(),
			        requireEllipse() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Cylinder = factory( Zdog, Zdog.PathCommand, Zdog.Shape,
			        Zdog.Group, Zdog.Ellipse );
			  }
			}( commonjsGlobal, function factory( utils, PathCommand, Shape, Group, Ellipse ) {

			function noop() {}

			// ----- CylinderGroup ----- //

			var CylinderGroup = Group.subclass({
			  color: '#333',
			  updateSort: true,
			});

			CylinderGroup.prototype.create = function() {
			  Group.prototype.create.apply( this, arguments );
			  this.pathCommands = [
			    new PathCommand( 'move', [ {} ] ),
			    new PathCommand( 'line', [ {} ] ),
			  ];
			};

			CylinderGroup.prototype.render = function( ctx, renderer ) {
			  this.renderCylinderSurface( ctx, renderer );
			  Group.prototype.render.apply( this, arguments );
			};

			CylinderGroup.prototype.renderCylinderSurface = function( ctx, renderer ) {
			  if ( !this.visible ) {
			    return;
			  }
			  // render cylinder surface
			  var elem = this.getRenderElement( ctx, renderer );
			  var frontBase = this.frontBase;
			  var rearBase = this.rearBase;
			  var scale = frontBase.renderNormal.magnitude();
			  var strokeWidth = frontBase.diameter * scale + frontBase.getLineWidth();
			  // set path command render points
			  this.pathCommands[0].renderPoints[0].set( frontBase.renderOrigin );
			  this.pathCommands[1].renderPoints[0].set( rearBase.renderOrigin );

			  if ( renderer.isCanvas ) {
			    ctx.lineCap = 'butt'; // nice
			  }
			  renderer.renderPath( ctx, elem, this.pathCommands );
			  renderer.stroke( ctx, elem, true, this.color, strokeWidth );
			  renderer.end( ctx, elem );

			  if ( renderer.isCanvas ) {
			    ctx.lineCap = 'round'; // reset
			  }
			};

			var svgURI = 'http://www.w3.org/2000/svg';

			CylinderGroup.prototype.getRenderElement = function( ctx, renderer ) {
			  if ( !renderer.isSvg ) {
			    return;
			  }
			  if ( !this.svgElement ) {
			    // create svgElement
			    this.svgElement = document.createElementNS( svgURI, 'path' );
			  }
			  return this.svgElement;
			};

			// prevent double-creation in parent.copyGraph()
			// only create in Cylinder.create()
			CylinderGroup.prototype.copyGraph = noop;

			// ----- CylinderEllipse ----- //

			var CylinderEllipse = Ellipse.subclass();

			CylinderEllipse.prototype.copyGraph = noop;

			// ----- Cylinder ----- //

			var Cylinder = Shape.subclass({
			  diameter: 1,
			  length: 1,
			  frontFace: undefined,
			  fill: true,
			});

			var TAU = utils.TAU;

			Cylinder.prototype.create = function( /* options */) {
			  // call super
			  Shape.prototype.create.apply( this, arguments );
			  // composite shape, create child shapes
			  // CylinderGroup to render cylinder surface then bases
			  this.group = new CylinderGroup({
			    addTo: this,
			    color: this.color,
			    visible: this.visible,
			  });
			  var baseZ = this.length / 2;
			  var baseColor = this.backface || true;
			  // front outside base
			  this.frontBase = this.group.frontBase = new Ellipse({
			    addTo: this.group,
			    diameter: this.diameter,
			    translate: { z: baseZ },
			    rotate: { y: TAU/2 },
			    color: this.color,
			    stroke: this.stroke,
			    fill: this.fill,
			    backface: this.frontFace || baseColor,
			    visible: this.visible,
			  });
			  // back outside base
			  this.rearBase = this.group.rearBase = this.frontBase.copy({
			    translate: { z: -baseZ },
			    rotate: { y: 0 },
			    backface: baseColor,
			  });
			};

			// Cylinder shape does not render anything
			Cylinder.prototype.render = function() {};

			// ----- set child properties ----- //

			var childProperties = [ 'stroke', 'fill', 'color', 'visible' ];
			childProperties.forEach( function( property ) {
			  // use proxy property for custom getter & setter
			  var _prop = '_' + property;
			  Object.defineProperty( Cylinder.prototype, property, {
			    get: function() {
			      return this[ _prop ];
			    },
			    set: function( value ) {
			      this[ _prop ] = value;
			      // set property on children
			      if ( this.frontBase ) {
			        this.frontBase[ property ] = value;
			        this.rearBase[ property ] = value;
			        this.group[ property ] = value;
			      }
			    },
			  } );
			} );

			// TODO child property setter for backface, frontBaseColor, & rearBaseColor

			return Cylinder;

			} ) ); 
		} (cylinder));
		return cylinder.exports;
	}

	var cone = {exports: {}};

	/**
	 * Cone composite shape
	 */

	var hasRequiredCone;

	function requireCone () {
		if (hasRequiredCone) return cone.exports;
		hasRequiredCone = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireVector(),
			        requirePathCommand(), requireAnchor(), requireEllipse() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Cone = factory( Zdog, Zdog.Vector, Zdog.PathCommand,
			        Zdog.Anchor, Zdog.Ellipse );
			  }
			}( commonjsGlobal, function factory( utils, Vector, PathCommand, Anchor, Ellipse ) {

			var Cone = Ellipse.subclass({
			  length: 1,
			  fill: true,
			});

			var TAU = utils.TAU;

			Cone.prototype.create = function( /* options */) {
			  // call super
			  Ellipse.prototype.create.apply( this, arguments );
			  // composite shape, create child shapes
			  this.apex = new Anchor({
			    addTo: this,
			    translate: { z: this.length },
			  });

			  // vectors used for calculation
			  this.renderApex = new Vector();
			  this.renderCentroid = new Vector();
			  this.tangentA = new Vector();
			  this.tangentB = new Vector();

			  this.surfacePathCommands = [
			    new PathCommand( 'move', [ {} ] ), // points set in renderConeSurface
			    new PathCommand( 'line', [ {} ] ),
			    new PathCommand( 'line', [ {} ] ),
			  ];
			};

			Cone.prototype.updateSortValue = function() {
			  // center of cone is one third of its length
			  this.renderCentroid.set( this.renderOrigin )
			    .lerp( this.apex.renderOrigin, 1/3 );
			  this.sortValue = this.renderCentroid.z;
			};

			Cone.prototype.render = function( ctx, renderer ) {
			  this.renderConeSurface( ctx, renderer );
			  Ellipse.prototype.render.apply( this, arguments );
			};

			Cone.prototype.renderConeSurface = function( ctx, renderer ) {
			  if ( !this.visible ) {
			    return;
			  }
			  this.renderApex.set( this.apex.renderOrigin )
			    .subtract( this.renderOrigin );

			  var scale = this.renderNormal.magnitude();
			  var apexDistance = this.renderApex.magnitude2d();
			  var normalDistance = this.renderNormal.magnitude2d();
			  // eccentricity
			  var eccenAngle = Math.acos( normalDistance/scale );
			  var eccen = Math.sin( eccenAngle );
			  var radius = this.diameter / 2 * scale;
			  // does apex extend beyond eclipse of face
			  var isApexVisible = radius * eccen < apexDistance;
			  if ( !isApexVisible ) {
			    return;
			  }
			  // update tangents
			  var apexAngle = Math.atan2( this.renderNormal.y, this.renderNormal.x ) +
			      TAU/2;
			  var projectLength = apexDistance/eccen;
			  var projectAngle = Math.acos( radius/projectLength );
			  // set tangent points
			  var tangentA = this.tangentA;
			  var tangentB = this.tangentB;

			  tangentA.x = Math.cos( projectAngle ) * radius * eccen;
			  tangentA.y = Math.sin( projectAngle ) * radius;

			  tangentB.set( this.tangentA );
			  tangentB.y *= -1;

			  tangentA.rotateZ( apexAngle );
			  tangentB.rotateZ( apexAngle );
			  tangentA.add( this.renderOrigin );
			  tangentB.add( this.renderOrigin );

			  this.setSurfaceRenderPoint( 0, tangentA );
			  this.setSurfaceRenderPoint( 1, this.apex.renderOrigin );
			  this.setSurfaceRenderPoint( 2, tangentB );

			  // render
			  var elem = this.getSurfaceRenderElement( ctx, renderer );
			  renderer.renderPath( ctx, elem, this.surfacePathCommands );
			  renderer.stroke( ctx, elem, this.stroke, this.color, this.getLineWidth() );
			  renderer.fill( ctx, elem, this.fill, this.color );
			  renderer.end( ctx, elem );
			};

			var svgURI = 'http://www.w3.org/2000/svg';

			Cone.prototype.getSurfaceRenderElement = function( ctx, renderer ) {
			  if ( !renderer.isSvg ) {
			    return;
			  }
			  if ( !this.surfaceSvgElement ) {
			    // create svgElement
			    this.surfaceSvgElement = document.createElementNS( svgURI, 'path' );
			    this.surfaceSvgElement.setAttribute( 'stroke-linecap', 'round' );
			    this.surfaceSvgElement.setAttribute( 'stroke-linejoin', 'round' );
			  }
			  return this.surfaceSvgElement;
			};

			Cone.prototype.setSurfaceRenderPoint = function( index, point ) {
			  var renderPoint = this.surfacePathCommands[ index ].renderPoints[0];
			  renderPoint.set( point );
			};

			return Cone;

			} ) ); 
		} (cone));
		return cone.exports;
	}

	var box = {exports: {}};

	/**
	 * Box composite shape
	 */

	var hasRequiredBox;

	function requireBox () {
		if (hasRequiredBox) return box.exports;
		hasRequiredBox = 1;
		(function (module) {
			( function( root, factory ) {
			  // module definition
			  if ( module.exports ) {
			    // CommonJS
			    module.exports = factory( requireBoilerplate(), requireAnchor(),
			        requireShape(), requireRect() );
			  } else {
			    // browser global
			    var Zdog = root.Zdog;
			    Zdog.Box = factory( Zdog, Zdog.Anchor, Zdog.Shape, Zdog.Rect );
			  }
			}( commonjsGlobal, function factory( utils, Anchor, Shape, Rect ) {

			// ----- BoxRect ----- //

			var BoxRect = Rect.subclass();
			// prevent double-creation in parent.copyGraph()
			// only create in Box.create()
			BoxRect.prototype.copyGraph = function() {};

			// ----- Box ----- //

			var TAU = utils.TAU;
			var faceNames = [
			  'frontFace',
			  'rearFace',
			  'leftFace',
			  'rightFace',
			  'topFace',
			  'bottomFace',
			];

			var boxDefaults = utils.extend( {}, Shape.defaults );
			delete boxDefaults.path;
			faceNames.forEach( function( faceName ) {
			  boxDefaults[ faceName ] = true;
			} );
			utils.extend( boxDefaults, {
			  width: 1,
			  height: 1,
			  depth: 1,
			  fill: true,
			} );

			var Box = Anchor.subclass( boxDefaults );

			/* eslint-disable no-self-assign */
			Box.prototype.create = function( options ) {
			  Anchor.prototype.create.call( this, options );
			  this.updatePath();
			  // HACK reset fill to trigger face setter
			  this.fill = this.fill;
			};

			Box.prototype.updatePath = function() {
			  // reset all faces to trigger setters
			  faceNames.forEach( function( faceName ) {
			    this[ faceName ] = this[ faceName ];
			  }, this );
			};
			/* eslint-enable no-self-assign */

			faceNames.forEach( function( faceName ) {
			  var _faceName = '_' + faceName;
			  Object.defineProperty( Box.prototype, faceName, {
			    get: function() {
			      return this[ _faceName ];
			    },
			    set: function( value ) {
			      this[ _faceName ] = value;
			      this.setFace( faceName, value );
			    },
			  } );
			} );

			Box.prototype.setFace = function( faceName, value ) {
			  var rectProperty = faceName + 'Rect';
			  var rect = this[ rectProperty ];
			  // remove if false
			  if ( !value ) {
			    this.removeChild( rect );
			    return;
			  }
			  // update & add face
			  var options = this.getFaceOptions( faceName );
			  options.color = typeof value == 'string' ? value : this.color;

			  if ( rect ) {
			    // update previous
			    rect.setOptions( options );
			  } else {
			    // create new
			    rect = this[ rectProperty ] = new BoxRect( options );
			  }
			  rect.updatePath();
			  this.addChild( rect );
			};

			Box.prototype.getFaceOptions = function( faceName ) {
			  return {
			    frontFace: {
			      width: this.width,
			      height: this.height,
			      translate: { z: this.depth / 2 },
			    },
			    rearFace: {
			      width: this.width,
			      height: this.height,
			      translate: { z: -this.depth / 2 },
			      rotate: { y: TAU/2 },
			    },
			    leftFace: {
			      width: this.depth,
			      height: this.height,
			      translate: { x: -this.width / 2 },
			      rotate: { y: -TAU/4 },
			    },
			    rightFace: {
			      width: this.depth,
			      height: this.height,
			      translate: { x: this.width / 2 },
			      rotate: { y: TAU/4 },
			    },
			    topFace: {
			      width: this.width,
			      height: this.depth,
			      translate: { y: -this.height / 2 },
			      rotate: { x: -TAU/4 },
			    },
			    bottomFace: {
			      width: this.width,
			      height: this.depth,
			      translate: { y: this.height / 2 },
			      rotate: { x: TAU/4 },
			    },
			  }[ faceName ];
			};

			// ----- set face properties ----- //

			var childProperties = [ 'color', 'stroke', 'fill', 'backface', 'front',
			  'visible' ];
			childProperties.forEach( function( property ) {
			  // use proxy property for custom getter & setter
			  var _prop = '_' + property;
			  Object.defineProperty( Box.prototype, property, {
			    get: function() {
			      return this[ _prop ];
			    },
			    set: function( value ) {
			      this[ _prop ] = value;
			      faceNames.forEach( function( faceName ) {
			        var rect = this[ faceName + 'Rect' ];
			        var isFaceColor = typeof this[ faceName ] == 'string';
			        var isColorUnderwrite = property == 'color' && isFaceColor;
			        if ( rect && !isColorUnderwrite ) {
			          rect[ property ] = value;
			        }
			      }, this );
			    },
			  } );
			} );

			return Box;

			} ) ); 
		} (box));
		return box.exports;
	}

	/**
	 * Index
	 */

	(function (module) {
		( function( root, factory ) {
		  // module definition
		  if ( module.exports ) {
		    // CommonJS
		    module.exports = factory(
		        requireBoilerplate(),
		        requireCanvasRenderer(),
		        requireSvgRenderer(),
		        requireVector(),
		        requireAnchor(),
		        requireDragger(),
		        requireIllustration(),
		        requirePathCommand(),
		        requireShape(),
		        requireGroup(),
		        requireRect(),
		        requireRoundedRect(),
		        requireEllipse(),
		        requirePolygon(),
		        requireHemisphere(),
		        requireCylinder(),
		        requireCone(),
		        requireBox()
		    );
		  }
		/* eslint-disable max-params */
		} )( commonjsGlobal, function factory( Zdog, CanvasRenderer, SvgRenderer, Vector, Anchor,
		    Dragger, Illustration, PathCommand, Shape, Group, Rect, RoundedRect,
		    Ellipse, Polygon, Hemisphere, Cylinder, Cone, Box ) {
		/* eslint-enable max-params */

		      Zdog.CanvasRenderer = CanvasRenderer;
		      Zdog.SvgRenderer = SvgRenderer;
		      Zdog.Vector = Vector;
		      Zdog.Anchor = Anchor;
		      Zdog.Dragger = Dragger;
		      Zdog.Illustration = Illustration;
		      Zdog.PathCommand = PathCommand;
		      Zdog.Shape = Shape;
		      Zdog.Group = Group;
		      Zdog.Rect = Rect;
		      Zdog.RoundedRect = RoundedRect;
		      Zdog.Ellipse = Ellipse;
		      Zdog.Polygon = Polygon;
		      Zdog.Hemisphere = Hemisphere;
		      Zdog.Cylinder = Cylinder;
		      Zdog.Cone = Cone;
		      Zdog.Box = Box;

		      return Zdog;
		} ); 
	} (js));

	var jsExports = js.exports;

	function tree_add$2(d) {
	  const x = +this._x.call(null, d);
	  return add$2(this.cover(x), x, d);
	}

	function add$2(tree, x, d) {
	  if (isNaN(x)) return tree; // ignore invalid points

	  var parent,
	      node = tree._root,
	      leaf = {data: d},
	      x0 = tree._x0,
	      x1 = tree._x1,
	      xm,
	      xp,
	      right,
	      i,
	      j;

	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return tree._root = leaf, tree;

	  // Find the existing leaf for the new point, or add it.
	  while (node.length) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (parent = node, !(node = node[i = +right])) return parent[i] = leaf, tree;
	  }

	  // Is the new point is exactly coincident with the existing point?
	  xp = +tree._x.call(null, node.data);
	  if (x === xp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

	  // Otherwise, split the leaf node until the old and new point are separated.
	  do {
	    parent = parent ? parent[i] = new Array(2) : tree._root = new Array(2);
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	  } while ((i = +right) === (j = +(xp >= xm)));
	  return parent[j] = node, parent[i] = leaf, tree;
	}

	function addAll$2(data) {
	  if (!Array.isArray(data)) data = Array.from(data);
	  const n = data.length;
	  const xz = new Float64Array(n);
	  let x0 = Infinity,
	      x1 = -Infinity;

	  // Compute the points and their extent.
	  for (let i = 0, x; i < n; ++i) {
	    if (isNaN(x = +this._x.call(null, data[i]))) continue;
	    xz[i] = x;
	    if (x < x0) x0 = x;
	    if (x > x1) x1 = x;
	  }

	  // If there were no (valid) points, abort.
	  if (x0 > x1) return this;

	  // Expand the tree to cover the new points.
	  this.cover(x0).cover(x1);

	  // Add the new points.
	  for (let i = 0; i < n; ++i) {
	    add$2(this, xz[i], data[i]);
	  }

	  return this;
	}

	function tree_cover$2(x) {
	  if (isNaN(x = +x)) return this; // ignore invalid points

	  var x0 = this._x0,
	      x1 = this._x1;

	  // If the binarytree has no extent, initialize them.
	  // Integer extent are necessary so that if we later double the extent,
	  // the existing half boundaries don’t change due to floating point error!
	  if (isNaN(x0)) {
	    x1 = (x0 = Math.floor(x)) + 1;
	  }

	  // Otherwise, double repeatedly to cover.
	  else {
	    var z = x1 - x0 || 1,
	        node = this._root,
	        parent,
	        i;

	    while (x0 > x || x >= x1) {
	      i = +(x < x0);
	      parent = new Array(2), parent[i] = node, node = parent, z *= 2;
	      switch (i) {
	        case 0: x1 = x0 + z; break;
	        case 1: x0 = x1 - z; break;
	      }
	    }

	    if (this._root && this._root.length) this._root = node;
	  }

	  this._x0 = x0;
	  this._x1 = x1;
	  return this;
	}

	function tree_data$2() {
	  var data = [];
	  this.visit(function(node) {
	    if (!node.length) do data.push(node.data); while (node = node.next)
	  });
	  return data;
	}

	function tree_extent$2(_) {
	  return arguments.length
	      ? this.cover(+_[0][0]).cover(+_[1][0])
	      : isNaN(this._x0) ? undefined : [[this._x0], [this._x1]];
	}

	function Half(node, x0, x1) {
	  this.node = node;
	  this.x0 = x0;
	  this.x1 = x1;
	}

	function tree_find$2(x, radius) {
	  var data,
	      x0 = this._x0,
	      x1,
	      x2,
	      x3 = this._x1,
	      halves = [],
	      node = this._root,
	      q,
	      i;

	  if (node) halves.push(new Half(node, x0, x3));
	  if (radius == null) radius = Infinity;
	  else {
	    x0 = x - radius;
	    x3 = x + radius;
	  }

	  while (q = halves.pop()) {

	    // Stop searching if this half can’t contain a closer node.
	    if (!(node = q.node)
	        || (x1 = q.x0) > x3
	        || (x2 = q.x1) < x0) continue;

	    // Bisect the current half.
	    if (node.length) {
	      var xm = (x1 + x2) / 2;

	      halves.push(
	        new Half(node[1], xm, x2),
	        new Half(node[0], x1, xm)
	      );

	      // Visit the closest half first.
	      if (i = +(x >= xm)) {
	        q = halves[halves.length - 1];
	        halves[halves.length - 1] = halves[halves.length - 1 - i];
	        halves[halves.length - 1 - i] = q;
	      }
	    }

	    // Visit this point. (Visiting coincident points isn’t necessary!)
	    else {
	      var d = Math.abs(x - +this._x.call(null, node.data));
	      if (d < radius) {
	        radius = d;
	        x0 = x - d;
	        x3 = x + d;
	        data = node.data;
	      }
	    }
	  }

	  return data;
	}

	function tree_remove$2(d) {
	  if (isNaN(x = +this._x.call(null, d))) return this; // ignore invalid points

	  var parent,
	      node = this._root,
	      retainer,
	      previous,
	      next,
	      x0 = this._x0,
	      x1 = this._x1,
	      x,
	      xm,
	      right,
	      i,
	      j;

	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return this;

	  // Find the leaf node for the point.
	  // While descending, also retain the deepest parent with a non-removed sibling.
	  if (node.length) while (true) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (!(parent = node, node = node[i = +right])) return this;
	    if (!node.length) break;
	    if (parent[(i + 1) & 1]) retainer = parent, j = i;
	  }

	  // Find the point to remove.
	  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
	  if (next = node.next) delete node.next;

	  // If there are multiple coincident points, remove just the point.
	  if (previous) return (next ? previous.next = next : delete previous.next), this;

	  // If this is the root point, remove it.
	  if (!parent) return this._root = next, this;

	  // Remove this leaf.
	  next ? parent[i] = next : delete parent[i];

	  // If the parent now contains exactly one leaf, collapse superfluous parents.
	  if ((node = parent[0] || parent[1])
	      && node === (parent[1] || parent[0])
	      && !node.length) {
	    if (retainer) retainer[j] = node;
	    else this._root = node;
	  }

	  return this;
	}

	function removeAll$2(data) {
	  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
	  return this;
	}

	function tree_root$2() {
	  return this._root;
	}

	function tree_size$2() {
	  var size = 0;
	  this.visit(function(node) {
	    if (!node.length) do ++size; while (node = node.next)
	  });
	  return size;
	}

	function tree_visit$2(callback) {
	  var halves = [], q, node = this._root, child, x0, x1;
	  if (node) halves.push(new Half(node, this._x0, this._x1));
	  while (q = halves.pop()) {
	    if (!callback(node = q.node, x0 = q.x0, x1 = q.x1) && node.length) {
	      var xm = (x0 + x1) / 2;
	      if (child = node[1]) halves.push(new Half(child, xm, x1));
	      if (child = node[0]) halves.push(new Half(child, x0, xm));
	    }
	  }
	  return this;
	}

	function tree_visitAfter$2(callback) {
	  var halves = [], next = [], q;
	  if (this._root) halves.push(new Half(this._root, this._x0, this._x1));
	  while (q = halves.pop()) {
	    var node = q.node;
	    if (node.length) {
	      var child, x0 = q.x0, x1 = q.x1, xm = (x0 + x1) / 2;
	      if (child = node[0]) halves.push(new Half(child, x0, xm));
	      if (child = node[1]) halves.push(new Half(child, xm, x1));
	    }
	    next.push(q);
	  }
	  while (q = next.pop()) {
	    callback(q.node, q.x0, q.x1);
	  }
	  return this;
	}

	function defaultX$2(d) {
	  return d[0];
	}

	function tree_x$2(_) {
	  return arguments.length ? (this._x = _, this) : this._x;
	}

	function binarytree(nodes, x) {
	  var tree = new Binarytree(x == null ? defaultX$2 : x, NaN, NaN);
	  return nodes == null ? tree : tree.addAll(nodes);
	}

	function Binarytree(x, x0, x1) {
	  this._x = x;
	  this._x0 = x0;
	  this._x1 = x1;
	  this._root = undefined;
	}

	function leaf_copy$2(leaf) {
	  var copy = {data: leaf.data}, next = copy;
	  while (leaf = leaf.next) next = next.next = {data: leaf.data};
	  return copy;
	}

	var treeProto$2 = binarytree.prototype = Binarytree.prototype;

	treeProto$2.copy = function() {
	  var copy = new Binarytree(this._x, this._x0, this._x1),
	      node = this._root,
	      nodes,
	      child;

	  if (!node) return copy;

	  if (!node.length) return copy._root = leaf_copy$2(node), copy;

	  nodes = [{source: node, target: copy._root = new Array(2)}];
	  while (node = nodes.pop()) {
	    for (var i = 0; i < 2; ++i) {
	      if (child = node.source[i]) {
	        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(2)});
	        else node.target[i] = leaf_copy$2(child);
	      }
	    }
	  }

	  return copy;
	};

	treeProto$2.add = tree_add$2;
	treeProto$2.addAll = addAll$2;
	treeProto$2.cover = tree_cover$2;
	treeProto$2.data = tree_data$2;
	treeProto$2.extent = tree_extent$2;
	treeProto$2.find = tree_find$2;
	treeProto$2.remove = tree_remove$2;
	treeProto$2.removeAll = removeAll$2;
	treeProto$2.root = tree_root$2;
	treeProto$2.size = tree_size$2;
	treeProto$2.visit = tree_visit$2;
	treeProto$2.visitAfter = tree_visitAfter$2;
	treeProto$2.x = tree_x$2;

	function tree_add$1(d) {
	  const x = +this._x.call(null, d),
	      y = +this._y.call(null, d);
	  return add$1(this.cover(x, y), x, y, d);
	}

	function add$1(tree, x, y, d) {
	  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

	  var parent,
	      node = tree._root,
	      leaf = {data: d},
	      x0 = tree._x0,
	      y0 = tree._y0,
	      x1 = tree._x1,
	      y1 = tree._y1,
	      xm,
	      ym,
	      xp,
	      yp,
	      right,
	      bottom,
	      i,
	      j;

	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return tree._root = leaf, tree;

	  // Find the existing leaf for the new point, or add it.
	  while (node.length) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
	  }

	  // Is the new point is exactly coincident with the existing point?
	  xp = +tree._x.call(null, node.data);
	  yp = +tree._y.call(null, node.data);
	  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

	  // Otherwise, split the leaf node until the old and new point are separated.
	  do {
	    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
	  return parent[j] = node, parent[i] = leaf, tree;
	}

	function addAll$1(data) {
	  var d, i, n = data.length,
	      x,
	      y,
	      xz = new Array(n),
	      yz = new Array(n),
	      x0 = Infinity,
	      y0 = Infinity,
	      x1 = -Infinity,
	      y1 = -Infinity;

	  // Compute the points and their extent.
	  for (i = 0; i < n; ++i) {
	    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
	    xz[i] = x;
	    yz[i] = y;
	    if (x < x0) x0 = x;
	    if (x > x1) x1 = x;
	    if (y < y0) y0 = y;
	    if (y > y1) y1 = y;
	  }

	  // If there were no (valid) points, abort.
	  if (x0 > x1 || y0 > y1) return this;

	  // Expand the tree to cover the new points.
	  this.cover(x0, y0).cover(x1, y1);

	  // Add the new points.
	  for (i = 0; i < n; ++i) {
	    add$1(this, xz[i], yz[i], data[i]);
	  }

	  return this;
	}

	function tree_cover$1(x, y) {
	  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

	  var x0 = this._x0,
	      y0 = this._y0,
	      x1 = this._x1,
	      y1 = this._y1;

	  // If the quadtree has no extent, initialize them.
	  // Integer extent are necessary so that if we later double the extent,
	  // the existing quadrant boundaries don’t change due to floating point error!
	  if (isNaN(x0)) {
	    x1 = (x0 = Math.floor(x)) + 1;
	    y1 = (y0 = Math.floor(y)) + 1;
	  }

	  // Otherwise, double repeatedly to cover.
	  else {
	    var z = x1 - x0 || 1,
	        node = this._root,
	        parent,
	        i;

	    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
	      i = (y < y0) << 1 | (x < x0);
	      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
	      switch (i) {
	        case 0: x1 = x0 + z, y1 = y0 + z; break;
	        case 1: x0 = x1 - z, y1 = y0 + z; break;
	        case 2: x1 = x0 + z, y0 = y1 - z; break;
	        case 3: x0 = x1 - z, y0 = y1 - z; break;
	      }
	    }

	    if (this._root && this._root.length) this._root = node;
	  }

	  this._x0 = x0;
	  this._y0 = y0;
	  this._x1 = x1;
	  this._y1 = y1;
	  return this;
	}

	function tree_data$1() {
	  var data = [];
	  this.visit(function(node) {
	    if (!node.length) do data.push(node.data); while (node = node.next)
	  });
	  return data;
	}

	function tree_extent$1(_) {
	  return arguments.length
	      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
	      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
	}

	function Quad(node, x0, y0, x1, y1) {
	  this.node = node;
	  this.x0 = x0;
	  this.y0 = y0;
	  this.x1 = x1;
	  this.y1 = y1;
	}

	function tree_find$1(x, y, radius) {
	  var data,
	      x0 = this._x0,
	      y0 = this._y0,
	      x1,
	      y1,
	      x2,
	      y2,
	      x3 = this._x1,
	      y3 = this._y1,
	      quads = [],
	      node = this._root,
	      q,
	      i;

	  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
	  if (radius == null) radius = Infinity;
	  else {
	    x0 = x - radius, y0 = y - radius;
	    x3 = x + radius, y3 = y + radius;
	    radius *= radius;
	  }

	  while (q = quads.pop()) {

	    // Stop searching if this quadrant can’t contain a closer node.
	    if (!(node = q.node)
	        || (x1 = q.x0) > x3
	        || (y1 = q.y0) > y3
	        || (x2 = q.x1) < x0
	        || (y2 = q.y1) < y0) continue;

	    // Bisect the current quadrant.
	    if (node.length) {
	      var xm = (x1 + x2) / 2,
	          ym = (y1 + y2) / 2;

	      quads.push(
	        new Quad(node[3], xm, ym, x2, y2),
	        new Quad(node[2], x1, ym, xm, y2),
	        new Quad(node[1], xm, y1, x2, ym),
	        new Quad(node[0], x1, y1, xm, ym)
	      );

	      // Visit the closest quadrant first.
	      if (i = (y >= ym) << 1 | (x >= xm)) {
	        q = quads[quads.length - 1];
	        quads[quads.length - 1] = quads[quads.length - 1 - i];
	        quads[quads.length - 1 - i] = q;
	      }
	    }

	    // Visit this point. (Visiting coincident points isn’t necessary!)
	    else {
	      var dx = x - +this._x.call(null, node.data),
	          dy = y - +this._y.call(null, node.data),
	          d2 = dx * dx + dy * dy;
	      if (d2 < radius) {
	        var d = Math.sqrt(radius = d2);
	        x0 = x - d, y0 = y - d;
	        x3 = x + d, y3 = y + d;
	        data = node.data;
	      }
	    }
	  }

	  return data;
	}

	function tree_remove$1(d) {
	  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

	  var parent,
	      node = this._root,
	      retainer,
	      previous,
	      next,
	      x0 = this._x0,
	      y0 = this._y0,
	      x1 = this._x1,
	      y1 = this._y1,
	      x,
	      y,
	      xm,
	      ym,
	      right,
	      bottom,
	      i,
	      j;

	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return this;

	  // Find the leaf node for the point.
	  // While descending, also retain the deepest parent with a non-removed sibling.
	  if (node.length) while (true) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
	    if (!node.length) break;
	    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
	  }

	  // Find the point to remove.
	  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
	  if (next = node.next) delete node.next;

	  // If there are multiple coincident points, remove just the point.
	  if (previous) return (next ? previous.next = next : delete previous.next), this;

	  // If this is the root point, remove it.
	  if (!parent) return this._root = next, this;

	  // Remove this leaf.
	  next ? parent[i] = next : delete parent[i];

	  // If the parent now contains exactly one leaf, collapse superfluous parents.
	  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
	      && node === (parent[3] || parent[2] || parent[1] || parent[0])
	      && !node.length) {
	    if (retainer) retainer[j] = node;
	    else this._root = node;
	  }

	  return this;
	}

	function removeAll$1(data) {
	  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
	  return this;
	}

	function tree_root$1() {
	  return this._root;
	}

	function tree_size$1() {
	  var size = 0;
	  this.visit(function(node) {
	    if (!node.length) do ++size; while (node = node.next)
	  });
	  return size;
	}

	function tree_visit$1(callback) {
	  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
	  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
	  while (q = quads.pop()) {
	    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
	      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
	      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
	      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
	      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
	      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
	    }
	  }
	  return this;
	}

	function tree_visitAfter$1(callback) {
	  var quads = [], next = [], q;
	  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
	  while (q = quads.pop()) {
	    var node = q.node;
	    if (node.length) {
	      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
	      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
	      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
	      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
	      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
	    }
	    next.push(q);
	  }
	  while (q = next.pop()) {
	    callback(q.node, q.x0, q.y0, q.x1, q.y1);
	  }
	  return this;
	}

	function defaultX$1(d) {
	  return d[0];
	}

	function tree_x$1(_) {
	  return arguments.length ? (this._x = _, this) : this._x;
	}

	function defaultY$1(d) {
	  return d[1];
	}

	function tree_y$1(_) {
	  return arguments.length ? (this._y = _, this) : this._y;
	}

	function quadtree(nodes, x, y) {
	  var tree = new Quadtree(x == null ? defaultX$1 : x, y == null ? defaultY$1 : y, NaN, NaN, NaN, NaN);
	  return nodes == null ? tree : tree.addAll(nodes);
	}

	function Quadtree(x, y, x0, y0, x1, y1) {
	  this._x = x;
	  this._y = y;
	  this._x0 = x0;
	  this._y0 = y0;
	  this._x1 = x1;
	  this._y1 = y1;
	  this._root = undefined;
	}

	function leaf_copy$1(leaf) {
	  var copy = {data: leaf.data}, next = copy;
	  while (leaf = leaf.next) next = next.next = {data: leaf.data};
	  return copy;
	}

	var treeProto$1 = quadtree.prototype = Quadtree.prototype;

	treeProto$1.copy = function() {
	  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
	      node = this._root,
	      nodes,
	      child;

	  if (!node) return copy;

	  if (!node.length) return copy._root = leaf_copy$1(node), copy;

	  nodes = [{source: node, target: copy._root = new Array(4)}];
	  while (node = nodes.pop()) {
	    for (var i = 0; i < 4; ++i) {
	      if (child = node.source[i]) {
	        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
	        else node.target[i] = leaf_copy$1(child);
	      }
	    }
	  }

	  return copy;
	};

	treeProto$1.add = tree_add$1;
	treeProto$1.addAll = addAll$1;
	treeProto$1.cover = tree_cover$1;
	treeProto$1.data = tree_data$1;
	treeProto$1.extent = tree_extent$1;
	treeProto$1.find = tree_find$1;
	treeProto$1.remove = tree_remove$1;
	treeProto$1.removeAll = removeAll$1;
	treeProto$1.root = tree_root$1;
	treeProto$1.size = tree_size$1;
	treeProto$1.visit = tree_visit$1;
	treeProto$1.visitAfter = tree_visitAfter$1;
	treeProto$1.x = tree_x$1;
	treeProto$1.y = tree_y$1;

	function tree_add(d) {
	  const x = +this._x.call(null, d),
	      y = +this._y.call(null, d),
	      z = +this._z.call(null, d);
	  return add(this.cover(x, y, z), x, y, z, d);
	}

	function add(tree, x, y, z, d) {
	  if (isNaN(x) || isNaN(y) || isNaN(z)) return tree; // ignore invalid points

	  var parent,
	      node = tree._root,
	      leaf = {data: d},
	      x0 = tree._x0,
	      y0 = tree._y0,
	      z0 = tree._z0,
	      x1 = tree._x1,
	      y1 = tree._y1,
	      z1 = tree._z1,
	      xm,
	      ym,
	      zm,
	      xp,
	      yp,
	      zp,
	      right,
	      bottom,
	      deep,
	      i,
	      j;

	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return tree._root = leaf, tree;

	  // Find the existing leaf for the new point, or add it.
	  while (node.length) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (deep = z >= (zm = (z0 + z1) / 2)) z0 = zm; else z1 = zm;
	    if (parent = node, !(node = node[i = deep << 2 | bottom << 1 | right])) return parent[i] = leaf, tree;
	  }

	  // Is the new point is exactly coincident with the existing point?
	  xp = +tree._x.call(null, node.data);
	  yp = +tree._y.call(null, node.data);
	  zp = +tree._z.call(null, node.data);
	  if (x === xp && y === yp && z === zp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

	  // Otherwise, split the leaf node until the old and new point are separated.
	  do {
	    parent = parent ? parent[i] = new Array(8) : tree._root = new Array(8);
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (deep = z >= (zm = (z0 + z1) / 2)) z0 = zm; else z1 = zm;
	  } while ((i = deep << 2 | bottom << 1 | right) === (j = (zp >= zm) << 2 | (yp >= ym) << 1 | (xp >= xm)));
	  return parent[j] = node, parent[i] = leaf, tree;
	}

	function addAll(data) {
	  if (!Array.isArray(data)) data = Array.from(data);
	  const n = data.length;
	  const xz = new Float64Array(n);
	  const yz = new Float64Array(n);
	  const zz = new Float64Array(n);
	  let x0 = Infinity,
	      y0 = Infinity,
	      z0 = Infinity,
	      x1 = -Infinity,
	      y1 = -Infinity,
	      z1 = -Infinity;

	  // Compute the points and their extent.
	  for (let i = 0, d, x, y, z; i < n; ++i) {
	    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d)) || isNaN(z = +this._z.call(null, d))) continue;
	    xz[i] = x;
	    yz[i] = y;
	    zz[i] = z;
	    if (x < x0) x0 = x;
	    if (x > x1) x1 = x;
	    if (y < y0) y0 = y;
	    if (y > y1) y1 = y;
	    if (z < z0) z0 = z;
	    if (z > z1) z1 = z;
	  }

	  // If there were no (valid) points, abort.
	  if (x0 > x1 || y0 > y1 || z0 > z1) return this;

	  // Expand the tree to cover the new points.
	  this.cover(x0, y0, z0).cover(x1, y1, z1);

	  // Add the new points.
	  for (let i = 0; i < n; ++i) {
	    add(this, xz[i], yz[i], zz[i], data[i]);
	  }

	  return this;
	}

	function tree_cover(x, y, z) {
	  if (isNaN(x = +x) || isNaN(y = +y) || isNaN(z = +z)) return this; // ignore invalid points

	  var x0 = this._x0,
	      y0 = this._y0,
	      z0 = this._z0,
	      x1 = this._x1,
	      y1 = this._y1,
	      z1 = this._z1;

	  // If the octree has no extent, initialize them.
	  // Integer extent are necessary so that if we later double the extent,
	  // the existing octant boundaries don’t change due to floating point error!
	  if (isNaN(x0)) {
	    x1 = (x0 = Math.floor(x)) + 1;
	    y1 = (y0 = Math.floor(y)) + 1;
	    z1 = (z0 = Math.floor(z)) + 1;
	  }

	  // Otherwise, double repeatedly to cover.
	  else {
	    var t = x1 - x0 || 1,
	        node = this._root,
	        parent,
	        i;

	    while (x0 > x || x >= x1 || y0 > y || y >= y1 || z0 > z || z >= z1) {
	      i = (z < z0) << 2 | (y < y0) << 1 | (x < x0);
	      parent = new Array(8), parent[i] = node, node = parent, t *= 2;
	      switch (i) {
	        case 0: x1 = x0 + t, y1 = y0 + t, z1 = z0 + t; break;
	        case 1: x0 = x1 - t, y1 = y0 + t, z1 = z0 + t; break;
	        case 2: x1 = x0 + t, y0 = y1 - t, z1 = z0 + t; break;
	        case 3: x0 = x1 - t, y0 = y1 - t, z1 = z0 + t; break;
	        case 4: x1 = x0 + t, y1 = y0 + t, z0 = z1 - t; break;
	        case 5: x0 = x1 - t, y1 = y0 + t, z0 = z1 - t; break;
	        case 6: x1 = x0 + t, y0 = y1 - t, z0 = z1 - t; break;
	        case 7: x0 = x1 - t, y0 = y1 - t, z0 = z1 - t; break;
	      }
	    }

	    if (this._root && this._root.length) this._root = node;
	  }

	  this._x0 = x0;
	  this._y0 = y0;
	  this._z0 = z0;
	  this._x1 = x1;
	  this._y1 = y1;
	  this._z1 = z1;
	  return this;
	}

	function tree_data() {
	  var data = [];
	  this.visit(function(node) {
	    if (!node.length) do data.push(node.data); while (node = node.next)
	  });
	  return data;
	}

	function tree_extent(_) {
	  return arguments.length
	      ? this.cover(+_[0][0], +_[0][1], +_[0][2]).cover(+_[1][0], +_[1][1], +_[1][2])
	      : isNaN(this._x0) ? undefined : [[this._x0, this._y0, this._z0], [this._x1, this._y1, this._z1]];
	}

	function Octant(node, x0, y0, z0, x1, y1, z1) {
	  this.node = node;
	  this.x0 = x0;
	  this.y0 = y0;
	  this.z0 = z0;
	  this.x1 = x1;
	  this.y1 = y1;
	  this.z1 = z1;
	}

	function tree_find(x, y, z, radius) {
	  var data,
	      x0 = this._x0,
	      y0 = this._y0,
	      z0 = this._z0,
	      x1,
	      y1,
	      z1,
	      x2,
	      y2,
	      z2,
	      x3 = this._x1,
	      y3 = this._y1,
	      z3 = this._z1,
	      octs = [],
	      node = this._root,
	      q,
	      i;

	  if (node) octs.push(new Octant(node, x0, y0, z0, x3, y3, z3));
	  if (radius == null) radius = Infinity;
	  else {
	    x0 = x - radius, y0 = y - radius, z0 = z - radius;
	    x3 = x + radius, y3 = y + radius, z3 = z + radius;
	    radius *= radius;
	  }

	  while (q = octs.pop()) {

	    // Stop searching if this octant can’t contain a closer node.
	    if (!(node = q.node)
	        || (x1 = q.x0) > x3
	        || (y1 = q.y0) > y3
	        || (z1 = q.z0) > z3
	        || (x2 = q.x1) < x0
	        || (y2 = q.y1) < y0
	        || (z2 = q.z1) < z0) continue;

	    // Bisect the current octant.
	    if (node.length) {
	      var xm = (x1 + x2) / 2,
	          ym = (y1 + y2) / 2,
	          zm = (z1 + z2) / 2;

	      octs.push(
	        new Octant(node[7], xm, ym, zm, x2, y2, z2),
	        new Octant(node[6], x1, ym, zm, xm, y2, z2),
	        new Octant(node[5], xm, y1, zm, x2, ym, z2),
	        new Octant(node[4], x1, y1, zm, xm, ym, z2),
	        new Octant(node[3], xm, ym, z1, x2, y2, zm),
	        new Octant(node[2], x1, ym, z1, xm, y2, zm),
	        new Octant(node[1], xm, y1, z1, x2, ym, zm),
	        new Octant(node[0], x1, y1, z1, xm, ym, zm)
	      );

	      // Visit the closest octant first.
	      if (i = (z >= zm) << 2 | (y >= ym) << 1 | (x >= xm)) {
	        q = octs[octs.length - 1];
	        octs[octs.length - 1] = octs[octs.length - 1 - i];
	        octs[octs.length - 1 - i] = q;
	      }
	    }

	    // Visit this point. (Visiting coincident points isn’t necessary!)
	    else {
	      var dx = x - +this._x.call(null, node.data),
	          dy = y - +this._y.call(null, node.data),
	          dz = z - +this._z.call(null, node.data),
	          d2 = dx * dx + dy * dy + dz * dz;
	      if (d2 < radius) {
	        var d = Math.sqrt(radius = d2);
	        x0 = x - d, y0 = y - d, z0 = z - d;
	        x3 = x + d, y3 = y + d, z3 = z + d;
	        data = node.data;
	      }
	    }
	  }

	  return data;
	}

	function tree_remove(d) {
	  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d)) || isNaN(z = +this._z.call(null, d))) return this; // ignore invalid points

	  var parent,
	      node = this._root,
	      retainer,
	      previous,
	      next,
	      x0 = this._x0,
	      y0 = this._y0,
	      z0 = this._z0,
	      x1 = this._x1,
	      y1 = this._y1,
	      z1 = this._z1,
	      x,
	      y,
	      z,
	      xm,
	      ym,
	      zm,
	      right,
	      bottom,
	      deep,
	      i,
	      j;

	  // If the tree is empty, initialize the root as a leaf.
	  if (!node) return this;

	  // Find the leaf node for the point.
	  // While descending, also retain the deepest parent with a non-removed sibling.
	  if (node.length) while (true) {
	    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
	    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
	    if (deep = z >= (zm = (z0 + z1) / 2)) z0 = zm; else z1 = zm;
	    if (!(parent = node, node = node[i = deep << 2 | bottom << 1 | right])) return this;
	    if (!node.length) break;
	    if (parent[(i + 1) & 7] || parent[(i + 2) & 7] || parent[(i + 3) & 7] || parent[(i + 4) & 7] || parent[(i + 5) & 7] || parent[(i + 6) & 7] || parent[(i + 7) & 7]) retainer = parent, j = i;
	  }

	  // Find the point to remove.
	  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
	  if (next = node.next) delete node.next;

	  // If there are multiple coincident points, remove just the point.
	  if (previous) return (next ? previous.next = next : delete previous.next), this;

	  // If this is the root point, remove it.
	  if (!parent) return this._root = next, this;

	  // Remove this leaf.
	  next ? parent[i] = next : delete parent[i];

	  // If the parent now contains exactly one leaf, collapse superfluous parents.
	  if ((node = parent[0] || parent[1] || parent[2] || parent[3] || parent[4] || parent[5] || parent[6] || parent[7])
	      && node === (parent[7] || parent[6] || parent[5] || parent[4] || parent[3] || parent[2] || parent[1] || parent[0])
	      && !node.length) {
	    if (retainer) retainer[j] = node;
	    else this._root = node;
	  }

	  return this;
	}

	function removeAll(data) {
	  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
	  return this;
	}

	function tree_root() {
	  return this._root;
	}

	function tree_size() {
	  var size = 0;
	  this.visit(function(node) {
	    if (!node.length) do ++size; while (node = node.next)
	  });
	  return size;
	}

	function tree_visit(callback) {
	  var octs = [], q, node = this._root, child, x0, y0, z0, x1, y1, z1;
	  if (node) octs.push(new Octant(node, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
	  while (q = octs.pop()) {
	    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, z0 = q.z0, x1 = q.x1, y1 = q.y1, z1 = q.z1) && node.length) {
	      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2, zm = (z0 + z1) / 2;
	      if (child = node[7]) octs.push(new Octant(child, xm, ym, zm, x1, y1, z1));
	      if (child = node[6]) octs.push(new Octant(child, x0, ym, zm, xm, y1, z1));
	      if (child = node[5]) octs.push(new Octant(child, xm, y0, zm, x1, ym, z1));
	      if (child = node[4]) octs.push(new Octant(child, x0, y0, zm, xm, ym, z1));
	      if (child = node[3]) octs.push(new Octant(child, xm, ym, z0, x1, y1, zm));
	      if (child = node[2]) octs.push(new Octant(child, x0, ym, z0, xm, y1, zm));
	      if (child = node[1]) octs.push(new Octant(child, xm, y0, z0, x1, ym, zm));
	      if (child = node[0]) octs.push(new Octant(child, x0, y0, z0, xm, ym, zm));
	    }
	  }
	  return this;
	}

	function tree_visitAfter(callback) {
	  var octs = [], next = [], q;
	  if (this._root) octs.push(new Octant(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
	  while (q = octs.pop()) {
	    var node = q.node;
	    if (node.length) {
	      var child, x0 = q.x0, y0 = q.y0, z0 = q.z0, x1 = q.x1, y1 = q.y1, z1 = q.z1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2, zm = (z0 + z1) / 2;
	      if (child = node[0]) octs.push(new Octant(child, x0, y0, z0, xm, ym, zm));
	      if (child = node[1]) octs.push(new Octant(child, xm, y0, z0, x1, ym, zm));
	      if (child = node[2]) octs.push(new Octant(child, x0, ym, z0, xm, y1, zm));
	      if (child = node[3]) octs.push(new Octant(child, xm, ym, z0, x1, y1, zm));
	      if (child = node[4]) octs.push(new Octant(child, x0, y0, zm, xm, ym, z1));
	      if (child = node[5]) octs.push(new Octant(child, xm, y0, zm, x1, ym, z1));
	      if (child = node[6]) octs.push(new Octant(child, x0, ym, zm, xm, y1, z1));
	      if (child = node[7]) octs.push(new Octant(child, xm, ym, zm, x1, y1, z1));
	    }
	    next.push(q);
	  }
	  while (q = next.pop()) {
	    callback(q.node, q.x0, q.y0, q.z0, q.x1, q.y1, q.z1);
	  }
	  return this;
	}

	function defaultX(d) {
	  return d[0];
	}

	function tree_x(_) {
	  return arguments.length ? (this._x = _, this) : this._x;
	}

	function defaultY(d) {
	  return d[1];
	}

	function tree_y(_) {
	  return arguments.length ? (this._y = _, this) : this._y;
	}

	function defaultZ(d) {
	  return d[2];
	}

	function tree_z(_) {
	  return arguments.length ? (this._z = _, this) : this._z;
	}

	function octree(nodes, x, y, z) {
	  var tree = new Octree(x == null ? defaultX : x, y == null ? defaultY : y, z == null ? defaultZ : z, NaN, NaN, NaN, NaN, NaN, NaN);
	  return nodes == null ? tree : tree.addAll(nodes);
	}

	function Octree(x, y, z, x0, y0, z0, x1, y1, z1) {
	  this._x = x;
	  this._y = y;
	  this._z = z;
	  this._x0 = x0;
	  this._y0 = y0;
	  this._z0 = z0;
	  this._x1 = x1;
	  this._y1 = y1;
	  this._z1 = z1;
	  this._root = undefined;
	}

	function leaf_copy(leaf) {
	  var copy = {data: leaf.data}, next = copy;
	  while (leaf = leaf.next) next = next.next = {data: leaf.data};
	  return copy;
	}

	var treeProto = octree.prototype = Octree.prototype;

	treeProto.copy = function() {
	  var copy = new Octree(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
	      node = this._root,
	      nodes,
	      child;

	  if (!node) return copy;

	  if (!node.length) return copy._root = leaf_copy(node), copy;

	  nodes = [{source: node, target: copy._root = new Array(8)}];
	  while (node = nodes.pop()) {
	    for (var i = 0; i < 8; ++i) {
	      if (child = node.source[i]) {
	        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(8)});
	        else node.target[i] = leaf_copy(child);
	      }
	    }
	  }

	  return copy;
	};

	treeProto.add = tree_add;
	treeProto.addAll = addAll;
	treeProto.cover = tree_cover;
	treeProto.data = tree_data;
	treeProto.extent = tree_extent;
	treeProto.find = tree_find;
	treeProto.remove = tree_remove;
	treeProto.removeAll = removeAll;
	treeProto.root = tree_root;
	treeProto.size = tree_size;
	treeProto.visit = tree_visit;
	treeProto.visitAfter = tree_visitAfter;
	treeProto.x = tree_x;
	treeProto.y = tree_y;
	treeProto.z = tree_z;

	function constant(x) {
	  return function() {
	    return x;
	  };
	}

	function jiggle(random) {
	  return (random() - 0.5) * 1e-6;
	}

	function index(d) {
	  return d.index;
	}

	function find(nodeById, nodeId) {
	  var node = nodeById.get(nodeId);
	  if (!node) throw new Error("node not found: " + nodeId);
	  return node;
	}

	function forceLink(links) {
	  var id = index,
	      strength = defaultStrength,
	      strengths,
	      distance = constant(30),
	      distances,
	      nodes,
	      nDim,
	      count,
	      bias,
	      random,
	      iterations = 1;

	  if (links == null) links = [];

	  function defaultStrength(link) {
	    return 1 / Math.min(count[link.source.index], count[link.target.index]);
	  }

	  function force(alpha) {
	    for (var k = 0, n = links.length; k < iterations; ++k) {
	      for (var i = 0, link, source, target, x = 0, y = 0, z = 0, l, b; i < n; ++i) {
	        link = links[i], source = link.source, target = link.target;
	        x = target.x + target.vx - source.x - source.vx || jiggle(random);
	        if (nDim > 1) { y = target.y + target.vy - source.y - source.vy || jiggle(random); }
	        if (nDim > 2) { z = target.z + target.vz - source.z - source.vz || jiggle(random); }
	        l = Math.sqrt(x * x + y * y + z * z);
	        l = (l - distances[i]) / l * alpha * strengths[i];
	        x *= l, y *= l, z *= l;

	        target.vx -= x * (b = bias[i]);
	        if (nDim > 1) { target.vy -= y * b; }
	        if (nDim > 2) { target.vz -= z * b; }

	        source.vx += x * (b = 1 - b);
	        if (nDim > 1) { source.vy += y * b; }
	        if (nDim > 2) { source.vz += z * b; }
	      }
	    }
	  }

	  function initialize() {
	    if (!nodes) return;

	    var i,
	        n = nodes.length,
	        m = links.length,
	        nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
	        link;

	    for (i = 0, count = new Array(n); i < m; ++i) {
	      link = links[i], link.index = i;
	      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
	      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
	      count[link.source.index] = (count[link.source.index] || 0) + 1;
	      count[link.target.index] = (count[link.target.index] || 0) + 1;
	    }

	    for (i = 0, bias = new Array(m); i < m; ++i) {
	      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
	    }

	    strengths = new Array(m), initializeStrength();
	    distances = new Array(m), initializeDistance();
	  }

	  function initializeStrength() {
	    if (!nodes) return;

	    for (var i = 0, n = links.length; i < n; ++i) {
	      strengths[i] = +strength(links[i], i, links);
	    }
	  }

	  function initializeDistance() {
	    if (!nodes) return;

	    for (var i = 0, n = links.length; i < n; ++i) {
	      distances[i] = +distance(links[i], i, links);
	    }
	  }

	  force.initialize = function(_nodes, ...args) {
	    nodes = _nodes;
	    random = args.find(arg => typeof arg === 'function') || Math.random;
	    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
	    initialize();
	  };

	  force.links = function(_) {
	    return arguments.length ? (links = _, initialize(), force) : links;
	  };

	  force.id = function(_) {
	    return arguments.length ? (id = _, force) : id;
	  };

	  force.iterations = function(_) {
	    return arguments.length ? (iterations = +_, force) : iterations;
	  };

	  force.strength = function(_) {
	    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
	  };

	  force.distance = function(_) {
	    return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
	  };

	  return force;
	}

	var noop = {value: () => {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	var frame = 0, // is an animation frame pending?
	    timeout = 0, // is a timeout pending?
	    interval = 0, // are any timers active?
	    pokeDelay = 1000, // how frequently we check for clock skew
	    taskHead,
	    taskTail,
	    clockLast = 0,
	    clockNow = 0,
	    clockSkew = 0,
	    clock = typeof performance === "object" && performance.now ? performance : Date,
	    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}

	function clearNow() {
	  clockNow = 0;
	}

	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}

	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};

	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}

	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
	    t = t._next;
	  }
	  --frame;
	}

	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}

	function poke() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}

	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}

	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}

	// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
	const a = 1664525;
	const c = 1013904223;
	const m = 4294967296; // 2^32

	function lcg() {
	  let s = 1;
	  return () => (s = (a * s + c) % m) / m;
	}

	var MAX_DIMENSIONS = 3;

	function x(d) {
	  return d.x;
	}

	function y(d) {
	  return d.y;
	}

	function z(d) {
	  return d.z;
	}

	var initialRadius = 10,
	    initialAngleRoll = Math.PI * (3 - Math.sqrt(5)), // Golden ratio angle
	    initialAngleYaw = Math.PI * 20 / (9 + Math.sqrt(221)); // Markov irrational number

	function forceSimulation(nodes, numDimensions) {
	  numDimensions = numDimensions || 2;

	  var nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(numDimensions))),
	      simulation,
	      alpha = 1,
	      alphaMin = 0.001,
	      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
	      alphaTarget = 0,
	      velocityDecay = 0.6,
	      forces = new Map(),
	      stepper = timer(step),
	      event = dispatch("tick", "end"),
	      random = lcg();

	  if (nodes == null) nodes = [];

	  function step() {
	    tick();
	    event.call("tick", simulation);
	    if (alpha < alphaMin) {
	      stepper.stop();
	      event.call("end", simulation);
	    }
	  }

	  function tick(iterations) {
	    var i, n = nodes.length, node;

	    if (iterations === undefined) iterations = 1;

	    for (var k = 0; k < iterations; ++k) {
	      alpha += (alphaTarget - alpha) * alphaDecay;

	      forces.forEach(function (force) {
	        force(alpha);
	      });

	      for (i = 0; i < n; ++i) {
	        node = nodes[i];
	        if (node.fx == null) node.x += node.vx *= velocityDecay;
	        else node.x = node.fx, node.vx = 0;
	        if (nDim > 1) {
	          if (node.fy == null) node.y += node.vy *= velocityDecay;
	          else node.y = node.fy, node.vy = 0;
	        }
	        if (nDim > 2) {
	          if (node.fz == null) node.z += node.vz *= velocityDecay;
	          else node.z = node.fz, node.vz = 0;
	        }
	      }
	    }

	    return simulation;
	  }

	  function initializeNodes() {
	    for (var i = 0, n = nodes.length, node; i < n; ++i) {
	      node = nodes[i], node.index = i;
	      if (node.fx != null) node.x = node.fx;
	      if (node.fy != null) node.y = node.fy;
	      if (node.fz != null) node.z = node.fz;
	      if (isNaN(node.x) || (nDim > 1 && isNaN(node.y)) || (nDim > 2 && isNaN(node.z))) {
	        var radius = initialRadius * (nDim > 2 ? Math.cbrt(0.5 + i) : (nDim > 1 ? Math.sqrt(0.5 + i) : i)),
	          rollAngle = i * initialAngleRoll,
	          yawAngle = i * initialAngleYaw;

	        if (nDim === 1) {
	          node.x = radius;
	        } else if (nDim === 2) {
	          node.x = radius * Math.cos(rollAngle);
	          node.y = radius * Math.sin(rollAngle);
	        } else { // 3 dimensions: use spherical distribution along 2 irrational number angles
	          node.x = radius * Math.sin(rollAngle) * Math.cos(yawAngle);
	          node.y = radius * Math.cos(rollAngle);
	          node.z = radius * Math.sin(rollAngle) * Math.sin(yawAngle);
	        }
	      }
	      if (isNaN(node.vx) || (nDim > 1 && isNaN(node.vy)) || (nDim > 2 && isNaN(node.vz))) {
	        node.vx = 0;
	        if (nDim > 1) { node.vy = 0; }
	        if (nDim > 2) { node.vz = 0; }
	      }
	    }
	  }

	  function initializeForce(force) {
	    if (force.initialize) force.initialize(nodes, random, nDim);
	    return force;
	  }

	  initializeNodes();

	  return simulation = {
	    tick: tick,

	    restart: function() {
	      return stepper.restart(step), simulation;
	    },

	    stop: function() {
	      return stepper.stop(), simulation;
	    },

	    numDimensions: function(_) {
	      return arguments.length
	          ? (nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(_))), forces.forEach(initializeForce), simulation)
	          : nDim;
	    },

	    nodes: function(_) {
	      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
	    },

	    alpha: function(_) {
	      return arguments.length ? (alpha = +_, simulation) : alpha;
	    },

	    alphaMin: function(_) {
	      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
	    },

	    alphaDecay: function(_) {
	      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
	    },

	    alphaTarget: function(_) {
	      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
	    },

	    velocityDecay: function(_) {
	      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
	    },

	    randomSource: function(_) {
	      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
	    },

	    force: function(name, _) {
	      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
	    },

	    find: function() {
	      var args = Array.prototype.slice.call(arguments);
	      var x = args.shift() || 0,
	          y = (nDim > 1 ? args.shift() : null) || 0,
	          z = (nDim > 2 ? args.shift() : null) || 0,
	          radius = args.shift() || Infinity;

	      var i = 0,
	          n = nodes.length,
	          dx,
	          dy,
	          dz,
	          d2,
	          node,
	          closest;

	      radius *= radius;

	      for (i = 0; i < n; ++i) {
	        node = nodes[i];
	        dx = x - node.x;
	        dy = y - (node.y || 0);
	        dz = z - (node.z ||0);
	        d2 = dx * dx + dy * dy + dz * dz;
	        if (d2 < radius) closest = node, radius = d2;
	      }

	      return closest;
	    },

	    on: function(name, _) {
	      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
	    }
	  };
	}

	function forceManyBody() {
	  var nodes,
	      nDim,
	      node,
	      random,
	      alpha,
	      strength = constant(-30),
	      strengths,
	      distanceMin2 = 1,
	      distanceMax2 = Infinity,
	      theta2 = 0.81;

	  function force(_) {
	    var i,
	        n = nodes.length,
	        tree =
	            (nDim === 1 ? binarytree(nodes, x)
	            :(nDim === 2 ? quadtree(nodes, x, y)
	            :(nDim === 3 ? octree(nodes, x, y, z)
	            :null
	        ))).visitAfter(accumulate);

	    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
	  }

	  function initialize() {
	    if (!nodes) return;
	    var i, n = nodes.length, node;
	    strengths = new Array(n);
	    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
	  }

	  function accumulate(treeNode) {
	    var strength = 0, q, c, weight = 0, x, y, z, i;
	    var numChildren = treeNode.length;

	    // For internal nodes, accumulate forces from children.
	    if (numChildren) {
	      for (x = y = z = i = 0; i < numChildren; ++i) {
	        if ((q = treeNode[i]) && (c = Math.abs(q.value))) {
	          strength += q.value, weight += c, x += c * (q.x || 0), y += c * (q.y || 0), z += c * (q.z || 0);
	        }
	      }
	      strength *= Math.sqrt(4 / numChildren); // scale accumulated strength according to number of dimensions

	      treeNode.x = x / weight;
	      if (nDim > 1) { treeNode.y = y / weight; }
	      if (nDim > 2) { treeNode.z = z / weight; }
	    }

	    // For leaf nodes, accumulate forces from coincident nodes.
	    else {
	      q = treeNode;
	      q.x = q.data.x;
	      if (nDim > 1) { q.y = q.data.y; }
	      if (nDim > 2) { q.z = q.data.z; }
	      do strength += strengths[q.data.index];
	      while (q = q.next);
	    }

	    treeNode.value = strength;
	  }

	  function apply(treeNode, x1, arg1, arg2, arg3) {
	    if (!treeNode.value) return true;
	    var x2 = [arg1, arg2, arg3][nDim-1];

	    var x = treeNode.x - node.x,
	        y = (nDim > 1 ? treeNode.y - node.y : 0),
	        z = (nDim > 2 ? treeNode.z - node.z : 0),
	        w = x2 - x1,
	        l = x * x + y * y + z * z;

	    // Apply the Barnes-Hut approximation if possible.
	    // Limit forces for very close nodes; randomize direction if coincident.
	    if (w * w / theta2 < l) {
	      if (l < distanceMax2) {
	        if (x === 0) x = jiggle(random), l += x * x;
	        if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
	        if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
	        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
	        node.vx += x * treeNode.value * alpha / l;
	        if (nDim > 1) { node.vy += y * treeNode.value * alpha / l; }
	        if (nDim > 2) { node.vz += z * treeNode.value * alpha / l; }
	      }
	      return true;
	    }

	    // Otherwise, process points directly.
	    else if (treeNode.length || l >= distanceMax2) return;

	    // Limit forces for very close nodes; randomize direction if coincident.
	    if (treeNode.data !== node || treeNode.next) {
	      if (x === 0) x = jiggle(random), l += x * x;
	      if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
	      if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
	      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
	    }

	    do if (treeNode.data !== node) {
	      w = strengths[treeNode.data.index] * alpha / l;
	      node.vx += x * w;
	      if (nDim > 1) { node.vy += y * w; }
	      if (nDim > 2) { node.vz += z * w; }
	    } while (treeNode = treeNode.next);
	  }

	  force.initialize = function(_nodes, ...args) {
	    nodes = _nodes;
	    random = args.find(arg => typeof arg === 'function') || Math.random;
	    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
	    initialize();
	  };

	  force.strength = function(_) {
	    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
	  };

	  force.distanceMin = function(_) {
	    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
	  };

	  force.distanceMax = function(_) {
	    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
	  };

	  force.theta = function(_) {
	    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
	  };

	  return force;
	}

	// @ts-nocheck
	// neuralNetworkAnimation.js
	// forked from https://hungyi.net/posts/pseudo-3d-force-graph/#fn.2


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
	  set x(v) { this.position.x = v; }
	  get y() { return this.position.y }
	  set y(v) { this.position.y = v; }
	  get z() { return this.position.z }
	  set z(v) { this.position.z = v; }

	  blink() {
	    this._blinkT0 = TICKS;
	  }

	  render() {
	    if (!this._renderable) {
	      this._renderable = new jsExports.Ellipse({
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
	      const alpha = jsExports.easeInOut(blinkProgress, 3);
	      if (!this._blinkRenderable) {
	        this._blinkRenderable = new jsExports.Ellipse({
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
	      this._renderable = new jsExports.Shape({
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
	      const alpha = (0.5 - Math.abs(jsExports.easeInOut(blinkProgress, 3) - 0.5)) / 2;

	      // If nothing rendered for the blink effect, create the shape
	      if (!this._blinkRenderable) {
	        this._blinkRenderable = new jsExports.Shape({
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
	      this._renderable.color = YELLOW + alphaToOpacity(0.2 + alpha);
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

	const ILLO = new jsExports.Illustration({
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
	    requestAnimationFrame(() => animate());
	  }
	  animate();
	}

	createIllustration({ numNodes: 100, numLinks: 0 });

})();

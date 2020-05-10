// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var eraserEnable = false;
var lineWidth = 5;
autoSetCanvasSize(canvas);
color();
listenToUser(canvas);
actions();
/*********************************************************/

function drawLine(beginX, beginY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
}

function actions() {
  pencil.onclick = function () {
    eraserEnable = false;
    pencil.classList.add('active');
    eraser.classList.remove('active');
  };

  eraser.onclick = function () {
    eraserEnable = true;
    eraser.classList.add('active');
    pencil.classList.remove('active');
  };

  clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  download.onclick = function () {
    var url = canvas.toDataURL('imag/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'My Drawing';
    a.target = '_blank';
    a.click();
  };
}

function color() {
  black.onclick = function () {
    // ctx.fillStyle = 'red'
    ctx.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
  };

  red.onclick = function () {
    // ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red';
    red.classList.add('active');
    black.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
  };

  yellow.onclick = function () {
    // ctx.fillStyle = 'red'
    ctx.strokeStyle = 'yellow';
    yellow.classList.add('active');
    black.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
  };

  blue.onclick = function () {
    // ctx.fillStyle = 'red'
    ctx.strokeStyle = 'blue';
    blue.classList.add('active');
    black.classList.remove('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
  };

  thin.onclick = function () {
    lineWidth = 5;
  };

  thick.onclick = function () {
    lineWidth = 10;
  };
}

function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function () {
    setCanvasSize();
  };

  function setCanvasSize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
  }
}

function listenToUser(canvas) {
  var lastPoint = {
    x: undefined,
    y: undefined
  };
  var isTouchDevice = 'ontouchstart' in document.documentElement;
  var painting = false;

  if (isTouchDevice) {
    // Touch Device
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10);
      } else {
        lastPoint = [x, y];
      }
    };

    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10);
      } else {
        var newPoint = [x, y];
        console.log(lastPoint, newPoint);
        drawLine(lastPoint[0], lastPoint[1], newPoint[0], newPoint[1]);
        lastPoint = newPoint;
      }
    };
  } else {
    // Not Touch Device
    canvas.onmousedown = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      painting = true;

      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10);
      } else {
        lastPoint = [x, y];
      }
    };

    canvas.onmousemove = function (e) {
      var x = e.clientX;
      var y = e.clientY;

      if (!painting) {
        return;
      }

      if (eraserEnable) {
        ctx.clearRect(x, y, 10, 10);
      } else {
        var newPoint = [x, y];
        drawLine(lastPoint[0], lastPoint[1], newPoint[0], newPoint[1]);
        lastPoint = newPoint;
      }
    };

    canvas.onmouseup = function () {
      painting = false;
    };
  }
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d8f2aa50.js.map
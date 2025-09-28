// popup.js (ES module)
const numberElement = document.getElementById("number");
const buttonElement = document.getElementById("myButton");

let pyodide; // cache between clicks
let mymath; // cache the math import

async function loadLocalPyModule(pyodide, urlInExtension, pyFileNameinFS) {
  const resp = await fetch(chrome.runtime.getURL(urlInExtension));
  if (!resp.ok) throw new Error(`Failed to fetch ${urlinExtension}: ${resp.status}`);
  const code = await resp.text();

  pyodide.FS.writeFile(`/${pyFilenameInFS}`, code, { encoding: "utf8" });

  pyodide.runPython(`
import sys
if "/" not in sys.path:
    sys.path.insert(0, "/")
  `);
}

// Once per session: load and import
async function importMyModule(pyodide) {
  await loadLocalPyModule(pyodide, "py/mymath.py", "mymath.py");
  // Option A: import on the Python side
  pyodide.runPython("import math");
  // Option B (often nicer): get a JS proxy to the module
  return pyodide.pyimport("math");
}

async function ensurePyodide() {
  if (pyodide) return pyodide;
  // Dynamically import the ES module from your packaged folder
  const mod = await import(chrome.runtime.getURL("pyodide/pyodide.mjs"));
  pyodide = await mod.loadPyodide({
    indexURL: chrome.runtime.getURL("pyodide/")
  });
  return pyodide;
}

// buttonElement.addEventListener("click", async () => {
//   buttonElement.disabled = true;
//   buttonElement.textContent = "Loading Python…";
  
//   const p = await ensurePyodide();
  

//   // Example: read current number, increment in Python, write back
//   const current = Number(numberElement.textContent || "0");
//   p.globals.set("x", current);
//   const result = p.runPython(`x + 1`);

//   numberElement.textContent = String(result);
//   buttonElement.textContent = "+1";
//   buttonElement.disabled = false;
// });

document.getElementById("myButton").addEventListener("click", async () => {
  const numberEl = document.getElementById("number");
  const buttonEl = document.getElementById("myButton");

  buttonEl.disabled = true;
  buttonEl.textContent = "Loading…";
  try {
    const p = await ensurePyodide();

    // Import your module once
    if (!mymath) {
      mymath = await importMyModule(p); // myMath.bump is callable from JS
    }

    // Use your Python function
    const current = Number(numberEl.textContent || "0");
    const next = mymath.inc(current); // calls Python bump(x)
    numberEl.textContent = String(next);

    buttonEl.textContent = "+1";
  } catch (e) {
    console.error(e);
    buttonEl.textContent = "Error";
  } finally {
    buttonEl.disabled = false;
  }
});



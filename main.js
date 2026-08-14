// Platov Generalcon — small interactions, no dependencies

document.addEventListener('DOMContentLoaded', function () 
{

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav    = document.getElementById('main-nav');

  if (toggle && nav) 
    {
    toggle.addEventListener('click', function () 
      {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

    // Close the mobile menu after tapping a link
    nav.querySelectorAll('a').forEach(function (link) 
    {
      link.addEventListener('click', function () 
      {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Ruler divider — number the long "inch" ticks
  var rulerSvg = document.querySelector('.ruler');
  if (rulerSvg)
    {
    var svgNS      = 'http://www.w3.org/2000/svg';
    var tileWidth  = 20;    // must match the <pattern width="..."> in index.html
    var totalWidth = 1200;  // must match the ruler's viewBox width
    var labelEvery = 5;     // label every 5th tick (1 = number every single tick)

    var numbersGroup = document.createElementNS(svgNS, 'g');
    numbersGroup.setAttribute('class', 'ruler-numbers');

    var tickCount = totalWidth / tileWidth; // 60 long ticks total
    var label = 1;

    for (var i = 0; i < tickCount; i++)
      {
      if (i % labelEvery !== 0) continue;

      var x = i * tileWidth;
      var anchor = x === 0 ? 'start' : (x >= totalWidth - tileWidth ? 'end' : 'middle');

      var text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', 47);
      text.setAttribute('text-anchor', anchor);
      text.textContent = label;
      numbersGroup.appendChild(text);
      label++;
      }

    rulerSvg.appendChild(numbersGroup);
    }

  // Footer year, kept up to date automatically
  var yearEl = document.getElementById('year');
  if (yearEl) 
    {
      yearEl.textContent = new Date().getFullYear();
    }

});

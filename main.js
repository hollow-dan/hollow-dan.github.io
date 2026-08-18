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

    // Instagram clip modal — plays Reels inline instead of leaving the site
  var clipTriggers      = document.querySelectorAll('[data-clip-trigger]');
  var clipModal          = document.getElementById('clip-modal');
  var clipModalBody      = document.getElementById('clip-modal-body');
  var embedScriptLoaded  = false;

  function loadInstagramEmbedScript(callback)
    {
    if (embedScriptLoaded) { callback(); return; }
    var script  = document.createElement('script');
    script.src   = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = function () { embedScriptLoaded = true; callback(); };
    document.body.appendChild(script);
    }

  function openClipModal(reelUrl)
    {
    if (!clipModal || !clipModalBody) return;

    clipModalBody.innerHTML =
      '<div class="clip-modal-loading">Loading clip…</div>' +
      '<blockquote class="instagram-media" data-instgrm-permalink="' + reelUrl + '" data-instgrm-version="14">' +
      '<a href="' + reelUrl + '" target="_blank" rel="noopener">View this clip on Instagram</a>' +
      '</blockquote>';

    clipModal.hidden = false;
    document.body.style.overflow = 'hidden';

    loadInstagramEmbedScript(function () { if (window.instgrm) window.instgrm.Embeds.process(); });
    }

  function closeClipModal()
    {
    if (!clipModal) return;
    clipModal.hidden = true;
    clipModalBody.innerHTML = ''; // stops playback, resets for the next open
    document.body.style.overflow = '';
    }

  clipTriggers.forEach(function (trigger)
    {
    trigger.addEventListener('click', function (e)
      {
      var reelUrl = trigger.getAttribute('data-reel-url');
      if (!reelUrl || reelUrl.indexOf('REPLACE') !== -1) return; // not set yet — fall back to the normal link
      e.preventDefault();
      openClipModal(reelUrl);
      });
    });

  document.querySelectorAll('[data-clip-close]').forEach(function (el)
    {
    el.addEventListener('click', closeClipModal);
    });

  document.addEventListener('keydown', function (e)
    {
    if (e.key === 'Escape' && clipModal && !clipModal.hidden) closeClipModal();
    });

  // Footer year, kept up to date automatically
  var yearEl = document.getElementById('year');
  if (yearEl) 
    {
      yearEl.textContent = new Date().getFullYear();
    }

});



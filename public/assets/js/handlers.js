// Inline event handlers from the mockup, moved here so the site can run under a strict CSP.
(function () {
  function run(fn, el, event) { if (fn.call(el, event) === false) event.preventDefault(); }
  var on_error = {
    "1": function (event) {
      this.style.display='none'
    },
  };
  document.addEventListener("error", function (event) {
    var el = event.target;
    if (!el || !el.getAttribute) return;
    var fn = on_error[el.getAttribute("data-cp-on-error")];
    if (fn) run(fn, el, event);
  }, true);
})();

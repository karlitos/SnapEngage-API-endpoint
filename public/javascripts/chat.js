(function() {
  /* Place your SnapEngage API key below */
  var snapengageApiKey = 'b03e2806-6433-4fb8-96d1-a906cff859c1';

  var se = document.createElement('script');
  se.type = 'text/javascript';
  se.async = true;
  se.src = '//storage.googleapis.com/code.snapengage.com/js/' + snapengageApiKey + '.js';
  var done = false;
  se.onload = se.onreadystatechange = function() {
    if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
      done = true;
      /* Place your SnapEngage JS API code below */
      /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
    }
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(se, s);
})();
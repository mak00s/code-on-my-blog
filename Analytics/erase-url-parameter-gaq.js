_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_setAllowAnchor', true]);
_gaq.push(function(){
  if (location.hash && location.hash.match(/(#|&)(utm_source|__utma)=.+/)) {
    if ('replaceState' in history)
      history.replaceState('',document.title, location.pathname + location.search);
    else location.hash = '';
  }
});
_gaq.push(['_trackPageview']);

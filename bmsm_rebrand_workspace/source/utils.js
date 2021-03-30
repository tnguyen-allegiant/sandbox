function checkCookieExists(key) {
  var pattern = key + "=\[\\w\]+";
  var regex = new RegExp(pattern, "gm");
  return !!document.cookie.match(regex);
}

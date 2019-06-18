function calendarRSS(url) {
  let xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseXML;
}

function normalTime(a) {
  var b = a.split(":");
  return 12 > parseInt(b[0])
    ? b[0] + ":" + b[1] + " AM"
    : 12 == parseInt(b[0])
    ? b[0] + ":" + b[1] + " PM"
    : (b[0] % 12) + ":" + b[1] + " PM";
}

"use strict";

function calendarRSS(url) {
  var xmlHttp = null;
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

function getEvents(categoryID) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var rss = calendarRSS(
    "https://www.sdmesa.edu/calendar/rss/feed2.php?l=" + categoryID
  );
  var empty_feed =
    rss.querySelector("channel").querySelector("title").innerHTML ==
    "Unavailable Feed";
  empty_feed
    ? document.getElementById("latinx_events").classList.add("noscroll")
    : null;
  var events = !empty_feed
    ? Array.from(rss.querySelectorAll("item"))
        .map(function(item) {
          var i = {
            title: item.querySelector("title").innerHTML,
            date: new Date(item.querySelector("pubDate").innerHTML),
            location: item.querySelector("location").innerHTML,
            link: item.querySelector("guid").innerHTML
          };

          var _d = i.date
            .toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit"
            })
            .split(" ");

          var d = {
            month: _d[0].toLocaleUpperCase(),
            day: +_d[1]
          };

          var _t = i.date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric"
          });

          var w = days[i.date.getDay()];
          return '<a href="'
            .concat(
              i.link,
              '">\n<div class="event">\n<div class="content">\n  <div class="event-details">\n    <span class="day">'
            )
            .concat(w, '</span><br />\n    <span class="time">')
            .concat(_t, '</span><br />\n    <span class="local">')
            .concat(
              i.location,
              '</span>\n  </div>\n  <div class="event-title">\n    '
            )
            .concat(
              i.title,
              '\n  </div>\n  <div class="event-date">\n    <span class="date-num">'
            )
            .concat(d.day, "</span><br />")
            .concat(d.month, "\n  </div>\n</div>\n</div>\n</a>");
        })
        .join("")
    : "No upcoming events. Check back later.";
  document.getElementById("latinx_events").innerHTML = events;
}

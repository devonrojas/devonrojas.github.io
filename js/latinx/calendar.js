"use strict";

$("#ouCalendarFeedView").append(
  '<ul class="ouCalendarView collapsible" ></ul>'
);

function normalTime(a) {
  var b = a.split(":");
  return 12 > parseInt(b[0])
    ? b[0] + ":" + b[1] + " AM"
    : 12 == parseInt(b[0])
    ? b[0] + ":" + b[1] + " PM"
    : (b[0] % 12) + ":" + b[1] + " PM";
}

function getTheFeed(a, b) {
  var c = "",
    d = a.split(",");
  (c = isNaN(parseInt(d))
    ? "https://www.sdmesa.edu/calendar/rss/feed2.php"
    : "https://www.sdmesa.edu/calendar/rss/feed2.php?l=" + a),
    $.get(c, function(e) {
      var f = 12;
      771 > window.innerWidth && (f = 6);
      var g = "",
        h = 0;
      $(e)
        .find("item")
        .each(function() {
          var i = $(this),
            l = new Date(i.find("pubDate").text()),
            m = "";
          m = "" == b ? i.find("location").text() : b;
          var n =
              "<ol>\n\t\t\t\t\t\t<li> Title " +
              i.find("title").text() +
              " </li>\n\t\t\t\t\t\t<li> Date " +
              i.find("date").text() +
              " </li>\n\t\t\t\t\t\t<li> Start " +
              i.find("start").text() +
              " </li>\n\t\t\t\t\t\t<li> end " +
              i.find("end").text() +
              " </li>\n\t\t\t\t\t\t<li> Link " +
              i.find("link").text() +
              " </li>\n\t\t\t\t\t\t<li> Description " +
              i.find("description").text() +
              " </li>\n\t\t\t\t\t\t<li> Location " +
              i.find("location").text() +
              " </li>\n\t\t\t\t\t\t<li> Image " +
              i.find("image").text() +
              " </li>\n\t\t\t\t\t\t<li> guid " +
              i.find("guid").text() +
              "</li>\n\t\t\t\t\t\t<li> Pubdate " +
              i.find("pubdate").text() +
              " </li>\n\t\t\t\t\t\t<li> Billboard " +
              i.find("billboard").text() +
              " </li>\n\t\t\t\t\t\t<li> feature " +
              i.find("feature").text() +
              " </li>\n\t\t\t\t\t\t<li> Category " +
              i.find("category").text() +
              " </li>\n\t\t\t\t\t\t<li> tags " +
              i.find("tags").text() +
              " </li>\n\n\t\t\t\t</ol>",
            o = i.find("image").text(),
            p = "";
          "" != o &&
            (p =
              "<img src='" +
              o +
              "' alt='event image' style='width:100%; height:auto;'/>");
          var q =
            "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<div class=\"collapsible-header row\" style='margin-bottom:0 !important;'>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class='col s2 m1' style='text-align:center;'><i class=\"material-icons\">event</i><span style=\"font-weight:700;\">" +
            l
              .toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit"
              })
              .toUpperCase() +
            "</span></div>\n\t\t\t\t\t\t\t<div class='col s10 m3'>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<span>" +
            ("12:00 am" ==
            l
              .toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric"
              })
              .toLowerCase()
              ? "ALL DAY"
              : normalTime(i.find("start").text()) +
                " - " +
                normalTime(i.find("end").text())) +
            "</span>\n\t\t\t\t\t\t\t\t<br/>\n\t\t\t\t\t\t\t\t<span> " +
            m +
            " </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class='col s12 m8'><h6>" +
            i.find("title").text() +
            '</h6></div>\n\t\t\t\t\t\t</div>\n      \t\t\t\t\t<div class="collapsible-body blue-grey lighten-5">\n\t\t\t\t\t\t\t' +
            p +
            "\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<p>" +
            i.find("description").text() +
            "</p>\n\t\t\t\t\t\t\t<h6> <a href='" +
            i.find("link").text() +
            "' target='_blank'>More details about this event</a></h6>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t</li>\n\t\t\t";
          h < f &&
            "invalid date" != l.toString().toLowerCase() &&
            ((g += q), h++);
        }),
        "" == g
          ? $("#ouCalendarFeedView").html(
              "<h4>More events are coming soon!</h4>"
            )
          : $(".ouCalendarView").html(g);
    });
}

$(document).ready(function() {
  $(".collapsible").collapsible();
});

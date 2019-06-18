"use strict";

var spreadsheetID = "1nua1AokX2JNLLib9WekX1UzUwwEWoc38G6a8kMvwtjM";
var spreadsheetUrl =
  "https://spreadsheets.google.com/feeds/list/" +
  spreadsheetID +
  "/1/public/values?alt=json";

var tags = [
  { tag: "LGBTQ+", id: "lgbtq" },
  { tag: "Government", id: "govt" },
  { tag: "Artists", id: "artists" },
  { tag: "Social Activist", id: "activist" },
  { tag: "Formerly Incarcerated", id: "incarcerated" },
  { tag: "STEM", id: "stem" },
  { tag: "Business", id: "business" },
  { tag: "Foster Youth", id: "foster" },
  { tag: "Education", id: "education" }
];

function fetchGoogleSheet() {
  return fetch(spreadsheetUrl)
    .then(function(data) {
      return data.json();
    })
    .then(function(res) {
      return parseSheet(res);
    });
}

// Helper functions

function parseSheet(data) {
  var entry = data.feed.entry;
  return entry.map(function(e) {
    var obj = {};
    for (var field in e) {
      if (field.substring(0, 3) == "gsx") {
        if (field.split("$")[1] == "categories") {
          obj[field.split("$")[1]] = parseCategories(e[field].$t);
        } else {
          obj[field.split("$")[1]] = e[field].$t;
        }
      }
    }
    return obj;
  });
}

function parseCategories(category) {
  return category.split(",");
}

function nameSort(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

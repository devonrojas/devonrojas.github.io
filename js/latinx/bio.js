"use strict";

(function() {
  console.log("bio ready");
  var url = new URL(window.location);
  var id = url.searchParams.get("id");
  fetchGoogleSheet().then(function(res) {
    var index = res.findIndex(function(item) {
      return item.id === id;
    });
    var figure = res[index];
    var max = res.length;
    buildBio(figure);
    nextBio(id, max);
    prevBio(id, max);
  });
})();

function buildBio(figure) {
  var categoriesHtml = "";
  if (figure.categories) {
    figure.categories.forEach(function(category) {
      var index = tags.findIndex(function(tag) {
        return tag.tag == category;
      });
      categoriesHtml +=
        '<span class="figure-category">' + tags[index].tag + "</span>";
    });
  }
  var nHtml = '<div id="' + figure.id + '">';
  if (figure.photourl) {
    nHtml += '<img src="' + figure.photourl + '" />';
  }
  if (figure.exturl) {
    nHtml +=
      '<a class="figure-name" href="' +
      figure.exturl +
      '" target="blank"><h2>' +
      figure.name +
      "</h2></a>";
  } else {
    nHtml += '<span class="figure-name"><h2>' + figure.name + "</h2></span>";
  }
  nHtml +=
    '<div id="categories">' +
    categoriesHtml +
    "</div>" +
    figure.description +
    "</div>";
  document.getElementById("bio").innerHTML = nHtml;
}

// Pagination

function nextBio(id, max) {
  var next = +id + 1;
  if (next >= max) {
    next = 1;
  }
  var btn = (document.getElementById("nextBtn").href =
    "/latinx/important-figures-bio.html?id=" + next);
}

function prevBio(id, max) {
  var prev = +id - 1;
  if (prev <= 0) {
    prev = max;
  }
  var btn = (document.getElementById("prevBtn").href =
    "/latinx/important-figures-bio.html?id=" + prev);
}

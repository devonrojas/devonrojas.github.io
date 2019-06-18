"use strict";

(function() {
  var figureContent = [];
  var filterTags = [];

  fetchGoogleSheet()
    .then(function(res) {
      figureContent = res.sort(function(a, b) {
        return nameSort(a, b);
      });
      // Initial content display
      filterContent(filterTags, figureContent);
    })
    .catch(function(err) {
      return console.log(err);
    });

  // Create checkboxes to toggle filters
  tags.forEach(function(item) {
    createFilterBtn(item.id, item.tag);
  });

  document.querySelectorAll("#_filters input[type=checkbox]").forEach(el => {
    el.addEventListener("change", function(e) {
      var el = e.target;
      var label = document.querySelector('label[for="' + el.id + '"]');
      if (el.checked) {
        label.classList.add("active");
        addFilter(tags, filterTags, el.id, figureContent);
      } else {
        removeFilter(filterTags, el.id, figureContent);
        label.classList.remove("active");
      }
    });
  });

  document
    .querySelector("input.search")
    .addEventListener("keyup", function(event) {
      var results = searchResults(
        event.target.value.toLowerCase(),
        figureContent
      );
      filterContent(filterTags, results);
    });
})();

function searchResults(value, figures) {
  var results = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = figures[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var fig = _step.value;

      // Remove accents to improve search accuracy
      var name = fig.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (name.toLowerCase().includes(value)) {
        results.push(fig);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return results;
}

function createFilterBtn(id, tag) {
  var prevHTML = document.getElementById("_filters").innerHTML;
  var btnHTML =
    '<label for="' +
    id +
    '" class="btn btn-dark mx-1"><input type="checkbox" value="' +
    id +
    '" id="' +
    id +
    '">' +
    tag +
    "</label>";
  document.getElementById("_filters").innerHTML = prevHTML + btnHTML;
}

function addFilter(tags, filterTags, id, figureContent) {
  var exists = false;
  for (var i = 0; i < filterTags.length; i++) {
    if (filterTags[i].id === id) {
      exists = true;
      break;
    }
  }
  if (!exists) {
    var index = tags.findIndex(function(tag) {
      return tag.id === id;
    });
    filterTags.push(tags[index]);
  }
  var search = document.querySelector("input.search").value;
  var results = searchResults(search, figureContent);
  filterContent(filterTags, results);
}

function removeFilter(filterTags, id, figureContent) {
  filterTags.forEach(function(tag, index) {
    if (tag.id === id) {
      filterTags.splice(index, 1);
    }
  });
  var search = document.querySelector("input.search").value;
  var results = searchResults(search, figureContent);
  filterContent(filterTags, results);
}

function filterContent(tags, content) {
  if (tags.length == 0) {
    render(content);
  } else {
    var filteredContent = [];
    content.forEach(function(item) {
      for (var i = 0, len = tags.length; i < len; i++) {
        if (item.categories.includes(tags[i].tag)) {
          // Prevent duplicate elements from populating in view
          if (!filteredContent.includes(item)) {
            filteredContent.push(item);
          }
        }
      }
    });
    render(filteredContent);
  }
}

function render(content) {
  var nHTML = "";
  content.forEach(function(item) {
    var filterHTML = '<div class="figure-category-wrapper">';
    item.categories.forEach(function(category) {
      filterHTML += '<div class="figure-category">' + category + "</div>";
    });
    filterHTML += "</div>";
    nHTML +=
      '<div class="figure">\n\t\t\t\t<a href="/latinx/important-figures-bio.html?id=' +
      item.id +
      '" id="' +
      item.id +
      '">\n\t\t\t\t\t<div id="figure_img" class="figure-img-wrapper">\n\t\t\t\t\t\t<img src="' +
      item.photourl +
      '" class="figure-img">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="figure-title">' +
      item.name +
      "</div>";
    nHTML += filterHTML + "</a></div>";
  });
  document.getElementById("filtered_content").innerHTML =
    '<div id="figures-wrapper" class="figures-wrapper">' + nHTML + "</div>";
}

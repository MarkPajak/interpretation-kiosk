'use strict';

/* Filters */

angular.module('museum_objectcatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

/**
 * View template: EmptyView
 *
 */
 
// define this module in Require.JS
define(function (require, exports, module) {

  // import additional modules to be used in this view
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  // Constructor function for our View Class
  function EmptyView() {
  
    // Applies view constructor function to View Class
    View.apply(this, arguments);
  
  }
  
  // Establishes prototype chain for View Class to inherit from View
  EmptyView.prototype = Object.create(View.prototype);
  EmptyView.prototype.constructor = EmptyView;
  
  // Default options for View Class
  
  module.exports = EmptyView;

});
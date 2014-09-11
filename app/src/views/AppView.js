/**
 * View template: AppView
 *
 */
 
// define this module in Require.JS
define(function (require, exports, module) {

  // import additional modules to be used in this view
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  // import the Slide show view class
  var SlideshowView = require('views/SlideshowView');

  // Constructor function for our View Class
  function AppView() {
  
    // Applies view constructor function to View Class
    View.apply(this, arguments);

    // Create a new instance of a slide show view
    var slideshowView = new SlideshowView({
      data: this.options.data
    });
    
    // add the instance to the app view
    this.add(slideshowView);
  }
  
  // Establishes prototype chain for View Class to inherit from View
  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;
  
  // Default options for View Class
  AppView.DEFAULT_OPTIONS = {
    data: undefined
  };
  
  module.exports = AppView;

});
/**
 * View template: SlideshowView
 *
 */
 
// define this module in Require.JS
define(function (require, exports, module) {

  // import additional modules to be used in this view
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Lightbox = require('famous/views/Lightbox');
  var Easing = require('famous/transitions/Easing');

  var SlideView = require('views/SlideView');

  // Constructor function for our View Class
  function SlideshowView() {
  
    // Applies view constructor function to View Class
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size,
      origin: [0.5, 0],
      align: [0.5, 0]
    });
    
    this.mainNode = this.add(this.add(this.rootModifier));
  
    _createLightbox.call(this);
    _createSlides.call(this);
  }
  
  // Establishes prototype chain for View Class to inherit from View
  SlideshowView.prototype = Object.create(View.prototype);
  SlideshowView.prototype.constructor = SlideshowView;
  SlideshowView.prototype.showCurrentSlide = function() {
    var slide = this.slides[this.currentIndex];
    this.lightbox.show(slide);
  };
  SlideshowView.prototype.showNextSlide = function() {
    this.currentIndex++;
    if (this.currentIndex === this.slides.length) {
      this.currentIndex = 0;
    }
    this.showCurrentSlide();
  };
  
  // Default options for View Class
  SlideshowView.DEFAULT_OPTIONs = {
    size: [450, 500],
    data: undefined,
    lightboxOpts: {
            inTransform: Transform.rotateY(0.5),
            inOpacity: 1,
            inOrigin: [0, 0],
            showOrigin: [0, 0],
            outTransform: Transform.rotateY(-Math.PI/2),
            outOpacity: 1,
            outOrigin: [0, 0],
            inTransition: { duration: 500, curve: 'linear' },
            outTransition: { duration: 700, curve: 'linear' },
            overlap: true
    }
  };
  
  // lightbox instance helper function
  function _createLightbox() {
    this.lightbox = new Lightbox(this.options.lightboxOpts);
    this.mainNode.add(this.lightbox);
  }
  
  function _createSlides() {
    this.slides = [];
    this.currentIndex = 0;
    
    for (var i =0; i < this.options.data.length; i++) {
      var slide = new SlideView({
        size: this.options.size,
        photoUrl: this.options.data[i]
      });
      
      this.slides.push(slide);

      // click listener
      slide.on('click', this.showNextSlide.bind(this));
    }
    
    this.showCurrentSlide();
  }
  
  module.exports = SlideshowView;

});
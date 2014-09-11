/**
 * View template: SlideView
 *
 */
 
// define this module in Require.JS
define(function (require, exports, module) {

  // import additional modules to be used in this view
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');

  // dummy data
  var SlideData = require('data/SlideData');

  // Constructor function for our View Class
  function SlideView() {
  
    // Applies view constructor function to View Class
    View.apply(this, arguments);

    // instantiate new state modifier to generate visual render
    this.rootModifier = new StateModifier({
      size: this.options.size
    });
    
    this.mainNode = this.add(this.rootModifier);

    // invoke helper function with right context
    _createBackground.call(this);
    _createFilm.call(this);
    _createPhoto.call(this);
    
  }
  
  // Establishes prototype chain for View Class to inherit from View
  SlideView.prototype = Object.create(View.prototype);
  SlideView.prototype.constructor = SlideView;
  
  // Default options for View Class
  SlideView.DEFAULT_OPTIONS = {
    size: [400, 450],
    filmBorder: 15,
    photoBorder: 3,
    photoUrl: SlideData.defaultImage
  };

  // private helper function
  function _createBackground() {
    var background = new Surface({
      properties: {
        backgroundColor: '#FFFFF5',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
      }
    });
    
    this.mainNode.add(background);
  }

  // private helper function
  function _createFilm() {
    
    this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;
    
    var film = new Surface({
      size: [this.options.filmeSize, this.options.filmSize],
      properties: {
        backgroundColor: '#222',
        zIndex: 1
      }
    });
    
    var filmModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder, 1)
    });

    this.mainNode.add(filmModifier).add(film);
  }
  
  // private helper function
  function _createPhoto() {
    var photoSize = this.options.filmSize - 2 * this.options.photoBorder;
    
    var photo = new ImageSurface({
      size: [photoSize, photoSize],
      content: this.options.photoUrl,
      properties: {
        zIndex: 2
      }
    });
    
    this.photoModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
    });
    
    this.mainNode.add(this.photoModifier).add(photo);
  }
      
  module.exports = SlideView;

});
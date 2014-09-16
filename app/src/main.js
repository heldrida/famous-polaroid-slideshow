/* globals define */
define(function(require, exports, module) {
    'use strict';
    
    // import dependencies
    var Engine = require('famous/core/Engine');

    // import utility
    var Utility = require('famous/utilities/Utility');

    // import the AppView Class using require
    var AppView = require('views/AppView');
    
    // import SlideData
    var SlideData = require('data/SlideData');

    // Create context
    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);
    
    // simple GET request to the picasa api with callback
    Utility.loadURL(SlideData.getUrl(), initApp);

    function initApp(data) {
       // parses out response data and retrieves array of urls
       data = SlideData.parse(data);
       
       // instantiates AppView with our url data
       var appView = new AppView({ data: data });
       
       mainContext.add(appView);
    }

});

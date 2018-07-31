// ============================================================================
// Plug-in: DMV_ScreenshotDownloader.js 
// Version: 1.0.1
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin simply triggers a download of the game screen
 * as an image file when the 'print screen' key is pressed.
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin allows for players who are playing your game in a web browser
 * to be able to instantly capture, download, and save screenshots.
 * 
 * Please do note: This only works in web browsers. 
 * If you require being able to take screenshots during a windows/mac
 * version of the game, you would need an alternative plugin. 
 * Hudell has written one to do this. 
 * 
 * ============================================================================
 * ■ Terms && Conditions:
 * ============================================================================
 * This plugin is completely free to use, both commercially and privately -
 * Providing the following copy is shown within the project credits;
 * 
 * Copyright (C) 2015 - Dekyde Studios 
 * Dekyde Studios Developer: Dekita - dekita(at)dekyde.com 
 * 
 * Additionally, this header should remain intact at all times.
 * 
 * You are not allowed to redistribute this plugin directly. Instead, provide
 * a link to the following website;
 * www.dekyde.com
 * 
 * ============================================================================
 * ■ Financial Contributions:
 * ============================================================================
 * If you like my work and want to see more of it in the future, I ask that you 
 * consider offering a financial donation. 
 * 
 * Most of the plugins I write are free to use commercially, and many hours of
 * work go into each and every one - not including the time spent bug hunting
 * and performing optimization modifications. 
 * 
 * If you do wish to provide your support, you can do so at the following link;
 * www.patreon.com/Dekita
 * 
 * ============================================================================
 * ■ Stay Up To Date:
 * ============================================================================
 * I advise that you check regularly to see if any of the plugins you use
 * have been updated. The plugin updates will include things like bugfixes and
 * new features, so it is highly recommended. 
 * 
 * You can get the latest versions of my Mv plugins from www.dekyde.com/DMV
 * 
 * ============================================================================
 * ■ Change Log:
 * ============================================================================
 * v.1.0.1 - Fixed some simple typing errors within the documentation,
 *         - Removed dependancy on DMV Core;
 * v.1.0.0 - Initial Release,
 * 
 * ============================================================================
 *  www.dekyde.com
 * ============================================================================
 */ 

/**
 * Checks to ensure DMV Core plugin exists. 
 */
(function(){
  if (typeof DMV !== 'undefined') {
    DMV.register("ScreenshotDownloader", "1.0.1","24/04/2o16");
  }
})();

function ScreenshotDownloader() {
  throw new Error('ScreenshotDownloader is a static class!!');
};

/**
 * 
 */
(function($){
  /**
   * Use strict mode for better code aroma
   */
  "use strict";

  /**
   * Date.now
   * Ensures a variation of Date.now exists for the system to use. 
   */
  if (!Date.now) {
    Date.now = function(){return new Date().getTime()};
  };

  /**
   * ScreenshotDownloader.getFilename
   * @return {string} a generated filename using timestamp.
   */
  $.getFilename = function() {
    return 'Screenshot_' + Date.now() + '.png';
  };

  /**
   * ScreenshotDownloader.getImageData
   * @return {string} containing the image data.
   */
  $.getImageData = function() {
    var image = SceneManager.snap()._canvas.toDataURL();
    return image.replace(/^data:image\/png;base64,/,"");
  };
  
  /**
   * ScreenshotDownloader.downloadScreenshot(filename, text)
   * @param filename {string} the filename for the new file.
   * @param text {string} the text data to save into the file.
   * Creates an element in the document to download the file
   * and then triggers it, and removes it from the document.
   */
  $.downloadScreenshot = function(filename, text) {
    var mime = 'data:image/png;base64,';
    var data = encodeURIComponent(text);
    var element = document.createElement('a');
    element.setAttribute('href', mime + data);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  /**
   * ScreenshotDownloader.screenshotKeyPressed
   * Called automatically when the screenshot key is pressed.
   * Attempts to take current screenshot and trigger download.
   */
  $.screenshotKeyPressed = function() {
    try {
      if (!Utils.isNwjs()){
        $.downloadScreenshot($.getFilename(),$.getImageData());
      };
    } catch(error) {
      if (error !== undefined && error !== null) {
        console.error('An error occured while saving the screenshot:', error);
      };
    };
  }

  /**
   * onKeyUp
   * Aliases the Input._onKeyUp function to allow for screenshots 
   * to trigger download when the designated key is pressed. 
   * @param event {object} key input event
   * @return none
   */
  var onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event){
    onKeyUp.apply(this, arguments);
    if (event.keyCode == 44){
      $.screenshotKeyPressed();
    };
  };

  /**
   * End Declarations
   */
})(ScreenshotDownloader);
/**
 * End plugin
 * www.dekyde.com
 */

// ============================================================================
// Plug-in: DMV_KursorBlink.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This simple plugin allows the default window cursor 
 * 'blink' speed to be modified, or even completely stopped!
 * 
 * @param Kursor Blink Speed
 * @desc Adjusts the default blink speed of the window cursor.
 * @default 0.25
 *
 * @param Kursor Blink Min
 * @desc Adjusts the minimum blink speed of the window cursor.
 * @default 0.0
 *
 * @param Kursor Blink Max
 * @desc Adjusts the maximum blink speed of the window cursor.
 * @default 2.0
 *
 * @param Kursor Options
 * @desc Allows the kursor speed to be changed within the options scene.
 * @default true
 *
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * As this plugin is fairly simple and only allows for control over the cursor
 * blink speed, there are very little options available. 
 * 
 * The 'Kursor Blink Speed' setting will become the default speed value. 
 * 'Kursor Blink Min' and 'Kursor Blink Max' are only used when using the 
 * script calls provided by this plugin;
 * 
 * ============================================================================
 * ■ Script Calls:
 * ============================================================================
 * Window.setCursorBlink(newSpeed)
 * newSpeed = a number value used to determine the new cursor blink speed.
 * Returns the newSpeed value after being restricted by min and max value.
 * 
 * Window.getCursorBlink()
 * Returns the current cursor blink speed.
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
 *  www.dekyde.com
 * ============================================================================
 */ 


/**
 * Checks for DMV Core plugin and register if available
 */
if (typeof DMV != 'undefined') {
  DMV.register("KursorBlink", "1.0.0", "23/1o/2o15");
}

/**
 * Function to keep everything within a dedicated scope.
 */
(function($) {
  /**
   * Use strict mode
   */
  "use strict";
  
  /**
   * params
   * Holds all parameters for this plugin
   */
  var params = PluginManager.parameters('DMV_KursorBlink');
  
  /**
   * dspeed
   * Holds the cursors default animation speed value
   */
  var dspeed = Number(params['Kursor Blink Speed'] || 0.25);
  
  /**
   * nspeed
   * Holds the cursors minimum animation speed value
   */
  var nspeed = Number(params['Kursor Blink Min'] || 0.0);
  
  /**
   * xspeed
   * Holds the cursors maximum animation speed value
   */
  var xspeed = Number(params['Kursor Blink Max'] || 2.0);

  /**
   * cursorBlinkSpeed
   * Holds the cursors current animation speed value
   */
  var cursorBlinkSpeed = dspeed.clamp(nspeed,xspeed);

  /**
   * Window.setCursorBlink(newSpeed)
   * @param newSpeed the number value to set the blink speed to
   * @return cursor blink animation speed
   */
  Window.setCursorBlink = function(newSpeed){
    cursorBlinkSpeed = newSpeed.clamp(nspeed,xspeed);
    return cursorBlinkSpeed;
  }

  /**
   * Window.getCursorBlink()
   * @return cursor blink animation speed
   */
  Window.getCursorBlink = function(){
    return cursorBlinkSpeed;
  }

  /**
   * Window.prototype.update()
   * Overwrites the default Window update prototype to
   * accomodate the cursor blink animation speed.
   */
  $.update = function() {
    this._DMV_UpdateBlink();
    this._DMV_UpdateChildren();
  };
  
  /**
   * Window.prototype._DMV_UpdateBlink()
   * Updates the animation count for the window cursor
   */
  $._DMV_UpdateBlink = function() {
    if (this.active){
      this._animationCount += cursorBlinkSpeed;
    } 
  };
  
  /**
   * Window.prototype._DMV_UpdateChildren()
   * Updates all children of this window
   */
  $._DMV_UpdateChildren = function() {
    this.children.forEach(function(child) {
      if (child.update){child.update()};
    });
  };
  /**
   * End Window.prototype declarations
   */
})(Window.prototype);
/**
 * End plugin
 * www.dekyde.com
 */
// ============================================================================
// Plug-in: DMV_TimerWait4Event.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin allows the game timer to wait for events.
 * 
 * @param Default Wait
 * @desc The default boolean value to determine if timer should wait for events
 * @default true
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This simple plugin stops the game timer from processing when an event is
 * running. This is to allow for messages etc to be shown without the timer
 * running out.
 * 
 * ============================================================================
 * ■ Script Calls:
 * ============================================================================
 * $gameTimer.toggleEventWait()
 * ^ This script call toggles the wait flag that stops the timer from
 * processing. You can use this to allow for the timer to continue running 
 * when events are processing. 
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
 * Checks to check for DMV Core plugin. 
 */
(function(){
  if (typeof DMV !== 'undefined') {
    DMV.register("TimerWait4Event", "1.0.0");
  }
})();

(function(){
  /**
   * Use strict mode
   */ 
  "use strict";
  
  /**
   * params
   * Holds all parameters for this plugin
   */
  var params = PluginManager.parameters("DMV_TimerWait4Event");


  /**
   * Game_Timer.prototype.isWorking()
   * @return true if the game timer is processing
   * @note also checks to ensure event is not running;
   */
	Game_Timer._eventWait = Boolean(params['Default Wait']);

  /**
   * Game_Timer.prototype.isWorking()
   * @return true if the game timer is processing
   * @note also checks to ensure event is not running;
   */
	var isWorking = Game_Timer.prototype.isWorking;
	Game_Timer.prototype.isWorking = function() {
		var o = isWorking.apply(this, arguments);
		return Game_Timer._eventWait ? o && !$gameMap.isEventRunning() : o;
	};

  /**
   * Game_Timer.prototype.toggleEventWait()
   * @return the boolean value of eventWait 
   */
	Game_Timer.prototype.toggleEventWait = function() {
		Game_Timer._eventWait = !Game_Timer._eventWait;
		return Game_Timer._eventWait;
	};
  /**
   * End declarations
   */
})();
/**
 * End Plugin
 * www.dekyde.com
 */
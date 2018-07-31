// ============================================================================
// Plug-in: DMV_SkipTitle.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin simply allows for the title to be skipped. 
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin skips the title screen and loads a new game when it is active. 
 * It is purely to aid in development and should not be included in 
 * your completed projects.
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
 * You are not allowed to redistribute this plugin directly. 
 * Instead, please provide a link to the following website;
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
 * You can get the latest versions of my Mv plugins from www.dekyde.com/dmv
 * 
 * ============================================================================
 *  www.dekyde.com
 * ============================================================================
 */ 

/**
 * Checks for DMV Core plugin and register if available
 */
(function(){
  if (typeof DMV !== 'undefined') {
    DMV.register("SkipTitle", "1.0.0", "13/1o/2o15");
  }
})();

/**
 * AnonomousFunction(Scene_Boot.prototype)
 */
(function(boot){

  // Aliased start method to allow for skippage..
  var start = boot.start;
  boot.start = function() {
    var boola = DataManager.isBattleTest();
    var boolb = DataManager.isEventTest();
    if (!boola && !boolb){
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      this.updateDocumentTitle();
      SceneManager.goto(Scene_Map);        
      return;
    }
    start.apply(this, arguements);
  };
})(Scene_Boot.prototype);
/**
 * End plugin
 * www.dekyde.com
 */
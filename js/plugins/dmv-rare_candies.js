// ============================================================================
// Plug-in: DMV_RareCandies.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc Allows for skills and items that trigger level up.
 * 
 * @param Rare Candy Tag
 * @desc Sets the notetag that should be used for rare candies
 * Default: rare_candy
 * @default rare_candy
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin allows for actors to gain level up via skills and items. 
 * 
 * You simple have to use the registered notetag on a skill or item within the 
 * database and you will be able to use it like a rare candy (pokemon item).
 * 
 * You do not need to have the skill/item do anything else, like call empty 
 * common events or anything crazy like that. Just simply plug, notetag, play.
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
    DMV.register("RareCandies", "1.0.0", "12/11/2o15");
  }
})();

/**
 * Anonomous function to keep everything in scope
 */
(function(){
  /**
   * Use strict mode for better code aroma
   */
  "use strict";

  /**
   * params
   * Holds customizable parameters for this plugin.
   */
  var params = PluginManager.parameters('DMV_RareCandies');

  /**
   * candyTag
   * Determines the case sensitive notetag for rare candy items.
   */
  var candyTag = params['Rare Candy Tag'];

  /**
   * Game_Actor.prototype
   */
  (function(actor){
    /**
     * Game_Actor.prototype.levelUpFromCandy()
     * Performs a safe level up for the player
     */
    actor.levelUpFromCandy = function(){
      this.changeLevel(this.level+1,false);
    };
    /**
     * End Game_Actor declarations
     */
  })(Game_Actor.prototype);

  /**
   * Game_Action.prototype
   */
  (function(action){
    /**
     * Game_Action.prototype.canEatRareCandy(target)
     * @param target used to determine if can eat rare candy
     * @return Boolean value based on weather target can eat
     */
    action.canEatRareCandy = function(target) {
      return this.item().meta[candyTag] && target.actor && !target.isMaxLevel();
    };

    /**
     * Game_Action.prototype.hasItemAnyValidEffects(target)
     * Determines if skill/item has any valid effects
     * Aliased method to accomodate rare candy effect.
     */
    var hasItemAnyValidEffects = action.hasItemAnyValidEffects;
    action.hasItemAnyValidEffects = function(target) {
      if (this.canEatRareCandy(target)){ return true };
      return hasItemAnyValidEffects.apply(this, arguments);
    };

    /**
     * Game_Action.prototype.applyItemUserEffect(target)
     * Performs the effect of eating rare candy, if possible.
     */
    var applyItemUserEffect = action.applyItemUserEffect;
    action.applyItemUserEffect = function(target) {
      if (this.canEatRareCandy(target)){ 
        target.levelUpFromCandy();
      };
      applyItemUserEffect.apply(this, arguments);
    };
  /**
     * End Game_Action declarations
     */
  })(Game_Action.prototype);

})();
/**
 * End plugin
 * www.dekyde.com
 */

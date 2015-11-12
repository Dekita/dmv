// ============================================================================
// Plug-in: DMV_HealOnLevelUp.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc Allows for HP and MP to heal upon level up.
 * 
 * @param Gain Type
 * @desc Sets the level up recovery type, can be one of either 
 * all, full, diff or perc.
 * @default diff
 * 
 * @param Can Gain HP
 * @desc Determines if can gain HP 
 * can be true or false (case sensitive) 
 * @default true
 * 
 * @param Can Gain MP
 * @desc Determines if can gain MP 
 * can be true or false (case sensitive) 
 * @default true
 * 
 * @param HP Perc
 * @desc Sets the percentage of HP gain when type is perc 
 * @default 10 
 * 
 * @param MP Perc
 * @desc Sets the percentage of MP gain when type is perc 
 * @default 10 
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin allows for actors to gain HP and/or MP upon level up. 
 * There are a few options to allow for differentation in the amount gained.
 * 
 * Using this plugin with its default settings will replicate the pokemon
 * level up system, where your hp will increase accoridngly as you level.  
 * 
 * Alternatively, you can change the 'Gain Type' from 'diff' (the default) to
 * one of the other settings. 
 * 
 * Gain Type Help: 
 * all:  will perform 'recover all' on the actor when they level, this will 
 *       ignore all other settings and heal hp, mp and states. 
 * 
 * full: will recover all hp and or mp upon level up
 * 
 * perc: will recover 10 percent of the actors mhp upon level up
 * 
 * diff: will recover the difference between the old mhp and the new.
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
    DMV.register("HealOnLevelUp", "1.0.0", "12/11/2o15");
  }
})();

/**
 * Game_Actor.prototype functions and variables
 */
(function(actor){
  /**
   * Use strict mode for better code aroma
   */
  "use strict";

  /**
   * params
   * Holds customizable parameters for this plugin.
   */
  var params = PluginManager.parameters('DMV_HealOnLevelUp');

  /**
   * gainType
   * Holds the setting for the health gain type. 
   */
  var gainType = params["Gain Type"];

  /**
   * canHP
   * Holds boolean setting for if can gain hp on level. 
   */
  var canHP = params["Can Gain HP"].contains('true');

  /**
   * canMP
   * Holds boolean setting for if can gain mp on level. 
   */
  var canMP = params["Can Gain MP"].contains('true');

  /**
   * percHP
   * Percentage value for hp gain when gainType is 'perc'
   */
  var percHP = Number(params["HP Perc"] || 10).clamp(0,100);

  /**
   * percMP
   * Percentage value for mp gain when gainType is 'perc'
   */
  var percMP = Number(params["MP Perc"] || 10).clamp(0,100);

  /**
   * Game_Actor.prototype.levelUp()
   * Increases actors level when exp requirement is met.
   */
  var levelUpAlias = actor.levelUp;
  actor.levelUp = function() {
    this._levelUpLastMHP = this.mhp;
    this._levelUpLastMMP = this.mmp;
    levelUpAlias.apply(this, arguments);
    this.performLevelUpRecovery();
  };

  /**
   * Game_Actor.prototype.performLevelUpRecovery()
   * Performs the level up recovery effect.
   */
  actor.performLevelUpRecovery = function(){
    switch(gainType){
      case 'all':  this.recoverAll(); break;
      case 'full': this.levelUpRecoveryFull(); break;
      case 'diff': this.levelUpRecoveryDiff(); break;
      case 'perc': this.levelUpRecoveryPerc(); break;
      default: break;
    };this.refresh();    
  }; 

  /**
   * Game_Actor.prototype.levelUpRecoveryFull()
   * Recovers full hp and or mp upon level up.
   */
  actor.levelUpRecoveryFull = function(){
    if (canHP){this._hp = this.mhp};
    if (canMP){this._mp = this.mmp};
  };

  /**
   * Game_Actor.prototype.levelUpRecoveryDiff()
   * Recovers hp and or mp upon level up. The value gained
   * is equal to the difference from the old mhp and the new.
   */
  actor.levelUpRecoveryDiff = function(){
    if (canHP){this._hp += (this.mhp-this._levelUpLastMHP)};
    if (canMP){this._mp += (this.mmp-this._levelUpLastMMP)};
  };

  /**
   * Game_Actor.prototype.levelUpRecoveryPerc()
   * Recovers hp and or mp upon level up. The value gained
   * is equal to the percentage value from the respective 
   * recoveryPercentageH/M function (default is 10).
   */
  actor.levelUpRecoveryPerc = function(){
    if (canHP){this._hp += (this.mhp/this.recoveryPercentageH())};
    if (canMP){this._mp += (this.mmp/this.recoveryPercentageM())};
  };

  /**
   * Game_Actor.prototype.recoveryPercentageH()
   * Game_Actor.prototype.recoveryPercentageM()
   * These two functions determine the percentage 
   * of HP and MP to heal on level up. 
   * They may be overwritten in future addons. 
   */
  actor.recoveryPercentageH = function(){return percHP};
  actor.recoveryPercentageM = function(){return percMP};

  /**
   * End Game_Actor declarations
   */
})(Game_Actor.prototype);
/**
 * End plugin
 * www.dekyde.com
 */
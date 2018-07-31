// ============================================================================
// Plug-in: DMV_Stat_CriticalDamageRate.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin allows more control over critical damage calculation.
 * 
 * @param Default CDR Funk
 * @desc The formula that determines default base critical damage rate
 * @default 1.5
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * The default critical damage rate multiplier is (damage * 3), which imo, is 
 * just insane. This plugin changes that in the following ways;
 * 
 * The default multiplier value is now lowered from *3, to *1.5 - which is a 
 * default setting that can also be customized on a per battler basis.
 * 
 * Additionally, all battlers now have a shiny new stat called 'cdr'. 
 * You could use the cdr stat within skill formulas as highlighted below;
 * (a.cdr * 10) / (b.cdr * 14) * 7
 * Note - I have not tested this formula, it is only an example.
 * 
 * The 'cdr' stat is used to determine the additional critical damage rate
 * for the battler in question and of course, you can use notetags to alter
 * the cdr stat for actors, classes, enemies, equips & states.
 * 
 * ============================================================================
 * ■ Actor Notetags:
 * ============================================================================
 * 
 * <cdr: VALUE>
 * VALUE should be the value you wish for the actor, class, enemy, equip or 
 * state to give to the battler for the critical damage rate stat.
 * VALUE should also be a small value (0.05 would increase damage 5% when crit)
 * 
 * ----------------------------------------------------------------------------
 * <cdr funk: this.level/100+1.0>
 * This notetag changes the default formula used to determine an actor or
 * enemies base critical damage rate (before quires and states etc).
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
 * Checks to ensure DMV Core plugin exists. 
 */
(function(){
  if (typeof DMV === 'undefined') {
    var strA = "You need to install the DMV_Core plugin ";
    var strB = "in order for other DMV plugins to work!";
    throw new Error(strA + strB);
  }else{
    DMV.register("Stat_CriticalDamageRate", "1.0.0");
  }
})();

/**
 * Function to scope all variables etc properly.
 */
(function($){
  /**
   * Use strict mode
   */ 
  "use strict";
  
  /**
   * params
   * Holds all parameters for this plugin
   */
  var params = PluginManager.parameters("DMV_Stat_CriticalDamageRate");

  /**
   * base_cdr_funk
   * Holds default critical damage rate function string
   */ 
  var base_cdr_funk = String(params['Default CDR Funk'] || "1.5");

  /**
   * DataManager.extractMetadata 
   * Performs the reading of certain notetags. 
   */ 
  var extractMetadata = DataManager.extractMetadata;
  DataManager.extractMetadata = function(data) {
    extractMetadata.apply(this, arguments);
    data._cdr = Number($.extractMetaData(data, 'cdr'));
  };

  /**
   * Game_Action.prototype.applyCritical(damage)
   * Performs the critical hit damage modifications. 
   */ 
  Game_Action.prototype.applyCritical = function(damage) {
    return damage * this.subject().cdr;
  };

  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * Game_BattlerBase Variables && Functions
   **///////////////////////////////////////
	(function(battler){
    /**
     * Game_BattlerBase.prototype.cdr
     * cdr is yoour critical damage rate.
     * each 0.01 value you deal 1% more damage when crit
     */
    $.reader(battler, 'cdr', function(){
      return this.criticalDamageRate();
    });

    /**
     * Game_BattlerBase.prototype.clearParamPlus()
     * Clears all added parameter data
     */
    var clearParamPlus = battler.clearParamPlus;
    battler.clearParamPlus = function() {
      clearParamPlus.apply(this, arguments);
      this.clearCriticalRate();
    };

    /**
     * Game_BattlerBase.prototype.clearCriticalRate()
     * Clears all critical damage rate variables 
     * and reinitializes them to ensure correctness
     */
    battler.clearCriticalRate = function(){
      var aString = this._critDmgRateFunkString();
      this._cdr_funk = Function(aString).bind(this);
      this._critical_dmg_rate = 0;
    }

    /**
     * Game_BattlerBase.prototype._critDmgRateFunkString()
     * @return a string used to determine base CDR value. 
     */
    battler._critDmgRateFunkString = function(){
      var meta = $.extractMetaData(this, 'cdr funk');
      if (meta){ return 'return ' + meta };
      return "return " + base_cdr_funk;
    }

    /**
     * Game_BattlerBase.prototype.addCriticalRate(value)
     * @param value the value to add onto CDR stat.
     */
    battler.addCriticalRate = function(value){
      this._critical_dmg_rate += value;
    }

    /**
     * Game_BattlerBase.prototype.criticalDamageRate()
     * @return the total critical damage rate value.
     */
    battler.criticalDamageRate = function(){
      var value = this._cdr_funk();
      value += this.extra_CritDmgRate();
      return value.toFixed(2);
    }

    /**
     * Game_BattlerBase.prototype.extra_CritDmgRate()
     * @return the extra critical damage rate values.
     */
    battler.extra_CritDmgRate = function(){
      var value = this._critical_dmg_rate;
      if (this.actor){
        value += this.actor()._cdr;
        value += this.currentClass()._cdr;
        value += $.reduceMeta(this.equips(),'_cdr');
      }else if (this.enemy){
        value += this.enemy()._cdr;
      }
      value += $.reduceMeta(this.states(),'_cdr');
      return value
    }
    /**
     * End battler declarations
     */
  })(Game_BattlerBase.prototype);
  /**
   * End declarations
   */
})(DMV)
/**
 * End Plugin
 * www.dekyde.com
 */
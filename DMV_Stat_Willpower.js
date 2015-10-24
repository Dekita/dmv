// ============================================================================
// Plug-in: DMV_Stat_Willpower.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc Creates new stats: will, and willrt. (willpower & rate)
 * See Help for more information--
 * 
 * @param Default Will Funk
 * @desc The default formula that determines base will param multiplier
 * @default (this.willrt/2)+(this.will/1000)
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * A short description of how this system works;
 * 
 * As you take damage from hp, willpower goes down, and other stats (atk, def,
 * mat, mdf, agi and luk) each go down in accodance with the will multiplier.
 * When you are at full hp mp and tp, the other stats will be normal. 
 * 
 * 
 * A more detailed explanation; 
 * 
 * This plugin creates two new stats - will, and willrt. 
 * 
 * Will Rate (willrt), is a stat that is solely based on combined hp, mp, and 
 * tp rates. Eg, when all are full, will rate will also be full (1.0 / 100%).
 * This value can NOT be controlled by the player - other than whatever control
 * they have over hp, mp and tp via potions and skill etc.
 * 
 * Will (will), is a simple stat that is meant to be used within the will power 
 * multiplier function to allow for the multiplier value to be different when
 * certain actors/classes/enemeies/equips or states are in effect. 
 * By default, this value is 0.
 * 
 * The willpower multiplier function is used to determine parameter LOSS.
 * Notetags can be used to allow each actor / enemy to use a different 
 * multiplier function from one another.
 * 
 * If all of this sounds extremely confusing to you, know this; 
 * Your stats go down as your hp/mp and tp does. The higher your 'will' stat, 
 * the less the parameters go down when not at full will rate. 
 * And you can also customize the formula that determines the param loss. 
 * 
 * Additionally, as all battlers now have shiny new stats called 'will' and 
 * 'willrt', you can use these in skill formulae as shown below;
 * (a.will * 10) * (1.0-b.willrt)
 * Note - I have not tested this formula, it is only an example.
 * 
 * ============================================================================
 * ■ Notetags:
 * ============================================================================
 * 
 * <will: VALUE>
 * VALUE should be the value you wish for the actor, class, enemy, equip or 
 * state to give to the battler for the will stat.
 * VALUE should also be a small value (0.05 would increase damage 5% when crit)
 * 
 * ----------------------------------------------------------------------------
 * <will funk: this.level/100+1.0>
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
    DMV.register("Stat_Willpower", "1.0.0");
  }
})();

(function($){
  /**
   * Use strict mode
   */ 
  "use strict";
  
  /**
   * params
   * Holds all parameters for this plugin
   */
  var params = PluginManager.parameters("DMV_Stat_Willpower");

  /**
   * default_will_multfunk
   * Holds the default will multiplier function string
   */
  var default_will_multfunk = String(params['Default Will Funk']);

  /**
   * DataManager.extractMetadata 
   * Extracts notetags from all database items
   */ 
  var extractMetadata = DataManager.extractMetadata;
  DataManager.extractMetadata = function(data) {
    extractMetadata.apply(this, arguments);
    data._will = Number($.extractMetaData(data, 'will'));
  };


	(function(battler){
    /**
     * safe_param_ids
     * Holds array of safe parameters to ignore for willpower mods
     */
		var safe_param_ids = [0, 1];

    /**
     * Game_BattlerBase.prototype.will
     * will is the battlers will stat.
     * each 10 points towards will makes 
     * parameter loss go down by 1% 
     */
    $.reader(battler, 'will', function(){
      return this._willpowerStat();
    });

    /**
     * Game_BattlerBase.prototype.willrt
     * willrt is the battlers will power rate.
     * this is determined automatically via hp mp and tp rates
     */
    $.reader(battler, 'willrt', function(){
      return (this.hpRate()+this.mpRate()+this.tpRate())/3;
    });

    /**
     * Game_BattlerBase.prototype.clearParamPlus()
     * Clears all added parameter data
     */
    var clearParamPlus = battler.clearParamPlus;
    battler.clearParamPlus = function() {
      clearParamPlus.apply(this, arguments);
      this.clearWillpowerValue();
    };

    /**
     * Game_BattlerBase.prototype.clearWillpowerValue()
     * Clears all willpower related variables and also
     * reinitializes them to ensure their correctness
     */
    battler.clearWillpowerValue = function(){
      var argz = [this,'willrt funk',default_will_multfunk];
      this._willrt_funk = $.extractFunkStringF.apply($, argz);
      this._will = 0;
    }

    /**
     * Game_BattlerBase.prototype._willpowerStat
     * @return the willpower multiplier stat value
     */
    battler._willpowerStat = function(){
      var value = this._will;
      if (this.actor){
        value += this.actor()._will;
        value += this.currentClass()._will;
        value += $.reduceMeta(this.equips(),'_will');
      }else if (this.enemy){
        value += this.enemy()._will;
      }
      value += $.reduceMeta(this.states(),'_will');
      return value
    };

    /**
     * Game_BattlerBase.prototype.paramRate(paramId)
     * @param paramId the parameter id to get the paramRate for
     * @return parameter rate after modifications from willpower 
     */
    var paramRate = battler.paramRate;
	  battler.paramRate = function(paramId) {
	  	var value = paramRate.apply(this, arguments);
	  	if (!safe_param_ids.contains(paramId)){
	  		return value - (1.0 - this._willrt_funk());
	  	}
	  	return value;
  	}; 
    /**
     * End battler declarations
     */
  })(Game_BattlerBase.prototype);
  /**
   * End declarations
   */
})(DMV);
/**
 * End Plugin
 * www.dekyde.com
 */
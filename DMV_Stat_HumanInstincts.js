// ============================================================================
// Plug-in: DMV_Stat_HumanInstincts.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc Creates statistics with the characteristics of human instincts
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This system creates two new stats, survival instinct, and killer instinct.
 * Naturally, these statistics are heavily based on the well known animalistic 
 * attributes of humans (and almost al other creatures...).
 * 
 * ☆ Survival Instinct
 * This stat takes effect when the battlers has a combined hp && mp.
 * When hp and mp rates combined are below 1.0, survival instinct kicks in and
 * all other stat values are then increased in accordance with the formula. 
 * If you have higher svi stat value, the increase of other stats (when svi 
 * kicks in) is also higher.
 * 
 * ☆ Killer Instinct
 * This stat also takes effect when the battler has combined low hp && mp.
 * When hp and mp rates combined are below 1.0, kli kicks in and all damage 
 * dealt (from attacks and heals) is increased. 
 * If you have higher kli stat value, the aforementioned increase of damage 
 * (when kli active) is also higher.
 * 
 * 
 * You can increase both svi, and kli via notetags on actors, classes, equip, 
 * states and enemies. Be aware however, the default modifications from this
 * system are already quite powerful, so try not overuse these stats as they
 * could severely imbalance the game if not kept in check. 
 * An example of this, would be having some early access equipment with high
 * stat gains for an actor who already has a high human instinct stat level.
 * 
 * Additionally, you can also use kli and svi within stat formulas, as 
 * highlighted below;
 * a.kli * 4 - b.svi * 2
 * 
 * Furthermore, as these statistics can become incredibly powerful very easily, 
 * I have limited both of them to 100. So none can ever go above. :)
 * 
 * Lastly, as this system may not be desired for every single battler in the 
 * game, I have disabled the features by default. They can re-enabled via
 * notetags used on single items, such as enemies or actors, or alternatively
 * you can turn it back on for all battlers within the plugin manager settings. 
 * 
 * ============================================================================
 * ■ Notetags:
 * ============================================================================
 * <svi: VALUE>
 * VALUE = the value to increase the survival instinct stat by.
 * 
 * <kli: VALUE>
 * VALUE = the value to increase the killer instinct stat by.
 * 
 * <can_svi>
 * <can_kli>
 * The use of these notetags, will allow the svi and/or kli system to take
 * effect for that battler.
 * 
 * ALL these notetags can be used on actors, classes, equip, enemies & states.
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
 * v.1.0.0 - Initial Release,
 * 
 * ============================================================================
 *  www.dekyde.com
 * ============================================================================
 * @param Enable For All
 * @desc Enables the svi and kli stats for all battlers 
 * Default: false
 * @default false
 */ 

/**
 * Checks for DMV Core plugin and register if available
 */
(function(){
  if (typeof DMV === 'undefined') {
    var strA = "You need to install the DMV_Core plugin ";
    var strB = "in order for other DMV plugins to work!";
    throw new Error(strA + strB);
  }else{
    DMV.register("Stat_HumanInstincts", "1.0.0", "18/11/2o15");
  }
})();

/**
 * AnonomousFunction(DMV)
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
  var params = PluginManager.parameters('DMV_Stat_HumanInstincts');

  /**
   * default_use_stats
   * Determines if all battlers use the stats by default.
   */
  var default_use_stats = params['Enable For All'].contains('true');

  /**
   * DataManager.extractMetadata 
   * Extracts all notetag data where required
   */ 
  var extractMetadata = DataManager.extractMetadata;
  DataManager.extractMetadata = function(data) {
    extractMetadata.apply(this, arguments);
    data._human_instincts = [
      Number($.extractMetaData(data, 'svi')),
      Number($.extractMetaData(data, 'kli')),
    ];
    data._can_human_instincts = [
      Boolean($.extractMetaData(data, 'can_svi')),
      Boolean($.extractMetaData(data, 'can_kli')),
    ];
  };

  /**
   * Game_Action.prototype
   */
  (function(action){
    /**
     * [ private ] calcMod(battler)
     * @param battler the battler who is acting
     * @return the damage multiplier value for killer instinct
     */
    function calcMod(battler){
      if (battler.instinctRate() < 1.0 && this.canHumanInstinctStat(1)){
        return 1.0 + (1.0 + (battler.kli / 100) - this.instinctRate());
      }
      return 1.0;
    }

    /**
     * Game_Action.prototype.evalDamageFormula(target)
     * Performs the default damage calculation logic and then applies 
     * the attackers killer instinct damage modificaitons - if any 
     */
    var evalDamageF = action.evalDamageFormula;
    action.evalDamageFormula = function(target) {
      return evalDamageF.apply(this, arguments) * calcMod(this.subject());
    };
    /**
     * End action declarations
     */
  })(Game_Action.prototype);

  /**
   * Game_BattlerBase.prototype
   */
  (function(battler){
    /**
     * safe_param_ids
     * Holds array of safe parameters to ignore for instinct mods
     */
    var safe_param_ids = [0, 1];

    /**
     * Game_BattlerBase.prototype.svi
     * Returns the svi (survival instinct) stat value for battler
     */
    $.reader(battler, 'svi', function(){
      return this.humanInstinctStat(0);
    });

    /**
     * Game_BattlerBase.prototype.kli
     * Returns the kli (killer instinct) stat value for battler
     */
    $.reader(battler, 'kli', function(){
      return this.humanInstinctStat(1);
    });

    /**
     * Game_BattlerBase.prototype.clearParamPlus()
     * Clears all added parameter data
     */
    var clearParamPlus = battler.clearParamPlus;
    battler.clearParamPlus = function() {
      clearParamPlus.apply(this, arguments);
      this.clearHumanInstinctPlus();
    };

    /**
     * Game_BattlerBase.prototype.clearParamPlus()
     * Clears all added human instinct parameters
     */
    battler.clearHumanInstinctPlus = function(){
      this._human_instincts = [0, 0];
    }

    /**
     * Game_BattlerBase.prototype.humanInstinctStat(id)
     * @param id the id of the instinct stat to return
     * @return the value of the stat determined by id
     */
    battler.humanInstinctStat = function(id){
      var value = this._human_instincts[id];
      if (this.actor){
        value += this.actor()._human_instincts[id];
        value += this.currentClass()._human_instincts[id];
        value += $.reduceMetaID(this.equips(),'_human_instincts',id);
      }else if (this.enemy){
        value += this.enemy()._human_instincts[id];
      }
      value += $.reduceMetaID(this.states(),'_human_instincts',id);
      return Math.floor(value.clamp(0,100));
    }

    /**
     * [ private ] instinctIteration(array, id)
     * @param array the item array to check for instinct stat
     * @return boolean for any item allows stat id to be used
     */
    function instinctIteration(array,id) {
      return array.some(function(item) {
        var bool = item && item._can_human_instincts;
        return bool && item._can_human_instincts[id];
      });
    }

    /**
     * Game_BattlerBase.prototype.canHumanInstinctStat(id)
     * @param id the id of the instinct stat to return
     * @return boolean for weather this stat is used.
     */
    battler.canHumanInstinctStat = function(id){
      if (this.actor){
        return default_use_stats || this.actor()._can_human_instincts[id] ||
        this.currentClass()._can_human_instincts[id] || 
        $.reduceMetaID(this.equips(),'_can_human_instincts',id) ||
        instinctIteration(this.equips(),id) || instinctIteration(this.states(),id);
      }else if (this.enemy){
        return default_use_stats || this.enemy()._human_instincts[id] ||
        instinctIteration(this.states(),id);
      }
      return false;
    }

    /**
     * Game_BattlerBase.prototype.instinctRate()
     * @return the human instinct rate used within calculations
     */
    battler.instinctRate = function(){
      return ((this.hpRate() + this.mpRate()) / 2);
    }

    /**
     * Game_BattlerBase.prototype.survivalInstinctStat()
     * @param id the id of the instinct stat to return
     * @return the value of the stat determined by id
     */
    battler.survivalInstinctMod = function(){
      return 1.0 + (this.svi / 100) - this.instinctRate();
    }

    /**
     * Game_BattlerBase.prototype.paramRate(paramId)
     * @param paramId the parameter id to get the paramRate for
     * @return parameter rate after mods from survival instinct
     */
    var paramRate = battler.paramRate;
    battler.paramRate = function(paramId) {
      var value = paramRate.apply(this, arguments);
      if (!safe_param_ids.contains(paramId)){
        if (this.instinctRate() < 1.0 && this.canHumanInstinctStat(0)){
          console.log(this.survivalInstinctMod())
          return value + this.survivalInstinctMod();
        }
      }
      return value;
    }; 
    /**
     * End Game_BattlerBase.prototype declarations
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
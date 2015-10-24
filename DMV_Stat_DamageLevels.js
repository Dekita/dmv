// ============================================================================
// Plug-in: DMV_Stat_DamageLevels.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin creates a bunch of new attack and defence  
 * related stats which can also be used in skill formulas.
 * 
 * @param -- Attack Level Stats --
 * @default 
 * 
 * @param ATL Form
 * @desc The formula that determines default base ATL (actors only)
 * @default this.level
 * 
 * @param CAL Form
 * @desc The formula that determines default base CAL (actors only)
 * @default 0
 * 
 * @param PAL Form
 * @desc The formula that determines default base PAL (actors only)
 * @default 0
 * 
 * @param MAL Form
 * @desc The formula that determines default base MAL (actors only)
 * @default 0
 * 
 * @param SAL Form
 * @desc The formula that determines default base SAL (actors only)
 * @default 0
 * 
 * @param -- Defence Level Stats --
 * @default 
 * 
 * @param DFL Form
 * @desc The formula that determines default base DFL (actors only)
 * @default this.level
 * 
 * @param CDL Form
 * @desc The formula that determines default base CDL (actors only)
 * @default 0
 * 
 * @param PDL Form
 * @desc The formula that determines default base PDL (actors only)
 * @default 0
 * 
 * @param MDL Form
 * @desc The formula that determines default base MDL (actors only)
 * @default 0
 * 
 * @param SDL Form
 * @desc The formula that determines default base SDL (actors only)
 * @default 0
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin creates 10 new stats total, these are as follows;
 * 
 * Attack Types: 
 * atl - General Attack Level 
 * cal - Certain Attack Level 
 * pal - Physical Attack Level 
 * mal - Magical Attack Level 
 * sal - Self Attack Level 
 * 
 * Defence Types: 
 * atl - General Attack Level 
 * cal - Certain Attack Level 
 * pal - Physical Attack Level 
 * mal - Magical Attack Level 
 * sal - Self Attack Level 
 * 
 * These stats are given to both actors and enemies and of course, they can be
 * changed via applying notetags onto your actor, class, equip, state, and of
 * course, the notetag can also be applied to enemies. 
 * 
 * You could use any of these stats within skill formulas as highlighted below;
 * ((a.atl + a.cal) * 10) / (b.dfl * 14) * 7
 * Note - I have not tested this formula, it is only an example.
 * 
 * Please be aware, that these stats can VERY easily change the outcome of a 
 * battle if any one party is overpowered with attack of defence levels of any
 * kind. So with this in mind, use these points sparingly. 
 * 
 * The default settings only provide gain formulas for the general attack and 
 * defence level types; however, the ability to formulate your own calculation
 * for all attack and defence level types is available. 
 *  
 * ============================================================================
 * ■ Actor Notetags:
 * ============================================================================
 * 
 * <STAT: VALUE>
 * STAT should be one of; atl, cal, pal, mal, sal, dfl, cdl, pdl, mdl, sdl.
 * VALUE should be the value you wish for the actor, class, enemy, equip or 
 * state to give to the battler for the specified stat.
 * 
 * ----------------------------------------------------------------------------
 * <atk lvl: atl, cal, pal, mal, sal>
 * <def lvl: dfl, cdl, pdl, mdl, sdl>
 * The above notetags can be used to give actors, classes, enemies, states
 * and all equips a value within every single attack / defence level stat.
 * 
 * ----------------------------------------------------------------------------
 * <ignore STAT>
 * STAT should be one of; atl, cal, pal, mal, sal, dfl, cdl, pdl, mdl, sdl.
 * This notetag can be used to give actors, classes, enemies, states and all 
 * equips the ability to allow a battler to ignore the STAT specified.
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
    DMV.register("Stat_DamageLevels", "1.0.0");
  }
})();

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
  var params = PluginManager.parameters("DMV_Stat_DamageLevels");

  /**
   * atl_formulas
   * Holds default attack level formula array
   */ 
  var atl_formulas = [
    params["ATL Form"],
    params["CAL Form"],
    params["PAL Form"],
    params["MAL Form"],
    params["SAL Form"]
  ];

  /**
   * dfl_formulas
   * Holds default defence level formula array
   */ 
  var dfl_formulas = [
    params["DFL Form"],
    params["CDL Form"],
    params["PDL Form"],
    params["MDL Form"],
    params["SDL Form"]
  ];
  
  /**
   * DataManager.extractMetadata 
   */ 
  var extractMetadata = DataManager.extractMetadata;
  DataManager.extractMetadata = function(data) {
    extractMetadata.apply(this, arguments);
    // Notetags to determine base attack levels
    data._atlp = $.mapMeta2n(data, 'atk lvl');
    data._atlp[0] = Number($.extractMetaData(data, 'atl'));
    data._atlp[1] = Number($.extractMetaData(data, 'cal'));
    data._atlp[2] = Number($.extractMetaData(data, 'pal'));
    data._atlp[3] = Number($.extractMetaData(data, 'mal'));
    data._atlp[4] = Number($.extractMetaData(data, 'sal'));
    // Notetags to determine base defence levels
    data._dflp = $.mapMeta2n(data, 'def lvl');
    data._dflp[0] = Number($.extractMetaData(data, 'dfl'));
    data._dflp[1] = Number($.extractMetaData(data, 'cdl'));
    data._dflp[2] = Number($.extractMetaData(data, 'pdl'));
    data._dflp[3] = Number($.extractMetaData(data, 'mdl'));
    data._dflp[4] = Number($.extractMetaData(data, 'sdl'));
    // Notetags to determine if attack levels should be ignored
    data._atlp_rest = [];
    data._atlp_rest[0] = Boolean($.extractMetaData(data, 'ignore atl'));
    data._atlp_rest[1] = Boolean($.extractMetaData(data, 'ignore cal'));
    data._atlp_rest[2] = Boolean($.extractMetaData(data, 'ignore pal'));
    data._atlp_rest[3] = Boolean($.extractMetaData(data, 'ignore mal'));
    data._atlp_rest[4] = Boolean($.extractMetaData(data, 'ignore sal'));
    // Notetags to determine if defence levels should be ignored
    data._dflp_rest = [];
    data._dflp_rest[0] = Boolean($.extractMetaData(data, 'ignore dfl'));
    data._dflp_rest[1] = Boolean($.extractMetaData(data, 'ignore cdl'));
    data._dflp_rest[2] = Boolean($.extractMetaData(data, 'ignore pdl'));
    data._dflp_rest[3] = Boolean($.extractMetaData(data, 'ignore mdl'));
    data._dflp_rest[4] = Boolean($.extractMetaData(data, 'ignore sdl'));
  };

  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * Game_Action Variables && Functions
   **//////////////////////////////////
  (function(action){
    /**
     * [ private ] calcAtkMod(stat)
     * @param stat the atk level stat to obtain
     */
    function calcAtkMod(stat){
      // atlval = ((100 + user.atl) * 0.01)
      // atlval = 1 if user.can_ignore_atl || item.ignore_atl
      //return ((100 + stat) * 0.01);
      return (1.0 + (stat / 100));
    } 

    /**
     * [ private ] calcAtkMod(stat)
     * @param stat the atk level stat to obtain
     */
    function calcDefMod(stat){
      // dflval = (1.0 - (dfl * 0.01))
      // dflval = 1 if user.can_ignore_dfl || item.ignore_dfl
      return (1.0 - (stat * 0.01));
      //return (1.0 - (stat / 100));
    } 


    /**
     * Game_Action.prototype.evalDamageFormula(target)
     * Performs the default damage calculation logic and then applies the
     * attackers various attack level modificaitons - if any 
     * 
     * console.log(this.subject().name() + ': ' + this.subject().atl)
     */
    var evalDamageFormula = action.evalDamageFormula;
    action.evalDamageFormula = function(target) {
      var battler = this.subject();
      var base = evalDamageFormula.apply(this, arguments);
      if (this.can_cal(target)){ base *= calcAtkMod(battler.cal)};
      if (this.can_pal(target)){ base *= calcAtkMod(battler.pal)};
      if (this.can_mal(target)){ base *= calcAtkMod(battler.mal)};
      if (this.can_sal(target)){ base *= calcAtkMod(battler.sal)};
      if (this.can_atl(target)){ base *= calcAtkMod(battler.atl)};
      return base;
    };

    /**
     * Game_Action.prototype.applyGuard(damage, target)
     * Performs the default guard logic processing and then applies the 
     * targets defence level modifications into the damage calculation
     * 
     * console.log(target.name() + ': ' + target.dfl)
     */
    var applyGuard = action.applyGuard;
    action.applyGuard = function(damage, target) {
      var battler = this.subject();
      var base = applyGuard.apply(this, arguments);
      var old_damage = base;
      if (this.can_cdl(battler)){ base *= calcDefMod(target.cdl)};
      if (this.can_pdl(battler)){ base *= calcDefMod(target.pdl)};
      if (this.can_mdl(battler)){ base *= calcDefMod(target.mdl)};
      if (this.can_sdl(battler)){ base *= calcDefMod(target.sdl)};
      if (this.can_dfl(battler)){ base *= calcDefMod(target.dfl)};
      if (old_damage > 0 && base < 0){base = 1};
      return base;
    };

    /**
     * Game_Action.prototype.can_atl(target)
     * Ensures Attack Level can be applied.
     */
    action.can_atl = function(target){
      return !target.can_atl_rest(0);
    }

    /**
     * Game_Action.prototype.can_cal(target)
     * Ensures Certain Attack Level can be applied.
     */
    action.can_cal = function(target){
      return this.isCertainHit() && !target.can_atl_rest(1);
    }

    /**
     * Game_Action.prototype.can_pal(target)
     * Ensures Physical Attack Level can be applied.
     */
    action.can_pal = function(target){
      return this.isPhysical() && !target.can_atl_rest(2);
    }

    /**
     * Game_Action.prototype.can_mal(target)
     * Ensures Magical Attack Level can be applied.
     */
    action.can_mal = function(target){
      return this.isMagical() && !target.can_atl_rest(3);
    }

    /**
     * Game_Action.prototype.can_sal(target)
     * Ensures Self Attack Level can be applied.
     */
    action.can_sal = function(target){
      return this.isForUser() && !target.can_atl_rest(4);
    }

    /**
     * Game_Action.prototype.can_dfl(target)
     * Ensures Defence Level can be applied.
     */
    action.can_dfl = function(target){
      return !target.can_dfl_rest(0);
    }

    /**
     * Game_Action.prototype.can_cdl(target)
     * Ensures Certain Defence Level can be applied.
     */
    action.can_cdl = function(target){
      return this.isCertainHit() && !target.can_dfl_rest(1);
    }
    
    /**
     * Game_Action.prototype.can_pdl(target)
     * Ensures Physical Defence Level can be applied.
     */
    action.can_pdl = function(target){
      return this.isPhysical() && !target.can_dfl_rest(2);
    }

    /**
     * Game_Action.prototype.can_mdl(target)
     * Ensures Magical Defence Level can be applied.
     */
    action.can_mdl = function(target){
      return this.isMagical() && !target.can_dfl_rest(3);
    }
    
    /**
     * Game_Action.prototype.can_sdl(target)
     * Ensures Self Defence Level can be applied.
     */
    action.can_sdl = function(target){
      return this.isForUser() && !target.can_dfl_rest(4);
    }
    /**
     * End action declarations
     */
  })(Game_Action.prototype);


  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * Game_BattlerBase Variables && Functions
   **///////////////////////////////////////
  (function(battler){
    /**
     * Game_BattlerBase.prototype.atl
     * For each 1 atl you have above opponents 'dfl' you will
     * deal 1% more damage. (applies to all attacks)
     */
    $.reader(battler, 'atl', function(){
      return Math.floor(this.atk_lvl_stat(0));
    });

    /**
     * Game_BattlerBase.prototype.dfl
     * For each 1 dfl you have above opponents 'atl' you will
     * receive 1% less damage. (applies to all attacks)
     */
    $.reader(battler, 'dfl', function(){
      return Math.floor(this.def_lvl_stat(0));
    });

    /**
     * Game_BattlerBase.prototype.cal
     * For each 1 cal you have above opponents 'cdl' you will
     * deal 1% more damage. (only applies to certain hits)
     */
    $.reader(battler, 'cal', function(){
      return Math.floor(this.atk_lvl_stat(1));
    });

    /**
     * Game_BattlerBase.prototype.cdl
     * For each 1 cdl you have above opponents 'cal' you will
     * receive 1% less damage. (only applies to certain hits)
     */
    $.reader(battler, 'cdl', function(){
      return Math.floor(this.def_lvl_stat(1));
    });

    /**
     * Game_BattlerBase.prototype.pal
     * For each 1 pal you have above opponents 'pdl' you will
     * deal 1% more damage. (only applies to physical hits)
     */
    $.reader(battler, 'pal', function(){
      return Math.floor(this.atk_lvl_stat(2));
    });

    /**
     * Game_BattlerBase.prototype.pdl
     * For each 1 pdl you have above opponents 'pal' you will
     * receive 1% less damage. (only applies to physical hits)
     */
    $.reader(battler, 'pdl', function(){
      return Math.floor(this.def_lvl_stat(2));
    });

    /**
     * Game_BattlerBase.prototype.mal
     * For each 1 mal you have above opponents 'mdl' you will
     * deal 1% more damage. (only applies to magical hits)
     */
    $.reader(battler, 'mal', function(){
      return Math.floor(this.atk_lvl_stat(3));
    });

    /**
     * Game_BattlerBase.prototype.mdl
     * For each 1 mdl you have above opponents 'mal' you will
     * receive 1% less damage. (only applies to magical hits)
     */
    $.reader(battler, 'mdl', function(){
      return Math.floor(this.def_lvl_stat(3));
    });

    /**
     * Game_BattlerBase.prototype.sal
     * For each 1 sal you have above opponents 'sdl' you will
     * deal 1% more damage. (only applies to self hits)
     */
    $.reader(battler, 'sal', function(){
      return Math.floor(this.atk_lvl_stat(4));
    });

    /**
     * Game_BattlerBase.prototype.sdl
     * For each 1 sdl you have above opponents 'sal' you will
     * receive 1% less damage. (only applies to self hits)
     */
    $.reader(battler, 'sdl', function(){
      return Math.floor(this.def_lvl_stat(4));
    });

    /**
     * Game_BattlerBase.prototype.clearParamPlus()
     * Clears all added parameter data
     */
    var clearParamPlus = battler.clearParamPlus;
    battler.clearParamPlus = function() {
      clearParamPlus.apply(this, arguments);
      this.clearAtkDefLvlPlus();
    };

    /**
     * Game_BattlerBase.prototype.clearAtkDefLvlPlus()
     * Clears all added attack and defence level data
     * @note element[0] = regular atk/def level
     *       element[1] = certain atk/def level
     *       element[2] = physical atk/def level
     *       element[3] = magical atk/def level
     *       element[4] = self atk/def level
     */
    battler.clearAtkDefLvlPlus = function() {
      this._atk_lvl_plus = [0, 0, 0, 0, 0];
      this._def_lvl_plus = [0, 0, 0, 0, 0];
      this._atk_lvl_funk = [];
      this._def_lvl_funk = [];
      var atkfun, deffun;
      for (var i = 0; i < 5; i++){
        atkfun = Function(this._atk_lvl_form(i)).bind(this);
        deffun = Function(this._def_lvl_form(i)).bind(this);
        this._atk_lvl_funk.push(atkfun);
        this._def_lvl_funk.push(deffun);
      }
    };

    /**
     * Game_BattlerBase.prototype._atk_lvl_form(index)
     * @param index the id of the atk level formula 
     * @return the formula string for getting atk level formulas
     */
    battler._atk_lvl_form = function(index) {
      return 'return ' + atl_formulas[index];
    };

    /**
     * Game_BattlerBase.prototype._def_lvl_form(index)
     * @param index the id of the def level formula 
     * @return the formula string for getting def level formulas
     */
    battler._def_lvl_form = function(index) {
      return 'return ' + dfl_formulas[index];
    };

    /**
     * Game_BattlerBase.prototype.atk_lvl_plus(atlID)
     * @param atlID the id of the atk level stat to check
     * @return the value of the atk level stat
     */
    battler.atk_lvl_plus = function(atlID) {
      return this._atk_lvl_plus[atlID];
    };

    /**
     * Game_BattlerBase.prototype.def_lvl_plus(dflID)
     * @param dflID the id of the def level stat to check
     * @return the value of the def level stat
     */
    battler.def_lvl_plus = function(dflID) {
      return this._def_lvl_plus[dflID];
    };
 
    /**
     * Game_BattlerBase.prototype.addAtl(value)
     * @param value the value to add onto attack level
     */
    battler.addAtl = function(value) {
      this._add_atk_level(0, value);
    };

    /**
     * Game_BattlerBase.prototype.addDfl(value)
     * @param value the value to add onto defence level
     */
    battler.addDfl = function(value) {
      this._add_def_level(0, value);
    };
 
    /**
     * Game_BattlerBase.prototype.addCal(value)
     * @param value the value to add onto certain attack level
     */
    battler.addCal = function(value) {
      this._add_atk_level(1, value);
    };

    /**
     * Game_BattlerBase.prototype.addCdl(value)
     * @param value the value to add onto certain defence level
     */
    battler.addCdl = function(value) {
      this._add_def_level(1, value);
    };
 
    /**
     * Game_BattlerBase.prototype.addPal(value)
     * @param value the value to add onto physical attack level
     */
    battler.addPal = function(value) {
      this._add_atk_level(2, value);
    };

    /**
     * Game_BattlerBase.prototype.addPdl(value)
     * @param value the value to add onto physical defence level
     */
    battler.addPdl = function(value) {
      this._add_def_level(2, value);
    };
 
    /**
     * Game_BattlerBase.prototype.addMal(value)
     * @param value the value to add onto magical attack level
     */
    battler.addMal = function(value) {
      this._add_atk_level(3, value);
    };

    /**
     * Game_BattlerBase.prototype.addMdl(value)
     * @param value the value to add onto magical defence level
     */
    battler.addMdl = function(value) {
      this._add_def_level(3, value);
    };
 
    /**
     * Game_BattlerBase.prototype.addSal(value)
     * @param value the value to add onto self attack level
     */
    battler.addSal = function(value) {
      this._add_atk_level(4, value);
    };

    /**
     * Game_BattlerBase.prototype.addSdl(value)
     * @param value the value to add onto self defence level
     */
    battler.addSdl = function(value) {
      this._add_def_level(4, value);
    };

    /**
     * Game_BattlerBase.prototype._add_atk_level(adlID, value)
     * @param adlID the id of the atk level stat to increase
     * @param value the value to add onto stat level
     */
    battler._add_atk_level = function(adlID, value) {
      this._atk_lvl_plus[adlID] += value;
    };
    
    /**
     * Game_BattlerBase.prototype._add_atk_level(dflID, value)
     * @param dflID the id of the def level stat to increase
     * @param value the value to add onto stat level
     */
    battler._add_def_level = function(dflID, value) {
      this._def_lvl_plus[dflID] += value;
    };

    /**
     * Game_BattlerBase.prototype.atk_lvl_stat(atlID)
     * @param atlID the id of the atk level stat to check
     * @return the value of the atk level stat
     */
    battler.atk_lvl_stat = function(atlID) {
      var value = this.atk_lvl_plus(atlID);
      if (this.actor){
        value += this._atk_lvl_funk[atlID]();
        value += this.actor()._atlp[atlID];
        value += this.currentClass()._atlp[atlID];
        value += $.reduceMetaID(this.equips(),'_atlp',atlID);
      }else if (this.enemy){
        value += this.enemy()._atlp[atlID];
      }
      value += $.reduceMetaID(this.states(),'_atlp',atlID);
      return value;
    };

    /**
     * Game_BattlerBase.prototype.def_lvl_stat(dflID)
     * @param dflID the id of the def level stat to check
     * @return the value of the def level stat
     */
    battler.def_lvl_stat = function(dflID) {
      var value = this.def_lvl_plus(dflID);
      if (this.actor){
        value += this._def_lvl_funk[dflID]();
        value += this.actor()._dflp[dflID];
        value += this.currentClass()._dflp[dflID];
        value += $.reduceMetaID(this.equips(),'_dflp',dflID);
      }else if (this.enemy){
        value += this.enemy()._dflp[dflID];
      }
      value += $.reduceMetaID(this.states(),'_dflp',dflID);
      return value;
    };

    /**
     * Game_BattlerBase.prototype.can_atl_rest(atlID)
     * @param atlID the id of the atk level restriction to check
     * @return boolean for if atl is restricted
     */
    battler.can_atl_rest = function(atlID) {
      if (this.actor){
        if (this.actor()._atlp_rest[atlID]){ return true };
        if (this.currentClass()._atlp_rest[atlID]){ return true };
        if ($.reduceMetaID(this.equips(),'_atlp_rest',atlID)){ return true };
      }else if (this.enemy){
        if (this.enemy()._atlp_rest[atlID]){ return true };
      }
      if ($.reduceMetaID(this.states(),'_atlp_rest',atlID)){ return true };
      return false;
    };

    /**
     * Game_BattlerBase.prototype.can_dfl_rest(dflID)
     * @param dflID the id of the def level restriction to check
     * @return boolean for if dfl is restricted
     */
    battler.can_dfl_rest = function(dflID) {
      if (this.actor){
        if (this.actor()._dflp_rest[dflID]){ return true };
        if (this.currentClass()._dflp_rest[dflID]){ return true };
        if ($.reduceMetaID(this.equips(),'_dflp_rest',dflID)){ return true };
      }else if (this.enemy){
        if (this.enemy()._dflp_rest[dflID]){ return true };
      }
      if ($.reduceMetaID(this.states(),'_dflp_rest',dflID)){ return true };
      return false;
    };
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
// ============================================================================
// Plug-in: DMV_Stat_ParamLimitBreaker.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin allows for actor parameter limits to be broken.
 * 
 * @param -- actor --
 * @default 
 *
 * @param Actor MaxHP
 * @desc Sets the default maximum HP for actors
 * @default 99999
 * 
 * @param Actor MaxMP
 * @desc Sets the default maximum MP for actors
 * @default 99999
 * 
 * @param Actor MaxAtk
 * @desc Sets the default maximum Atk for actors
 * @default 9999
 * 
 * @param Actor MaxDef
 * @desc Sets the default maximum Def for actors
 * @default 9999
 * 
 * @param Actor MaxMat
 * @desc Sets the default maximum Mat for actors
 * @default 9999
 * 
 * @param Actor MaxMdf
 * @desc Sets the default maximum Mdf for actors
 * @default 9999
 * 
 * @param Actor MaxAgi
 * @desc Sets the default maximum Agi for actors
 * @default 9999
 * 
 * @param Actor MaxLuk
 * @desc Sets the default maximum Luk for actors
 * @default 9999
 * 
 * @param -- enemy --
 * @default 
 *
 * @param Enemy MaxHP
 * @desc Sets the default maximum HP for enemies
 * @default 9999999
 * 
 * @param Enemy MaxMP
 * @desc Sets the default maximum MP for enemies
 * @default 9999999
 * 
 * @param Enemy MaxAtk
 * @desc Sets the default maximum Atk for enemies
 * @default 99999
 * 
 * @param Enemy MaxDef
 * @desc Sets the default maximum Def for enemies
 * @default 99999
 * 
 * @param Enemy MaxMat
 * @desc Sets the default maximum Mat for enemies
 * @default 99999
 * 
 * @param Enemy MaxMdf
 * @desc Sets the default maximum Mdf for enemies
 * @default 99999
 * 
 * @param Enemy MaxAgi
 * @desc Sets the default maximum Agi for enemies
 * @default 99999
 * 
 * @param Enemy MaxLuk
 * @desc Sets the default maximum Luk for enemies
 * @default 99999
 * 
 * @param -- other --
 * @default 
 *
 * @param Other MaxHP
 * @desc Sets the default maximum HP for other battler types
 * @default 99
 * 
 * @param Other MaxMP
 * @desc Sets the default maximum MP for other battler types
 * @default 99
 * 
 * @param Other MaxAtk
 * @desc Sets the default maximum Atk for other battler types
 * @default 9
 * 
 * @param Other MaxDef
 * @desc Sets the default maximum Def for other battler types
 * @default 9
 * 
 * @param Other MaxMat
 * @desc Sets the default maximum Mat for other battler types
 * @default 9
 * 
 * @param Other MaxMdf
 * @desc Sets the default maximum Mdf for other battler types
 * @default 9
 * 
 * @param Other MaxAgi
 * @desc Sets the default maximum Agi for other battler types
 * @default 9
 * 
 * @param Other MaxLuk
 * @desc Sets the default maximum Luk for other battler types
 * @default 9
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin allows for all actor parameter limits to be broken, and also for
 * each actor to have their own unique limitations.
 * 
 * Some notetags are available to allow for each actors limits to easily be
 * altered by you, the game developer.
 * 
 * ============================================================================
 * ■ Actor Notetags: (also work with enemies)
 * ============================================================================
 * 
 * <max params: mhp, mmp, atk, def, mat, mdf, agi, luk>
 * This notetag allows for all parameters max limits to be set at once. 
 * Not all values are required, but they must be in the order shown above.
 * 
 * Examples: 
 * <max params: 500, 500, 50, 50>
 * <max params: 500, 500>
 * 
 * ----------------------------------------------------------------------------
 * 
 * <max STAT: VALUE>
 * STAT is one of; mhp, mmp, atk, def, mat, mdf, agi or luk.
 * VALUE should be a numeric as it is used to determine the max stat value. 
 * 
 * Examples: 
 * <max atk: 500>
 * <max luk: 4>
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
    DMV.register("Stat_ParamLimitBreak", "1.0.0", "23/1o/2o15");
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
  var params = PluginManager.parameters("DMV_Stat_ParamLimitBreak");

  /**
   * mastat
   * Holds array of default max actor stat values
   */ 
  var mastat = [
    Number(params['Actor MaxHP'] || 99999),
    Number(params['Actor MaxMP'] || 99999),
    Number(params['Actor MaxAtk'] || 9999),
    Number(params['Actor MaxDef'] || 9999),
    Number(params['Actor MaxMat'] || 9999),
    Number(params['Actor MaxMdf'] || 9999),
    Number(params['Actor MaxAgi'] || 9999),
    Number(params['Actor MaxLuk'] || 9999),
  ];

  /**
   * mestat
   * Holds array of default max enemy stat values
   */ 
  var mestat = [
    Number(params['Enemy MaxHP'] || 9999999),
    Number(params['Enemy MaxMP'] || 9999999),
    Number(params['Enemy MaxAtk'] || 999999),
    Number(params['Enemy MaxDef'] || 999999),
    Number(params['Enemy MaxMat'] || 999999),
    Number(params['Enemy MaxMdf'] || 999999),
    Number(params['Enemy MaxAgi'] || 999999),
    Number(params['Enemy MaxLuk'] || 999999),
  ];

  /**
   * mostat
   * Holds array of default max stat values for other battler types
   */ 
  var mostat = [
    Number(params['Other MaxHP'] || 999),
    Number(params['Other MaxMP'] || 999),
    Number(params['Other MaxAtk'] || 99),
    Number(params['Other MaxDef'] || 99),
    Number(params['Other MaxMat'] || 99),
    Number(params['Other MaxMdf'] || 99),
    Number(params['Other MaxAgi'] || 99),
    Number(params['Other MaxLuk'] || 99),
  ];

  /**
   * [ private ] scanMetaParamMax(object)
   * @param object the battler instance to check for meta max param
   * @param name the name of the metadata parameter to scan for
   * @param id the id of the parameter to set
   */ 
  function scanMetaParamMax(object, name, id){
    var meta = $.extractMetaData(object, name);
    if (meta){object._meta_paramMax[id]=Number(meta)};
  };

  /**
   * [ private ] setMetaParamMax(object)
   * @param object the battler instance to check for meta max param
   * @param metaob the meta object to search parameters
   */ 
  function setMetaParamMax(object, metadata) {
    object._meta_paramMax = $.mapMeta2n(object,'max params');
    var names = ['mhp','mmp','atk','def','mat','mdf','agi','luk']
    for (var i = 7; i >= 0; i--) {
      scanMetaParamMax(object, 'max ' + names[i], i);
    };
  };

  /**
   * [ private ] getMetaParamMax(object, paramID)
   * @param object the battler instance to check for meta max param
   * @param paramID the id of the parameter to check for and return
   * @return the value of parameter id if found or null otherwise
   */ 
  function getMetaParamMax(object, paramID) {
    if (object._meta_paramMax === undefined){
      setMetaParamMax(object,object.meta);
    }
    if (object._meta_paramMax[paramID]){
      return object._meta_paramMax[paramID];
    }
    return null;
  }

  /**
   * Game_BattlerBase.prototype.paramMax(paramID)
   * @param paramID the id of the parameter to check
   * @return the max stat for the parameter specified
   */ 
  Game_BattlerBase.prototype.paramMax = function(paramID) {
    return mostat[paramID];
  };
  
  /**
   * Game_Actor.prototype.paramMax(paramID)
   * @param paramID the id of the parameter to check
   * @return the max stat for the parameter specified
   */ 
  Game_Actor.prototype.paramMax = function(paramID) {
    return getMetaParamMax(this, paramID) || mastat[paramID];
  };

  /**
   * Game_Enemy.prototype.paramMax(paramID)
   * @param paramID the id of the parameter to check
   * @return the max stat for the parameter specified
   */ 
  Game_Enemy.prototype.paramMax = function(paramID) {
    return getMetaParamMax(this, paramID) || mestat[paramID];
  };
  /**
   * End declarations
   */
})(DMV)
/**
 * End Plugin
 * www.dekyde.com
 */
/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-stat_crit_dmg_rate.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Allows more control over critical damage calculation.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
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
* <cdr funk: this.level/100+1.0>
* This notetag changes the default formula used to determine an actor or
* enemies base critical damage rate (before quires and states etc).
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
*  ... N/A
* 
* 
* ============================================================================
* ■ Plugin Commands:
* ============================================================================
* 
*  ... N/A
* 
* 
* ============================================================================
* ■ Terms && Conditions:
* ============================================================================
* 
* This plugin is authorized for use in NON-COMMERCIAL projects ONLY!!
* Copyright (C) DekitaRPG  -  All Rights Reversed!
* 
* You are not allowed to redistribute this plugin directly. 
* Instead, provide a link to www.dekitarpg.com.
* 
* 
* ============================================================================
* ■ Stay Up To Date:
* ============================================================================
* 
* I advise that you check regularly to see if any of the plugins you use
* have been updated. The plugin updates will include things like bugfixes 
* and new features, so it is highly recommended. 
* 
* Get the latest plugin versions at www.dekitarpg.com/dmv
* 
* 
* ============================================================================
* ■ Change Log:
* ============================================================================
* 
* v.2.0.0 - Rewrote using es6 features, 
* v.1.0.0 - Initial Release,
* 
* 
* ============================================================================
* Visit www.dekitarpg.com for more!
* ============================================================================
* 
* @param Default CDR Funk
* @desc Formula that determines default base critical damage rate
* Default: 1.5
* @default 1.5 
* 
* ============================================================================
*/ 
(function dmv_stat_crit_dmg_rate(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "stat_crit_dmg_rate";
    const PLUGIN_VERSION = "2.0.0";

    /**
    * Checks for DMV Core plugin and register if available
    */
    if (typeof DMV === 'undefined') {
        let LOAD_ERROR = "Oh No! A Plugin Hasnt Loaded!!\n\n";
        LOAD_ERROR += "You need to install dmv-core.js to use:\n";
        LOAD_ERROR += `dmv-${PLUGIN_NAME}.js\n\n`;
        LOAD_ERROR += "Ensure you have dmv-core.js loaded before other dmv plugins!\n";
        LOAD_ERROR += "Head to dekitarpg.com/dmv to get the latest plugin versions!!";
        return alert(LOAD_ERROR);
    }
    
    /**
    * params
    * Holds all parameters for this plugin
    * Get the params by registering plugin with kore
    */
    const params = DMV.register(PLUGIN_NAME,PLUGIN_VERSION);

    /**
    * base_cdr_funk
    * Holds default critical damage rate function string
    */ 
    const base_cdr_funk = String(params['Default CDR Funk'] || "1.5");

    /**
    * $this_class: DataManager
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const extractMetadata = DataManager.extractMetadata;

        /**
        * DataManager.extractMetadata 
        * Performs the reading of certain notetags. 
        */ 
        DataManager.extractMetadata = function(data) {
            extractMetadata.apply(this, arguments);
            data._cdr = Number(DMV.extractMetaData(data,'cdr'));
        };

        /**
         * End this_class.prototype Declarations
         */ 
    })(DataManager, undefined);

    /**
    * $this_class: Game_Action.prototype
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Game_Action.prototype.applyCritical(damage)
        * Performs the critical hit damage modifications. 
        */ 
        $this_class.applyCritical = function(damage) {
            return damage * this.subject().cdr;
        };

        /**
         * End this_class.prototype Declarations
         */ 
    })(Game_Action.prototype, undefined);

    /**
    * $this_class: Game_BattlerBase.prototype
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const clearParamPlus = $this_class.clearParamPlus;

        /**
        * Game_BattlerBase.prototype.cdr
        * cdr is yoour critical damage rate.
        * each 0.01 value you deal 1% more damage when crit
        */
        DMV.reader($this_class, 'cdr', function(){
            return this.criticalDamageRate();
        });

        /**
        * Game_BattlerBase.prototype.clearParamPlus()
        * Clears all added parameter data
        */
        $this_class.clearParamPlus = function() {
            clearParamPlus.apply(this, arguments);
            this.clearCriticalRate();
        };

        /**
        * Game_BattlerBase.prototype.clearCriticalRate()
        * Clears all critical damage rate variables 
        * and reinitializes them to ensure correctness
        */
        $this_class.clearCriticalRate = function(){
            let aString = this._critDmgRateFunkString();
            this._cdr_funk = Function(aString).bind(this);
            this._critical_dmg_rate = 0;
        };

        /**
        * Game_BattlerBase.prototype._critDmgRateFunkString()
        * @return a string used to determine base CDR value. 
        */
        $this_class._critDmgRateFunkString = function(){
            let meta = DMV.extractMetaData(this, 'cdr funk');
            if (meta) return 'return ' + meta;
            return "return " + base_cdr_funk;
        };

        /**
        * Game_BattlerBase.prototype.addCriticalRate(value)
        * @param value the value to add onto CDR stat.
        */
        $this_class.addCriticalRate = function(value){
            this._critical_dmg_rate += value;
        };

        /**
        * Game_BattlerBase.prototype.criticalDamageRate()
        * @return the total critical damage rate value.
        */
        $this_class.criticalDamageRate = function(){
            let value = this._cdr_funk();
            value += this.extra_CritDmgRate();
            return value.toFixed(2);
        };

        /**
        * Game_BattlerBase.prototype.extra_CritDmgRate()
        * @return the extra critical damage rate values.
        */
        $this_class.extra_CritDmgRate = function(){
            let value = this._critical_dmg_rate;
            if (this.actor){
                value += this.actor()._cdr;
                value += this.currentClass()._cdr;
                value += DMV.reduceMeta(this.equips(),'_cdr');
            } else if (this.enemy){
                value += this.enemy()._cdr;
            }
            value += DMV.reduceMeta(this.states(),'_cdr');
            return value;
        };
        /**
        * End battler declarations
        */
    })(Game_BattlerBase.prototype, undefined);

    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-stat_willpower.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Creates new stats: will, and willrt. (willpower & rate)
* See Help for more information--
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
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
* <will funk: this.level/100+1.0>
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
* @param Default Will Funk
* @desc The default formula that determines base will param multiplier
* Default: (this.willrt/2)+(this.will/1000)
* @default (this.willrt/2)+(this.will/1000)
* 
* ============================================================================
*/ 
(function dmv_stat_willpower(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "stat_willpower";
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
    * default_will_multfunk
    * Holds the default will multiplier function string
    */
    const default_will_multfunk = String(params['Default Will Funk']);

    /**
    * $this_class: DataManager
    * parent: undefined
    * DataManager class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const extractMetadata = $this_class.extractMetadata;

        /**
        * DataManager.extractMetadata 
        * Extracts notetags from all database items
        */ 
        $this_class.extractMetadata = function(data) {
            extractMetadata.apply(this, arguments);
            data._will = Number(DMV.extractMetaData(data, 'will'));
        };

        /**
        * End this_class.prototype Declarations
        */ 
    })(DataManager, undefined);


    /**
    * $this_class: Game_BattlerBase.prototype
    * parent: undefined
    * DataManager class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const clearParamPlus = $this_class.clearParamPlus;
        const paramRate = $this_class.paramRate;

        /**
        * safe_param_ids
        * Holds array of safe parameters to ignore for willpower mods
        */
        const safe_param_ids = [0, 1];

        /**
        * Game_BattlerBase.prototype.will
        * will is the battlers will stat.
        * each 10 points towards will makes 
        * parameter loss go down by 1% 
        */
        DMV.reader($this_class, 'will', function(){
            return this._willpowerStat();
        });

        /**
        * Game_BattlerBase.prototype.willrt
        * willrt is the battlers will power rate.
        * this is determined automatically via hp mp and tp rates
        */
        DMV.reader($this_class, 'willrt', function(){
            return (this.hpRate()+this.mpRate()+this.tpRate())/3;
        });

        /**
        * Game_BattlerBase.prototype.clearParamPlus()
        * Clears all added parameter data
        */
        $this_class.clearParamPlus = function() {
            clearParamPlus.apply(this, arguments);
            this.clearWillpowerValue();
        };

        /**
        * Game_BattlerBase.prototype.clearWillpowerValue()
        * Clears all willpower related variables and also
        * reinitializes them to ensure their correctness
        */
        $this_class.clearWillpowerValue = function(){
            let argz = [this,'willrt funk',default_will_multfunk];
            this._willrt_funk = DMV.extractFunkStringF.apply(DMV, argz);
            this._will = 0;
        };

        /**
        * Game_BattlerBase.prototype._willpowerStat
        * @return the willpower multiplier stat value
        */
        $this_class._willpowerStat = function(){
            let value = this._will;
            if (this.actor){
                value += this.actor()._will;
                value += this.currentClass()._will;
                value += DMV.reduceMeta(this.equips(),'_will');
            }else if (this.enemy){
                value += this.enemy()._will;
            }
            value += DMV.reduceMeta(this.states(),'_will');
            return value;
        };

        /**
        * Game_BattlerBase.prototype.paramRate(paramId)
        * @param paramId the parameter id to get the paramRate for
        * @return parameter rate after modifications from willpower 
        */
        $this_class.paramRate = function(paramId) {
            let value = paramRate.apply(this, arguments);
            if (!safe_param_ids.contains(paramId)){
                return value - (1.0 - this._willrt_funk());
            }
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
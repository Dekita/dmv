/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-stat_human_instincts.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Creates statistics with the characteristics of human instincts.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This system creates two new stats, survival instinct, and killer instinct.
* Naturally, these statistics are heavily based on the well known animalistic 
* attributes of humans (and almost all other creatures...).
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
* 
* ============================================================================
* ■ Notetags:
* ============================================================================
* 
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
* @param Enable For All
* @desc Enables the svi and kli stats for all battlers 
* Default: false
* @default false
* 
* ============================================================================
*/ 
(function dmv_stat_human_instincts(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "stat_human_instincts";
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
    * default_use_stats
    * Determines if all battlers use the stats by default.
    */
    const default_use_stats = params['Enable For All'].contains('true');

    /**
    * $this_class: DataManager
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const extractMetadata = $this_class.extractMetadata;

        /**
        * DataManager.extractMetadata 
        * Extracts all notetag data where required
        */ 
        $this_class.extractMetadata = function(data) {
            extractMetadata.apply(this, arguments);
            data._human_instincts = [
                Number(DMV.extractMetaData(data, 'svi')),
                Number(DMV.extractMetaData(data, 'kli')),
            ];
            data._can_human_instincts = [
                Boolean(DMV.extractMetaData(data, 'can_svi')),
                Boolean(DMV.extractMetaData(data, 'can_kli')),
            ];
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
        * Aliased Functions:..
        */ 
        const evalDamageF = $this_class.evalDamageFormula;

        /**
        * [ private ] calcMod(battler)
        * @param battler the battler who is acting
        * @return the damage multiplier value for killer instinct
        */
        function calcMod(battler){
            if (battler.instinctRate() < 1.0 && battler.canHumanInstinctStat(1)){
                return 1.0 + (1.0 + (battler.kli / 100) - battler.instinctRate());
            }
            return 1.0;
        }

        /**
        * Game_Action.prototype.evalDamageFormula(target)
        * Performs the default damage calculation logic and then applies 
        * the attackers killer instinct damage modificaitons - if any 
        */
        $this_class.evalDamageFormula = function(target) {
            let old = evalDamageF.apply(this, arguments);
            return old * calcMod(this.subject());
        };
        /**
        * End action declarations
        */
    })(Game_Action.prototype, undefined);    


    /**
    * $this_class: Game_Action.prototype
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const clearParamPlus = $this_class.clearParamPlus;
        const paramRate = $this_class.paramRate;

        /**
        * safe_param_ids
        * Holds array of safe parameters to ignore for instinct mods
        */
        const safe_param_ids = [0, 1];

        /**
        * Game_BattlerBase.prototype.svi
        * Returns the svi (survival instinct) stat value for battler
        */
        DMV.reader($this_class, 'svi', function(){
            return this.humanInstinctStat(0);
        });

        /**
        * Game_BattlerBase.prototype.kli
        * Returns the kli (killer instinct) stat value for battler
        */
        DMV.reader($this_class, 'kli', function(){
            return this.humanInstinctStat(1);
        });

        /**
        * Game_BattlerBase.prototype.clearParamPlus()
        * Clears all added parameter data
        */
        $this_class.clearParamPlus = function() {
            clearParamPlus.apply(this, arguments);
            this.clearHumanInstinctPlus();
        };

        /**
        * Game_BattlerBase.prototype.clearParamPlus()
        * Clears all added human instinct parameters
        */
        $this_class.clearHumanInstinctPlus = function(){
            this._human_instincts = [0, 0];
        };

        /**
        * Game_BattlerBase.prototype.humanInstinctStat(id)
        * @param id the id of the instinct stat to return
        * @return the value of the stat determined by id
        */
        $this_class.humanInstinctStat = function(id){
            let value = this._human_instincts[id];
            if (this.actor){
                value += this.actor()._human_instincts[id];
                value += this.currentClass()._human_instincts[id];
                value += DMV.reduceMetaID(this.equips(),'_human_instincts',id);
            } else if (this.enemy){
                value += this.enemy()._human_instincts[id];
            }
            value += DMV.reduceMetaID(this.states(),'_human_instincts',id);
            return Math.floor(value.clamp(0,100));
        };

        /**
        * [ private ] instinctIteration(array, id)
        * @param array the item array to check for instinct stat
        * @return boolean for any item allows stat id to be used
        */
        function instinctIteration(array,id) {
            return array.some(function(item) {
                let bool = item && item._can_human_instincts;
                return bool && item._can_human_instincts[id];
            });
        }

        /**
        * Game_BattlerBase.prototype.canHumanInstinctStat(id)
        * @param id the id of the instinct stat to return
        * @return boolean for weather this stat is used.
        */
        $this_class.canHumanInstinctStat = function(id){
            if (this.actor){
                return default_use_stats || 
                this.actor()._can_human_instincts[id] ||
                this.currentClass()._can_human_instincts[id] || 
                DMV.reduceMetaID(this.equips(),'_can_human_instincts',id) ||
                instinctIteration(this.equips(),id) || 
                instinctIteration(this.states(),id);
            } else if (this.enemy){
                return default_use_stats || 
                this.enemy()._human_instincts[id] || 
                instinctIteration(this.states(),id);
            }
            return false;
        };

        /**
        * Game_BattlerBase.prototype.instinctRate()
        * @return the human instinct rate used within calculations
        */
        $this_class.instinctRate = function(){
            return ((this.hpRate() + this.mpRate()) / 2);
        };

        /**
        * Game_BattlerBase.prototype.survivalInstinctStat()
        * @param id the id of the instinct stat to return
        * @return the value of the stat determined by id
        */
        $this_class.survivalInstinctMod = function(){
            return 1.0 + (this.svi / 100) - this.instinctRate();
        };

        /**
        * Game_BattlerBase.prototype.paramRate(paramId)
        * @param paramId the parameter id to get the paramRate for
        * @return parameter rate after mods from survival instinct
        */
        $this_class.paramRate = function(paramId) {
            let value = paramRate.apply(this, arguments);
            let is_safe = safe_param_ids.contains(paramId);
            if (!is_safe && this.instinctRate() < 1.0 && this.canHumanInstinctStat(0)){
                return value + this.survivalInstinctMod();
            }
            return value;
        }; 
        /**
        * End Game_BattlerBase.prototype declarations
        */
    })(Game_BattlerBase.prototype);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
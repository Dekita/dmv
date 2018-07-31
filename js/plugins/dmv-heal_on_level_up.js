/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-heal_on_level_up.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Allows for HP and MP to auto-heal upon level up.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
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
* ============================================================================
*/ 
(function dmv_heal_on_level_up(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "heal_on_level_up";
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
     * gainType
     * Holds the setting for the health gain type. 
     */
    const gainType = params["Gain Type"];

    /**
     * canHP
     * Holds boolean setting for if can gain hp on level. 
     */
    const canHP = params["Can Gain HP"].contains('true');

    /**
     * canMP
     * Holds boolean setting for if can gain mp on level. 
     */
    const canMP = params["Can Gain MP"].contains('true');

    /**
     * percHP
     * Percentage value for hp gain when gainType is 'perc'
     */
    const percHP = Number(params["HP Perc"] || 10).clamp(0,100);

    /**
     * percMP
     * Percentage value for mp gain when gainType is 'perc'
     */
    const percMP = Number(params["MP Perc"] || 10).clamp(0,100);

    /**
    * $this_class: Game_Actor.prototype
    * parent: Game_Battler.prototype
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const old_levelUp = $this_class.levelUp;

        /**
        * Game_Actor.prototype.luprec_perc_h
        * Game_Actor.prototype.luprec_perc_m
        * These two functions determine the percentage 
        * of HP and MP to heal on level up. 
        * They may be overwritten in future addons. 
        */
        DMV.reader($this_class,'luprec_perc_h',function(){return percHP;});
        DMV.reader($this_class,'luprec_perc_m',function(){return percMP;});

        /**
        * Game_Actor.prototype.levelUp()
        * Increases actors level when exp requirement is met.
        */
        $this_class.levelUp = function() {
            this._levelUpLastMHP = this.mhp;
            this._levelUpLastMMP = this.mmp;
            old_levelUp.apply(this, arguments);
            this.performLevelUpRecovery();
        };

        /**
        * Game_Actor.prototype.performLevelUpRecovery()
        * Performs the level up recovery effect.
        */
        $this_class.performLevelUpRecovery = function(){
            switch(gainType){
                case 'all':  this.recoverAll(); break;
                case 'full': this.levelUpRecoveryFull(); break;
                case 'diff': this.levelUpRecoveryDiff(); break;
                case 'perc': this.levelUpRecoveryPerc(); break;
                default: break;
            }
            this.refresh();    
        };

        /**
        * Game_Actor.prototype.levelUpRecoveryFull()
        * Recovers full hp and or mp upon level up.
        */
        $this_class.levelUpRecoveryFull = function(){
            if (canHP) this._hp = this.mhp;
            if (canMP) this._mp = this.mmp;
        };

        /**
        * Game_Actor.prototype.levelUpRecoveryDiff()
        * Recovers hp and or mp upon level up. The value gained
        * is equal to the difference from the old mhp and the new.
        */
        $this_class.levelUpRecoveryDiff = function(){
            if (canHP) this._hp += (this.mhp-this._levelUpLastMHP);
            if (canMP) this._mp += (this.mmp-this._levelUpLastMMP);
        };

        /**
        * Game_Actor.prototype.levelUpRecoveryPerc()
        * Recovers hp and or mp upon level up. The value gained
        * is equal to the percentage value from the respective 
        * recoveryPercentageH/M function (default is 10).
        */
        $this_class.levelUpRecoveryPerc = function(){
            if (canHP) this._hp += (this.mhp / this.luprec_perc_h);
            if (canMP) this._mp += (this.mmp / this.luprec_perc_m);
        };

        /**
        * End Game_Actor.prototype Declarations
        */
    })(Game_Actor.prototype, Game_Battler.prototype);
    /**
    * End declarations
    */
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
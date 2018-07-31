/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-rare_candies.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Allows actors to gain a level up via skills and items. 
* Very similar to the classic 'rare candy' item in pokemon games. 
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin allows for actors to gain a level up via skills and items. 
* 
* You simply have to use the registered notetag on a skill or item within the 
* database and you will be able to use it like a rare candy (pokemon item).
* 
* You do not need to have the skill/item do anything else, like call empty 
* common events or anything crazy like that. Just simply plug, notetag, play.
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
* @param Rare Candy Tag
* @desc Sets the notetag that should be used for rare candies
* Default: rare_candy
* @default rare_candy
* 
* ============================================================================
*/ 
(function dmv_rare_candies(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "rare_candies";
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
    * candyTag
    * Determines the case sensitive notetag for rare candy items.
    */
    const candyTag = params['Rare Candy Tag'];


    /**
    * $this_class: Game_Actor.prototype
    * parent: Game_Battler.prototype
    * Class to handle game actors:..
    */
    (function($this_class, parent){
        /**
        * Game_Actor.prototype.levelUpFromCandy()
        * Performs a safe level up for the player
        */
        $this_class.levelUpFromCandy = function(){
            this.changeLevel(this.level+1,false);
        };
        
        /**
        * End Game_Actor declarations
        */
    })(Game_Actor.prototype, Game_Battler.prototype);


    /**
    * $this_class: Game_Action.prototype
    * parent: undefined
    * Class to handle game actions:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const hasItemAnyValidEffects = $this_class.hasItemAnyValidEffects;
        const applyItemUserEffect = $this_class.applyItemUserEffect;

        /**
        * Game_Action.prototype.canEatRareCandy(target)
        * @param target used to determine if can eat rare candy
        * @return Boolean value based on weather target can eat
        */
        $this_class.canEatRareCandy = function(target) {
            return this.item().meta[candyTag] && target.actor && !target.isMaxLevel();
        };

        /**
        * Game_Action.prototype.hasItemAnyValidEffects(target)
        * Determines if skill/item has any valid effects
        * Aliased method to accomodate rare candy effect.
        */
        $this_class.hasItemAnyValidEffects = function(target) {
            if (this.canEatRareCandy(target)) return true;
            return hasItemAnyValidEffects.apply(this, arguments);
        };

        /**
        * Game_Action.prototype.applyItemUserEffect(target)
        * Performs the effect of eating rare candy, if possible.
        */
        $this_class.applyItemUserEffect = function(target) {
            if (this.canEatRareCandy(target)){ 
                target.levelUpFromCandy();
            }
            applyItemUserEffect.apply(this, arguments);
        };
        /**
        * End Game_Action declarations
        */
    })(Game_Action.prototype, undefined);

    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-skip_title.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
 * @plugindesc This plugin simply allows for the title scene to be skipped. 
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
 * This plugin skips the title screen and loads a new game when it is active. 
 * It is purely to aid in development and should not be included in 
 * your completed projects.
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
*/ 
(function dmv_skip_title(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "skip_title";
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
    * $this_class: undefined.prototype
    * parent: undefined.prototype
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const start = $this_class.start;

        /**
        * Scene_Boot.prototype.start()
        * Called when the boot scene starts processing
        */ 
        $this_class.start = function() {
            let boola = DataManager.isBattleTest();
            let boolb = DataManager.isEventTest();
            if (boola || boolb){
                start.apply(this, arguements);
            } else {
                SoundManager.preloadImportantSounds();
                this.checkPlayerLocation();
                DataManager.setupNewGame();
                this.updateDocumentTitle();
                SceneManager.goto(Scene_Map);        
            }
        };

        /**
        * End Scene_Boot.prototype Declarations
        */ 
    })(Scene_Boot.prototype, Scene_Base.prototype);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
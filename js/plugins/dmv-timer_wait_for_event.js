/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-timer_wait_for_event.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This plugin allows the game timer to wait for events.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This simple plugin stops the game timer from processing when an event is
* running. This is to allow for messages etc to be shown without the timer
* running out.
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
* $gameTimer.toggleEventWait()
* ^ This script call toggles the wait flag that stops the timer from
* processing. You can use this to allow for the timer to continue running 
* when events are processing. 
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
* @param Default Wait
* @desc The default boolean value to determine if timer should wait for events
* Default: true
* @default true
* 
* ============================================================================
*/ 
(function dmv_timer_wait_for_event(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "timer_wait_for_event";
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
    * do_event_wait
    * Stores boolean for default param event wait
    */
    let do_event_wait = Boolean(params['Default Wait']);

    /**
    * $this_class: Game_Timer.prototype
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const isWorking = $this_class.isWorking;

        /**
        * Game_Timer.prototype.isWorking()
        * @return true if the game timer is processing
        * @note also checks to ensure event is not running;
        */
        $this_class.isWorking = function() {
            var o = isWorking.apply(this, arguments);
            return do_event_wait ? o && !$gameMap.isEventRunning() : o;
        };

        /**
        * Game_Timer.prototype.toggleEventWait()
        * @return the boolean value of eventWait 
        */
        $this_class.toggleEventWait = function() {
            do_event_wait = !do_event_wait;
            return do_event_wait;
        };

        /**
        * End this_class.prototype Declarations
        */ 
    })(Game_Timer.prototype, undefined);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
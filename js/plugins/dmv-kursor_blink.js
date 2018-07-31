/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-kursor_blink.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This simple plugin allows the default window cursor 
* 'blink' speed to be modified, or even completely stopped!
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
 * As this plugin is fairly simple and only allows for control over the cursor
 * blink speed, there are very little options available. 
 * 
 * The 'Kursor Blink Speed' setting will become the default speed value. 
 * 'Kursor Blink Min' and 'Kursor Blink Max' are only used when using the 
 * script calls provided by this plugin;
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
 * Window.setCursorBlink(newSpeed)
 * newSpeed = a number value used to determine the new cursor blink speed.
 * Returns the newSpeed value after being restricted by min and max value.
 * 
 * Window.getCursorBlink()
 * Returns the current cursor blink speed.
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
* @param Kursor Blink Speed
* @desc Adjusts the default blink speed of the window cursor.
* @default 0.25
*
* @param Kursor Blink Min
* @desc Adjusts the minimum blink speed of the window cursor.
* @default 0.0
*
* @param Kursor Blink Max
* @desc Adjusts the maximum blink speed of the window cursor.
* @default 2.0
*
* @param Kursor Options
* @desc Allows the kursor speed to be changed within the options scene.
* @default true
* 
* ============================================================================
*/ 
(function dmv_kursor_blink(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "kursor_blink";
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
    * dspeed
    * Holds the cursors default animation speed value
    */
    const dspeed = Number(params['Kursor Blink Speed'] || 0.25);

    /**
    * nspeed
    * Holds the cursors minimum animation speed value
    */
    const nspeed = Number(params['Kursor Blink Min'] || 0.0);

    /**
    * xspeed
    * Holds the cursors maximum animation speed value
    */
    const xspeed = Number(params['Kursor Blink Max'] || 2.0);

    /**
    * cursorBlinkSpeed
    * Holds the cursors current animation speed value
    */
    let cursorBlinkSpeed = dspeed.clamp(nspeed,xspeed);

    /**
    * Window.setCursorBlink(newSpeed)
    * @param newSpeed the number value to set the blink speed to
    * @return cursor blink animation speed
    */
    Window.setCursorBlink = function(newSpeed){
        cursorBlinkSpeed = newSpeed.clamp(nspeed,xspeed);
        return cursorBlinkSpeed;
    };

    /**
    * Window.getCursorBlink()
    * @return cursor blink animation speed
    */
    Window.getCursorBlink = function(){
        return cursorBlinkSpeed;
    };

    /**
    * $this_class: Window.prototype
    * parent: undefined.prototype
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Window.prototype.update()
        * Overwrites the default Window update prototype to
        * accomodate the cursor blink animation speed.
        */
        $this_class.update = function() {
            this._DMV_UpdateBlink();
            this._DMV_UpdateChildren();
        };

        /**
        * Window.prototype._DMV_UpdateBlink()
        * Updates the animation count for the window cursor
        */
        $this_class._DMV_UpdateBlink = function() {
            if (this.active) this._animationCount += cursorBlinkSpeed;
        };

        /**
        * Window.prototype._DMV_UpdateChildren()
        * Updates all children of this window
        */
        $this_class._DMV_UpdateChildren = function() {
            this.children.forEach(function(child) {
                if (child.update) child.update();
            });
        };       

        /**
        * End this_class.prototype Declarations
        */ 
    })(Window.prototype, PIXI.Container.prototype);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
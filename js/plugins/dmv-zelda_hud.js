/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-zelda_hud.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This plugin simply creates a small HP HUD inspired by Zelda.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin creates a simple health hud inspired by the well known Zelda
* RPG created by Nintendo.
* 
* The hud concept is simple: You have a number of hearts displayed on 
* scren that represent how much of your hp you have remaining. 
*
* People who have played Zelda, may remember a time when they reached a 
* point within the game and 'unlocked' a new heart. 
* In order to replicate that, I have added some simple script calls that
* can be used to either get, or set, the numbers of hearts shown.
* 
* Additionally, the number of hearts shown is based on the current/max hp
* values of the main party leader. If they have full HP, the maximum number
* of hearts will be shown, and it will reduce as they lose hp. 
* 
* NOTE: 
* You require an image for this system to work. I have given a edited a 
* heart image for use with this system (icon made by Avery).
* This image should be placed within the img/system folder of your project.
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
* $gamePlayer.setHeartsShown( number )
* ^ This script call sets the maximum number of hearts shown to the 
* number value that you pass in as the main argument.
* 
* $gamePlayer.setHeartsShown()
* ^ This script call gets the current maximum number of hearts shown.
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
* @param Heart Image
* @desc Sets the name of the image used for the health icons.
* Default: ZeldaHeart by Avery
* @default ZeldaHeart by Avery
*
* @param Heart Scale
* @desc Sets the minimum scale for heart zoom effect (0.0 - 1.0).
* Default: 0.35
* @default 0.35
* 
* @param HUD Position
* @desc Sets the x and y position values for the hud.
* Default: 0, 0
* @default 0, 0
* 
* @param Init Shown
* @desc Sets the number of icons that are initially shown for full health.
* Default: 3
* @default 3
* 
* @param Min Shown
* @desc Sets the min icons that can be shown for full health.
* Default: 3
* @default 3
* 
* @param Max Shown
* @desc Sets the max icons that can be shown for full health.
* Default: 9
* @default 9 
* 
* ============================================================================
*/ 
(function dmv_zelda_hud(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "zelda_hud";
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
    * HEART_IMAGE
    * Holds a string containing the main hud icon image name.
    */
    const HEART_IMAGE = params['Heart Image'];

    /**
    * HEART_START
    * Holds value for initial icons shown for full hp.
    */
    const HEART_START = Number(params['Init Shown']);

    /**
    * HEART_LIMIT
    * Holds values for min and max icons that can be shown for max hp.
    */
    const HEART_LIMIT = {
        min: Number(params['Min Shown']),
        max: Number(params['Max Shown']),
    };

    /**
    * HEART_SCALE
    * Holds minimum sclaing value for hp loss effect.
    */
    const HEART_SCALE = Number(params['Heart Scale']).clamp(0.0,1.0); 

    /**
    * HUD_POSITION
    * Holds an array containing [x,y] values for hud position.
    */
    const HUD_POSITION = DMV.mapParams2n(params['HUD Position']);

    /**
    * $this_class: Game_Player.prototype
    * parent: Game_Character.prototype
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const initMembers = $this_class.initMembers;

        /**
        * Game_Player.prototype.initMembers
        * Initializes important variables for the zelda hud.
        */
        $this_class.initMembers = function() {
            initMembers.apply(this, arguments);
            this.setHeartsShown(HEART_START);
        };

        /**
        * Game_Player.prototype.setHeartsShown(newValue)
        * @param newValue {number} the new value that determines
        *        how many icons can be shown for max health.
        * @return N/A
        */
        $this_class.setHeartsShown = function(newHeartCount) {
            if (newHeartCount !== this._HeartsShown){
                let min = HEART_LIMIT.min, max = HEART_LIMIT.max;
                this._HeartsShown = Math.round(newHeartCount.clamp(min,max));
                if (DMV.current_spriteset){
                    DMV.current_spriteset._ZeldaHUD._refreshHUD();
                }
            }
        };

        /**
        * Game_Player.prototype.getHeartsShown()
        * @return {number} for how many icons can be shown.
        */
        $this_class.getHeartsShown = function() {
            return this._HeartsShown;
        };

        /**
        * End Game_Player.prototype Declarations.
        */
    })(Game_Player.prototype, Game_Character.prototype);

    /**
    * $this_class: Spriteset_Map.prototype
    * parent: undefined
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const createLowerLayer = $this_class.createLowerLayer;

        /**
        * createLowerLayer
        * An alias for Spriteset_Map.prototype.createLowerLayer
        * to allow for the zelda hud to be created.
        */
        $this_class.createLowerLayer = function() {
            createLowerLayer.apply(this, arguments);
            this.createZeldaHUD();
        };

        /**
        * createZeldaHUD
        * Creates the zelda hud, stores it in a variable, and 
        * finally adds the sprite as a child to the spriteset.
        */
        $this_class.createZeldaHUD = function(){
            this._ZeldaHUD = new DMV.Sprite.ZeldaHUD(HEART_IMAGE);
            this.addChild(this._ZeldaHUD);
        };

        /**
        * End Spriteset_Map.prototype Declarations.
        */
    })(Spriteset_Map.prototype, undefined);


    /**
    * DMV.Sprite.ZeldaHUD 
    */
    DMV.Sprite.ZeldaHUD = DMV.createClass(Sprite);

    /**
    * $this_class: DMV.Sprite.ZeldaHUD.prototype
    * parent: Sprite.prototype
    */
    (function($this_class, parent){
        /**
        * DMV.Sprite.ZeldaHUD.prototype.initialize(imageName)
        * @param imageName {string} containing icon image name.
        */
        $this_class.initialize = function(imageName){
            parent.initialize.call(this);
            this.x = HUD_POSITION[0];
            this.y = HUD_POSITION[1];
            this._importantDataRefresh();
            this._zeldaBitmap = ImageManager.loadSystem(imageName);
            this._zeldaBitmap.addLoadListener(this._zeldaBitmapLoaded.bind(this));
        };

        /**
        * DMV.Sprite.ZeldaHUD.prototype._importantDataRefresh()
        * Refreshes the important data that the hud requires.
        * This is automatically called when the hud is redrawn
        * which happens whenever the party leaders hp changes.
        */
        $this_class._importantDataRefresh = function(){
            this._targetBattler = $gameParty.leader();
            this._oldHPRate = this._targetBattler.hpRate();
        };

        /**  
        * DMV.Sprite.ZeldaHUD.prototype._zeldaBitmapLoaded()
        * This is called automatically when the bitmap image
        * has finished loading. Once we have the bitmap data, 
        * we create the main sprite bitmap with the required
        * width and height relative to the loaded bitmap. 
        */
        $this_class._zeldaBitmapLoaded = function(){
            this._NBW = this._zeldaBitmap.width;
            this._NBH = this._zeldaBitmap.height;
            this.bitmap = new Bitmap(this._NBW * HEART_LIMIT.max,this._NBH);
            this.bitmap.addLoadListener(this._refreshHUD.bind(this));
        };

        /**  
        * DMV.Sprite.ZeldaHUD.prototype.update()
        * Ensures all hud components are correctly updated.
        */
        $this_class.update = function() {
            parent.update.call(this);
            if (this._hudNeedRefresh()) {
                this._refreshHUD();
            }
        };

        /**  
        * DMV.Sprite.ZeldaHUD.prototype._hudNeedRefresh()
        * @return {boolean} based on whether the hud needs refreshed.
        */
        $this_class._hudNeedRefresh = function(){
            let boolA = this._oldHPRate !== this._targetBattler.hpRate();
            return boolA || this._targetBattler !== $gameParty.leader();
        };

        /**  
        * DMV.Sprite.ZeldaHUD.prototype._refreshHUD()
        * Performs a refresh of all hud components. 
        * Clears the main bitmap, and then redraws
        * all icon sprites onto the clean bitmap.
        */
        $this_class._refreshHUD = function(){
            this._importantDataRefresh();
            this.bitmap.clear();
            this._drawAllHearts();
        };

        /**  
        * DMV.Sprite.ZeldaHUD.prototype._drawAllHearts()
        * Calculates the players hp, and how many icons should be drawn
        * then blt's the health icon onto the main sprite image. 
        */
        $this_class._drawAllHearts = function(){
            let heartCount = $gamePlayer.getHeartsShown();
            let heartShown = heartCount * this._oldHPRate;
            let heartCeil  = heartShown.ceil();
            let hpPerHeart = this._targetBattler.mhp / heartCount;
            let hpAtStart  = this._targetBattler.hp;
            let rate = 0.0, dx = 0, dy = 0, dw = 0;
            for (var i = 0; i < heartCeil; i++){
                dx = this._NBW * i; dw = this._NBW;
                if (hpAtStart <= hpPerHeart){
                    rate = (hpAtStart / hpPerHeart);
                    if (i+1 == heartCeil && rate < HEART_SCALE){
                        rate = HEART_SCALE;
                    }
                    dy = (this._NBH/2).round() * (1.0-rate);
                    dw = dw * rate;
                }
                this._drawHeart(dx,dy,dw,i);
                hpAtStart -= hpPerHeart;
            }
        };

        /**  
        * DMV.Sprite.ZeldaHUD.prototype._drawHeart(dx,dy,dw,i)
        * blts the zelda health sprite onto the main bitmap.
        * @param dx {number} Draw x position (relative to main sprite)
        * @param dy {number} Draw y position (relative to main sprite)
        * @param dw {number} Draw width and height values. 
        * @param i  {number} Number for the current iteration.
        */
        $this_class._drawHeart = function(dx,dy,dw,i){
            this.bitmap.blt(this._zeldaBitmap,0,0,this._NBW,this._NBH,dx,dy,dw,dw);
        };
        /**
        * End DMV.Sprite.ZeldaHUD.prototype Declarations.
        */
    })(DMV.Sprite.ZeldaHUD.prototype, Sprite.prototype);

    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
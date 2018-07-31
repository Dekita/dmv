/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-stat_param_distribute.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Allows for parameters to be 'distributed' via the status 
* scene and the new distribution window. 
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* The distribution options added by this system can be controlled in a number 
* of ways, for example, the window, all buttons, and all text can be fully 
* customized by the game developer. 
* 
* The distribution button is also a snazzy new 'toggle' button, which shows
* different image frames when toggled and not. This allows for the window to 
* retain a 'pop out' effect, and each state to have descriptive button images. 
* 
* Additionally, all actors can have unique distribution parameter limits, and
* also a unique formula for determining available distribution points. 
* 
* 
* ============================================================================
* ■ Actor Notetags:
* ============================================================================
* 
* <min dist pts: mhp, mmp, atk, def, mat, mdf, agi, luk>
* This notetag allows for each actor to have their own minimum distribution
* stat limit (the min restriction for points they can spend in a stat).
* 
* Example: 
* <min dist pts: 50, 50, 5, 5, 5, 5, 2, 2>
* In the above example, mhp and mmp cannot go lower than 50 stat points, atk,  
* def, mat and mdf cant go lower than 5, and agi & luk has a minimum of 2. 
* 
* <mod dist val: mhp, mmp, atk, def, mat, mdf, agi, luk>
* This notetag sets how much a stat actually increases per distribution point 
* spent on the stat. 
* 
* Example: 
* <mod dist val: 50, 50, 5, 5, 5, 5, 2, 2>
* In the above example, mhp and mmp increase 50 per point spent, atk, def, 
* mat, mdf each gain 5, and agi & luk only gain 2 for each point spent. 
* 
* <dist funk: formula to check>
* This notetag allows for the actor to have a unique formula for gaining 
* distribution points. By default, this would be their level * 8 + 8
* 
* Example: 
* <dist funk: this.level * 8 + 8>
* The above example does exactly the same as the default formula. 
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
* @param --- ACTOR SETTINGS ---
* @default 
* 
* @param Default Min Values
* @desc Sets min value for mhp,mmp,atk,def,mat,mdf,agi & luk respectively
* @default 1, 1, 1, 1, 1, 1, 1, 1
* 
* @param Default Modifiers
* @desc sets default stat value for mhp, mmp, atk, def, etc... 
* @default 9.5, 9.5, 2, 2, 2, 2, 2, 2
* 
* @param Max Distribution Points
* @desc Sets the formula for maximum available distribution points
* @default this.level * 8 + 8;
* 
* @param --- WINDOW SETTINGS ---
* @default 
* 
* @param Regular Window Data
* @desc Sets the x, y, width, height and opacity for the regular window
* @default 768, 264, 47, 162, 128
* 
* @param Toggled Window Data
* @desc Sets the x, y, width, height and opacity for the toggled window
* @default 485, 264, 330, 162, 255
* 
* @param --- TEXT SETTINGS ---
* @default 
* 
* @param Points Text Data
* @desc Sets the x and y value of the available distribution points text
* @default 32, 0
* 
* @param MHP Text Data
* @desc Sets the x, y, and width of the MHP text area
* @default 30, 32, 32
* 
* @param MMP Text Data
* @desc Sets the x, y, and width of the MMP text area
* @default 64, 32, 32
* 
* @param ATK Text Data
* @desc Sets the x, y, and width of the ATK text area
* @default 98, 32, 32
* 
* @param DEF Text Data
* @desc Sets the x, y, and width of the DEF text area
* @default 132, 32, 32
* 
* @param MAT Text Data
* @desc Sets the x, y, and width of the MAT text area
* @default 166, 32, 32
* 
* @param MDF Text Data
* @desc Sets the x, y, and width of the MDF text area
* @default 200, 32, 32
* 
* @param AGI Text Data
* @desc Sets the x, y, and width of the AGI text area
* @default 234, 32, 32
* 
* @param LUK Text Data
* @desc Sets the x, y, and width of the LUK text area
* @default 268, 32, 32
* 
* @param --- STAT UP BUTTONS ---
* @default 
* 
* @param MHP Up Button Data
* @desc Sets the x and y area for the MHP stat up button
* @default 48, 80
* 
* @param MMP Up Button Data
* @desc Sets the x and y area for the MMP stat up button
* @default 82, 80
* 
* @param ATK Up Button Data
* @desc Sets the x and y area for the ATK stat up button
* @default 116, 80
* 
* @param DEF Up Button Data
* @desc Sets the x and y area for the DEF stat up button
* @default 150, 80
* 
* @param MAT Up Button Data
* @desc Sets the x and y area for the MAT stat up button
* @default 184, 80
* 
* @param MDF Up Button Data
* @desc Sets the x and y area for the MDF stat up button
* @default 218, 80
* 
* @param AGI Up Button Data
* @desc Sets the x and y area for the AGI stat up button
* @default 252, 80
* 
* @param LUK Up Button Data
* @desc Sets the x and y area for the LUK stat up button
* @default 286, 80
* 
* @param --- STAT DOWN BUTTONS ---
* @default 
* 
* @param MHP Down Button Data
* @desc Sets the x and y area for the MHP stat down button
* @default 48, 114
* 
* @param MMP Down Button Data
* @desc Sets the x and y area for the MMP stat down button
* @default 82, 114
* 
* @param ATK Down Button Data
* @desc Sets the x and y area for the ATK stat down button
* @default 116, 114
* 
* @param DEF Down Button Data
* @desc Sets the x and y area for the DEF stat down button
* @default 150, 114
* 
* @param MAT Down Button Data
* @desc Sets the x and y area for the MAT stat down button
* @default 184, 114
* 
* @param MDF Down Button Data
* @desc Sets the x and y area for the MDF stat down button
* @default 218, 114
* 
* @param AGI Down Button Data
* @desc Sets the x and y area for the AGI stat down button
* @default 252, 114
* 
* @param LUK Down Button Data
* @desc Sets the x and y area for the LUK stat down button
* @default 286, 114
* 
* ============================================================================
*/ 
(function dmv_stat_param_distribute(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "stat_param_distribute";
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
    * default_min_values
    * Holds array of all default minimum distributed points values
    */
    const default_min_values  = DMV.mapParams2n(params["Default Min Values"]);

    /**
    * default_modifiers
    * Holds array of all default modifiers used to calc current param
    */
    const default_modifiers   = DMV.mapParams2n(params["Default Modifiers"]);

    /**
    * regular_window_data
    * Holds array of the window data for regular state
    */
    const regular_window_data = DMV.mapParams2n(params["Regular Window Data"]);

    /**
    * toggled_window_data
    * Holds array of the window data for toggled state
    */
    const toggled_window_data = DMV.mapParams2n(params["Toggled Window Data"]);

    /**
    * default_max_distval
    * Holds default function string for maximum total dist points
    */
    const default_max_distval = "return "+params["Max Distribution Points"];

    /**
    * stat_data_u
    * Holds an array of button position data arrays for stat up buttons
    */
    const stat_data_u = [
        DMV.mapParams2n(params["MHP Up Button Data"]),
        DMV.mapParams2n(params["MMP Up Button Data"]),
        DMV.mapParams2n(params["ATK Up Button Data"]),
        DMV.mapParams2n(params["DEF Up Button Data"]),
        DMV.mapParams2n(params["MAT Up Button Data"]),
        DMV.mapParams2n(params["MDF Up Button Data"]),
        DMV.mapParams2n(params["AGI Up Button Data"]),
        DMV.mapParams2n(params["LUK Up Button Data"]),
    ];

    /**
    * stat_data_d
    * Holds an array of button position data arrays for stat down buttons
    */
    const stat_data_d = [
        DMV.mapParams2n(params["MHP Down Button Data"]),
        DMV.mapParams2n(params["MMP Down Button Data"]),
        DMV.mapParams2n(params["ATK Down Button Data"]),
        DMV.mapParams2n(params["DEF Down Button Data"]),
        DMV.mapParams2n(params["MAT Down Button Data"]),
        DMV.mapParams2n(params["MDF Down Button Data"]),
        DMV.mapParams2n(params["AGI Down Button Data"]),
        DMV.mapParams2n(params["LUK Down Button Data"]),
    ];

    /**
    * stat_data_t
    * Holds an array of text data arrays for stat informaiton
    */
    const stat_data_t = [
        DMV.mapParams2n(params["MHP Text Data"]),
        DMV.mapParams2n(params["MMP Text Data"]),
        DMV.mapParams2n(params["ATK Text Data"]),
        DMV.mapParams2n(params["DEF Text Data"]),
        DMV.mapParams2n(params["MAT Text Data"]),
        DMV.mapParams2n(params["MDF Text Data"]),
        DMV.mapParams2n(params["AGI Text Data"]),
        DMV.mapParams2n(params["LUK Text Data"]),
    ];

    /**
    * stat_point_text
    * Holds text data array for available distribution points
    */
    const stat_point_text = DMV.mapParams2n(params["Points Text Data"]);

    /**
    * DISTRIBUTE_BUTTON_NAME
    * Holds name of the distribute button image file.
    */
    const DISTRIBUTE_BUTTON_NAME = 'distribute-button';

    /**
    * $this_class: Game_BattlerBase.prototype
    * parent: undefined
    * Base class for all battlers
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const clearParamPlus = $this_class.clearParamPlus;
        const paramPlus = $this_class.paramPlus;

        /**
        * Game_BattlerBase.prototype.dyst_min_values(paramID)
        * @param paramID the parameter id for checking the min value of
        * @return the minimum value allowed for the parameter id 
        */
        $this_class.dyst_min_values = function(paramID){
            if (this.___dyst_min_values === undefined){
                this.___dyst_min_values = DMV.mapMeta2n(this, 'min dist pts');
            }
            if (this.___dyst_min_values[paramID]){
                return this.___dyst_min_values[paramID];
            }
            return default_min_values[paramID];
        };

        /**
        * Game_BattlerBase.prototype.dyst_mod_values(paramID)
        * @param paramID the parameter id for checking the mod value of
        * @return the modifier value allocated for the parameter id 
        */
        $this_class.dyst_mod_values = function(paramID){
            if (this.___dyst_mod_values === undefined){
                this.___dyst_mod_values = DMV.mapMeta2n(this, 'mod dist val');
            }
            if (this.___dyst_mod_values[paramID]){
                return this.___dyst_mod_values[paramID];
            }
            return default_modifiers[paramID];
        };

        /**
        * Game_BattlerBase.prototype.clearParamPlusDyst()
        * Clears the added parameter data and renrews it.
        * Called internally from this.clearParamPlus()
        */
        $this_class.clearParamPlusDyst = function() {
            this.___dyst_min_values = undefined;
            this.___dyst_mod_values = undefined;
            this.__mdipp = undefined;  // Holds max dist value 
            this._dystStatValues = []; // Holds params amount
            this._dystStatParams = []; // Holds params multiplier
            for (var i = 0; i < 8; i++){
                this._dystStatValues.push(this.dyst_min_values(i));
                this._dystStatParams.push(this.dyst_mod_values(i));
            }
        };

        /**
        * Game_BattlerBase.prototype.clearParamPlus()
        * Clears all added parameter data
        */
        $this_class.clearParamPlus = function() {
            clearParamPlus.apply(this, arguments);
            this.clearParamPlusDyst();
        };

        /**
        * Game_BattlerBase.prototype.addDistParamPlus(id, value)
        * @param id the id of the stat point to to increase
        * @param value the value to add onto parameter id
        */
        $this_class.addDistParamPlus = function(id, value) {
            let min = this.dyst_min_values(id);
            let max = this.maxDistParamPoints();
            let cur = this.distParamPoints(id) + value;
            this._dystStatValues[id] = Math.floor(cur.clamp(min, max));
        };

        /**
        * Game_BattlerBase.prototype.distParamPlus(id)
        * @return the value gained from distributed parameters
        */
        $this_class.distParamPlus = function(id) {
            let param_val = this._dystStatParams[id];
            let param_num = this.distParamPoints(id);
            return Math.round(param_num * param_val);
        };

        /**
        * Game_BattlerBase.prototype.distParamPoints(id)
        * @param id the id to check for allocated points count
        * @return the number of distribution points allocated
        */
        $this_class.distParamPoints = function(id) {
            return this._dystStatValues[id];
        };

        /**
        * Game_BattlerBase.prototype.availDistParamPoints()
        * @return the number of available distribuion points
        */
        $this_class.availDistParamPoints = function() {
            let value = this.maxDistParamPoints();
            for (var i = 0; i < 8; i++){
                value -= this._dystStatValues[i];
            }
            return Math.floor(value);
        };

        /**
        * Game_BattlerBase.prototype.maxDistParamPoints()
        * @return the max available distribution points
        * @note this uses the formula defined within plugin options
        */
        $this_class.maxDistParamPoints = function() {
            if (this.__mdipp === undefined){
                this.__mdipp = Function(this.maxDistValFunkString()).bind(this);
            }
            return this.__mdipp();
        };

        $this_class.maxDistValFunkString = function(){
            let meta = DMV.extractMetaData(this, 'dist funk');
            if (meta) return 'return ' + meta;
            return default_max_distval;
        };

        /**
        * Game_BattlerBase.prototype.paramPlus(id)
        * @param id the id of the  parameter to check
        * @return the extra value added onto parameter id
        */
        $this_class.paramPlus = function(id) {
            let base = paramPlus.apply(this, arguments);
            return base + this.distParamPlus(id);
        };

        /**
        * End Battler Declarations
        */
    })(Game_BattlerBase.prototype, undefined);


    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\
    *  DMV.Window.Stat_Distribute
    ***///////////////////////////
    DMV.Window.Stat_Distribute = DMV.createClass(Window_Base);

    /**
    * $this_class: DMV.Window.Stat_Distribute.prototype
    * parent: Window_Base.prototype
    * Window to handle the distribution of actor stats
    */
    (function($this_class, parent){
        /**
        * DMV.Window.Stat_Distribute.prototype.initialize()
        * Initializes the window and ensures all buttons are created
        */
        $this_class.initialize = function() {
            let data = toggled_window_data.slice(0, 4);
            parent.initialize.apply(this, data);
            this._hasgottoggled = false;
            this.createToggleButton();
            this.createStatUpButtons();
            this.createStatDownButtons();
            this.drawDystPtsText();
            this.moveToRegular();
        }; 

        /**
        * DMV.Window.Stat_Distribute.prototype.createToggleButton()
        * Creates the distribution toggle button
        */
        $this_class.createToggleButton = function(){
            let bitmap = ImageManager.loadSystem(DISTRIBUTE_BUTTON_NAME);
            this._toggleButton = new DMV.Sprite.TogButton();
            this._toggleButton.bitmap = bitmap;
            let w = this._toggleButton.width/4;
            let h = this._toggleButton.height;
            this._toggleButton.setRegularFrames([0,0,w,h],[w,0,w,h])
            this._toggleButton.setToggledFrames([w*2,0,w,h],[w*3,0,w,h])
            this._toggleButton.setClickHandler(this.onToggleWynd.bind(this))
            this._toggleButton.x = this.padding - 6;
            this._toggleButton.y = this.padding;
            this._toggleButton.visible = true;
            this.addChild(this._toggleButton);
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.onToggleWynd()
        * Function used to bind onto button click handler
        */
        $this_class.onToggleWynd = function() {
            if (this._hasgottoggled){
                this._hasgottoggled = false;
                this.moveToRegular();
            }else{
                this._hasgottoggled = true;
                this.moveToToggled();
            }
        };

        /**
        * [ private ] moveToPosition(wynd, positionArray, toggleButtonOpacity)
        * @param wynd the window to perform the move on
        * @param positionArray containins desired [x,y,w,h,o] values
        * @param toggleButtonOpacity the desired opacity for the toggle button
        * @note Called internally from moveToRegular() and moveToToggle()
        */
        function moveToPosition(wynd, positionArray, toggleButtonOpacity){
            wynd.move.apply(wynd, positionArray.slice(0, 4));
            wynd.opacity = positionArray[4];
            if (toggleButtonOpacity != undefined){
                wynd._toggleButton.opacity = toggleButtonOpacity;
            }
            wynd.refresh();
        }

        /**
        * DMV.Window.Stat_Distribute.prototype.moveToRegular()
        * Moves the window to the positioned deemed 'regular'
        */
        $this_class.moveToRegular = function() {
            moveToPosition(this, regular_window_data, 228);
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.moveToToggled()
        * Moves the window to the positioned deemed 'toggled'
        */
        $this_class.moveToToggled = function() {
            moveToPosition(this, toggled_window_data, 255);
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.refresh()
        * Refreshes the window, clears previous data and draws anew
        * @note only redraws data if window is toggled
        */
        $this_class.refresh = function() {
            this.contents.clear();
            if (this._hasgottoggled){
                this.drawDystPtsText();
            }
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.createStatUpButtons()
        * Creates all buttons used to gain stat points
        */
        $this_class.createStatUpButtons = function() {
            this._bt_array_u = [];
            for (var i = 0; i < 8; i++) {
                let button = DMV.createIconButton(32 + i, 40 + i, this);
                button.setClickHandler(this.doOnStatUp.bind(this, i));
                button.x = stat_data_u[i][0];
                button.y = stat_data_u[i][1];
                this._bt_array_u.push(button);
            }
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.createStatDownButtons()
        * Creates all buttons used to reduce stat points
        */
        $this_class.createStatDownButtons = function() {
            this._bt_array_d = [];
            for (var i = 0; i < 8; i++) {
                let button = DMV.createIconButton(48 + i, 56 + i, this);
                button.setClickHandler(this.doOnStatDown.bind(this, i));
                button.x = stat_data_d[i][0];
                button.y = stat_data_d[i][1];
                this._bt_array_d.push(button);
            }
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.drawDystPtsText()
        * Draws all distribution points text onto window
        */
        $this_class.drawDystPtsText = function() {
            let x, y, w, v, a = $gameParty.menuActor();
            this.contents.fontSize = 16;
            this.resetTextColor();
            for (var i = 0; i < 8; i++) {
                x = stat_data_t[i][0];
                y = stat_data_t[i][1];
                w = stat_data_t[i][2];
                v = a.distParamPoints(i);
                //this.drawIcon(16, x, y - 3);
                this.drawText(v,x,y,w,'center');
            }
            x = stat_point_text[0];
            y = stat_point_text[1];
            w = this.contentsWidth() - x;
            this.contents.fontSize = 22;
            this.drawText("Available Points:", x, y, w, 'left');
            this.drawText(a.availDistParamPoints(), x, y, w, 'right');
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.standardBackOpacity()
        * Overwrites parent function to make window more distiguishable
        */
        $this_class.standardBackOpacity = function() {
            return 255;
        };  

        /**
        * DMV.Window.Stat_Distribute.prototype.doOnStatUp(statID)
        * @param statID the id of the stat to gain points in
        * Called internally when a stat gain button is pressed
        */
        $this_class.doOnStatUp = function(statID){
            let actor = $gameParty.menuActor();
            if (actor.availDistParamPoints() > 0){
                actor.addDistParamPlus(statID, 1);
                this.refreshOnStatChange();
                SoundManager.playOk();
            } else {
                SoundManager.playBuzzer();
            }
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.doOnStatDown(statID)
        * @param statID the id of the stat to lose points in
        * Called internally when a stat lose button is pressed
        */
        $this_class.doOnStatDown = function(statID){
            let actor = $gameParty.menuActor();
            if (actor.distParamPoints(statID) > default_min_values[statID]){
                actor.addDistParamPlus(statID, -1);
                this.refreshOnStatChange();
                SoundManager.playOk();
            } else {
                SoundManager.playBuzzer();
            }
        };

        /**
        * DMV.Window.Stat_Distribute.prototype.refreshOnStatChange()
        * Called internally when any stat altering button is pressed
        */
        $this_class.refreshOnStatChange = function(){
            SceneManager._scene._statusWindow.refresh();
            this.refresh();
        };

        /**
        * End Window Declarations
        */
    })(DMV.Window.Stat_Distribute.prototype, Window_Base.prototype);


    /**
    * $this_class: Scene_Boot
    * parent: undefined
    * Ensures distribution image is loaded on boot
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const sc_loadSystemImages = $this_class.loadSystemImages;

        /**
        * Scene_Boot.prototype.loadSystemImages()
        * Preloads distribution button image
        */
        Scene_Boot.loadSystemImages = function() {
            ImageManager.reserveSystem(DISTRIBUTE_BUTTON_NAME);
            sc_loadSystemImages.apply(this, arguments);
        };

        /**
        * End this_class.prototype Declarations
        */ 
    })(Scene_Boot, undefined);


    /**
    * $this_class: Scene_Status.prototype
    * parent: Scene_MenuBase.prototype
    * Adds the distribution window into the status scene.
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const sc_create = $this_class.create;
        const sc_refreshActor = $this_class.refreshActor;

        /**
        * Scene_Status.prototype.create()
        * Creates the scene and also the new distribute window
        */
        $this_class.create = function() {
            sc_create.apply(this, arguments);
            this._dystwynd = new DMV.Window.Stat_Distribute();
            this.addChild(this._dystwynd);
        };

        /**
        * Scene_Status.prototype.refreshActor()
        * Called when actor changes and windows require refreshing 
        */
        $this_class.refreshActor = function() {
            sc_refreshActor.apply(this, arguments);
            if (this._dystwynd) this._dystwynd.refresh();
        };
        /**
        * End this_class.prototype Declarations
        */ 
    })(Scene_Status.prototype, Scene_MenuBase.prototype);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
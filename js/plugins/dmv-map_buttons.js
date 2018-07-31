/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-map_buttons.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This plugin allows for the game map screen to show some 
* cool menu buttons that run user defined code upon trigger.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin creates upto 25 map buttons that can be used to run almost any 
* code you desire. By default, 7 of these buttons trigger the main menu
* scenes, and the rest buttons are left used to allow for expansion with  
* custom plugins that create a new scene. 
* 
* Each button consists of two states - hot, and cold. 
* Cold state means that the button is not being pressed, hot means that it is. 
* Each state also has its own image, in this case, an icon. This means that
* each map button is designated two icon id's, one for hot, and one for cold. 
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
* $gameSystem.resetMapButtons();
* \_: Resets all map buttons x, y, icons, function, visible flags to default
* 
* $gameSystem.mapButton(id);
* \_: Returns the button sprite for map button 'id'
* 
* $gameSystem.mapButtonX(id);
* \_: Returns the button sprite x position for map button 'id'
* 
* $gameSystem.setMapButtonX(id, newX);
* | : Sets the x position of map button 'id' to 'newX'
* \_: Returns the new x position, or -1 if invalid id given
* 
* $gameSystem.mapButtonY(id);
* \_: Returns the button sprite y position for map button 'id'
* 
* $gameSystem.setMapButtonY(id, newY);
* | : Sets the y position of map button 'id' to 'newY'
* \_: Returns the new y position, or -1 if invalid id given
* 
* $gameSystem.mapButtonIcon1(id);
* \_: Returns the cold icon for button 'id', or 0 if invalid id given
* 
* $gameSystem.mapButtonIcon2(id);
* \_: Returns the hot icon for button 'id', or 0 if invalid id given
* 
* $gameSystem.setMapButtonIcons(id, icon1, icon2);
* | : Sets button 'id's cold icon to 'icon1', and hot icon to 'icon2'
* \_: Returns true if icons changed, false otherwise
* 
* $gameSystem.mapButtonVisible(id);
* \_: Returns the visibility for button 'id', or false if invalid id given 
* 
* $gameSystem.setMapButtonVisible(id, visiBool); 
* | : Sets the visibility of button 'id' to 'visiBool' 
* \_: Returns the new visibility for button 'id', or false if invalid id given 
* 
* $gameSystem.mapButtonFunk();
* \_: Returns the function string for button 'id', or false if invalid id 
* 
* $gameSystem.setMapButtonFunk(id, newFunkString);
* | : Sets the function for button 'id' to 'newFunkString' 
* \_: Returns the new function string for button 'id', or false if invalid id 
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
* v.1.0.1 - Changed plugin name from DMV_MapMenuButtons to DMV_MapButtons,
*         - Complete overhaul to button containers structure,
*         - Increased possible buttons from 9 to 25,
*         - Added script call: $gameSystem.resetMapButtons();
*         - Added script call: $gameSystem.mapButton();
*         - Added script call: $gameSystem.mapButtonX();
*         - Added script call: $gameSystem.mapButtonY();
*         - Added script call: $gameSystem.setMapButtonX();
*         - Added script call: $gameSystem.setMapButtonY();
*         - Added script call: $gameSystem.mapButtonIcon1();
*         - Added script call: $gameSystem.mapButtonIcon2();
*         - Added script call: $gameSystem.setMapButtonIcons();
*         - Added script call: $gameSystem.mapButtonVisible();
*         - Added script call: $gameSystem.setMapButtonVisible();
*         - Added script call: $gameSystem.mapButtonFunk();
*         - Added script call: $gameSystem.setMapButtonFunk();
* v.1.0.0 - Initial Release,
* 
* 
* ============================================================================
* Visit www.dekitarpg.com for more!
* ============================================================================
* 
* @param Button 1 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 466, 2, 176, 176, 1
* @default 466, 2, 176, 176, 1
*
* @param Button 1 Func
* @desc Sets the function used for when button 1 is triggered
* @default SceneManager.push(Scene_Item)
*
* @param Button 2 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 500, 2, 77, 77, 1
* @default 500, 2, 77, 77, 1
*
* @param Button 2 Func
* @desc Sets the function used for when button 2 is triggered
* @default $gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Skill)
*
* @param Button 3 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 534, 2, 76, 76, 1
* @default 534, 2, 76, 76, 1
*
* @param Button 3 Func
* @desc Sets the function used for when button 3 is triggered
* @default $gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Equip)
* 
* @param Button 4 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 568, 2, 82, 82, 1
* @default 568, 2, 82, 82, 1
* 
* @param Button 4 Func
* @desc Sets the function used for when button 4 is triggered
* @default $gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Status)
* 
* @param Button 5 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 602, 2, 83, 83, 1
* @default 602, 2, 83, 83, 1
* 
* @param Button 5 Func
* @desc Sets the function used for when button 5 is triggered
* @default SceneManager.push(Scene_Options)
*
* @param Button 6 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 636, 2, 297, 297, 1
* @default 636, 2, 297, 297, 1
*
* @param Button 6 Func
* @desc Sets the function used for when button 6 is triggered
* @default SceneManager.push(Scene_Save)
*
* @param Button 7 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: 670, 2, 73, 73, 1
* @default 670, 2, 73, 73, 1
*
* @param Button 7 Func
* @desc Sets the function used for when button 7 is triggered
* @default SceneManager.push(Scene_GameEnd)
*
* @param Button 8 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 8 Func
* @desc Sets the function used for when button 8 is triggered
* @default null
*
* @param Button 9 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 9 Func
* @desc Sets the function used for when button 9 is triggered
* @default null
*
* @param Button 10 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 10 Func
* @desc Sets the function used for when button 10 is triggered
* @default null
*
* @param Button 11 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 11 Func
* @desc Sets the function used for when button 11 is triggered
* @default null
*
* @param Button 12 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 12 Func
* @desc Sets the function used for when button 12 is triggered
* @default null
*
* @param Button 13 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 13 Func
* @desc Sets the function used for when button 13 is triggered
* @default null
*
* @param Button 14 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 14 Func
* @desc Sets the function used for when button 14 is triggered
* @default null
*
* @param Button 15 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 15 Func
* @desc Sets the function used for when button 15 is triggered
* @default null
*
* @param Button 16 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 16 Func
* @desc Sets the function used for when button 16 is triggered
* @default null
*
* @param Button 17 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 17 Func
* @desc Sets the function used for when button 17 is triggered
* @default null
*
* @param Button 18 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 18 Func
* @desc Sets the function used for when button 18 is triggered
* @default null
*
* @param Button 19 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 19 Func
* @desc Sets the function used for when button 19 is triggered
* @default null
*
* @param Button 20 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 20 Func
* @desc Sets the function used for when button 20 is triggered
* @default null
*
* @param Button 21 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 21 Func
* @desc Sets the function used for when button 21 is triggered
* @default null
*
* @param Button 22 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 22 Func
* @desc Sets the function used for when button 22 is triggered
* @default null
*
* @param Button 23 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 23 Func
* @desc Sets the function used for when button 23 is triggered
* @default null
*
* @param Button 24 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 24 Func
* @desc Sets the function used for when button 24 is triggered
* @default null
*
* @param Button 25 Data
* @desc Sets x, y, coldIcon, hotIcon, and visibility flag 
* Default: -1, -1, 0, 0, 0
* @default -1, -1, 0, 0, 0
*
* @param Button 25 Func
* @desc Sets the function used for when button 25 is triggered
* @default null
* 
* ============================================================================
*/ 
(function dmv_map_buttons(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "map_buttons";
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
    * button_size
    * Holds integer for number of default button params to read
    */
    const button_size = 25;

    /**
    * DMV.createMapButton(icon1, icon2, parent)
    * @param icon1 the icon to show for buttons cold frame
    * @param icon2 the icon to show for buttons hot frame
    * @param parent [optional] if given will call addChild 
    *        to add the button into the parents child list
    * @return new button 
    */
    DMV.createMapButton = function(parent, id) {
        let button = new DMV.Sprite.MapButton(id);
        button.bitmap = ImageManager.loadSystem('IconSet');
        let icon1 = $gameSystem.mapButtonIcon1(id);
        let icon2 = $gameSystem.mapButtonIcon2(id);
        button.setBothFrames(icon1, icon2);
        if (parent !== undefined && parent.addChild){
            parent.addChild(button);
        }
        return button;
    };

    /*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    * DMV.Sprite.MapButton.prototype Variables && Functions
    **//////////////////////////////////////////////////////

    DMV.Sprite.MapButton = DMV.createClass(Sprite_Button);

    /**
    * $this_class: DMV.Sprite.MapButton.prototype
    * parent: Sprite_Button.prototype
    */
    (function ($this_class, parent){
        /**
        * DMV.Sprite.MapButton.prototype.initialize(buttID);
        * @param buttID the id of this button
        * Initializes the map button
        */
        $this_class.initialize = function(buttID) {
            parent.initialize.apply(this, arguments);
            this._map_butt_id = buttID;
        };
        /**
        * DMV.Sprite.MapButton.prototype.isButtonTouched();
        * @return true if button is being touched and  
        * game message is not showing, false otherwise.
        */
        $this_class.isButtonTouched = function(){
            return !$gameMessage.isBusy() && parent.isButtonTouched.call(this);
        };

        /**
        * DMV.Sprite.MapButton.prototype.setBothFrames(icon1, icon2);
        * @param icon1 the icon to show for buttons cold frame
        * @param icon2 the icon to show for buttons hot frame
        */
        $this_class.setBothFrames = function(icon1, icon2){
            let bw = Window_Base._iconWidth, bh = Window_Base._iconHeight;
            this.setColdFrame(icon1%16*bw, Math.floor(icon1/16)*bh, bw, bh);
            this.setHotFrame(icon2%16*bw, Math.floor(icon2/16)*bh ,bw, bh);
        };

        /**
        * DMV.Sprite.MapButton.prototype.callClickHandler();
        * Calls the function associated with this button.
        */
        $this_class.callClickHandler = function() {
            let funk = $gameSystem.mapButtonFunk(this._map_butt_id);
            if (funk)  Function(funk).apply(this, arguments);
        };

        /**
        * DMV.Sprite.MapButton.prototype.update();
        * Updates this button and ensures the visibility, x, and y
        * values for the sprite are also updated accordingly.
        */
        $this_class.update = function() {
            parent.update.apply(this, arguments);
            this.visible = $gameSystem.mapButtonVisible(this._map_butt_id);
            this.x = $gameSystem.mapButtonX(this._map_butt_id);
            this.y = $gameSystem.mapButtonY(this._map_butt_id);
        };
        /**
        * End DMV.Sprite.MapButton.prototype declarations
        */
    })(DMV.Sprite.MapButton.prototype, Sprite_Button.prototype);


    /**
    * $this_class: Spriteset_Map.prototype
    * parent: undefined
    */
    (function ($this_class, parent) {
        /**
        * Aliased Functions:..
        */
        const old_createUpper = $this_class.createUpperLayer;

        /**
        * Spriteset_Map.prototype.createUpperLayer();
        * Calls previous function definition and then creates
        * all the menu buttons that should be shown on the map
        */
        $this_class.createUpperLayer = function() {
            old_createUpper.apply(this, arguments);
            this.createMapButtons();
        };

        /**
        * Spriteset_Map.prototype.createMapButtons();
        * Adds all menu buttons that should be shown onto the spriteset.
        */
        $this_class.createMapButtons = function() {
            this._mapButtons = [];
            let button, x, y, i; 
            for (i=0; i < button_size; i++){
                x = $gameSystem.mapButtonX(i);
                y = $gameSystem.mapButtonY(i);
                if (x != -1 && y != -1){
                    button = DMV.createMapButton(this, i);
                }else{
                    button = false;
                }
                this._mapButtons.push(button);
            }
        };
        /**
        * End Spriteset_Map.prototype declarations
        */
    })(Spriteset_Map.prototype, undefined);


    /**
    * $this_class: Game_Temp.prototype
    * parent: undefined
    */
    (function ($this_class, parent) {
        /**
        * Aliased Functions:..
        */
        const old_setDestination = $this_class.setDestination;

        /**
        * Game_Temp.prototype.map_buttons 
        * @return the maps buttons sprite array, if on the map of course.
        */
        DMV.reader($this_class,'map_buttons', function(){
            let a = SceneManager._scene._spriteset;
            return DMV.isScene(Scene_Map) && a ? a._mapButtons : [];
        });

        /**
        * Game_Temp.prototype.setDestinationNotaButton()
        * Ensures a button was not pressed at the current TouchInput x && y
        * Called internally from within Game_Temp.setDestination();
        * @return false if input was within the space of a button.
        * @return true otherwise.
        */
        $this_class.setDestinationNotaButton = function(){
            var bt, ix, iy;
            var x = TouchInput.x;
            var y = TouchInput.y;
            var s = this.map_buttons.length;
            for (var i = 0; i < s; i++){
                bt = this.map_buttons[i];
                ix = (x >= bt.x) && (x <= bt.x + bt.width);
                iy = (y >= bt.y) && (y <= bt.y + bt.height);
                if (ix && iy) return false;
            }
            return true;
        };

        /**
        * Game_Temp.prototype.setDestination(x,y)
        * Ensures a button is not pressed at the desired
        * point and if not, allows the previous definition
        * to be called which will make the player move. 
        */
        $this_class.setDestination = function(x, y) {
            if (this.setDestinationNotaButton()){
                old_setDestination.apply(this, arguments);
            }
        };
        
        /**
        * End Game_Temp.prototype declarations
        */
    })(Game_Temp.prototype, undefined);


    /**
    * $this_class: Game_System.prototype
    * parent: undefined
    */
    (function ($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const old_initialize = $this_class.initialize;

        /**
        * Game_System.prototype.initialize();
        * Initializes the button data for the game
        */
        $this_class.initialize = function() {
            old_initialize.apply(this, arguments);
            this.resetMapButtons();
        };

        /**
        * Game_System.prototype.resetMapButtons();
        * Resets the button data for the game
        */
        $this_class.resetMapButtons = function(){
            this._mapButtonDatas = [];
            this._mapButtonFunks = [];
            for (var i = 1; i <= button_size; i++) {
                let string = 'Button ' + i + ' ';
                this._mapButtonDatas.push(DMV.mapParams2n(params[string+'Data']));
                this._mapButtonFunks.push(params[string+'Func']);
            }
        };

        /**
        * Game_System.prototype.isMapButt(id);
        * @param id the button id to ensure is valid
        * @return true or false, based on if button is valid
        */
        $this_class.isMapButt = function(id){
            return id >= 0 && id <= button_size;
        };

        /**
        * Game_System.prototype.mapButton(id);
        * @param id the id of the button to get
        * @return the button sprite if valid, else null
        */
        $this_class.mapButton = function(id) {
            return this.isMapButt(id) ? $gameTemp.map_buttons[id] : null;
        };

        /**
        * Game_System.prototype.mapButtonX(id);
        * @param id the id of the button to check
        * @return the button's x position if valid, else -1
        */
        $this_class.mapButtonX = function(id){
            return this.isMapButt(id) ? this._mapButtonDatas[id][0] : -1;
        };

        /**
        * Game_System.prototype.setMapButtonX(id, newX);
        * @param id the id of the button to check
        * @param newX the new x position to set for the button id
        * @return buttons new y position if valid
        * @return false if not valid button
        */
        $this_class.setMapButtonX = function(id, newX){
            return this.isMapButt(id) ? this._mapButtonDatas[id][0] = newX : false;
        };

        /**
        * Game_System.prototype.mapButtonY(id);
        * @param id the id of the button to check
        * @return the button's y position if valid, else -1
        */
        $this_class.mapButtonY = function(id){
            return this.isMapButt(id) ? this._mapButtonDatas[id][1] : -1;
        };

        /**
        * Game_System.prototype.setMapButtonY(id, newY);
        * @param id the id of the button to check
        * @param newY the new y position to set for the button id
        * @return buttons new y position if valid
        * @return false if not valid button
        */
        $this_class.setMapButtonY = function(id, newY){
            return this.isMapButt(id) ? this._mapButtonDatas[id][1] = newY : false;
        };

        /**
        * Game_System.prototype.mapButtonIcon1(id);
        * @param id the id of the button to check
        * @return the button's cold icon id if valid, else 0
        */
        $this_class.mapButtonIcon1 = function(id){
            return this.isMapButt(id) ? this._mapButtonDatas[id][2] : 0;
        };

        /**
        * Game_System.prototype.mapButtonIcon2(id);
        * @param id the id of the button to check
        * @return the button's hot icon id if valid, else 0
        */
        $this_class.mapButtonIcon2 = function(id){
            return this.isMapButt(id) ? this._mapButtonDatas[id][3] : 0;
        };

        /**
        * Game_System.prototype.setMapButtonIcons(id, icon1, icon2);
        * @param id the id of the button to change icons of
        * @param icon1 the icon to use for the cold icon for this button 
        * @param icon2 the icon to use for the hot icon for this button 
        * @return true if button icons changed, false otherwise
        */
        $this_class.setMapButtonIcons = function(buttonID, icon1, icon2){
            var button;
            if (this.isMapButt(buttonID)){
            this._mapButtonDatas[buttonID][2] = icon1;
            this._mapButtonDatas[buttonID][3] = icon2;
            if (button = this.mapButton(buttonID)){
                button.setBothFrames(icon1, icon2);
                return true;
            }
            }
            return false;
        };

        /**
        * Game_System.prototype.mapButtonVisible(id);
        * @param id the id of the button to check
        * @return the button visibility flag if valid button, or false
        */
        $this_class.mapButtonVisible = function(id){
            return this.isMapButt(id) ? this._mapButtonDatas[id][4] : false;
        };

        /**
        * Game_System.prototype.setMapButtonVisible(id, visiBool);
        * @param id the id of the button to check
        * @param visiBool the boolean to use to set this buttons visibility
        */
        $this_class.setMapButtonVisible = function(id, visiBool){
            return this.isMapButt(id) ? this._mapButtonDatas[id][4] = visiBool : false;
        };

        /**
        * Game_System.prototype.mapButtonFunk(id);
        * @param id the id of the button to check
        * @return the buttons function string if valid, or false
        */
        $this_class.mapButtonFunk = function(id){
            return this.isMapButt(id) ? this._mapButtonFunks[id] : false;
        };

        /**
        * Game_System.prototype.setMapButtonFunk(id, newFunkString);
        * @param id the id of the button to change functions of
        * @param newFunkString the new function string to use for button id
        */
        $this_class.setMapButtonFunk = function(id, newFunkString){
            return this.isMapButt(id) ? this._mapButtonFunks[id] = newFunkString : false;
        };
        /**
        * End Game_System.prototype declarations
        */
    })(Game_System.prototype, undefined);


    /**
    * [ private ] aliasSceneStart(sceneProto)
    * Ensures the status window is refreshed upon scene start
    * This fixes a bug where actors faces would not show.
    */
    function aliasSceneStart(sceneProto) {
        const sceneProto_start = sceneProto.prototype.start;
        sceneProto.prototype.start = function() {
            sceneProto_start.apply(this, arguments);
            if (this._statusWindow && this._statusWindow.refresh){
                this._statusWindow.refresh();
            }
        };
    }

    /**
    * Scene_Status.prototype.start()
    * Scene_Skill.prototype.start()
    */
    aliasSceneStart(Scene_Status);
    aliasSceneStart(Scene_Skill);

    /**
    * Scene_Equip.prototype.start()
    * @note this has no effect unless using a custon script
    *  that would show the actor face within equip scene
    */
    aliasSceneStart(Scene_Equip);

    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-destination_sprite.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Alters the 'destination sprite' (shown when you click to move).
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This system allows for MUCH more control over the 'destination sprite', you 
* know, that thing that flashes at your destination when you click to move? 
* 
* Anyway, this plugin changes that from the default white square, to whatever 
* image you want it to be! 
* 
* There are a few restrictions on this image of course. For example, the image 
* MUST be a size equal to that of your game tiles. So if your tiles are the 
* default size of 48x48, thats what size your destination sprite should be.
* 
* With that said, you can also allow for multiple framed destination sprites. 
* YES! You can actually have an animated destination sprite, and there is NO 
* limit on how many frames it can have, but each frame MUST be the size of 
* your tiles, just as it normally would. 
* 
* Additionally, you can also animate the sprite in a few other ways, such as
* setting the amount of zoom and the opacity modifications. Hell, you can 
* even rotate the sprite!
* 
* I have introduced a large number of new script calls (20+ in v1.0.0) that 
* are used to change the settings, so for an example: during gameplay you 
* can easily change the sprite image, opacity, visibility, zoom, and its 
* angle settings. Furthermore, if you have multiple framed sprites, you can 
* even change the length that each frame displays for!!
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
* $gameSystem.setDesprToDefaults()
* Sets all destination sprite features to default
* 
* $gameSystem.getDesprBitmapName()
* Returns {string} destination sprite bitmap name
* 
* $gameSystem.setDesprBitmapName(newName)
* newName {string} new destination sprite bitmap name
* Returns {string} newName
* 
* $gameSystem.getDesprBitmapFrames()
* Returns {number} destination sprite frames
* 
* $gameSystem.setDesprBitmapFrames(newFrames)
* newFrames {number} newFrames new destination sprite max frames
* Returns {number} newFrames
* 
* $gameSystem.getDesprFrameFreq()
* Returns {number} destination sprite frame change frequency
* 
* $gameSystem.setDesprFrameFreq(newFreq)
* newFreq {number} new destination sprite frame change frequency
* Returns {number} newFreq 
* 
* $gameSystem.getDesprBlendMode()
* Returns {number} destination sprite blend mode
* 
* $gameSystem.setDesprBlendMode(newBlendMode)
* newBlendMode {number} newBlendMode new destination sprite blend mode
* Returns {number} newBlendMode
* 
* $gameSystem.getDesprAngleMod()
* Returns {number} destination sprite angle modificaiton
* 
* $gameSystem.setDesprAngleMod(newAngleMod)
* newAngleMod {number} newAngleMod new destination sprite angle mod
* Returns {number} newAngleMod
* 
* $gameSystem.getDesprAlphaMod()
* Returns {number} destination sprites opacity modification
* 
* $gameSystem.setDesprAlphaMod(newAlphaMod)
* newAlphaMod {number} newAlphaMod new destination sprites opacity mod
* Returns {number} newAlphaMod
* 
* $gameSystem.getDesprAlphaLimits()
* Returns {number[]} destination sprites opacity limits
* 
* $gameSystem.setDesprAlphaLimits(newAlphaMin, newAlphaMax)
* newAlphaMin {number} new destination sprites minimum opacity limit
* newAlphaMax {number} new destination sprites maximum opacity limit
* Returns {number[]} containing [newAlphaMin, newAlphaMax]
* 
* $gameSystem.getDesprCanScale()
* Returns {boolean} destination sprite can scale flag
* 
* $gameSystem.setDesprCanScale(newCanScale)
* newCanScale {boolean} newCanScale new destination sprite can scale flag
* Returns {boolean} newCanScale
* 
* $gameSystem.getDesprScaleDiv()
* Returns {number} destination sprites scale divider 
* 
* $gameSystem.setDesprScaleDiv(newScaleDiv)
* newScaleDiv {number} newScaleDiv new destination sprites scale divider 
* Returns {number} newScaleDiv
* 
* $gameSystem.getDesprVisible()
* Returns {boolean} destination sprite is visibility flag
* 
* $gameSystem.setDesprVisible(newVisiBool)
* newVisiBool {boolean} newVisiBool new destination sprite is visibility flag
* Returns {boolean} newVisiBool
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
* @param Bitmap Name
* @desc Determines the bitmap name used for the destination sprite's bitmap
* Default: destination-sprite 
* @default destination-sprite 
* 
* @param Bitmap Frames
* @desc Determines the amount of frames within the destination bitmap
* Default: 2 
* @default 2 
* 
* @param Frame Frequency
* @desc Determines the frequency of frame change for sprite
* Default: 15 
* @default 15 
* 
* @param Sprite Blend
* @desc Determines the blend mode for the destination sprite
* Default: 1   (0=NORMAL, 1=ADD)
* @default 1 
* 
* @param Angle Change
* @desc Determines the angle change value (negative value is anticlockwise)
* Default: 5 
* @default 5 
* 
* @param Alpha Mod
* @desc Determines the opacity change value 
* Default: 10 
* @default 10 
* 
* @param Alpha Min
* @desc Determines the minimum opacity value 
* Default: 50 
* @default 50 
* 
* @param Alpha Max
* @desc Determines the maximum opacity value 
* Default: 200 
* @default 200 
* 
* @param Can Scale Div
* @desc Determines whether the sprite scales on update
* Default: true    (note: case sensitive)
* @default true 
* 
* @param Scale Div
* @desc Determines the divider used for scaling
* Default: 125 
* @default 125 
* 
* ============================================================================
*/ 
(function dmv_destination_sprite(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "destination_sprite";
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
    * default_bitmapName
    * Sets the name of the default bitmap to use for destination
    */ 
    const default_bitmapName = params['Bitmap Name'];

    /**
    * default_maxFrame
    * Sets the default max frames value for destination bitmap 
    */ 
    const default_maxFrame = Number(params['Bitmap Frames'] || 1);

    /**
    * default_frameFrq
    * Sets the default frame change frequency for destination bitmap 
    * Only works for sprites with more frames than one. 
    */ 
    const default_frameFrq = Number(params['Frame Frequency'] || 5);

    /**
    * default_blendMode
    * Determines the blend mode for the sprite
    * 0 = BLEND_NORMAL
    * 1 = BLEND_ADD
    * 2 = BLEND_MULTIPLY (causes screen to go black)
    * 3 = BLEND_SCREEN (seems the same as ADD)
    */
    const default_blendMode = Number(params['Sprite Blend'] || Graphics.BLEND_ADD);

    /**
    * default_angleMod
    * Determines the angle modification on updates
    */ 
    const default_angleMod = Number(params['Angle Change'] || 5); 

    /**
    * default_alphaMod
    * Determines the opacity modification on updates
    */ 
    const default_alphaMod = Number(params['Alpha Change'] || 10);

    /**
    * default_alphaLimits
    * Determines the min and max opacity value for modifications
    */ 
    const default_alphaLimits = [
        Number(params['Alpha Min'] || 50),
        Number(params['Alpha Max'] || 200),
    ];

    /**
    * default_canScale
    * Determines whether the sprite does the scale bounce
    */ 
    const default_canScale = params['Can Scale Div'].contains('true');

    /**
    * default_scaleMod
    * Determines the divider used to determine zoom bounce rates
    */ 
    const default_scaleMod = Number(params['Scale Div'] || 125);

    /**
    * $this_class: Game_System.prototype
    * parent: undefined
    * The game object class for the system data.
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const old_initialize = $this_class.initialize;

        /**
        * Game_System.prototype.initialize()
        * Initializes the game system and destination sprite defaults.
        */
        $this_class.initialize = function(){
            old_initialize.apply(this,arguments);
            this.setDesprToDefaults();
        };

        /**
        * Game_System.prototype.setDesprToDefaults()
        * Sets all destination sprite features to default
        */
        $this_class.setDesprToDefaults = function(){
            this._DesprBitmapName     = default_bitmapName;
            this._DesprBitmapFrames   = default_maxFrame;
            this._DesprFrameFrequency = default_frameFrq;
            this._DesprBlendMode      = default_blendMode;
            this._DesprAngleMod       = default_angleMod;
            this._DesprAlphaMod       = default_alphaMod;
            this._DesprAlphaLimits    = default_alphaLimits;
            this._DesprCanScale       = default_canScale;
            this._DesprScaleDiv       = default_scaleMod;
            this._DesprVisible        = true;
        };

        /**
        * Game_System.prototype.getDesprBitmapName()
        * @return {string} destination sprite bitmap name
        */
        $this_class.getDesprBitmapName = function(){
            return this._DesprBitmapName;
        };

        /**
        * Game_System.prototype.setDesprBitmapName(newName)
        * @param  {string} newName new destination sprite bitmap name
        * @return {string} destination sprite bitmap name
        */
        $this_class.setDesprBitmapName = function(newName){
            this._DesprBitmapName = newName;
            return this._DesprBitmapName;
        };

        /**
        * Game_System.prototype.getDesprBitmapFrames()
        * @return {number} destination sprite frames
        */
        $this_class.getDesprBitmapFrames = function(){
            return this._DesprBitmapFrames;
        };

        /**
        * Game_System.prototype.setDesprBitmapFrames(newFrames)
        * @param  {number} newFrames new destination sprite max frames
        * @return {number} destination sprite max frames
        */
        $this_class.setDesprBitmapFrames = function(newFrames){
            this._DesprBitmapFrames = newFrames;
            return this._DesprBitmapFrames;
        };

        /**
        * Game_System.prototype.getDesprFrameFreq()
        * @return {number} destination sprite frame change frequency
        */
        $this_class.getDesprFrameFreq = function(){
            return this._DesprFrameFrequency;
        };
        
        /**
        * Game_System.prototype.setDesprFrameFreq(newFreq)
        * @param  {number} newFreq new destination sprite frame change frequency
        * @return {number} destination sprite frame change frequency
        */
        $this_class.setDesprFrameFreq = function(newFreq){
            this._DesprFrameFrequency = newFreq;
            return this._DesprFrameFrequency;
        };

        /**
        * Game_System.prototype.getDesprBlendMode()
        * @return {number} destination sprite blend mode
        */
        $this_class.getDesprBlendMode = function(){
            return this._DesprBlendMode;
        };

        /**
        * Game_System.prototype.setDesprBlendMode(newBlendMode)
        * @param  {number} newBlendMode new destination sprite blend mode
        * @return {number} destination sprite blend mode
        */
        $this_class.setDesprBlendMode = function(newBlendMode){
            this._DesprBlendMode = newBlendMode;
            return this._DesprBlendMode;
        };

        /**
        * Game_System.prototype.getDesprAngleMod()
        * @return {number} destination sprite angle modificaiton
        */
        $this_class.getDesprAngleMod = function(){
            return this._DesprAngleMod;
        };

        /**
        * Game_System.prototype.setDesprAngleMod(newAngleMod)
        * @param  {number} newAngleMod new destination sprite angle mod
        * @return {number} destination sprite angle modificaiton
        */
        $this_class.setDesprAngleMod = function(newAngleMod){
            this._DesprAngleMod = newAngleMod;
            return this._DesprAngleMod;
        };
        
        /**
        * Game_System.prototype.getDesprAlphaMod()
        * @return {number} destination sprites opacity modification
        */
        $this_class.getDesprAlphaMod = function(){
            return this._DesprAlphaMod;
        };

        /**
        * Game_System.prototype.setDesprAlphaMod(newAlphaMod)
        * @param  {number} newAlphaMod new destination sprites opacity mod
        * @return {number} destination sprites opacity modification
        */
        $this_class.setDesprAlphaMod = function(newAlphaMod){
            this._DesprAlphaMod = newAlphaMod;
            return this._DesprAlphaMod;
        };

        /**
        * Game_System.prototype.getDesprAlphaLimits()
        * @return {number[]} destination sprites opacity limits
        */
        $this_class.getDesprAlphaLimits = function(){
            return this._DesprAlphaLimits;
        };

        /**
        * Game_System.prototype.setDesprAlphaLimits(newAlphaMin, newAlphaMax)
        * @params {number} newAlphaMin new destination sprites minimum opacity limit
        * @params {number} newAlphaMax new destination sprites maximum opacity limit
        * @return {number[]} destination sprites opacity limits
        */
        $this_class.setDesprAlphaLimits = function(newAlphaMin, newAlphaMax){
            this._DesprAlphaLimits[0] = newAlphaMin;
            this._DesprAlphaLimits[1] = newAlphaMax;
            return this._DesprAlphaLimits;
        };

        /**
        * Game_System.prototype.getDesprCanScale()
        * @return {boolean} destination sprite can scale flag
        */
        $this_class.getDesprCanScale = function(){
            return this._DesprCanScale;
        };

        /**
        * Game_System.prototype.setDesprCanScale(newCanScale)
        * @param  {boolean} newCanScale new destination sprite can scale flag
        * @return {boolean} destination sprite can scale flag
        */
        $this_class.setDesprCanScale = function(newCanScale){
            this._DesprCanScale = newCanScale;
            return this._DesprCanScale;
        };

        /**
        * Game_System.prototype.getDesprScaleDiv()
        * @return {number} destination sprites scale divider 
        */
        $this_class.getDesprScaleDiv = function(){
            return this._DesprScaleDiv;
        };

        /**
        * Game_System.prototype.setDesprScaleDiv(newScaleDiv)
        * @param  {number} newScaleDiv new destination sprites scale divider 
        * @return {number} destination sprites scale divider 
        */
        $this_class.setDesprScaleDiv = function(newScaleDiv){
            this._DesprScaleDiv = newScaleDiv;
            return this._DesprScaleDiv;
        };

        /**
        * Game_System.prototype.getDesprVisible()
        * @return {boolean} destination sprite is visibility flag
        */
        $this_class.getDesprVisible = function(){
            return this._DesprVisible;
        };

        /**
        * Game_System.prototype.setDesprVisible(newVisiBool)
        * @param  {boolean} newVisiBool new destination sprite is visibility flag
        * @return {boolean} destination sprite is visibility flag
        */
        $this_class.setDesprVisible = function(newVisiBool){
            this._DesprVisible = newVisiBool;
            return this._DesprVisible;
        };

        /**
        * End Game_System.prototype Declarations
        */ 
    })(Game_System.prototype, undefined);

    /**
    * $this_class: Sprite_Destination.prototype
    * parent: Sprite.prototype
    * The sprite for displaying the destination place of the touch input.
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const old_update = $this_class.update;

        /**
        * Sprite_Destination.prototype.createBitmap()
        * Creates the bitmap for the destination sprite.
        */ 
        $this_class.createBitmap = function() {
            let w = $gameMap.tileWidth();
            let h = $gameMap.tileHeight();
            this.bitmap = new Bitmap(w, h);
            this.anchor.x = 0.5; 
            this.anchor.y = 0.5;
        };

        /**
        * Sprite_Destination.prototype.resetAllSettings()
        * Resets all settings used for destination sprite
        */ 
        $this_class.resetAllSettings = function(){
            this.blendMode = $gameSystem.getDesprBlendMode();
            this.opacity = $gameSystem.getDesprAlphaLimits()[1];
            this._deangle = -$gameSystem.getDesprAngleMod();
            this._frameIDcounter = 0;
            this._frameID = -1;
            this._opacType = 0;
        };

        /**
        * Sprite_Destination.prototype.redrawFrame()
        * Clears and then draws the current frame of the sprite
        */ 
        $this_class.redrawFrame = function(){
            let nm = $gameSystem.getDesprBitmapName();
            let bm = ImageManager.loadSystem(nm, 0);
            let sw = bm.width / $gameSystem.getDesprBitmapFrames();
            let sh = bm.height;
            let sx = sw * this._frameID;
            let sy = 0;
            this.bitmap.clear();
            this.bitmap.blt(bm, sx, sy, sw, sh, 0, 0);
        };

        /**
        * Sprite_Destination.prototype.update()
        * Updates the sprite and all animations 
        */ 
        $this_class.update = function() {
            let isValid = $gameTemp.isDestinationValid();
            if (isValid) this.updateValidSprite();
            old_update.apply(this, arguments);
            this._oldIsValid = isValid;
        };

        /**
        * Sprite_Destination.prototype.updateAnimation()
        * Removed old shitty function as not required
        */ 
        $this_class.updateAnimation = function(){};

        /**
        * Sprite_Destination.prototype.updateValidSprite()
        * Performs update process for valid movement updates
        */ 
        $this_class.updateValidSprite = function(){
            this.updateAngle();
            this.updateFrame();
            this.updateOpacity();
            this.updateScale();
            this.updateVisible();
        };

        /**
        * Sprite_Destination.prototype.updateAngle()
        * Updates the sprite angle based on angleMod
        */ 
        $this_class.updateAngle = function(){
            let angle = $gameSystem.getDesprAngleMod();
            if (angle){
                this._deangle = this._deangle + angle;
                this.rotation = this._deangle * Math.PI / 180;
            }
        };

        /**
        * Sprite_Destination.prototype.updateFrame()
        * Updates the sprite frame ID, counter and redraws if frame changed
        */ 
        $this_class.updateFrame = function(){
            let lastFrame = this._frameID;
            if (!this._oldIsValid){
                this.resetAllSettings();
            }
            if (++this._frameIDcounter % 5 === 0){
                if (++this._frameID >= $gameSystem.getDesprBitmapFrames()){
                    this._frameID = 0;
                }
            }
            if (lastFrame !== this._frameID){
                this.redrawFrame();
            }
        };

        /**
        * Sprite_Destination.prototype.updateOpacity()
        * Updates sprite opacity value using teh alphaMod setting
        */ 
        $this_class.updateOpacity = function() {
            let change = $gameSystem.getDesprAlphaMod();
            let limits = $gameSystem.getDesprAlphaLimits();
            if (this._opacType){
                if ((this.opacity -= change) <= limits[0]) this._opacType = 0;
            }else{
                if ((this.opacity += change) >= limits[1]) this._opacType = 1;
            }
        };

        /**
        * Sprite_Destination.prototype.updateScale()
        * Updates the zoom level of the sprite using opacity and scaleMod
        */ 
        $this_class.updateScale = function() {
            if ($gameSystem.getDesprCanScale()){
                this.scale.x = this.opacity / $gameSystem.getDesprScaleDiv();
                this.scale.y = this.scale.x;
            }
        };

        /**
        * Sprite_Destination.prototype.updateScale()
        * Updates the zoom level of the sprite using opacity and scaleMod
        */ 
        $this_class.updateVisible = function() {
            this.visible = $gameSystem.getDesprVisible();
        };

        /**
        * End Sprite_Destination.prototype Declarations
        */ 
    })(Sprite_Destination.prototype, Sprite.prototype);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
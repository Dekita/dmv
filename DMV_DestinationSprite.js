// ============================================================================
// Plug-in: DMV_DestinationSprite.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc Alters the 'destination sprite' (shown when you click to move).
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
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
 * ============================================================================
 * ■ Script Calls:
 * ============================================================================
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
 * ============================================================================
 * ■ Terms && Conditions:
 * ============================================================================
 * This plugin is completely free to use, both commercially and privately -
 * Providing the following copy is shown within the project credits;
 * 
 * Copyright (C) 2015 - Dekyde Studios 
 * Dekyde Studios Developer: Dekita - dekita(at)dekyde.com 
 * 
 * Additionally, this header should remain intact at all times.
 * 
 * You are not allowed to redistribute this plugin directly. Instead, provide
 * a link to the following website;
 * www.dekyde.com
 * 
 * ============================================================================
 * ■ Financial Contributions:
 * ============================================================================
 * If you like my work and want to see more of it in the future, I ask that you 
 * consider offering a financial donation. 
 * 
 * Most of the plugins I write are free to use commercially, and many hours of
 * work go into each and every one - not including the time spent bug hunting
 * and performing optimization modifications. 
 * 
 * If you do wish to provide your support, you can do so at the following link;
 * www.patreon.com/Dekita
 * 
 * ============================================================================
 * ■ Stay Up To Date:
 * ============================================================================
 * I advise that you check regularly to see if any of the plugins you use
 * have been updated. The plugin updates will include things like bugfixes and
 * new features, so it is highly recommended. 
 * 
 * You can get the latest versions of my Mv plugins from www.dekyde.com/DMV
 * 
 * ============================================================================
 * ■ Change Log:
 * ============================================================================
 * v.1.0.0 - Initial Release,
 * 
 * ============================================================================
 *  www.dekyde.com
 * ============================================================================
 * @param Bitmap Name
 * @desc Determines the bitmap name used for the destination sprite's bitmap
 * Default: DekitaDestinationSprite 
 * @default DekitaDestinationSprite 
 * 
 * @param Bitmap Frames
 * @desc Determines the amount of frames within the destination bitmap
 * Default: 1 
 * @default 1 
 * 
 * @param Frame Frequency
 * @desc Determines the frequency of frame change for sprite
 * Default: 5 
 * @default 5 
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
 */ 

/**
 * AnonomousFunction()
 */ 
(function(despr){
    /**
     * Use strict mode
     */
    "use strict";

    /**
     * Checks for DMV Core plugin and register if available
     */
    if (typeof DMV !== 'undefined') {
        DMV.register("DestinationSprite", "1.0.0", "20/11/2o15");
    }

    
    /**
     * params
     * Holds all parameters for this plugin
     */
    var params = PluginManager.parameters('DMV_DestinationSprite');

    /**
     * default_bitmapName
     * Sets the name of the default bitmap to use for destination
     */ 
    var default_bitmapName = params['Bitmap Name'];

    /**
     * default_maxFrame
     * Sets the default max frames value for destination bitmap 
     */ 
    var default_maxFrame = Number(params['Bitmap Frames'] || 1);

    /**
     * default_frameFrq
     * Sets the default frame change frequency for destination bitmap 
     * Only works for sprites with more frames than one. 
     */ 
    var default_frameFrq = Number(params['Frame Frequency'] || 5);

    /**
     * default_blendMode
     * Determines the blend mode for the sprite
     * 0 = BLEND_NORMAL
     * 1 = BLEND_ADD
     * 2 = BLEND_MULTIPLY (causes screen to go black)
     * 3 = BLEND_SCREEN (seems the same as ADD)
     */
    var default_blendMode = Number(params['Sprite Blend'] || Graphics.BLEND_ADD);

    /**
     * default_angleMod
     * Determines the angle modification on updates
     */ 
    var default_angleMod = Number(params['Angle Change'] || 5); 

    /**
     * default_alphaMod
     * Determines the opacity modification on updates
     */ 
    var default_alphaMod = Number(params['Alpha Change'] || 10);

    /**
     * default_alphaLimits
     * Determines the min and max opacity value for modifications
     */ 
    var default_alphaLimits = [
        Number(params['Alpha Min'] || 50),
        Number(params['Alpha Max'] || 200),
    ];

    /**
     * default_canScale
     * Determines whether the sprite does the scale bounce
     */ 
    var default_canScale = params['Can Scale Div'].contains('true');

    /**
     * default_scaleMod
     * Determines the divider used to determine zoom bounce rates
     */ 
    var default_scaleMod = Number(params['Scale Div'] || 125);

    /**
     * AnonomousFunction(Sprite_Destination.prototype)
     * The game object class for the system data.
     */
    (function(syst){
        /**
         * Game_System.prototype.initialize()
         * Initializes the game system and destination sprite defaults.
         */
        var  initialize = syst.initialize;
        syst.initialize = function(){
            initialize.apply(this,arguments);
            this.setDesprToDefaults();
        };

        /**
         * Game_System.prototype.setDesprToDefaults()
         * Sets all destination sprite features to default
         */
        syst.setDesprToDefaults = function(){
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
        syst.getDesprBitmapName = function(){
            return this._DesprBitmapName;
        };

        /**
         * Game_System.prototype.setDesprBitmapName(newName)
         * @param  {string} newName new destination sprite bitmap name
         * @return {string} destination sprite bitmap name
         */
        syst.setDesprBitmapName = function(newName){
            return this._DesprBitmapName = newName;
        };

        /**
         * Game_System.prototype.getDesprBitmapFrames()
         * @return {number} destination sprite frames
         */
        syst.getDesprBitmapFrames = function(){
            return this._DesprBitmapFrames;
        };

        /**
         * Game_System.prototype.setDesprBitmapFrames(newFrames)
         * @param  {number} newFrames new destination sprite max frames
         * @return {number} destination sprite max frames
         */
        syst.setDesprBitmapFrames = function(newFrames){
            return this._DesprBitmapFrames = newFrames;
        };

        /**
         * Game_System.prototype.getDesprFrameFreq()
         * @return {number} destination sprite frame change frequency
         */
        syst.getDesprFrameFreq = function(){
            return this._DesprFrameFrequency;
        };
        
        /**
         * Game_System.prototype.setDesprFrameFreq(newFreq)
         * @param  {number} newFreq new destination sprite frame change frequency
         * @return {number} destination sprite frame change frequency
         */
        syst.setDesprFrameFreq = function(newFreq){
            return this._DesprFrameFrequency = newFreq;
        };

        /**
         * Game_System.prototype.getDesprBlendMode()
         * @return {number} destination sprite blend mode
         */
        syst.getDesprBlendMode = function(){
            return this._DesprBlendMode;
        };

        /**
         * Game_System.prototype.setDesprBlendMode(newBlendMode)
         * @param  {number} newBlendMode new destination sprite blend mode
         * @return {number} destination sprite blend mode
         */
        syst.setDesprBlendMode = function(newBlendMode){
            return this._DesprBlendMode = newBlendMode;
        };

        /**
         * Game_System.prototype.getDesprAngleMod()
         * @return {number} destination sprite angle modificaiton
         */
        syst.getDesprAngleMod = function(){
            return this._DesprAngleMod;
        };

        /**
         * Game_System.prototype.setDesprAngleMod(newAngleMod)
         * @param  {number} newAngleMod new destination sprite angle mod
         * @return {number} destination sprite angle modificaiton
         */
        syst.setDesprAngleMod = function(newAngleMod){
            return this._DesprAngleMod = newAngleMod;
        };
        
        /**
         * Game_System.prototype.getDesprAlphaMod()
         * @return {number} destination sprites opacity modification
         */
        syst.getDesprAlphaMod = function(){
            return this._DesprAlphaMod;
        };

        /**
         * Game_System.prototype.setDesprAlphaMod(newAlphaMod)
         * @param  {number} newAlphaMod new destination sprites opacity mod
         * @return {number} destination sprites opacity modification
         */
        syst.setDesprAlphaMod = function(newAlphaMod){
            return this._DesprAlphaMod = newAlphaMod;
        };

        /**
         * Game_System.prototype.getDesprAlphaLimits()
         * @return {number[]} destination sprites opacity limits
         */
        syst.getDesprAlphaLimits = function(){
            return this._DesprAlphaLimits;
        };

        /**
         * Game_System.prototype.setDesprAlphaLimits(newAlphaMin, newAlphaMax)
         * @params {number} newAlphaMin new destination sprites minimum opacity limit
         * @params {number} newAlphaMax new destination sprites maximum opacity limit
         * @return {number[]} destination sprites opacity limits
         */
        syst.setDesprAlphaLimits = function(newAlphaMin, newAlphaMax){
            this._DesprAlphaLimits[0] = newAlphaMin;
            this._DesprAlphaLimits[1] = newAlphaMax;
            return this._DesprAlphaLimits;
        };

        /**
         * Game_System.prototype.getDesprCanScale()
         * @return {boolean} destination sprite can scale flag
         */
        syst.getDesprCanScale = function(){
            return this._DesprCanScale;
        };

        /**
         * Game_System.prototype.setDesprCanScale(newCanScale)
         * @param  {boolean} newCanScale new destination sprite can scale flag
         * @return {boolean} destination sprite can scale flag
         */
        syst.setDesprCanScale = function(newCanScale){
            return this._DesprCanScale = newCanScale;
        };

        /**
         * Game_System.prototype.getDesprScaleDiv()
         * @return {number} destination sprites scale divider 
         */
        syst.getDesprScaleDiv = function(){
            return this._DesprScaleDiv;
        };

        /**
         * Game_System.prototype.setDesprScaleDiv(newScaleDiv)
         * @param  {number} newScaleDiv new destination sprites scale divider 
         * @return {number} destination sprites scale divider 
         */
        syst.setDesprScaleDiv = function(newScaleDiv){
            return this._DesprScaleDiv = newScaleDiv;
        };

        /**
         * Game_System.prototype.getDesprVisible()
         * @return {boolean} destination sprite is visibility flag
         */
        syst.getDesprVisible = function(){
            return this._DesprVisible;
        };

        /**
         * Game_System.prototype.setDesprVisible(newVisiBool)
         * @param  {boolean} newVisiBool new destination sprite is visibility flag
         * @return {boolean} destination sprite is visibility flag
         */
        syst.setDesprVisible = function(newVisiBool){
            return this._DesprVisible = newVisiBool;
        };

        /**
         * End Game_System.prototype Declarations
         */ 
    })(Game_System.prototype);

    /**
     * AnonomousFunction(Sprite_Destination.prototype)
     * The sprite for displaying the destination place of the touch input.
     */
    (function(despr){
        /**
         * Sprite_Destination.prototype.createBitmap()
         * Creates the bitmap for the destination sprite.
         */ 
        despr.createBitmap = function() {
            var w = $gameMap.tileWidth();
            var h = $gameMap.tileHeight();
            this.bitmap = new Bitmap(w, h);
            this.anchor.x = 0.5; 
            this.anchor.y = 0.5;
        };

        /**
         * Sprite_Destination.prototype.resetAllSettings()
         * Resets all settings used for destination sprite
         */ 
        despr.resetAllSettings = function(){
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
        despr.redrawFrame = function(){
            var nm = $gameSystem.getDesprBitmapName();
            var bm = ImageManager.loadSystem(nm, 0);
            var sw = bm.width / $gameSystem.getDesprBitmapFrames();
            var sh = bm.height;
            var sx = sw * this._frameID;
            var sy = 0;
            this.bitmap.clear();
            this.bitmap.blt(bm, sx, sy, sw, sh, 0, 0);
        };

        /**
         * Sprite_Destination.prototype.update()
         * Updates the sprite and all animations 
         */ 
        var update = despr.update;
        despr.update = function() {
            var isValid = $gameTemp.isDestinationValid()
            if (isValid){this.updateValidSprite();};
            update.apply(this, arguments);
            this._oldIsValid = isValid;
        };

        /**
         * Sprite_Destination.prototype.updateAnimation()
         * Removed old shitty function as not required
         */ 
        despr.updateAnimation = function(){};

        /**
         * Sprite_Destination.prototype.updateValidSprite()
         * Performs update process for valid movement updates
         */ 
        despr.updateValidSprite = function(){
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
        despr.updateAngle = function(){
            var angle = $gameSystem.getDesprAngleMod();
            if (angle){
                this._deangle = this._deangle + angle;
                this.rotation = this._deangle * Math.PI / 180;
            }
        };

        /**
         * Sprite_Destination.prototype.updateFrame()
         * Updates the sprite frame ID, counter and redraws if frame changed
         */ 
        despr.updateFrame = function(){
            var lastFrame = this._frameID;
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
        despr.updateOpacity = function() {
            var change = $gameSystem.getDesprAlphaMod();
            var limits = $gameSystem.getDesprAlphaLimits();
            if (this._opacType){
                if ((this.opacity -= change) <= limits[0]){this._opacType = 0};
            }else{
                if ((this.opacity += change) >= limits[1]){this._opacType = 1};
            }
        };

        /**
         * Sprite_Destination.prototype.updateScale()
         * Updates the zoom level of the sprite using opacity and scaleMod
         */ 
        despr.updateScale = function() {
            if ($gameSystem.getDesprCanScale()){
                this.scale.x = this.opacity / $gameSystem.getDesprScaleDiv();
                this.scale.y = this.scale.x;
            }
        };

        /**
         * Sprite_Destination.prototype.updateScale()
         * Updates the zoom level of the sprite using opacity and scaleMod
         */ 
        despr.updateVisible = function() {
            this.visible = $gameSystem.getDesprVisible();
        };

        /**
         * End Sprite_Destination.prototype Declarations
         */ 
    })(Sprite_Destination.prototype);
    /**
     * End Declarations
     */ 
})();
/**
 * End Plugin
 * www.dekyde.com
 */

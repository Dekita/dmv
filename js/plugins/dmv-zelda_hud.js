// ============================================================================
// Plug-in: DMV_ZeldaHUD.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin simply creates a small HP HUD inspired by Zelda.
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin creates a simply health hud inspired by the well known Zelda
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
 * ============================================================================
 * ■ Script Calls:
 * ============================================================================
 * $gamePlayer.setHeartsShown( number )
 * ^ This script call sets the maximum number of hearts shown to the 
 * number value that you pass in as the main argument.
 * 
 * $gamePlayer.setHeartsShown()
 * ^ This script call gets the current maximum number of hearts shown.
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
 *  www.dekyde.com
 * ============================================================================
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
 */

/**
 * Checks to ensure DMV Core plugin exists. 
 */
(function(){
  if (typeof DMV === 'undefined') {
    var strA = "You need to install the DMV_Core plugin ";
    var strB = "in order for other DMV plugins to work!";
    throw new Error(strA + strB);
  }else{
    DMV.register("ZeldaHUD", "1.0.0");
  }
})();

/**
 * 
 */
(function($){
  /**
   * Use strict mode for better code aroma
   */
  "use strict";

  /**
   * params
   * Holds customizable parameters for this plugin.
   */
  var params = PluginManager.parameters('DMV_ZeldaHUD');

  /**
   * HEART_IMAGE
   * Holds a string containing the main hud icon image name.
   */
  var HEART_IMAGE = params['Heart Image'];

  /**
   * HEART_START
   * Holds value for initial icons shown for full hp.
   */
  var HEART_START = Number(params['Init Shown']);

  /**
   * HEART_LIMIT
   * Holds values for min and max icons that can be shown for max hp.
   */
  var HEART_LIMIT = {
    min: Number(params['Min Shown']),
    max: Number(params['Max Shown']),
  };

  /**
   * HEART_SCALE
   * Holds minimum sclaing value for hp loss effect.
   */
  var HEART_SCALE = Number(params['Heart Scale']).clamp(0.0,1.0); 

  /**
   * HUD_POSITION
   * Holds an array containing [x,y] values for hud position.
   */
  var HUD_POSITION = $.mapParams2n(params['HUD Position']);


  /**
   * AnonomousFunction(Game_Player.prototype)
   * Simple function to scope into game player class
   * to allow moodifications used by this system.
   */
  (function(player){
    /**
     * Game_Player.prototype.initMembers
     * Initializes important variables for the zelda hud.
     */
    var initMembers = player.initMembers;
    player.initMembers = function() {
      initMembers.apply(this, arguments);
      this.setHeartsShown(HEART_LIMIT.min);
    };

    /**
     * Game_Player.prototype.setHeartsShown(newValue)
     * @param newValue {number} the new value that determines
     *        how many icons can be shown for max health.
     * @return N/A
     */
    player.setHeartsShown = function(newHeartCount) {
      if (newHeartCount !== this._HeartsShown){
        var min = HEART_LIMIT.min, max = HEART_LIMIT.max;
        this._HeartsShown = Math.round(newHeartCount.clamp(min,max));
      };
    };

    /**
     * Game_Player.prototype.getHeartsShown()
     * @return {number} for how many icons can be shown.
     */
    player.getHeartsShown = function() {
      return this._HeartsShown;
    };

    /**
     * End Game_Player.prototype Declarations.
     */
  })(Game_Player.prototype);

  /**
   * AnonomousFunction(Spriteset_Map.prototype)
   */
  (function(mapset){
    /**
     * createLowerLayer
     * An alias for Spriteset_Map.prototype.createLowerLayer
     * to allow for the zelda hud to be created.
     */
    var createLowerLayer = mapset.createLowerLayer;
    mapset.createLowerLayer = function() {
      createLowerLayer.apply(this, arguments);
      this.createZeldaHUD();
    };

    /**
     * createZeldaHUD
     * Creates the zelda hud, stores it in a variable, and 
     * finally adds the sprite as a child to the spriteset.
     */
    mapset.createZeldaHUD = function(){
      this._ZeldaHUD = new $.Sprite.ZeldaHUD(HEART_IMAGE);
      this.addChild(this._ZeldaHUD);
    };

    /**
     * End Spriteset_Map.prototype Declarations.
     */
  })(Spriteset_Map.prototype);


  /**
   * DMV.Sprite.ZeldaHUD
   * 
   */
  $.Sprite.ZeldaHUD = $.extend(Sprite);
  
  /**
   * 
   */
  (function(zelda){
    /**
     * zeldaSUPER
     * Easy reference to the superclass of this object.
     */
    var zeldaSUPER = Sprite.prototype;

    /**
     * $.Sprite.ZeldaHUD.prototype.initialize(imageName)
     * @param imageName {string} containing icon image name.
     */
    zelda.initialize = function(imageName){
      zeldaSUPER.initialize.call(this);
      this.x = HUD_POSITION[0];
      this.y = HUD_POSITION[1];
      this._importantDataRefresh();
      this._zeldaBitmap = ImageManager.loadSystem(imageName);
      this._zeldaBitmap.addLoadListener(this._zeldaBitmapLoaded.bind(this));
    };

    /**
     * $.Sprite.ZeldaHUD.prototype._importantDataRefresh()
     * Refreshes the important data that the hud requires.
     * This is automatically called when the hud is redrawn
     * which happens whenever the party leaders hp changes.
     */
    zelda._importantDataRefresh = function(){
      this._targetBattler = $gameParty.leader();
      this._oldHPRate = this._targetBattler.hpRate();
    };

    /**  
     * $.Sprite.ZeldaHUD.prototype._zeldaBitmapLoaded()
     * This is called automatically when the bitmap image
     * has finished loading. Once we have the bitmap data, 
     * we create the main sprite bitmap with the required
     * width and height relative to the loaded bitmap. 
     */
    zelda._zeldaBitmapLoaded = function(){
      this._NBW = this._zeldaBitmap.width;
      this._NBH = this._zeldaBitmap.height;
      this.bitmap = new Bitmap(this._NBW * HEART_LIMIT.max,this._NBH);
      this.bitmap.addLoadListener(this._refreshHUD.bind(this));
    };

    /**  
     * $.Sprite.ZeldaHUD.prototype.update()
     * Ensures all hud components are correctly updated.
     */
    zelda.update = function() {
      zeldaSUPER.update.call(this);
      if (this._hudNeedRefresh()) {
        this._refreshHUD();
      };
    };

    /**  
     * $.Sprite.ZeldaHUD.prototype._hudNeedRefresh()
     * @return {boolean} based on whether the hud needs refreshed.
     */
    zelda._hudNeedRefresh = function(){
      var boolA = this._oldHPRate !== this._targetBattler.hpRate();
      return boolA || this._targetBattler !== $gameParty.leader();
    };

    /**  
     * $.Sprite.ZeldaHUD.prototype._refreshHUD()
     * Performs a refresh of all hud components. 
     * Clears the main bitmap, and then redraws
     * all icon sprites onto the clean bitmap.
     */
    zelda._refreshHUD = function(){
      this._importantDataRefresh();
      this.bitmap.clear();
      this._drawAllHearts();
    };

    /**  
     * $.Sprite.ZeldaHUD.prototype._drawAllHearts()
     * Calculates the players hp, and how many icons should be drawn
     * then blt's the health icon onto the main sprite image. 
     */
    zelda._drawAllHearts = function(){
      var heartCount = $gamePlayer.getHeartsShown();
      var heartShown = heartCount * this._oldHPRate;
      var heartCeil  = heartShown.ceil();
      var hpPerHeart = this._targetBattler.mhp / heartCount;
      var hpAtStart  = this._targetBattler.hp;
      var rate = 0.0, dx = 0, dy = 0, dw = 0;
      for (var i = 0; i < heartCeil; i++){
        dx = this._NBW * i; dw = this._NBW;
        if (hpAtStart <= hpPerHeart){
          rate = (hpAtStart / hpPerHeart);
          if (i+1 == heartCeil && rate < HEART_SCALE){
            rate = HEART_SCALE;
          };
          dy = (this._NBH/2).round() * (1.0-rate);
          dw = dw * rate;
        };
        this._drawHeart(dx,dy,dw,i);
        hpAtStart -= hpPerHeart;
      };
    };

    /**  
     * $.Sprite.ZeldaHUD.prototype._drawHeart(dx,dy,dw,i)
     * blts the zelda health sprite onto the main bitmap.
     * @param dx {number} Draw x position (relative to main sprite)
     * @param dy {number} Draw y position (relative to main sprite)
     * @param dw {number} Draw width and height values. 
     * @param i  {number} Number for the current iteration.
     */
    zelda._drawHeart = function(dx,dy,dw,i){
      this.bitmap.blt(this._zeldaBitmap,0,0,this._NBW,this._NBH,dx,dy,dw,dw);
    };

    /**
     * End $.Sprite.ZeldaHUD.prototype Declarations.
     */
  })($.Sprite.ZeldaHUD.prototype);

  /**
   * End Declarations
   */
})(DMV);
/**
 * End plugin
 * www.dekyde.com
 */

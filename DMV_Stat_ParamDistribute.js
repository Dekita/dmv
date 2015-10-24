// ============================================================================
// Plug-in: DMV_MapMenuButtons.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc Allows for parameters to be 'distributed' via the status 
 * scene and the new distribution window. 
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
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * The distribution options added by this system can be controlled in a number 
 * of ways, for example, the window, all buttons, and all text can be fully 
 * customized by the game developer. 
 * 
 * The distribution button is also a snazzy new 'toggle' button, which shows
 * Different image frames when toggled and not. This allows for the window to 
 * retain a 'pop out' effect, and for each state to have descriptive button images. 
 * 
 * Additionally, all actors can have unique distribution parameter limits, and
 * also a unique formula for determining available distribution points. 
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
 * ----------------------------------------------------------------------------
 * <mod dist val: mhp, mmp, atk, def, mat, mdf, agi, luk>
 * This notetag sets how much a stat actually increases per distribution point 
 * spent on the stat. 
 * 
 * Example: 
 * <mod dist val: 50, 50, 5, 5, 5, 5, 2, 2>
 * In the above example, mhp and mmp increase 50 per point spent, atk, def, 
 * mat, mdf each gain 5, and agi & luk only gain 2 for each point spent. 
 * 
 * ----------------------------------------------------------------------------
 * <dist funk: formula to check>
 * This notetag allows for the actor to have a unique formula for gaining 
 * distribution points. By default, this would be their level * 8 + 8
 * 
 * Example: 
 * <dist funk: this.level * 8 + 8>
 * The above example does exactly the same as the default formula. 
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
 */ 

/**
 * Checks for DMV Core plugin and register if available
 */
(function(){
  if (typeof DMV === 'undefined') {
    var strA = "You need to install the DMV_Core plugin ";
    var strB = "in order for other DMV plugins to work!";
    throw new Error(strA + strB);
  }else{
    DMV.register("Stat_ParamDistribute", "1.0.0", "23/1o/2o15");
  }
})();

/**
 * Function to keep everything within a dedicated scope.
 */
(function($){
  /**
   * Use strict mode
   */
  "use strict";

  /**
   * params
   * Holds all parameters for this plugin
   */
  var params = PluginManager.parameters('DMV_Stat_ParamDistribute');
  
  /**
   * default_min_values
   * Holds array of all default minimum distributed points values
   */
  var default_min_values  = $.mapParams2n(params["Default Min Values"]);
  
  /**
   * default_modifiers
   * Holds array of all default modifiers used to calc current param
   */
  var default_modifiers   = $.mapParams2n(params["Default Modifiers"]);
  
  /**
   * regular_window_data
   * Holds array of the window data for regular state
   */
  var regular_window_data = $.mapParams2n(params["Regular Window Data"]);
  
  /**
   * toggled_window_data
   * Holds array of the window data for toggled state
   */
  var toggled_window_data = $.mapParams2n(params["Toggled Window Data"]);
  
  /**
   * default_max_distval
   * Holds default function string for maximum total dist points
   */
  var default_max_distval = ("return "+params["Max Distribution Points"]);
  
  /**
   * stat_data_u
   * Holds an array of button position data arrays for stat up buttons
   */
  var stat_data_u = [
    $.mapParams2n(params["MHP Up Button Data"]),
    $.mapParams2n(params["MMP Up Button Data"]),
    $.mapParams2n(params["ATK Up Button Data"]),
    $.mapParams2n(params["DEF Up Button Data"]),
    $.mapParams2n(params["MAT Up Button Data"]),
    $.mapParams2n(params["MDF Up Button Data"]),
    $.mapParams2n(params["AGI Up Button Data"]),
    $.mapParams2n(params["LUK Up Button Data"]),
  ];
  
  /**
   * stat_data_d
   * Holds an array of button position data arrays for stat down buttons
   */
  var stat_data_d = [
    $.mapParams2n(params["MHP Down Button Data"]),
    $.mapParams2n(params["MMP Down Button Data"]),
    $.mapParams2n(params["ATK Down Button Data"]),
    $.mapParams2n(params["DEF Down Button Data"]),
    $.mapParams2n(params["MAT Down Button Data"]),
    $.mapParams2n(params["MDF Down Button Data"]),
    $.mapParams2n(params["AGI Down Button Data"]),
    $.mapParams2n(params["LUK Down Button Data"]),
  ];
  
  /**
   * stat_data_t
   * Holds an array of text data arrays for stat informaiton
   */
  var stat_data_t = [
    $.mapParams2n(params["MHP Text Data"]),
    $.mapParams2n(params["MMP Text Data"]),
    $.mapParams2n(params["ATK Text Data"]),
    $.mapParams2n(params["DEF Text Data"]),
    $.mapParams2n(params["MAT Text Data"]),
    $.mapParams2n(params["MDF Text Data"]),
    $.mapParams2n(params["AGI Text Data"]),
    $.mapParams2n(params["LUK Text Data"]),
  ];
  
  /**
   * stat_point_text
   * Holds text data array for available distribution points
   */
  var stat_point_text = $.mapParams2n(params["Points Text Data"]);

  
  /**\\\\\\\\\\\\\\\\\\\\\\\\\\
   * Game_BattlerBase.prototype
   **//////////////////////////
  (function(battler){
    /**
     * Game_BattlerBase.prototype.dyst_min_values(paramID)
     * @param paramID the parameter id for checking the min value of
     * @return the minimum value allowed for the parameter id 
     */
    battler.dyst_min_values = function(paramID){
      if (this.___dyst_min_values === undefined){
        this.___dyst_min_values = $.mapMeta2n(this, 'min dist pts');
      }
      if (this.___dyst_min_values[paramID]){
        return this.___dyst_min_values[paramID]
      }
      return default_min_values[paramID];
    }

    /**
     * Game_BattlerBase.prototype.dyst_mod_values(paramID)
     * @param paramID the parameter id for checking the mod value of
     * @return the modifier value allocated for the parameter id 
     */
    battler.dyst_mod_values = function(paramID){
      if (this.___dyst_mod_values === undefined){
        this.___dyst_mod_values = $.mapMeta2n(this, 'mod dist val');
      }
      if (this.___dyst_mod_values[paramID]){
        return this.___dyst_mod_values[paramID]
      }
      return default_modifiers[paramID];
    }

    /**
     * Game_BattlerBase.prototype.clearParamPlusDyst()
     * Clears the added parameter data and renrews it.
     * Called internally from this.clearParamPlus()
     */
    battler.clearParamPlusDyst = function() {
      this.___dyst_min_values = undefined;
      this.___dyst_mod_values = undefined;
      this.__mdipp = undefined; // Holds max dist value 
      this._dystStatValues = [] // Holds params amount
      this._dystStatParams = [] // Holds params multiplier
      for (var i = 0; i < 8; i++){
        this._dystStatValues.push(this.dyst_min_values(i));
        this._dystStatParams.push(this.dyst_mod_values(i));
      }
    }

    /**
     * Game_BattlerBase.prototype.clearParamPlus()
     * Clears all added parameter data
     */
    var clearParamPlus = battler.clearParamPlus;
    battler.clearParamPlus = function() {
      clearParamPlus.apply(this, arguments);
      this.clearParamPlusDyst();
    };
    
    /**
     * Game_BattlerBase.prototype.addDistParamPlus(id, value)
     * @param id the id of the stat point to to increase
     * @param value the value to add onto parameter id
     */
    battler.addDistParamPlus = function(id, value) {
      var min = this.dyst_min_values(id);
      var max = this.maxDistParamPoints();
      var cur = this.distParamPoints(id) + value;
      this._dystStatValues[id] = Math.floor(cur.clamp(min, max));
    };
    
    /**
     * Game_BattlerBase.prototype.distParamPlus(id)
     * @return the value gained from distributed parameters
     */
    battler.distParamPlus = function(id) {
      var param_val = this._dystStatParams[id];
      var param_num = this.distParamPoints(id);
      return Math.round(param_num * param_val);
    };
    
    /**
     * Game_BattlerBase.prototype.distParamPoints(id)
     * @param id the id to check for allocated points count
     * @return the number of distribution points allocated
     */
    battler.distParamPoints = function(id) {
      return this._dystStatValues[id];
    };
    
    /**
     * Game_BattlerBase.prototype.availDistParamPoints()
     * @return the number of available distribuion points
     */
    battler.availDistParamPoints = function() {
      var value = this.maxDistParamPoints();
      for (var i = 0; i < 8; i++){
        value -= this._dystStatValues[i]
      }
      return Math.floor(value);
    };
    
    /**
     * Game_BattlerBase.prototype.maxDistParamPoints()
     * @return the max available distribution points
     * @note this uses the formula defined within plugin options
     */
    battler.maxDistParamPoints = function() {
      if (this.__mdipp === undefined){
        this.__mdipp = Function(this.maxDistValFunkString()).bind(this);
      }
      return this.__mdipp();
    };

    battler.maxDistValFunkString = function(){
      var meta = $.extractMetaData(this, 'dist funk');
      if (meta){ return 'return ' + meta };
      return default_max_distval;
    }
    
    /**
     * Game_BattlerBase.prototype.paramPlus(id)
     * @param id the id of the  parameter to check
     * @return the extra value added onto parameter id
     */
    var paramPlus = battler.paramPlus;
    battler.paramPlus = function(id) {
      var base = paramPlus.apply(this, arguments);
      var dyst = this.distParamPlus(id);
      return base + dyst;
    };
    
    /**
     * End Battler Declarations
     */
  })(Game_BattlerBase.prototype);
    

  /**\\\\\\\\\\\\\\\\\\\\\\\\\\
   * DMV.Window.Stat_Distribute
   * Window to handle the distribution of actor stats
   **////////////////////////////////////////////////
  $.Window.Stat_Distribute = $.extend(Window_Base);

  // DMV.Window.Stat_Distribute.prototype
  (function(dystwynd){
    /**
     * DMV.Window.Stat_Distribute.prototype.initialize()
     * Initializes the window and ensures all buttons are created
     */
    dystwynd.initialize = function() {
      var pr = Window_Base.prototype.initialize
      pr.apply(this,toggled_window_data.slice(0, 4));
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
    dystwynd.createToggleButton = function(){
      var b = ImageManager.loadSystem('DMV Dyst Button');
      this._toggleButton = new DMV.Sprite.TogButton(b);
      var w = this._toggleButton.width/4;
      var h = this._toggleButton.height;
      this._toggleButton.setRegularFrames([0,0,w,h],[w,0,w,h])
      this._toggleButton.setToggledFrames([w*2,0,w,h],[w*3,0,w,h])
      this._toggleButton.setClickHandler(this.onToggleWynd.bind(this))
      this._toggleButton.x = this.padding - 6;
      this._toggleButton.y = this.padding;
      this._toggleButton.visible = true;
      this.addChild(this._toggleButton);
      this._hasgottoggled = false;
    } 
    
    /**
     * DMV.Window.Stat_Distribute.prototype.onToggleWynd()
     * Function used to bind onto button click handler
     */
    dystwynd.onToggleWynd = function() {
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
    dystwynd.moveToRegular = function() {
      moveToPosition(this, regular_window_data, 228);
    };
    
    /**
     * DMV.Window.Stat_Distribute.prototype.moveToToggled()
     * Moves the window to the positioned deemed 'toggled'
     */
    dystwynd.moveToToggled = function() {
      moveToPosition(this, toggled_window_data, 255);
    };
    
    /**
     * DMV.Window.Stat_Distribute.prototype.refresh()
     * Refreshes the window, clears previous data and draws anew
     * @note only redraws data if window is toggled
     */
    dystwynd.refresh = function() {
      this.contents.clear();
      if (this._hasgottoggled){
        this.drawDystPtsText();
      }
    };
    
    /**
     * DMV.Window.Stat_Distribute.prototype.createStatUpButtons()
     * Creates all buttons used to gain stat points
     */
    dystwynd.createStatUpButtons = function() {
      var pd = this.padding;
      this._bt_array_u = [];
      for (var i = 0; i < 8; i++) {
        var button = DMV.createIconButton(32 + i, 40 + i, this);
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
    dystwynd.createStatDownButtons = function() {
      var pd = this.padding;
      this._bt_array_d = [];
      for (var i = 0; i < 8; i++) {
        var button = DMV.createIconButton(48 + i, 56 + i, this);
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
    dystwynd.drawDystPtsText = function() {
      var x, y, w, v, a = $gameParty.menuActor();
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
    dystwynd.standardBackOpacity = function() {
      return 255;
    };  
    
    /**
     * DMV.Window.Stat_Distribute.prototype.doOnStatUp(statID)
     * @param statID the id of the stat to gain points in
     * Called internally when a stat gain button is pressed
     */
    dystwynd.doOnStatUp = function(statID){
      var actor = $gameParty.menuActor();
      if (actor.availDistParamPoints() > 0){
        actor.addDistParamPlus(statID, 1);
        this.refreshOnStatChange();
        SoundManager.playOk();
      }else{
        SoundManager.playBuzzer();
      }
    }
    
    /**
     * DMV.Window.Stat_Distribute.prototype.doOnStatDown(statID)
     * @param statID the id of the stat to lose points in
     * Called internally when a stat lose button is pressed
     */
    dystwynd.doOnStatDown = function(statID){
      var actor = $gameParty.menuActor();
      if (actor.distParamPoints(statID) > default_min_values[statID]){
        actor.addDistParamPlus(statID, -1);
        this.refreshOnStatChange();
        SoundManager.playOk();
      }else{
        SoundManager.playBuzzer();
      }
    }
    
    /**
     * DMV.Window.Stat_Distribute.prototype.refreshOnStatChange()
     * Called internally when any stat altering button is pressed
     */
    dystwynd.refreshOnStatChange = function(){
      SceneManager._scene._statusWindow.refresh();
      this.refresh();
    }
    
    /**
     * End Window Declarations
     */
  })($.Window.Stat_Distribute.prototype);


  /**\\\\\\\\\\\\\\\\\\\\\
   * Other scenes affected
   **/////////////////////

  /**
   * Scene_Boot.prototype.loadSystemImages()
   * Preloads distribution button image
   */
  var sc_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    ImageManager.loadSystem('DMV Dyst Button');
    sc_loadSystemImages.apply(this, arguments);
  };

  /**
   * Scene_Status.prototype.create()
   * Creates the scene and also the new distribute window
   */
  var sc_create = Scene_Status.prototype.create;
  Scene_Status.prototype.create = function() {
    sc_create.apply(this, arguments);
    this._dystwynd = new $.Window.Stat_Distribute();
    this.addChild(this._dystwynd);
  };

  /**
   * Scene_Status.prototype.refreshActor()
   * Called when actor changes and windows require refreshing 
   */
  var sc_refreshActor = Scene_Status.prototype.refreshActor;
  Scene_Status.prototype.refreshActor = function() {
    sc_refreshActor.apply(this, arguments);
    this.refreshDistribution();
  };

  Scene_Status.prototype.refreshDistribution = function() {
    if (this._dystwynd !== undefined){this._dystwynd.refresh()};
  };
  /**
   * End DMV Declarations
   */
})(DMV);
/**
 * End Plugin
 * www.dekyde.com
 */
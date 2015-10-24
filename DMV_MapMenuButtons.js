// ============================================================================
// Plug-in: DMV_MapMenuButtons.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin allows for the game map screen to show some 
 * cool menu buttons that run user defined code upon trigger.
 * 
 * @param Button 1 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 1
 * @default 466, 2, 1, 17
 *
 * @param Button 1 Func
 * @desc Sets the function used for when button 1 is triggered
 * @default SceneManager.push(Scene_Item)
 *
 * @param Button 2 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 2
 * @default 500, 2, 2, 18
 *
 * @param Button 2 Func
 * @desc Sets the function used for when button 2 is triggered
 * @default $gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Skill)
 *
 * @param Button 3 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 3
 * @default 534, 2, 3, 19
 *
 * @param Button 3 Func
 * @desc Sets the function used for when button 3 is triggered
 * @default $gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Equip)
 *
 * @param Button 4 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 4
 * @default 568, 2, 4, 20
 *
 * @param Button 4 Func
 * @desc Sets the function used for when button 4 is triggered
 * @default $gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Status)
 *
 * @param Button 5 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 5
 * @default 602, 2, 5, 21
 *
 * @param Button 5 Func
 * @desc Sets the function used for when button 5 is triggered
 * @default SceneManager.push(Scene_Options)
 *
 * @param Button 6 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 6
 * @default 636, 2, 6, 22
 *
 * @param Button 6 Func
 * @desc Sets the function used for when button 6 is triggered
 * @default SceneManager.push(Scene_Save)
 *
 * @param Button 7 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 7
 * @default 670, 2, 7, 23
 *
 * @param Button 7 Func
 * @desc Sets the function used for when button 7 is triggered
 * @default SceneManager.push(Scene_GameEnd)
 *
 * @param Button 8 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 8
 * @default -1, -1, 0, 0
 *
 * @param Button 8 Func
 * @desc Sets the function used for when button 8 is triggered
 * @default null
 *
 * @param Button 9 Data
 * @desc Sets the x, y, coldIcon and hotIcon for button 9
 * @default -1, -1, 0, 0
 *
 * @param Button 9 Func
 * @desc Sets the function used for when button 9 is triggered
 * @default null
 *  
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin creates upto 9 map buttons that can be used to run almost any 
 * code you desire. By default, 7 of these buttons trigger the main menu
 * scenes, and 2 buttons are left used to allow for expansion with custom 
 * plugins that create a new scene. 
 * 
 * Each button consists of two states - hot, and cold. 
 * Cold state means that the button is not being pressed, hot means that it is. 
 * Each state also has its own image, in this case, an icon. This means that
 * each map button is designated two icon id's, one for hot, and one for cold. 
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
    DMV.register("MapMenuButtons", "1.0.0", "23/1o/2o15");
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
  var params = PluginManager.parameters('DMV_MapMenuButtons');
  
  /**
   * button_data
   * Holds array of all button position data
   */
  var button_data = [
    $.mapParams2n(params["Button 1 Data"]),
    $.mapParams2n(params["Button 2 Data"]),
    $.mapParams2n(params["Button 3 Data"]),
    $.mapParams2n(params["Button 4 Data"]),
    $.mapParams2n(params["Button 5 Data"]),
    $.mapParams2n(params["Button 6 Data"]),
    $.mapParams2n(params["Button 7 Data"]),
    $.mapParams2n(params["Button 8 Data"]),
    $.mapParams2n(params["Button 9 Data"]),
  ];

  /**
   * button_func
   * Holds array of all button function strings
   */
  var button_func = [
    params["Button 1 Func"],params["Button 2 Func"],
    params["Button 3 Func"],params["Button 4 Func"],
    params["Button 5 Func"],params["Button 6 Func"],
    params["Button 7 Func"],params["Button 8 Func"],
    params["Button 9 Func"],
  ];

  /**
   * map_buttons
   * Holds array of all buttons current displayed on the map
   */
  var map_buttons = [];

  /**
   * Spriteset_Map.prototype.createUpperLayer();
   * Calls previous function definition and then creates
   * all the menu buttons that should be shown on the map
   */
  var createUpper = Spriteset_Map.prototype.createUpperLayer;
  Spriteset_Map.prototype.createUpperLayer = function() {
    createUpper.apply(this, arguments);
    this.createMapMenuButtons();
  };

  /**
   * Spriteset_Map.prototype.createMapMenuButtons();
   * Adds all menu buttons that should be shown onto
   * the spriteset and then positions them correctly
   */
  Spriteset_Map.prototype.createMapMenuButtons = function() {
    if (map_buttons.length > 0){
      map_buttons.length = 0;
    }
    var button, data;
    for (var i = 0; i < 9; i++){
      data = button_data[i];
      if (data[0] != -1 && data[1] != -1){
        button = DMV.createIconButton(data[2],data[3],this);
        button.setClickHandler(Function(button_func[i]).bind(this));
        button.x = data[0]; button.y = data[1];
        map_buttons.push(button);
      }
    }
  };

  /**
   * Game_Temp.prototype.setDestination(x,y)
   * Ensures a button is not pressed at the desired
   * point and if not, allows the previous definition
   * to be called which will make the player move. 
   */
  var setDest = Game_Temp.prototype.setDestination;
  Game_Temp.prototype.setDestination = function(x, y) {
    if (allowSetDestination()){
      setDest.apply(this, arguments);
    };
  };

  /**
   * [ private ] allowSetDestination()
   * Ensures a button was not pressed at the current TouchInput x && y
   * Called internally from within Game_Temp.setDestination
   * @return false if input was within the space of a button.
   * @return true otherwise.
   */
  function allowSetDestination(){
    var bt, ix, iy;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var s = map_buttons.length;
    for (var i = 0; i < s; i++){
      bt = map_buttons[i];
      ix = (x >= bt.x) && (x <= bt.x + bt.width);
      iy = (y >= bt.y) && (y <= bt.y + bt.height);
      if (ix && iy) {return false};
    }
    return true
  }

  /**
   * Scene_Status.prototype.start()
   * Ensures the status window is refreshed upon scene start
   * This fixes a bug where actors faces would not show
   */
  var scene_Status_start = Scene_Status.prototype.start;
  Scene_Status.prototype.start = function() {
    scene_Status_start.apply(this, arguments);
    this._statusWindow.refresh();
  };

  /**
   * Scene_Equip.prototype.start()
   * Ensures the status window is refreshed upon scene start
   * This fixes a bug where actors faces would not show
   * @note this has no effect unless using a custon script
   *  that would show the actor face within equip scene
   */
  var scene_Equip_start = Scene_Equip.prototype.start;
  Scene_Equip.prototype.start = function() {
    scene_Equip_start.apply(this, arguments);
    this._statusWindow.refresh();
  };

  /**
   * Scene_Skill.prototype.start()
   * Ensures the status window is refreshed upon scene start
   * This fixes a bug where actors faces would not show
   */
  var scene_Skill_start = Scene_Skill.prototype.start;
  Scene_Skill.prototype.start = function() {
    scene_Skill_start.apply(this, arguments);
    this._statusWindow.refresh();
  };
  /**
   * End declarations
   */
})(DMV)
/**
 * End Plugin
 * www.dekyde.com
 */
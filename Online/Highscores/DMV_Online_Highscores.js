// ============================================================================
// Plug-in: DMV_Online_Highscores.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc This plugin allows for customizable highscore lists to be 
 * shown within your RPG Maker Mv Project.
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * Please note, most of this plugins options and customization resides within
 * the plugin code itself. 
 * 
 * The information within this sort help section is dedicated mainly to the 
 * Event Command 'Plugin Commands'. 
 * 
 * Plugin commands are as follows; 
 * 
 * highscore view LISTNAME
 * highscore add LISTNAME
 * 
 * Example, choose 'plugin command' in the event command selection screen,
 * from there, type in the box one of the plugin commands for this system.
 * In this example, that would be either 'highscore view LISTNAME', or
 * 'highscore add LISTNAME' - where LISTNAME is a valid list identifier. 
 * 
 * This system then decides how to respond to your command :-
 * For viewing a list, it will obtain the list data and return it to be
 * processed by the highscore scene. 
 * 
 * However, for adding a new highscore things are a little different - or
 * rather, they are no different at all, which may not be how you might 
 * expect as this process does not allow you to specify a new highscore entry.
 *  
 * The system works as follows;
 * - Receives command 
 * - Checks command type (view or add)
 * - Ensures LISTNAME is a valid list identifier
 * - Setup data to be entered as the new highscore entry (if adding score)
 * - Send the data to the server to be processed
 * - Returns data from the server to be processed by this system
 * 
 * This may leave you wondering - how does the system know what to use for
 * the name, and score, within my new highscore entries that are added..
 * The answer to that is simple - YOU decide them in advance. :D
 * 
 * Customization settings in the form of string formulas allow for code to 
 * be predetermined and 'evaluated' as and when the system requires it. 
 * This allows for the system to easily utilize any available variable
 * (within a global scope) to determine the name and score values.
 * 
 * Additionally, this system boasts the use of an 'Extra' data slot.
 * This could be used to display extra information within the highscore scene.
 * 
 * For example, you may have a highscore list to show the highest damage dealt
 * to some boss enemy. Using the extra data slot - and your own programming 
 * expertise - you could hold record, and display the skill that was used to 
 * deal that unbelievable damage value. 
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
 * You are not allowed to redistribute this plugin directly. 
 * Instead, please provide a link to the following website;
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
 * You can get the latest versions of my Mv plugins from www.dekyde.com/dmv
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
    DMV.register("Online_Highscores", "1.0.0", "13/1o/2o15");
  }
})();

/**
 * AnonomousFunction(DMV) 
 */
(function($){
  /**
   * use strict mode to give code a stronger smell 
   */
  "use strict";

  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * Customization Section Begin
   **///////////////////////////

  /**
   * host (string)
   * 
   * The website address for the server that holds the php
   * files & sql databases that this system interacts with
   * remember to include http(s?):// even for localhost.
   */ 
  var host = "http://dekyde.com/dmv-osohigh/";

  /**
   * keys (object)
   * 
   * The request type keyword to send the host.
   * @param add_new (string): The keyword used when sending new scores.
   * @param get_all (string): The keyword used when obtaining list data. 
   */ 
  var keys = {add_new:'add', get_all:'get'};

  /**
   * default_position (object)
   * 
   * @param x (string): Formula to calculate window x position  
   * @param y (string): Formula to calculate window y position
   * @param w (string): Formula to calculate window width
   * @param h (string): Formula to calculate window height
   * 
   * @note arguments[0] holds refrence to either 1 of 2 values.
   *  for the x formula, it holds the window width value, for 
   *  the y formula, it holds the height value. 
   *  This is to allow for perfect centering of the window.
   */
  var default_position = {
    x: "Graphics.boxWidth/2-(arguments[0]/2)",
    y: "Graphics.boxHeight/2-(arguments[0]/2)",
    w: "Graphics.boxWidth/2",
    h: "this.lineHeight()*10",
  };

  /**
   * default_scorename (string)
   * 
   * This string holds the default formula that determines how new 
   * highscore entries name field is filled when new scores are added. 
   */
  var default_scorename = "$gameActors.actor(1).name()";

  /**
   * highscore_lists (object)
   * 
   * Each element within this array is a highscore list data object.
   * These objects are used to determine which data, and how to display 
   * said data within the game highscore scene. 
   * 
   * @param head (string): String to detrmine the list header name
   * @param posi (object): See default_position for object params
   * @param post (object): See below for params;
   * @param post.sname (string): Forumla for new highscore name 
   * @param post.score (string): Forumla for new highscore score
   * @param post.extra (string): Forumla for new highscore extra data
   * @note "''" Ensures the extra field is an emptry string (required when unused)
   */
  var highscore_lists = {
    // 
    // List Identifier: Test
    // 
    "Test": { 
      head: 'Test List',
      posi: default_position,
      post: {
        sname: default_scorename,
        score: "$gameVariables.value(1)",
        extra: "''",
      },
    },
    // 
    // List Identifier: DefaultList1
    // 
    "DefaultList1": { 
      head: 'My Highscore List',
      posi: default_position,
      post: {
        sname: default_scorename,
        score: "$gameVariables.value(1)",
        extra: "''",
      },
    },
    // 
    // List Identifier: DefaultList2
    // 
    "DefaultList2": {
      head: 'Example List 2',
      posi: default_position,
      post: {
        sname: default_scorename,
        score: "$gameVariables.value(2)",
        extra: "''",
      },
    },
    // 
    // List Identifier: DefaultList3
    // 
    "DefaultList3": { 
      head: 'Example List 3',
      posi: default_position,
      post: {
        sname: default_scorename,
        score: "$gameVariables.value(3)",
        extra: "''",
      },
    },
    // 
    // More lists go here
    // 
  };

  /**\\\\\\\\\\\\\\\\\\\\\\\\\
   * Customization Section End
   **/////////////////////////


  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * DMV.HTTP Variables && Functions
   **///////////////////////////////
  (function(http) {
    /**
     * DMV.HTTP.getHighscores(listID, funk, thisObj)
     * @param listID the unique list id to send the api
     * @param funk the function to call when finished
     * @param thisObj the  object to send as 'this' to funk
     * @return false only if listID is invalid
     */
    http.getHighscores = function(listID, funk, thisObj){
      if (!highscore_lists[listID]){return false};
      var data = 'data=' + keys.get_all +"/" + listID;
      DMV.HTTP.postAsync(host,data,funk,thisObj);
    };
    /**
     * DMV.HTTP.postHighscore(listID, name, score, extra)
     * @param listID the unique list id to send the api
     * @param name the new list entry name
     * @param score the new list entry score
     * @param extra the new list entry extra data
     * @return false only if listID is invalid
     */
    http.postHighscore = function(listID, name, score, extra){
      if (!highscore_lists[listID]){return false};
      var post = 'data=' + keys.add_new +"/" + listID + '/';
      post = post + name + ',' + score + ',' + extra;
      DMV.HTTP.postAsync(host,post, function(replystring){
        console.log(replystring);
      });
    };
    /**
     * End DMV.HTTP declarations
     */
  })($.HTTP);


  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * Game_Interpreter Variables && Functions
   **///////////////////////////////////////
  (function(terp){
    /**
     * Game_Interpreter.prototype.pluginCommand(command, args)
     * Processes highscore plugin commands
     */
    var opluginCommand = terp.pluginCommand;
    terp.pluginCommand = function(command, args) {
      if (command.contains("highscore")){
        this.highscorePluginCommand(args);
      }else{
        opluginCommand.apply(this, arguments);
      }
    };
    /**
     * Game_Interpreter.prototype.highscorePluginCommand(args)
     * Processes highscore plugin commands to view and add scores
     */
    terp.highscorePluginCommand = function(args) {
      switch(args[0]){
        case "view": this.openHighscoreScene(args[1]); break;
        case "add":  this.addNewHighscore(args[1]); break;
      }
    };
    /**
     * Game_Interpreter.prototype.openHighscoreScene(listID)
     * @param listID the unique list id to send the api
     * @return false only if listID is invalid
     * Opens the highscore scene for listID
     */
    terp.openHighscoreScene = function(listID){
      if (!highscore_lists[listID]){return false};
      SceneManager.push($.Scene.Highscore);
      SceneManager.prepareNextScene(listID);
    };
    /**
     * Game_Interpreter.prototype.addNewHighscore(listID)
     * @param listID the unique list id to send the api
     * @return false only if listID is invalid
     * Adds highscore into list for listID
     */
    terp.addNewHighscore = function(listID) {
      if (!highscore_lists[listID]){return false};
      var ldata = highscore_lists[listID].post;
      var sname = Function('return '+ldata.sname).apply(this);
      var score = Function('return '+ldata.score).apply(this);
      var extra = Function('return '+ldata.extra).apply(this);
      $.HTTP.postHighscore(listID, sname, score, extra);
    };
    /**
     * End Game_Interpreter.prototype declarations
     */
  })(Game_Interpreter.prototype);

  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * DMV.Scene.Highscore Variables && Functions
   **//////////////////////////////////////////
  $.Scene.Highscore = $.extend(Scene_MenuBase);
  (function(high){
    /**
     * DMV.Scene.Highscore.prototype.initialize()
     * Initializes highscore scene.
     */
    high.initialize = function() {
      Scene_MenuBase.prototype.initialize.call(this);
    };
    /**
     * DMV.Scene.Highscore.prototype.prepare(listID)
     * Prepares teh highscore scenes list.
     */
    high.prepare = function(listID) {
      this._listID = listID;
    };
    /**
     * DMV.Scene.Highscore.prototype.create()
     * Create the highscore scenes windows. 
     */
    high.create = function() {
      Scene_MenuBase.prototype.create.call(this);
      this._highwind = new $.Window.Highscore(this._listID);
      this._highwind.setHandler('cancel',this.popScene.bind(this));
      this.addWindow(this._highwind);
    };
    /**
     * End DMV.Scene.Highscore.prototype declarations
     */
  })($.Scene.Highscore.prototype);


  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * DMV.Window.Highscore Variables && Functions
   **///////////////////////////////////////////
  $.Window.Highscore = $.extend(Window_Selectable);
  (function(high){
    /**
     * DMV.Window.Highscore.prototype.initialize(listID)
     * Initialize the highscore widnwo for listID
     */
    high.initialize = function(listID) {
      var d = highscore_lists[this._listID = listID].posi;
      var w = Function('return '+d.w).apply(this);
      var h = Function('return '+d.h).apply(this);
      var x = Function('return '+d.x).apply(this,[w]);
      var y = Function('return '+d.y).apply(this,[h]);
      Window_Selectable.prototype.initialize.call(this,x,y,w,h);
      this.drawText('Loading...', 0, 0, this.contentsWidth());
      $.HTTP.getHighscores(this._listID,this.requestReturned,this)
      this.activate();
    };
    /**
     * DMV.Window.Highscore.prototype.requestReturned(replystring)
     * This function is called automatically when refreshing list
     */
    high.requestReturned = function(replystring){
      this.refresh(replystring.split(';'));
      console.log(replystring);
    }
    /**
     * DMV.Window.Highscore.prototype.refresh(scoreArray)
     * Refreshes the highscore list if scoreArray is valid 
     * if it is not valid, the list will just be cleared.
     */
    high.refresh = function(scoreArray) {
      this.contents.clear();
      if (!scoreArray){ return false };
      var width = this.contentsWidth();
      var basey = this.lineHeight();
      var lname = highscore_lists[this._listID].head;
      this.drawText(lname, 0, 0, width, 'center');
      for (var i = scoreArray.length - 1; i >= 0; i--) {
        var data = scoreArray[i].split(',');
        this.drawText(data[0], 0, basey*(i+1), width, 'left');
        this.drawText(data[1], 0, basey*(i+1), width, 'right');
      };
    }
    /**
     * End DMV.Window.Highscore.prototype declarations
     */
  })($.Window.Highscore.prototype);
  /**
   * End DMV declarations
   */
})(DMV);
/**
 * End plugin
 * www.dekyde.com
 */
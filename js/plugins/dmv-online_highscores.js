/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-online_highscores.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This plugin allows for customizable highscore lists to be 
* shown within your RPG Maker Mv Project.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
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
* @param param1
* @desc Describes parameter 1
* Default: a-string-or-other-thing
* @default a-string-or-other-thing 
* 
* ============================================================================
*/ 
(function dmv_online_highscores(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "online_highscores";
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

    /*\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    * Customization Section Begin
    **////////////////////////////

    /**
    * host (string)
    * 
    * The website address for the server that holds the php
    * files & sql databases that this system interacts with
    * remember to include http(s?):// even for localhost.
    */ 
    const host = "https://www.dekitarpg.com/highs/";

    /**
    * keys (object)
    * 
    * The request type keyword to send the host.
    * @param add_new (string): The keyword used when sending new scores.
    * @param get_all (string): The keyword used when obtaining list data. 
    */ 
    const keys = {add_new:'add', get_all:'get'};

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
    const default_position = {
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
    const default_scorename = "$gameActors.actor(1).name()";

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
    const highscore_lists = {
        // 
        // List Identifier: Test
        // 
        "Test": { 
            head: 'MiniGame Leaderboard',
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

    /*\\\\\\\\\\\\\\\\\\\\\\\\\\
    * Customization Section End
    **//////////////////////////

    /**
    * $this_class: DMV.HTTP
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent) {
        /**
        * DMV.HTTP.getHighscores(listID, funk, thisObj)
        * @param listID the unique list id to send the api
        * @param funk the function to call when finished
        * @param thisObj the  object to send as 'this' to funk
        * @return false only if listID is invalid
        */
        $this_class.getHighscores = function(listID, funk, thisObj){
            if (!highscore_lists[listID]) return false;
            let data = 'data=' + keys.get_all +"/" + listID;
            this.postAsync(host,data,funk,thisObj);
        };

        /**
        * DMV.HTTP.postHighscore(listID, name, score, extra)
        * @param listID the unique list id to send the api
        * @param name the new list entry name
        * @param score the new list entry score
        * @param extra the new list entry extra data
        * @return false only if listID is invalid
        */
        $this_class.postHighscore = function(listID, name, score, extra){
            if (!highscore_lists[listID]) return false;
            let post = 'data=' + keys.add_new +"/" + listID + '/';
            post = post + name + ',' + score + ',' + extra;
            this.postAsync(host,post,function(replystring){
                console.log(replystring);
            });
        };

        /**
        * End DMV.HTTP declarations
        */
    })(DMV.HTTP, undefined);


    /**
    * $this_class: Game_Interpreter.prototype
    * parent: undefined
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */
        const opluginCommand = $this_class.pluginCommand;

        /**
        * Game_Interpreter.prototype.pluginCommand(command, args)
        * Processes highscore plugin commands
        */
        $this_class.pluginCommand = function(command, args) {
            if (command.contains("highscore")){
                this.highscorePluginCommand(args);
            } else {
                opluginCommand.apply(this, arguments);
            }
        };

        /**
        * Game_Interpreter.prototype.highscorePluginCommand(args)
        * Processes highscore plugin commands to view and add scores
        */
        $this_class.highscorePluginCommand = function(args) {
            switch(args[0]){
                case "view": this.openHighscoreScene(args[1]);  break;
                case "add":  this.addNewHighscore(args[1]);     break;
            }
        };

        /**
        * Game_Interpreter.prototype.openHighscoreScene(listID)
        * @param listID the unique list id to send the api
        * @return false only if listID is invalid
        * Opens the highscore scene for listID
        */
        $this_class.openHighscoreScene = function(listID){
            if (!highscore_lists[listID]) return false;
            SceneManager.push(DMV.Scene.Highscore);
            SceneManager.prepareNextScene(listID);
        };

        /**
        * Game_Interpreter.prototype.addNewHighscore(listID)
        * @param listID the unique list id to send the api
        * @return false only if listID is invalid
        * Adds highscore into list for listID
        */
        $this_class.addNewHighscore = function(listID) {
            if (!highscore_lists[listID]) return false;
            let ldata = highscore_lists[listID].post;
            let sname = Function('return '+ldata.sname).apply(this);
            let score = Function('return '+ldata.score).apply(this);
            let extra = Function('return '+ldata.extra).apply(this);
            DMV.HTTP.postHighscore(listID, sname, score, extra);
        };

        /**
        * End Game_Interpreter.prototype declarations
        */
    })(Game_Interpreter.prototype, undefined);

    /*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    * DMV.Scene.Highscore Variables && Functions
    **///////////////////////////////////////////
    DMV.Scene.Highscore = DMV.createClass(Scene_MenuBase);

    /**
    * $this_class: DMV.Scene.Highscore.prototype
    * parent: Scene_MenuBase.prototype
    */
    (function($this_class, parent){
        /**
        * DMV.Scene.Highscore.prototype.initialize()
        * Initializes highscore scene.
        */
        $this_class.initialize = function() {
            parent.initialize.call(this);
        };
        
        /**
        * DMV.Scene.Highscore.prototype.prepare(listID)
        * Prepares teh highscore scenes list.
        */
        $this_class.prepare = function(listID) {
            this._listID = listID;
        };
        
        /**
        * DMV.Scene.Highscore.prototype.create()
        * Create the highscore scenes windows. 
        */
        $this_class.create = function() {
            parent.create.call(this);
            this._highwind = new DMV.Window.Highscore(this._listID);
            this._highwind.setHandler('cancel',this.popScene.bind(this));
            this.addWindow(this._highwind);
        };
        
        /**
        * End DMV.Scene.Highscore.prototype declarations
        */
    })(DMV.Scene.Highscore.prototype, Scene_MenuBase.prototype);


    /*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    * DMV.Window.Highscore Variables && Functions
    **////////////////////////////////////////////
    DMV.Window.Highscore = DMV.createClass(Window_Selectable);

    /**
    * $this_class: DMV.Window.Highscore.prototype
    * parent: Window_Selectable.prototype
    */
    (function($this_class, parent){
        /**
        * DMV.Window.Highscore.prototype.initialize(listID)
        * Initialize the highscore widnwo for listID
        */
        $this_class.initialize = function(listID) {
            let d = highscore_lists[this._listID = listID].posi;
            let w = Function('return '+d.w).apply(this);
            let h = Function('return '+d.h).apply(this);
            let x = Function('return '+d.x).apply(this,[w]);
            let y = Function('return '+d.y).apply(this,[h]);
            parent.initialize.call(this,x,y,w,h);
            this.drawText('Loading...', 0, 0, this.contentsWidth());
            DMV.HTTP.getHighscores(this._listID,this.requestReturned,this)
            this.activate();
        };
        /**
        * DMV.Window.Highscore.prototype.requestReturned(replystring)
        * This function is called automatically when refreshing list
        */
        $this_class.requestReturned = function(replystring){
            this.refresh(replystring.split(';'));
            console.log(replystring);
        };
        /**
        * DMV.Window.Highscore.prototype.refresh(scoreArray)
        * Refreshes the highscore list if scoreArray is valid 
        * if it is not valid, the list will just be cleared.
        */
        $this_class.refresh = function(scoreArray) {
            this.contents.clear();
            if (!scoreArray) return false;
            let width = this.contentsWidth();
            let basey = this.lineHeight();
            let lname = highscore_lists[this._listID].head;
            this.drawText(lname, 0, 0, width, 'center');
            for (var i = scoreArray.length - 1; i >= 0; i--) {
                let data = scoreArray[i].split(',');
                this.drawText(data[0], 0, basey*(i+1), width, 'left');
                this.drawText(data[1], 0, basey*(i+1), width, 'right');
            }
        };
        /**
        * End DMV.Window.Highscore.prototype declarations
        */
    })(DMV.Window.Highscore.prototype, Window_Selectable.prototype);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
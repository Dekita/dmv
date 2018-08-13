/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-online_checker.js
* Version: 1.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Simply checks to ensure that the game has internet connection
* when internet is lost, an image is displayed to advise the player.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin simply checks if there is an internet connection, and if not, 
* it stops the game from processing any further. 
* 
* A few options have been defined for how this system operates. For example, 
* you can rely solely on the default browser method for checking connectivity, 
* or you can also utilize a server by pinging it for data.
* 
* By using the 'navigator.onLine' function of modern browsers, its very easy
* to get connection data for most people; however, there is a quirk in this.
* 
* navigator.onLine will always return true ~IF~ there is a 'virtual machine' 
* installed on the computer. This means if your only using this to check for
* online status, it could be wrong! Again, this only happens if running a vm.
* There is no way to avoid this with the navigator.onLine property, as the
* way that vm's are implimented, they will always look like an available 
* internet connection to your pc, so your pc thinks it has internet, and 
* when navigator checks, it thinks the same.
* 
* Due to this quirk, I have also added the ability to 'ping' a server.
* a ping is basically sending a get request to a server, if the request is 
* able to return valid information, then we are clearly online, and if not
* then we arent, or the connection is too slow!
* 
* To full utilize the 'server ping' feature, you would need to have a 
* server that is able to run with cors enabled (cross origin policies)
* If you dont know what that means, its best to leave this feature disabled.
* 
* If your using a node.js express server, cors can be added to a specific 
* route very easily. see the example code below;
* 
* app.get('/ping', function(req, res){
*    let headstr = "Origin, X-Requested-With, Content-Type, Accept";
*    res.header("Access-Control-Allow-Origin", "*");
*    res.header("Access-Control-Allow-Headers", headstr);
*    res.send('pong');
* });
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
* DMV.is_online
* This script call will return true or false based on if an online
* connection has been detected.
* 
* Graphics.setOnlineStatusImage('path/to/image.png')
* Does what it says and sets a new image for the online status display
* ~ This is the image shown when cannot determine internet connection.
* 
* 
* ============================================================================
* ■ Plugin Commands:
* ============================================================================
* 
* force-refresh-ping
* This command will force a ping request to the server, even if there was a
* request sent recently. This only works when 'do-ping' option is true.
* 
* 
* ============================================================================
* ■ Events [Advanced]:
* ============================================================================
* 
* This system uses EventEmitters to emit various states/events of the 
* DMV.HTTP.ConnEmit class - which is used internally by this system.
* 
* The DMV.HTTP.ConnEmit class emits 3 events, they are as follows:
* ping  - Emitted when sending a ping request to a server
* pong  - Emitted when the ping request has returned data
* error - Emitted when there is an error from ping request
* 
* These events can be 'hooked into' using event emitters standard 'on' 
* function. See the examples below for more details:..
* 
* DMV.HTTP.ConnEmit.on('ping', function( time_ping_sent ){
*    // Do stuff when ping event occurs:..
* });
* 
* DMV.HTTP.ConnEmit.on('pong', function( ms_taken, reply_data ){
*    // Do stuff when pong event occurs:..
* });
* 
* DMV.HTTP.ConnEmit.on('error', function( error_data ){
*    // Do stuff when error event occurs:..
* });
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
* v.1.0.0 - Initial Release,
* 
* 
* ============================================================================
* Visit www.dekitarpg.com for more!
* ============================================================================
* 
* @param stop-map-if-offline
* @desc Stops the game map from processing if no 'online' status is detected.
* Default: true (can be true | false)
* @default true
* 
* @param stop-scene-if-offline
* @desc Stops all scenes from processing if offline for a few seconds.
* Default: true (can be true | false)
* @default true
* 
* @param offline-splash-image
* @desc Sets the path for the image to display when offline.
* Default: img/system/lost-connection.png
* @default img/system/lost-connection.png
* 
* @param do-ping
* @desc Determines if we send a real ping to some server or not.
* this helps with the quirks of using navigator.onLine.
* Default: false (can be true | false)
* @default false
* 
* @param ping-ip
* @desc The url/ip address of the server to send a ping to.
* You should set this to your own server for pinging.
* Default: https://www.dekitarpg.com/ping
* @default https://www.dekitarpg.com/ping
* 
* @param ping-freq
* @desc Sets how often the ping request will be sent to the server.
* Default: 60 (time is calculated in seconds)
* @default 60 
* 
* ============================================================================
*/ 
(function dmv_online_checker(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "online_checker";
    const PLUGIN_VERSION = "1.0.0";

    /**
    * Checks for DMV Core plugin and register if available
    */
    if (typeof DMV === 'undefined') {
        let LOAD_ERROR = "Oh No! A Plugin Hasn't Loaded!!\n\n";
        LOAD_ERROR += "You need to install dmv-core.js to use:\n";
        LOAD_ERROR += `dmv-${PLUGIN_NAME}.js\n\n`;
        LOAD_ERROR += "Ensure you have dmv-core.js loaded before other dmv plugins!\n";
        LOAD_ERROR += "Head to dekitarpg.com/dmv to get the latest plugin versions!!";
        return alert(LOAD_ERROR);
    }
    
    /**
    * Checks for DMV Core's required version
    */
    if (DMV.isRegistered('kore', '2.0.1')){
        let LOAD_ERROR = "Oh No! Your version of 'dmv-kore.js is out of date!!\n\n";
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
    * TRIGGER_EVENT_WAIT_IF_OFFLINE
    * If true stops events processing when offline
    */ 
    const TRIGGER_EVENT_WAIT_IF_OFFLINE = params['stop-map-if-offline'].contains('true');

    /**
    * TRIGGER_STOP_SCENE_IF_OFFLINE
    * If true stops scene processing if offline for more than 5 seconds
    */ 
    const TRIGGER_STOP_SCENE_IF_OFFLINE = params['stop-scene-if-offline'].contains('true');

    /**
    * DEFAULT_OFFLINE_IMAGE
    * Stores the default image for showing when offline
    */ 
    const DEFAULT_OFFLINE_IMAGE = params['offline-splash-image'];
    
    /**
    * DMV.HTTP.ConnEmit {DMV.Emitter}
    * EventEmitter instance for managing connection status
    */ 
    DMV.HTTP.ConnEmit = new DMV.Emitter();

    /**
    * DMV.HTTP.ConnEmit.DO_PING
    * If true then system will send ping requests to a server
    */ 
    DMV.HTTP.ConnEmit.DO_PING = params['do-ping'].contains('true');

    /**
    * DMV.HTTP.ConnEmit.PING_IP
    * This stores the ip address string for sending ping requests to
    */ 
    DMV.HTTP.ConnEmit.PING_IP = params['ping-ip'] || "http://localhost:8080/ping";

    /**
    * DMV.HTTP.ConnEmit.PING_FREQ
    * This stores the number of ms to wait before re-ping requesting
    */ 
    DMV.HTTP.ConnEmit.PING_FREQ = Number(params['ping-freq'] || 60) * 1000;

    /**
    * DMV.HTTP.ConnEmit.last_time
    * Stores the last time that we send a ping update
    */ 
    DMV.HTTP.ConnEmit.last_time = new Date();

    /**
    * DMV.HTTP.ConnEmit.last_navi
    * Stores boolean for last navigation.onLine check
    */ 
    DMV.HTTP.ConnEmit.last_navi = false;

    /**
    * DMV.HTTP.ConnEmit.last_ping
    * Stores boolean for last server ping check
    */ 
    DMV.HTTP.ConnEmit.last_ping = false;

    /**
    * DMV.HTTP.ConnEmit.offline_counter
    * Stores the number of updates done since lost connection
    */ 
    DMV.HTTP.ConnEmit.offline_counter = 0;
    

    /**
    * DMV.HTTP.ConnEmit.update()
    * Performs the main update for this system
    */ 
    DMV.HTTP.ConnEmit.update = function(){
        if (this.isOnline()) {
            this.offline_counter = 0;
        } else {
            this.offline_counter++;
        }
        this.last_navi = navigator && navigator.onLine;
        if (this.last_navi && this.DO_PING){
            let curr_time = new Date();
            if (curr_time-this.last_time > this.PING_FREQ){
                this.__doOnlineStatusPing(curr_time);
                this.last_time = curr_time;
            }
        }
        if (!this.DO_PING){
            this.last_ping = true;
        }
    };

    /**
    * DMV.HTTP.ConnEmit.__doOnlineStatusPing()
    * Sends the ping to server. also emits ping, pong and error events
    * @private
    */ 
    DMV.HTTP.ConnEmit.__doOnlineStatusPing = function(curr_time){
        this.emit('ping', curr_time);
        this.__do_ping(this.PING_IP, (pong_ms, pong_reply) => {
            this.last_ping = !isNaN(pong_ms);
            if (this.last_ping){
                this.emit('pong', pong_ms, pong_reply);
            } else {
                this.emit('error', pong_ms);
            }
        });
    };
    
    /**
    * DMV.HTTP.ConnEmit.__do_ping()
    * Sends the ping to server. 
    * @private
    */ 
    DMV.HTTP.ConnEmit.__do_ping = function(uri, pong){
        let started = new Date();
        DMV.HTTP.getAsync(uri, null, function(reply){
            if (reply === 'error' || reply === 'timeout'){
                if (pong) pong(reply);
            } else {
                if (pong) pong(new Date() - started, reply);
            }
        }, this);
    };

    /**
    * DMV.HTTP.ConnEmit.forcePingUpdate()
    * Forces a ping to the server. Even if one was sent recently.
    */ 
    DMV.HTTP.ConnEmit.forcePingUpdate = function(){
        this.__doOnlineStatusPing( new Date() );
    };

    /**
    * DMV.HTTP.ConnEmit.isOnline()
    * @returns true or false based on if connected to internet
    */ 
    DMV.HTTP.ConnEmit.isOnline = function(){
        return this.last_navi && this.last_ping;
    };

    /**
    * DMV.is_online
    * This is basically a shorthand alias for ease of use.
    * @returns DMV.HTTP.ConnEmit.isOnline()
    */ 
    DMV.reader(DMV, 'is_online', function(){
        return DMV.HTTP.ConnEmit.isOnline();
    });

    /**
    * $this_class: Graphics
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const aliased_initialize = $this_class.initialize;
        const aliased_update = $this_class._updateAllElements;

        /**
        * Initializes the graphics system.
        *
        * @static
        * @method initialize
        * @param {Number} width The width of the game screen
        * @param {Number} height The height of the game screen
        * @param {String} type The type of the renderer.
        *                 'canvas', 'webgl', or 'auto'.
        */
        $this_class.initialize = function(width, height, type) {
            aliased_initialize.apply(this, arguments);
            this._online_status_showing = false;
            this._onlineStatusCanvas = null;
            this._createOnlineStatusCanvas();
        };

        /**
        * @static
        * @method _createonlineStatusCanvas
        * @private
        */
        $this_class._createOnlineStatusCanvas = function() {
            this._onlineStatusCanvas = document.createElement('canvas');
            this._onlineStatusCanvas.id = 'onlineStatusCanvas';
            this._updateOnlineStatusCanvas();
            document.body.appendChild(this._onlineStatusCanvas);
        };

        /**
        * @static
        * @method _updateonlineStatusCanvas
        * @private
        */
        $this_class._updateOnlineStatusCanvas = function() {
            this._onlineStatusCanvas.width = this._width;
            this._onlineStatusCanvas.height = this._height;
            this._onlineStatusCanvas.style.zIndex = 4;
            this._centerElement(this._onlineStatusCanvas);
        };

        /**
        * @static
        * @method _clearonlineStatusCanvas
        * @private
        */
        $this_class._clearOnlineStatusCanvas = function() {
            let context = this._onlineStatusCanvas.getContext('2d');
            context.clearRect(0, 0, this._width, this._height);
            this._online_status_showing = false;
        };

        /**
        * @static
        * @method _paintOnlineStatusCanvas
        * @private
        */
        $this_class._paintOnlineStatusCanvas = function() {
            if (this._online_status_showing){
                this._clearOnlineStatusCanvas();
            }
            if (this._onlineStatusImage && !DMV.is_online) {
                let context = this._onlineStatusCanvas.getContext('2d');
                let dx = (this._width - this._onlineStatusImage.width) / 2;
                let dy = (this._height - this._onlineStatusImage.height) / 2;
                let alpha = (this._wentOfflineCount / 100).clamp(0, 1);
                context.save();
                context.globalAlpha = alpha;
                context.drawImage(this._onlineStatusImage, dx, dy);
                context.restore();
                this._online_status_showing = true;
            }
        };

        /**
        * @static
        * @method _updateAllElements
        * @private
        */
        $this_class._updateAllElements = function() {
            aliased_update.apply(this, arguments);
            this._updateOnlineStatusCanvas();
            this._paintOnlineStatusCanvas();
        };        

        /**
        * Sets the source of the "Online Status" image.
        *
        * @static
        * @method setOnlineStatusImage
        */
        $this_class.setOnlineStatusImage = function(src) {
            this._onlineStatusImage = new Image();
            this._onlineStatusImage.src = src;
        };

        /**
        * End this_class.prototype Declarations
        */ 
    })(Graphics, undefined);

    /**
    * $this_class: Scene_Base.prototype
    * parent: Stage.prototype
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const aliased_update = $this_class.update;

        /**
        * Scene_Base.prototype.update()
        * Aliased function to disallow game from
        * processing when offline, if desired.
        */ 
        $this_class.update = function() {
            if (TRIGGER_STOP_SCENE_IF_OFFLINE){
                if (DMV.HTTP.ConnEmit.offline_counter < 180){
                    aliased_update.apply(this, arguments);
                }
            } else {
                aliased_update.apply(this, arguments);
            }
        };

        /**
        * End of definitions:..
        */ 
    })(Scene_Base.prototype, Stage.prototype);

    /**
    * $this_class: SceneManager
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const aliased_initialize = $this_class.initGraphics;
        const aliased_updateScene= $this_class.updateScene;

        /**
        * Initializes the graphics system.
        */
        $this_class.initGraphics = function() {
            aliased_initialize.apply(this, arguments);
            Graphics.setOnlineStatusImage(DEFAULT_OFFLINE_IMAGE);
        };

        /**
        * Updates the scene informations.
        */
        $this_class.updateScene = function() {
            aliased_updateScene.apply(this, arguments);
            if (this._scene && this.isCurrentSceneStarted()) {
                DMV.HTTP.ConnEmit.update();
                Graphics._paintOnlineStatusCanvas();
            }
        };

        /**
        * End this_class.prototype Declarations
        */ 
    })(SceneManager, undefined);

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
            if (command.match(/force-refresh-ping/i) !== null){
                DMV.HTTP.ConnEmit.forcePingUpdate();
            } else {
                opluginCommand.apply(this, arguments);
            }
        };

        /**
        * End Game_Interpreter.prototype declarations
        */
    })(Game_Interpreter.prototype, undefined);

    /**
    * $this_class: Game_Map.prototype
    * parent: undefined
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const aliased_isEventRunning = $this_class.isEventRunning;

        /**
        * Game_Map.prototype.isEventRunning()
        * Aliased function to disallow game from
        * processing when offline, if desired.
        */ 
        $this_class.isEventRunning = function() {
            if (TRIGGER_EVENT_WAIT_IF_OFFLINE){
                if (!DMV.is_online) return true;
            }
            return aliased_isEventRunning.apply(this, arguments);
        };

        /**
        * End of definitions:..
        */ 
    })(Game_Map.prototype, undefined);

    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
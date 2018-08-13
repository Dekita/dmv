/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-core.js
* Version: 2.0.1
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc DMV_Core contains functions that are used within some of 
* the more advanced RPG Maker MV plugins of mine. 
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin is required to use ALL of my other RPG Maker MV plugins.
* Ensure that this plugin is also loaded before all other DMV plugins. 
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
* v.2.0.1 - Added DMV.Emitter class, 
*         - Added DMV.HTTP basic error and timeout features,
* v.2.0.0 - Rewrote using es6 features, 
*         - Dropped MVC Requirement,
* v.1.0.1 - Added Function: DMV.isScene(sceneClass),
* v.1.0.0 - Initial Release,
* 
* 
* ============================================================================
* Visit www.dekitarpg.com for more!
* ============================================================================
*/ 
const DMV = Object.create(Object);
(function dmv_kore_setup(dmv_kore){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * DMV.version
    * returns the overall version number for the DMV Plugins engine.
    */
    dmv_kore.version = '2.0.1';
    
    /**
    * DMV.author
    * Returns object containing information about system author
    */
    dmv_kore.author = {
        mail: "dekitarpg@gmail.com",
        name: "David Bow [DekitaRPG]",
        site: "https://www.dekitarpg.com",
    };

    /**
    * plugins_loaded
    * stores all loaded dmv plugin names and versions
    */
    let plugins_loaded = Object.create(Object);

    /**
    * defaultGetter(name)
    * @param name {string} The name of the property.
    * @return {function} that can be used as a getter.
    * @private
    * 
    * Generates a getter function based on a name
    * See dmv_kore.reader() for information about the default getter.
    */
    function defaultGetter(name){
        return function defaultGetter(){
            return this['_' + name];
        };
    }

    /**
    * defaultSetter(name)
    * @param name {string} The name of the property.
    * @return {function} that can be used as a setter.
    * @private
    * 
    * Generates a setter based on a name
    * See dmv_kore.writer() for information about the default setter.
    */
    function defaultSetter(name){
        const property = '_' + name;
        return function defaultSetter(v) {
            if (!this[property] || this[property] !== v){
                this[property] = v;
                if (this._refresh){
                    this._refresh(property);
                }
            }
        };
    }

    /**
    * defaultContructor(parent)
    * @param parent {object} The parent class of the object.
    * @return {function} that can be used as a contructor.
    * @private
    * 
    * Generates a constructor function that automatically 
    * calls the parent object constructor within it.
    */
    function defaultContructor(parent){
        return function defaultContructor(/** arguments **/){
            parent.apply(this, arguments);
            if(!parent.prototype.initialize && this.initialize) {
                this.initialize.apply(this, arguments);
            }
        };
    }

    /**
    * dmv_kore.reader(obj, name, getter);
    * {}.attr_reader(name, getter); (< if object was extended with dmv_kore.createClass())
    * @param obj The object to add the reader property onto
    * @param name The name of the reader porperty
    * @param getter [optional] The Getter function
    *
    * Makes an easy way to make a reader (a variable you can read)
    * By default it gets the value of this['_' + name]
    */
    dmv_kore.reader = function(objekt, name, getter) {
        Object.defineProperty(objekt, name, {
            get: getter || defaultGetter(name),
            configurable: true
        });
    };

    /**
    * dmv_kore.writer(obj, name, setter);
    * {}.attr_writer(name, setter); (< if object was extended with dmv_kore.createClass())
    * @param obj The object to add the property
    * @param name The property name
    * @param setter [optional] The setter function
    *
    * Makes an easy way to define a writer (a setter to a variable)
    * By default it sets the function of the property this['_' + name] = value
    * It also calls a method this._refresh() if that method exists
    */
    dmv_kore.writer = function(objekt, name, setter) {
        Object.defineProperty(objekt, name, {
            set: setter || defaultSetter(name),
            configurable: true
        });
    };

    /**
    * dmv_kore.accessor(obj, name, setter, getter);
    * {}.attr_accessor(name, setter, getter); (< if object was extended with dmv_kore.createClass())
    * @param obj The object to add the accessor
    * @param name The property name
    * @param setter [optional] The setter function
    * @param getter [optional] The getter function
    * @see dmv_kore.reader
    * @see dmv_kore.writer
    *
    * Makes an accessor (both getter and setter) of an object easily
    * See writer() and reader() for information about default values.
    */
    dmv_kore.accessor = function(objekt, name, setter, getter) {
        Object.defineProperty(objekt, name, {
            get: getter || defaultGetter(name),
            set: setter || defaultSetter(name),
            configurable: true
        });
    };

    /**
    * dmv_kore.rand(max, min)
    * @param max the maximum value that can be returned
    * @param min [optional] same as max, but minimum value
    * @return a random value between min (0 if not given) and max
    */
    dmv_kore.rand = function(max, min) {
        let rmin = min ? min : 0;
        return Math.floor(Math.random()*(max-rmin+1)+rmin);
    };


    /**
    * dmv_kore.
    * @param {*} setParent 
    */
    dmv_kore.createStaticClass = function(setParent) {
        let klass = Object.create(setParent || Object);
        dmv_kore._addClassFunctions(klass);
        return klass;
    };

    /**
    * dmv_kore.
    * @param {*} setParent 
    */
    dmv_kore.createClass = function(setParent, konstructor) {
        let parent = setParent || Object;
        let klass = konstructor || defaultContructor(parent);
        klass.prototype = Object.create(parent.prototype);
        klass.prototype.constructor = klass;
        if (!klass.prototype.attr_accessor){
            dmv_kore._addClassFunctions(klass, true);
        }
        return klass;
    };

    /**
    * dmv_kore.
    * @param {*} setParent 
    */
    dmv_kore._addClassFunctions = function(klass, instancable){
        klass.attr_accessor = function(name,setter,getter){
            dmv_kore.accessor(this, name, setter, getter);
        };
        klass.attr_reader = function(name,getter){
            dmv_kore.reader(this, name, getter);
        };
        klass.attr_writer = function(name,getter){
            dmv_kore.writer(this, name, getter);
        };
        if (instancable){
            klass.prototype.attr_accessor = klass.attr_accessor;
            klass.prototype.attr_reader = klass.attr_reader;
            klass.prototype.attr_writer = klass.attr_writer;
        }
    };

    /**
    * dmv_kore.
    * @param {*} setParent 
    */
    dmv_kore.toMinMax = function(number, max, min){
        let rmin = min ? min : 1;
        let rmax = max ? max : number;
        return Math.min(Math.max(number,rmin),rmax);
    };

    /**
    * dmv_kore.map2n(array)
    * @param array the array to map into a number array
    * @return the number array that has been mapped
    */
    dmv_kore.map2n = function(array){
        return array.map(element => Number(element));
    };

    /**
    * dmv_kore.mapParams2n(paramstring, splitter)
    * @param paramstring the paramter string to map to a number array
    * @param splitter [optional] the character to use to delimit the string
    * @return the number array that has been mapped
    */
    dmv_kore.mapParams2n = function(paramstring /*, splitter */){
        if (!paramstring) return []; 
        let spl = (arguments[1] ? arguments[1] : ',');
        return dmv_kore.map2n(paramstring.split(spl));
    };

    /**
    * dmv_kore.mapMeta2n(object, metaid, splitter)
    * @param object the meta object to extract data from
    * @param metaid the meta identifier string value
    * @param splitter [optional] the character to use to split meta 
    * @return an integer array containing the required meta information
    */
    dmv_kore.mapMeta2n = function(object, metaid, splitter){
        let meta = dmv_kore.extractMetaData(object, metaid);
        return dmv_kore.mapParams2n(meta, splitter);
    };

    /**
    * dmv_kore.extractMetaData(object, metaid)
    * @param object the meta object to extract data from
    * @param metaid the meta identifier to return if found
    * @return the meta id information or null if not found
    */
    dmv_kore.extractMetaData = function(object, metaid){
        let meta = object.meta[metaid];
        return meta !== undefined ? meta : null;
    };

    /**
    * dmv_kore.reduceMeta(array, vname)
    * @param array the array of database object, such as equips().
    * @param vname the variable name to scan meta data for
    * @return the total value gained from all vname notetags, or 0.
    */
    dmv_kore.reduceMeta = function(array, vname){
        return array.reduce(function(prev, curr, i, obj){
            return (obj[i] ? (prev + curr[vname]) : prev);
        }, 0);
    };

    /**
    * dmv_kore.reduceMetaID(array, vname, id)
    * @param array the array of database object, such as equips().
    * @param vname the variable name to scan meta data for
    * @param id the array index to use for adding values..
    * @return the total value gained from all vname notetags, or 0.
    * @note this function is used when scanning meta that is an array
    */
    dmv_kore.reduceMetaID = function(array, vname, id){
        return array.reduce(function(prev, curr, i, obj){
            return (obj[i] ? (prev + curr[vname][id]) : prev);
        }, 0);
    };

    /**
    * dmv_kore.extractFunkString(objekt, funkName, defaultFunkString)
    * @param objekt the object to scan the meta for funkName
    * @param funkName the function name to get from meta
    * @param defaultFunkString the default function string  
    * @return a string that can be used to create functions
    */
    dmv_kore.extractFunkString = function(objekt, funkName, defaultFunkString){
        let meta = dmv_kore.extractMetaData(objekt, funkName);
        return "return " + (meta ? meta : defaultFunkString);
    };

    /**
    * dmv_kore.extractFunkStringF(objekt, funkName, defaultFunkString)
    * @param objekt the object to scan the meta for funkName
    * @param funkName the function name to get from meta
    * @param defaultFunkString the default function string  
    * @return a function that is bound to the objekt
    */
    dmv_kore.extractFunkStringF = function(objekt, funkName, defaultFunkString){
        let str = dmv_kore.extractFunkString(objekt, funkName, defaultFunkString);
        return Function(str).bind(objekt);
    };

    /**
    * dmv_kore.register(pluginName, pluginVer, date, reqr, exit)
    * @param pluginName the plugin name to br registered
    * @param pluginVer the plugin version to be registered
    * @param params the parameters the plugin was uses
    * @return PluginManagers parameters for the specific plugin
    */
    dmv_kore.register = function(pluginName, pluginVer, params){
        const dmv_name = 'dmv-' + pluginName;
        if (plugins_loaded[pluginName]){
            return alert("You are trying to load more than one version of: " + dmv_name);
        }
        plugins_loaded[pluginName] = {version:pluginVer, params};
        console.log("Loaded:", dmv_name, "v" + pluginVer);
        return PluginManager.parameters(dmv_name);
    };

    /**
    * dmv_kore.isRegistered(pluginName, pluginVer)
    * @param pluginName the name of plugin to check for
    * @param pluginVer the version of plugin to check for
    * @return boolean value based on if plugin available
    */
    dmv_kore.isRegistered = function(pluginName, pluginVer){
        let plugin = plugins_loaded[pluginName];
        if (plugin !== undefined){
            let version = plugin.version;
            return dmv_kore.compver(version, pluginVer) >= 0;
        }
        return false;
    };

    /**
    * dmv_kore.compver(a, b) [compares version strings- '1.0.1']
    * @param {String} a 
    * @param {String} b 
    * @return {Number}
    * if a < b number is < 0
    * if a > b number is > 0
    * if a == b number is 0
    */
    dmv_kore.compver = function(a, b) {
        let regExStrip0 = /(\.0+)+$/;
        let segmentsA = a.replace(regExStrip0, '').split('.');
        let segmentsB = b.replace(regExStrip0, '').split('.');
        let l = Math.min(segmentsA.length, segmentsB.length);
        for (var i = 0; i < l; i++) {
            let sega = parseInt(segmentsA[i], 10);
            let segb = parseInt(segmentsB[i], 10);
            let diff = sega - segb;
            if (diff) return diff;
        }
        return segmentsA.length - segmentsB.length;
    };

    /**
    * dmv_kore.STATIC_CLASS_ERROR
    * Holds string for base static error, to save retyping..
    */
    dmv_kore.STATIC_CLASS_ERROR = " is a static class, cannot create instance!";

    /**
    * dmv_kore.current_spriteset
    * @return the current scenes spriteset if available.
    */
    dmv_kore.reader(dmv_kore, 'current_spriteset', function(){
        return this.current_scene ? this.current_scene._spriteset : null;
    });

    /**
    * dmv_kore.current_scene
    * @return the current scene if available.
    */
    dmv_kore.reader(dmv_kore, 'current_scene', function(){
        return SceneManager._scene ? SceneManager._scene : null;
    });

    /**
    * dmv_kore.createIconButton(icon1, icon2, parent)
    * @param icon1 the icon to show for buttons cold frame
    * @param icon2 the icon to show for buttons hot frame
    * @param parent [optional] if given will call addChild 
    *        to add the button into the parents child list
    * @return new button 
    */
    dmv_kore.createIconButton = function(icon1, icon2, parent) {
        let bw = 32, bh = 32, button = new Sprite_Button();
        button.bitmap = ImageManager.loadSystem('IconSet');
        button.setColdFrame(icon1%16*bw, Math.floor(icon1/16)*bh, bw, bh);
        button.setHotFrame(icon2%16*bw, Math.floor(icon2/16)*bh ,bw, bh);
        if (parent != undefined && parent.addChild){
            parent.addChild(button);
        }
        button.visible = true;
        return button;
    };

    /**
    * Setup metadata helper functions
    * Game_BattlerBase.prototype.meta
    * Game_Actor.prototype.meta
    * Game_Enemy.prototype.meta
    */
    dmv_kore.reader(Game_BattlerBase.prototype,'meta',function(){
        return {};
    });
    dmv_kore.reader(Game_Actor.prototype,'meta',function(){
        return this.actor() ? this.actor().meta : {};
    });
    dmv_kore.reader(Game_Enemy.prototype,'meta',function(){
        return this.enemy() ? this.enemy().meta : {};
    });

    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    * DMV HTTP Variables && Functions
    **///////////////////////////////

    /**
    * HTTP::KnownErrors
    * Cross-Origin Request Blocked: The Same Origin Policy disallows reading the 
    * remote resource at http://www.dekyde.com/BasicHTTPDemo/BasicPost.php5 
    * (Reason: CORS header 'Access-Control-Allow-Origin' missing).
    * ^CORS header was available and this only happens 1/100 times...
    * I suspect some other underlying cause - continuing to research...
    */
    dmv_kore.HTTP = function() {
        throw new Error('DMV.HTTP' + dmv_kore.STATIC_CLASS_ERROR);
    };

    /**
    * DMV.HTTP functions
    */
    (function(http){
        /**
        * DMV.HTTP.FORM_ENCODE
        * Content-type used when performing post requests
        */
        http.FORM_ENCODE = "application/x-www-form-urlencoded";

        /**
        * [ private ] aSyncRequest(cbk)
        * @param cbk The main callback function
        * @param obj The object to perform the cbk on
        * @return an asyncronous request
        */
        function aSyncRequest(cbk, thisobj){
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() { 
                if (request.readyState == 4 && request.status == 200){
                    cbk.apply(thisobj, [request.responseText]);
                }
            };
            request.ontimeout = function() {
                cbk.apply(thisobj, ['timeout']);
            };
            request.onerror = function(error) {
                cbk.apply(thisobj, ['error', error]);
            };
            return request;
        }

        /**
        * DMV.HTTP.getAsync(url, str, cbk, obj)
        * @param url URL to send request to
        * @param str string to pass with url
        * @param cbk Callback function
        * @param obj The object to perform the cbk on
        */
        http.getAsync = function(url, str, cbk, obj){
            let request = aSyncRequest(cbk, obj);
            request.open("GET", url, true); 
            this._sendRequest(request, str);
        };

        /**
        * DMV.HTTP.postAsync(url, str, cbk)
        * @param url URL to send request to
        * @param str string to pass with url
        * @param cbk Callback function
        * @param obj The object to perform the cbk on
        */
        http.postAsync = function(url, str, cbk, obj){
            let request = aSyncRequest(cbk, obj);
            request.open("POST", url, true); 
            request.setRequestHeader("Content-type", http.FORM_ENCODE);
            this._sendRequest(request, str);
        };

        /**
        * DMV.HTTP._sendRequest(url, str, cbk)
        * @param request XMLHttpRequest object
        * @param string string to pass with url call
        */
        http._sendRequest = function(request, string){
            request.timeout = 5000;
            request.send(string);
        };

        /**
        * End HTTP Declarations
        */
    })(dmv_kore.HTTP);

    /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    * DMV Scene Related Variables && Functions
    **////////////////////////////////////////

    /**
    * DMV.isScene(sceneClass)
    * @param sceneClass the class to check for
    * @return true if the current class is sceneClass
    */
    dmv_kore.isScene = function(sceneClass){
        let scene = SceneManager._scene;
        return scene && scene.constructor === sceneClass;
    };

    /**
    * DMV.Sprite
    * Container to hold my custom sprite classes
    */
    dmv_kore.Sprite = function() {
        throw new Error('DMV.Sprite'+dmv_kore.STATIC_CLASS_ERROR)
    };

    /**
    * DMV.Window
    * Container to hold my custom window classes
    */
    dmv_kore.Window = function() {
        throw new Error('DMV.Window'+dmv_kore.STATIC_CLASS_ERROR)
    };

    /**
    * DMV.Scene
    * Container to hold my custom scene classes
    */
    dmv_kore.Scene  = function() {
        throw new Error('DMV.Scene'+dmv_kore.STATIC_CLASS_ERROR)
    };

    /**
    * DMV.Emitter
    * Basic clone of PIXI.utils.EventEmitter
    */
    dmv_kore.Emitter = dmv_kore.createClass(PIXI.utils.EventEmitter);

    /**
    * DMV.Sprite.TogButton
    * Sprite_Button class with dedicated toggled state 
    */
    dmv_kore.Sprite.TogButton = dmv_kore.createClass(Sprite_Button);

    /**
    * DMV.Sprite.TogButton.prototype functions
    */
    (function($this_class, parent){
        /**
        * DMV.Sprite.TogButton.prototype.initialize(bitmap)
        * Initiailizes toggle button sprite.
        * @param bitmap [optional] the bitmap image to use for the button
        */
        $this_class.initialize = function(/* bitmap */){
            parent.initialize.call(this);
            if (arguments[0]){
                this.bitmap = arguments[0];
            }
            this._dmv_toggled = false;
            //this.update();
        };

        /**
        * DMV.Sprite.TogButton.prototype.updateFrame()
        * Overwrite parent function to allow for toggle state
        */
        $this_class.updateFrame = function() {
            let frame = null, touch = this._touching;
            if (this._dmv_toggled){
                frame = touch ? this._dmv_tog_hotFrame : this._dmv_tog_coldFrame;
            } else {
                frame = touch ? this._hotFrame : this._coldFrame;
            }
            if (frame) {
                this.setFrame(frame.x, frame.y, frame.width, frame.height);
            }
        };
        
        /**
        * DMV.Sprite.TogButton.prototype.setTogColdFrame(x, y, w, h)
        * Sets the button sprites cold frame for toggled state.
        * @param x the x position to use for this frame
        * @param y the y position to use for this frame
        * @param w the width to use for this frame
        * @param h the height to use for this frame
        */
        $this_class.setTogColdFrame = function(x, y, width, height) {
            this._dmv_tog_coldFrame = new Rectangle(x, y, width, height);
        };
        
        /**
        * DMV.Sprite.TogButton.prototype.setTogHotFrame(x, y, w, h)
        * Sets the button sprites hot frame for toggled state.
        * @param x the x position to use for this frame
        * @param y the y position to use for this frame
        * @param w the width to use for this frame
        * @param h the height to use for this frame
        */
        $this_class.setTogHotFrame = function(x, y, width, height) {
            this._dmv_tog_hotFrame = new Rectangle(x, y, width, height);
        };
        
        /**
        * DMV.Sprite.TogButton.prototype.setRegularFrames(coldArray, hotArray)
        * Sets the regular state hot and cold frames for this button.
        * @param coldArray the array of [x,y,w,h] to use for the cold frame
        * @param hotArray the array of [x,y,w,h] to use for the hot frame
        */
        $this_class.setRegularFrames = function(coldArray, hotArray) {
            $this_class.setColdFrame.apply(this,coldArray);
            $this_class.setHotFrame.apply(this,hotArray);
        };
        
        /**
        * DMV.Sprite.TogButton.prototype.setToggledFrames(coldArray, hotArray)
        * Sets the toggled state hot and cold frames for this button.
        * @param coldArray the array of [x,y,w,h] to use for the cold frame
        * @param hotArray the array of [x,y,w,h] to use for the hot frame
        */
        $this_class.setToggledFrames = function(coldArray, hotArray) {
            $this_class.setTogColdFrame.apply(this,coldArray);
            $this_class.setTogHotFrame.apply(this,hotArray);
        };
        
        /**
        * DMV.Sprite.TogButton.prototype.callClickHandler()
        * Calls the handler that processes when the button is clicked, 
        * if it is available, and also toggles the toggle state flag.
        */
        $this_class.callClickHandler = function() {
            if (this._clickHandler) {
                this._dmv_toggled = !this._dmv_toggled;
                this._clickHandler();
            }
        };
        /**
        * End DMV.Sprite.TogButton.prototype declarations
        */
    })(dmv_kore.Sprite.TogButton.prototype, Sprite_Button.prototype);

    /**
    * $this_class: Number.prototype
    * parent: undefined
    * This wrapper function contains enhancements to the Number class
    */
    (function($this_class, parent){ // Number
        /**
        * Number.prototype.fix()
        * Drops anything after the 12th decimal place of the number, thus,
        * fixing javascript's issue with decimal operations.
        * Examples:
        *   Math.ceil((0.2 + 0.1) * 10) == 4
        *   Math.ceil((0.2 + 0.1).fix() * 10) == 3
        * @return the fixed number.
        */
        if (!$this_class.fix){
            $this_class.fix = function(){
                return parseFloat(this.toPrecision(12));
            };
        }

        /**
        * Number.prototype.floor()
        * @return the largest integer less than or equal to the number.
        */
        if (!$this_class.floor){
            $this_class.floor = function(){
                return Math.floor(this.fix());
            };
        }

        /**
        * Number.prototype.ceil()
        * @return the smallest integer greater than or equal to the number.
        */
        if (!$this_class.ceil){
            $this_class.ceil = function(){
                return Math.ceil(this.fix());
            };
        }

        /**
        * Number.prototype.round()
        * @return the value of the number rounded to the nearest integer.
        */
        if (!$this_class.round){
            $this_class.round = function(){
                return Math.round(this.fix());
            };
        }

        /**
        * Number.prototype.abs()
        * @return the absolute value
        */
        if (!$this_class.abs){
            $this_class.abs = function(){
                return Math.abs(this);
            };
        }

        /**
        * End Number.prototype wrapper
        */
    })(Number.prototype, undefined);

    /**
    * $this_class: Bitmap.prototype
    * parent: undefined
    * Enhancement to the Bitmap class
    */
    (function($this_class, parent){
        /**
        * Bitmap.prototype.copySection(x,y,w,h)
        * @param x The x position to begin copying from
        * @param y The y position to begin copying from
        * @param w The width to copy onto the new bitmap
        * @param h The height to copy onto the new bitmap
        * @return A new bitmap created from the region specified.
        */
        $this_class.copySection = function(x, y, w, h) {
            let newbitmap = new Bitmap(w, h);
            newbitmap.blt(this,x,y,w,h,0,0,w,h);
            return newbitmap;
        };
        /**
        * End Bitmap.prototype wrapper
        */
    })(Bitmap.prototype, undefined);

    /**
    * $this_class: ImageManager
    * parent: undefined
    * Enhancement to the ImageManager class
    */
    (function($){
        /**
        * ImageManager.loadIcon(index)
        * @param index The icon index to return as a single bitmap
        * @return A new bitmap containing only the icon specified
        */
        $.loadIcon = function(index) {
            let ic = this.loadSystem("IconSet");
            let pw = Window_Base._iconWidth;
            let ph = Window_Base._iconHeight;
            let sx = index % 16 * pw;
            let sy = Math.floor(index / 16) * ph;
            return ic.copySection(sx, sy, pw, ph);
        };
        /**
        * End ImageManager wrapper
        */
    })(ImageManager, undefined);

    /**
    * 
    * $this_class: Array.prototype
    * parent: undefined
    * This brings back the min and max functions used often
    * on arrays to quickly clamp a set of data. Sure, we
    * have the clamp function, but that only works on 2
    * numbers at a time. This works on arrays!
    *
    */
    (function($this_class, parent) {
        /**
        * [1,2,3].min()
        * => 1
        */
        $this_class.min = function() {
            return Math.min.apply(null, this);
        };

        /**
        * [1,2,3].max()
        * => 3
        */
        $this_class.max = function() {
            return Math.max.apply(null, this);
        };
        /**
        * End Array.prototype wrapper
        */
    })(Array.prototype, undefined);

    /**
    * End Declarations
    */
})(DMV);
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
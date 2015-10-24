// ============================================================================
// Plug-in: DMV_Core.js 
// Version: 1.0.0
// Author: David Bow (Dekita) 
// MailTo: dekita@dekyde.com
// ============================================================================

/*:
 * @author Dekita (www.dekyde.com)
 * 
 * @plugindesc DMV_Core contains functions that are used within some of 
 * the more advanced RPG Maker MV plugins of mine.  
 * 
 * @help
 * ============================================================================
 * ■ System Information:
 * ============================================================================
 * This plugin is a requirement for almost all of my other RPG Maker MV plugins. 
 * You should ensure this plugin is also loaded before all other DMV plugins. 
 * 
 * Frequent updates will also be applied to this particular plugin, therefore, 
 * it is advised that you check to ensure you have the latest version whenever
 * you install a new DMV Engine Plugin.
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
 * Checks to ensure DMV Core plugin exists. 
 */
(function(){
  if (typeof MVC === 'undefined') {
    var strA = "You need to install the MVCommons plugin ";
    var strB = "in order for the DMV_Core plugin to work!";
    var strC = "\nvisit www.dekyde.com/mvcommons to get an";
    var strD = " up to date version."
    throw new Error(strA + strB + strC + strD);
  }else{
    var name = "DMV_Core";
    var vers = "1.0.0";
    var date = "23/1o/2o15";
    var desc = "DMV plugins by dekita @ www.dekyde.com"
    var auth = {name:"David Bow (Dekita)",
      email:"dekita@dekyde.com",website:"www.dekyde.com",
    }
    PluginManager.register(name, vers, desc, auth, date);
    if (console){console.log("Loaded: "+name+' v'+vers)};
  };
})();

/**
 * Setup DMV 
 */
var DMV = MVC.extend();

/**
 * Function to keep everything within a dedicated scope 
 */
(function($){
  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * DMV General Variables && Functions
   **//////////////////////////////////

  /**
   * DMV.author
   * Holds object for the author of the DMV plugins (me)
   */
  $.author = {
    name: "David Bow (Dekita)", 
    email: "dekita@dekyde.com", 
    website: "www.dekyde.com",
  };

  /**
   * base_static_error
   * Holds string for base static error, to save retyping..
   */
  var base_static_error = " is a static class, cannot create instance!"

  /**
   * Convenience methods taken from MVCommons script.
   */
  $.extend = MVC.extend;
  $.reader = MVC.reader;
  $.writer = MVC.writer;
  $.accessor = MVC.accessor;

  /**
   * [ private ] map2n 
   * @param e the element of the array currently being mapped
   * @return the number obtained from the array element
   * @note used internally from within DMV.map2n(array)
   */
  function map2n(e) {
    return Number(e);
  };

  /**
   * DMV.map2n(array)
   * @param array the array to map into a number array
   * @return the number array that has been mapped
   */
  $.map2n = function(array){
    return array.map(map2n);
  };

  /**
   * DMV.mapParams2n(paramstring, splitter)
   * @param paramstring the paramter string to map to a number array
   * @param splitter [optional] the character to use to delimit the string
   * @return the number array that has been mapped
   */
  $.mapParams2n = function(paramstring /*, splitter */){
    if (!paramstring){ return [] };
    var spl = (arguments.length > 1 ? arguments[1] : ',');
    return $.map2n(paramstring.split(spl));
  };

  /**
   * DMV.mapMeta2n(object, metaid, splitter)
   * @param object the meta object to extract data from
   * @param metaid the meta identifier string value
   * @param splitter [optional] the character to use to split meta 
   * @return an integer array containing the required meta information
   */
  $.mapMeta2n = function(object, metaid /* , splitter*/){
    return $.mapParams2n($.extractMetaData(object, metaid)/* , splitter*/);
  };

 /**
   * DMV.extractMetaData(object, metaid)
   * @param object the meta object to extract data from
   * @param metaid the meta identifier to return if found
   * @return the meta id information or null if not found
   */
  $.extractMetaData = function(object, metaid){
    var meta = object.meta[metaid];
    return meta !== undefined ? meta : null;
  };

 /**
   * DMV.reduceMeta(array, vname)
   * @param array the array of database object, such as equips().
   * @param vname the variable name to scan meta data for
   * @return the total value gained from all vname notetags, or 0.
   */
  $.reduceMeta = function(array, vname){
    return array.reduce(function(prev, curr, i, obj){
      return (obj[i] ? (prev + curr[vname]) : prev);
    }, 0);
  };

  /**
   * DMV.reduceMetaID(array, vname, id)
   * @param array the array of database object, such as equips().
   * @param vname the variable name to scan meta data for
   * @param id the array index to use for adding values..
   * @return the total value gained from all vname notetags, or 0.
   * @note this function is used when scanning meta that is an array
   */
  $.reduceMetaID = function(array, vname, id){
    return array.reduce(function(prev, curr, i, obj){
      return (obj[i] ? (prev + curr[vname][id]) : prev);
    }, 0);
  };


  /**
   * DMV.extractFunkString(objekt, funkName, defaultFunkString)
   * @param objekt the object to scan the meta for funkName
   * @param funkName the function name to get from meta
   * @param defaultFunkString the default function string  
   * @return a string that can be used to create functions
   */
  $.extractFunkString = function(objekt, funkName, defaultFunkString){
    var meta = $.extractMetaData(objekt, funkName);
    return "return " + (meta ? meta : defaultFunkString);
  };

  /**
   * DMV.extractFunkStringF(objekt, funkName, defaultFunkString)
   * @param objekt the object to scan the meta for funkName
   * @param funkName the function name to get from meta
   * @param defaultFunkString the default function string  
   * @return a function that is bound to the objekt
   */
  $.extractFunkStringF = function(objekt, funkName, defaultFunkString){
    var str = $.extractFunkString(objekt, funkName, defaultFunkString);
    return Function(str).bind(objekt);
  };


  /**
   * DMV.register(pluginName, pluginVer, date, reqr, exit)
   * @param pluginName the plugin name to br registered
   * @param pluginVer the plugin version to be registered
   * @param date the date the plugin was written
   * @param reqr array of all required plugins
   * @param exit boolean value to determine exit
   * @return N/A
   */
  $.register = function(pluginName, pluginVer, date, reqr, exit){
    var name = "DMV_" + pluginName;
    var desc = pluginName + " by dekita @ www.dekyde.com"    
    PluginManager.register(name, pluginVer, desc, $.author, date, reqr, exit);
    if (console){console.log("Loaded: " + name + ' v' + pluginVer)};
  };

  /**
   * DMV.require(pluginName, pluginVer)
   * @param pluginName the name of plugin to check for
   * @param pluginVer the version of plugin to check for
   * @return boolean value based on if plugin available
   */
  $.require = function(pluginName, pluginVer){
    return PluginManager.version(pluginName, ">=", pluginVer);
  };

  /**
   * DMV.rand(max, min)
   * @param max the maximum value that can be returned
   * @param min [optional] same as max, but minimum value
   * @return a random value between min (0 if not given) and max
   */
  $.rand = function(max, min){
    if (min === undefined){ var min = 0 };
    return Math.floor(Math.random()*(max-min+1)+min);    
  };

  /**
   * DMV.createIconButton(icon1, icon2, parent)
   * @param icon1 the icon to show for buttons cold frame
   * @param icon2 the icon to show for buttons hot frame
   * @param parent [optional] if given will call addChild 
   *        to add the button into the parents child list
   * @return new button 
   */
  $.createIconButton = function(icon1, icon2, parent) {
    var bw = 32, bh = 32, button = new Sprite_Button();
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
  $.reader(Game_BattlerBase.prototype,'meta', function(){
    return {};
  });
  $.reader(Game_Actor.prototype,'meta', function(){
    return this.actor() ? this.actor().meta : {};
  });
  $.reader(Game_Enemy.prototype,'meta', function(){
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
  $.HTTP = function() {
    throw new Error('DMV.HTTP' + base_static_error);
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
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200){
          cbk.apply(thisobj, [request.responseText]);
        };
      };
      return request;
    };

    /**
     * DMV.HTTP.getAsync(url, str, cbk, obj)
     * @param url URL to send request to
     * @param str string to pass with url
     * @param cbk Callback function
     * @param obj The object to perform the cbk on
     */
    http.getAsync = function(url, str, cbk, obj){
      var request = aSyncRequest(cbk, obj);
      request.open("GET", url, true); 
      request.send(str);
    };

    /**
     * DMV.HTTP.postAsync(url, str, cbk)
     * @param url URL to send request to
     * @param str string to pass with url
     * @param cbk Callback function
     * @param obj The object to perform the cbk on
     */
    http.postAsync = function(url, str, cbk, obj){
      var request = aSyncRequest(cbk, obj);
      request.open("POST", url, true); 
      request.setRequestHeader("Content-type", http.FORM_ENCODE);
      request.send(str);
    };
    /**
     * End HTTP Declarations
     */
  })($.HTTP);

  /**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   * DMV Scene Related Variables && Functions
   **////////////////////////////////////////

  /**
   * DMV.Sprite
   * Container to hold my custom sprite classes
   */
  $.Sprite = function() {
    throw new Error('DMV.Sprite'+base_static_error)
  };

  /**
   * DMV.Window
   * Container to hold my custom window classes
   */
  $.Window = function() {
    throw new Error('DMV.Window'+base_static_error)
  };

  /**
   * DMV.Scene
   * Container to hold my custom scene classes
   */
  $.Scene  = function() {
    throw new Error('DMV.Scene'+base_static_error)
  };

  /**
   * DMV.Sprite.TogButton
   * Sprite_Button class with dedicated toggled state 
   */
  $.Sprite.TogButton = $.extend(Sprite_Button);

  /**
   * DMV.Sprite.TogButton.prototype functions
   */
  (function(butt){
    /**
     * DMV.Sprite.TogButton.prototype.initialize(bitmap)
     * Initiailizes toggle button sprite.
     * @param bitmap [optional] the bitmap image to use for the button
     */
    butt.initialize = function(/* bitmap */){
      Sprite_Button.prototype.initialize.call(this);
      if (arguments[0]){this.bitmap = arguments[0]};
      this._dmv_toggled = false;
      this.update();
    };

    /**
     * DMV.Sprite.TogButton.prototype.updateFrame()
     * Overwrite parent function to allow for toggle state
     */
    butt.updateFrame = function() {
      var frame = null, touch = this._touching;
      if (this._dmv_toggled){
        frame = touch ? this._dmv_tog_hotFrame : this._dmv_tog_coldFrame;
      } else {
        frame = touch ? this._hotFrame : this._coldFrame;
      };
      if (frame) {
        this.setFrame(frame.x, frame.y, frame.width, frame.height);
      };
    };
    
    /**
     * DMV.Sprite.TogButton.prototype.setTogColdFrame(x, y, w, h)
     * Sets the button sprites cold frame for toggled state.
     * @param x the x position to use for this frame
     * @param y the y position to use for this frame
     * @param w the width to use for this frame
     * @param h the height to use for this frame
     */
    butt.setTogColdFrame = function(x, y, width, height) {
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
    butt.setTogHotFrame = function(x, y, width, height) {
      this._dmv_tog_hotFrame = new Rectangle(x, y, width, height);
    };
    
    /**
     * DMV.Sprite.TogButton.prototype.setRegularFrames(coldArray, hotArray)
     * Sets the regular state hot and cold frames for this button.
     * @param coldArray the array of [x,y,w,h] to use for the cold frame
     * @param hotArray the array of [x,y,w,h] to use for the hot frame
     */
    butt.setRegularFrames = function(coldArray, hotArray) {
      butt.setColdFrame.apply(this,coldArray);
      butt.setHotFrame.apply(this,hotArray);
    };
    
    /**
     * DMV.Sprite.TogButton.prototype.setToggledFrames(coldArray, hotArray)
     * Sets the toggled state hot and cold frames for this button.
     * @param coldArray the array of [x,y,w,h] to use for the cold frame
     * @param hotArray the array of [x,y,w,h] to use for the hot frame
     */
    butt.setToggledFrames = function(coldArray, hotArray) {
      butt.setTogColdFrame.apply(this,coldArray);
      butt.setTogHotFrame.apply(this,hotArray);
    };
    
    /**
     * DMV.Sprite.TogButton.prototype.callClickHandler()
     * Calls the handler that processes when the button is clicked, 
     * if it is available, and also toggles the toggle state flag.
     */
    butt.callClickHandler = function() {
      if (this._clickHandler) {
        this._dmv_toggled = !this._dmv_toggled;
        this._clickHandler();
      }
    };
  })($.Sprite.TogButton.prototype);
  /**
   * End DMV declarations
   */
})(DMV);
/**
 * End plugin
 * www.dekyde.com
 */
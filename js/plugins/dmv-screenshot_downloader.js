/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-screenshot_downloader.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This plugin simply triggers a download of the game screen
* as an image file when the 'print screen' key is pressed.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin allows for players who are playing your game in a web browser
* to be able to instantly capture, download, and save screenshots.
* 
* Please do note: This only works in web browsers. 
* If you require being able to take screenshots during a windows/mac
* version of the game, you would need an alternative plugin. 
* Hudell has written one to do this. 
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
*         - Re-Added dmv-core.js dependancy,
* v.1.0.1 - Fixed some simple typing errors within the documentation,
*         - Removed dependancy on DMV Core,
* v.1.0.0 - Initial Release,
* 
* 
* ============================================================================
* Visit www.dekitarpg.com for more!
* ============================================================================
* 
* @param screenshot-prepend
* @desc String to prepend to screenshot
* Default: screenshot_
* @default screenshot_ 
* 
* ============================================================================
*/ 
(function dmv_screenshot_downloader(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "screenshot_downloader";
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
    const prepend_string = params['screenshot-prepend'] || 'screenshot_';

    /**
    * DMV.ScreenshotDownloader
    * Class to store functionality of screenshort downloader
    */
    DMV.ScreenshotDownloader = DMV.createStaticClass();

    /**
    * $this_class: DMV.ScreenshotDownloader
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Date.now
        * Ensures a variation of Date.now exists for the system to use. 
        */
        if (!Date.now) {
            Date.now = function(){
                return new Date().getTime();
            };
        }

        /**
        * ScreenshotDownloader.getFilename
        * @return {string} a generated filename using timestamp.
        */
        $this_class.getFilename = function() {
            return prepend_string + Date.now() + '.png';
        };

        /**
        * ScreenshotDownloader.getImageData
        * @return {string} containing the image data.
        */
        $this_class.getImageData = function() {
            let image = SceneManager.snap()._canvas.toDataURL();
            return image.replace(/^data:image\/png;base64,/,"");
        };
  
        /**
        * ScreenshotDownloader.downloadScreenshot(filename, text)
        * @param filename {string} the filename for the new file.
        * @param text {string} the text data to save into the file.
        * Creates an element in the document to download the file
        * and then triggers it, and removes it from the document.
        */
        $this_class.downloadScreenshot = function(filename, text) {
            var mime = 'data:image/png;base64,';
            var data = encodeURIComponent(text);
            var element = document.createElement('a');
            element.setAttribute('href', mime + data);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        };

        /**
        * ScreenshotDownloader.screenshotKeyPressed
        * Called automatically when the screenshot key is pressed.
        * Attempts to take current screenshot and trigger download.
        */
        $this_class.screenshotKeyPressed = function() {
            try {
                if (!Utils.isNwjs()){
                    let name = $this_class.getFilename();
                    let data = $this_class.getImageData();
                    $this_class.downloadScreenshot(name,data);
                }
            } catch(error) {
                let etext = 'An error occured while saving the screenshot:';
                if (error !== undefined && error !== null) console.error(etext, error);
            }
        };

        /**
        * End DMV.ScreenshotDownloader Declarations
        */ 
    })(DMV.ScreenshotDownloader, undefined);

    /**
    * $this_class: Input
    * parent: undefined
    * Description on class:..
    */
    (function($this_class, parent){
        /**
        * Aliased Functions:..
        */ 
        const onKeyUp = Input._onKeyUp;

        /**
        * onKeyUp
        * Aliases the Input._onKeyUp function to allow for screenshots 
        * to trigger download when the designated key is pressed. 
        * @param event {object} key input event
        * @return none
        */
        Input._onKeyUp = function(event){
            onKeyUp.apply(this, arguments);
            if (event.keyCode == 44){
                DMV.ScreenshotDownloader.screenshotKeyPressed();
            }
        };

        /**
        * End Input Declarations
        */ 
    })(Input, undefined);
    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/

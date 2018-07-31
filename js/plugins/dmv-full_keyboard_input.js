/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-full_keyboard_input.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc This plugin enhances the default Input class to allow for 
* the checking of all keyboard keys.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* The default input class does not accomodate for a full keyboard range.
* This is probably due to not all devices having a keyboard; however, all
* computers do have such hardware and thus, games made for these devices 
* are able to benefit from access to the all keyboard keys. 
* 
* This script is required for a few scripts of mine - mainly ones that allow
* for the player to type text for some reason (example, my OL_GameChat plugin)
* 
* 
* ============================================================================
* ■ Script Calls:
* ============================================================================
* 
* Input.isKeyTriggered(keyCode)
* Input.isKeyPressed(keyCode)
* Input.isKeyReleased(keyCode)
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
(function dmv_full_keyboard_input(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "full_keyboard_input";
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
    * $this_class: Input
    * parent: undefined 
    */
    (function(input, parent){
        /**
        * Aliased Functions:..
        */
        const old_clear = input.clear;
        const old_update = input.update;
        const old_onKeyDown = input._onKeyDown;
        const old_onKeyUp = input._onKeyUp;
        
        /**
        * keysPressed
        * Holds array of currently pressed keykodes
        */
        let keysPressed = [];

        /**
        * lastPressed
        * Holds array of last pressed keykodes
        */
        let lastPressed = [];
        
        /**
        * pressStates
        * Holds array of keykode press states
        */
        let pressStates = [];

        /**
        * keyMapper
        * Used to map keynames into keycodes
        * @note Not all keys have been fully tested; 
        */
        const keyMapper = {
            'LBUTTON': 1,
            'RBUTTON': 2,
            'CANCEL': 3,
            'MBUTTON': 4,
            'XBUTTON1': 5,
            'XBUTTON2': 6,
            'BACK': 8,
            'TAB': 9,
            'CLEAR': 12,
            'RETURN': 13,
            'SHIFT': 16,
            'CONTROL': 17,
            'MENU': 18,
            'PAUSE': 19,
            'CAPITAL': 20,
            'KANA': 21,
            'HANGUEL': 21,
            'HANGUL': 21,
            'JUNJA': 23,
            'FINAL': 24,
            'HANJA': 25,
            'KANJI': 25,
            'ESCAPE': 27,
            'CONVERT': 28,
            'NONCONVERT': 29,
            'ACCEPT': 30,
            'MODECHANGE': 31,
            'SPACE': 32,
            'PRIOR': 33,
            'NEXT': 34,
            'END': 35,
            'HOME': 36,
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40,
            'SELECT': 41,
            'PRINT': 42,
            'EXECUTE': 43,
            'SNAPSHOT': 44,
            'INSERT': 45,
            'DELETE': 46,
            'HELP': 47,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57,
            'A': 65,
            'B': 66,
            'C': 67,
            'D': 68,
            'E': 69,
            'F': 70,
            'G': 71,
            'H': 72,
            'I': 73,
            'J': 74,
            'K': 75,
            'L': 76,
            'M': 77,
            'N': 78,
            'O': 79,
            'P': 80,
            'Q': 81,
            'R': 82,
            'S': 83,
            'T': 84,
            'U': 85,
            'V': 86,
            'W': 87,
            'X': 88,
            'Y': 89,
            'Z': 90,
            'LWIN': 91,
            'RWIN': 92,
            'APPS': 93,
            'SLEEP': 95,
            'NUMPAD0': 96,
            'NUMPAD1': 97,
            'NUMPAD2': 98,
            'NUMPAD3': 99,
            'NUMPAD4': 100,
            'NUMPAD5': 101,
            'NUMPAD6': 102,
            'NUMPAD7': 103,
            'NUMPAD8': 104,
            'NUMPAD9': 105,
            'MULTIPLY': 106,
            'ADD': 107,
            'SEPARATOR': 108,
            'SUBTRACT': 109,
            'DECIMAL': 110,
            'DIVIDE': 111,
            'F1': 112,
            'F2': 113,
            'F3': 114,
            'F4': 115,
            'F5': 116,
            'F6': 117,
            'F7': 118,
            'F8': 119,
            'F9': 120,
            'F10': 121,
            'F11': 122,
            'F12': 123,
            'F13': 124,
            'F14': 125,
            'F15': 126,
            'F16': 127,
            'F17': 128,
            'F18': 129,
            'F19': 130,
            'F20': 131,
            'F21': 132,
            'F22': 133,
            'F23': 134,
            'F24': 135,
            'NUMLOCK': 144,
            'SCROLL': 145,
            'LSHIFT': 160,
            'RSHIFT': 161,
            'LCONTROL': 162,
            'RCONTROL': 163,
            'LMENU': 164,
            'RMENU': 165,
            'BROWSER_BACK': 166,
            'BROWSER_FORWARD': 167,
            'BROWSER_REFRESH': 168,
            'BROWSER_STOP': 169,
            'BROWSER_SEARCH': 170,
            'BROWSER_FAVORITES': 171,
            'BROWSER_HOME': 172,
            'VOLUME_MUTE': 173,
            'VOLUME_DOWN': 174,
            'VOLUME_UP': 175,
            'MEDIA_NEXT_TRACK': 176,
            'MEDIA_PREV_TRACK': 177,
            'MEDIA_STOP': 178,
            'MEDIA_PLAY_PAUSE': 179,
            'LAUNCH_MAIL': 180,
            'LAUNCH_MEDIA_SELECT': 181,
            'LAUNCH_APP1': 182,
            'LAUNCH_APP2': 183,
            'OEM_1': 186,
            'OEM_PLUS': 187,
            'OEM_COMMA': 188,
            'OEM_MINUS': 189,
            'OEM_PERIOD': 190,
            'OEM_2': 191,
            'OEM_3': 192,
            'OEM_4': 219,
            'OEM_5': 220,
            'OEM_6': 221,
            'OEM_7': 222,
            'OEM_8': 223,
            'OEM_102': 226,
            'PROCESSKEY': 229,
            'PACKET': 231,
            'ATTN': 246,
            'CRSEL': 247,
            'EXSEL': 248,
            'EREOF': 249,
            'PLAY': 250,
            'ZOOM': 251,
            'NONAME': 252,
            'PA1': 253,
            'OEM_CLEAR': 254,
        };

        /**
        * Input.clear()
        * Clears all input settings on system (re-)initialize
        */
        input.clear = function(){
            old_clear.apply(this, arguments);
            for (var i = 256; i >= 0; i--) {
                keysPressed[i] = 0;
                lastPressed[i] = 0;
                pressStates[i] = false;
            }
        };

        /**
        * Input.update()
        * Updates all user keyboard input data
        */
        input.update = function(){
            old_update.apply(this, arguments);
            for (var i = 256; i >= 0; i--) {
                lastPressed[i] = keysPressed[i];
                keysPressed[i] = pressStates[i] ? keysPressed[i]+1 : 0;
            }
        };

        /**
        * Input._onKeyDown(event)
        * @param event the KeyboardEvent that occurred
        */ 
        input._onKeyDown = function(event) {
            pressStates[event.keyCode] = true;
            old_onKeyDown.apply(this, arguments);
        }; 
        
        /**
        * Input._onKeyUp(event)
        * @param event the KeyboardEvent that occurred
        */ 
        input._onKeyUp = function(event) {
            pressStates[event.keyCode] = false;
            old_onKeyUp.apply(this, arguments);
        }; 

        /**
        * [ private ] convertKeyCode
        * @param keyCode the key code to convert if not a number
        * @return returns an integer key code from the keyCode passed
        */ 
        function convertKeyCode(keyCode){
            if (typeof keyCode === 'number') return keyCode;
            return keyMapper[keyCode.toUpperCase()];
        }

        /**
        * Input.isKeyTriggered(keyCode)
        * @param keyNum an integer code that determines the key
        * @return boolean value based on if key was triggered
        */ 
        input.isKeyTriggered = function(keyNum){
            let keyCode = convertKeyCode(keyNum);
            return keysPressed[keyCode] && !lastPressed[keyCode];
        };

        /**
        * Input.isKeyPressed(keyNum)
        * @param keyNum an integer code that determines the key
        * @return boolean value based on if key was pressed
        */ 
        input.isKeyPressed = function(keyNum){
            let keyCode = convertKeyCode(keyNum);
            return keysPressed[keyCode];
        };

        /**
        * Input.isKeyReleased(keyNum)
        * @param keyNum an integer code that determines the key
        * @return boolean value based on if key was released
        */ 
        input.isKeyReleased = function(keyNum){
            let keyCode = convertKeyCode(keyNum);
            return !keysPressed[keyCode] && lastPressed[keyCode];
        };
        /**
        * End Input declarations
        */
    })(Input, undefined);
    /**
    * End declarations
    */
})(); 
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
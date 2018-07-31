/*: ==========================================================================
* ############################################################################
* 
* Plug-in: dmv-stat_param_limit_break.js
* Version: 2.0.0
* Author: DekitaRPG [ www.dekitarpg.com ]
* MailTo: dekitarpg@gmail.com
* 
* ############################################################################
* ============================================================================
* 
* @author DekitaRPG [ www.dekitarpg.com ]
* 
* @plugindesc Allows for actor/enemy parameter limits to be broken.
* 
* @help
* ============================================================================
* ■ System Information:
* ============================================================================
* 
* This plugin allows for all actor parameter limits to be broken, and also for
* each actor to have their own unique limitations.
* 
* Some notetags are available to allow for each actors limits to easily be
* altered by you, the game developer.
* 
* 
* ============================================================================
* ■ Actor Notetags: (also work with enemies)
* ============================================================================
* 
* <max params: mhp, mmp, atk, def, mat, mdf, agi, luk>
* This notetag allows for all parameters max limits to be set at once. 
* Not all values are required, but they must be in the order shown above.
* Examples: <max params: 500, 500, 50, 50> <max params: 500, 500>
* 
* <max STAT: VALUE>
* STAT is one of; mhp, mmp, atk, def, mat, mdf, agi or luk.
* VALUE should be a numeric as it is used to determine the max stat value. 
* Examples: <max atk: 500> <max luk: 4>
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
* @param -- actor --
* @default 
*
* @param Actor MaxHP
* @desc Sets the default maximum HP for actors
* Default: 99999
* @default 99999
* 
* @param Actor MaxMP
* @desc Sets the default maximum MP for actors
* Default: 99999
* @default 99999
* 
* @param Actor MaxAtk
* @desc Sets the default maximum Atk for actors
* Default: 9999
* @default 9999
* 
* @param Actor MaxDef
* @desc Sets the default maximum Def for actors
* Default: 9999
* @default 9999
* 
* @param Actor MaxMat
* @desc Sets the default maximum Mat for actors
* Default: 9999
* @default 9999
* 
* @param Actor MaxMdf
* @desc Sets the default maximum Mdf for actors
* Default: 9999
* @default 9999
* 
* @param Actor MaxAgi
* @desc Sets the default maximum Agi for actors
* Default: 9999
* @default 9999
* 
* @param Actor MaxLuk
* @desc Sets the default maximum Luk for actors
* Default: 9999
* @default 9999
* 
* @param -- enemy --
* @default 
*
* @param Enemy MaxHP
* @desc Sets the default maximum HP for enemies
* Default: 9999999
* @default 9999999
* 
* @param Enemy MaxMP
* @desc Sets the default maximum MP for enemies
* Default: 9999999
* @default 9999999
* 
* @param Enemy MaxAtk
* @desc Sets the default maximum Atk for enemies
* Default: 99999
* @default 99999
* 
* @param Enemy MaxDef
* @desc Sets the default maximum Def for enemies
* Default: 99999
* @default 99999
* 
* @param Enemy MaxMat
* @desc Sets the default maximum Mat for enemies
* Default: 99999
* @default 99999
* 
* @param Enemy MaxMdf
* @desc Sets the default maximum Mdf for enemies
* Default: 99999
* @default 99999
* 
* @param Enemy MaxAgi
* @desc Sets the default maximum Agi for enemies
* Default: 99999
* @default 99999
* 
* @param Enemy MaxLuk
* @desc Sets the default maximum Luk for enemies
* Default: 99999
* @default 99999
* 
* @param -- other --
* @default 
*
* @param Other MaxHP
* @desc Sets the default maximum HP for other battler types
* Default: 99
* @default 99
* 
* @param Other MaxMP
* @desc Sets the default maximum MP for other battler types
* Default: 99
* @default 99
* 
* @param Other MaxAtk
* @desc Sets the default maximum Atk for other battler types
* Default: 9
* @default 9
* 
* @param Other MaxDef
* @desc Sets the default maximum Def for other battler types
* Default: 9
* @default 9
* 
* @param Other MaxMat
* @desc Sets the default maximum Mat for other battler types
* Default: 9
* @default 9
* 
* @param Other MaxMdf
* @desc Sets the default maximum Mdf for other battler types
* Default: 9
* @default 9
* 
* @param Other MaxAgi
* @desc Sets the default maximum Agi for other battler types
* Default: 9
* @default 9
* 
* @param Other MaxLuk
* @desc Sets the default maximum Luk for other battler types
* Default: 9
* @default 9
* 
* ============================================================================
*/ 
(function dmv_stat_param_limit_break(){"use strict";
    // use strict mode to enforce typing standards:..

    /**
    * PLUGIN_NAME {String}
    * PLUGIN_VERSION {String}
    * Stores the internal plugin name and version
    * used by various aspects of the system.
    */
    const PLUGIN_NAME = "stat_param_limit_break";
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
    * mastat
    * Holds array of default max actor stat values
    */ 
    const mastat = [
        Number(params['Actor MaxHP'] || 99999),
        Number(params['Actor MaxMP'] || 99999),
        Number(params['Actor MaxAtk'] || 9999),
        Number(params['Actor MaxDef'] || 9999),
        Number(params['Actor MaxMat'] || 9999),
        Number(params['Actor MaxMdf'] || 9999),
        Number(params['Actor MaxAgi'] || 9999),
        Number(params['Actor MaxLuk'] || 9999),
    ];

    /**
    * mestat
    * Holds array of default max enemy stat values
    */ 
    const mestat = [
        Number(params['Enemy MaxHP'] || 9999999),
        Number(params['Enemy MaxMP'] || 9999999),
        Number(params['Enemy MaxAtk'] || 999999),
        Number(params['Enemy MaxDef'] || 999999),
        Number(params['Enemy MaxMat'] || 999999),
        Number(params['Enemy MaxMdf'] || 999999),
        Number(params['Enemy MaxAgi'] || 999999),
        Number(params['Enemy MaxLuk'] || 999999),
    ];

    /**
    * mostat
    * Holds array of default max stat values for other battler types
    */ 
    const mostat = [
        Number(params['Other MaxHP'] || 999),
        Number(params['Other MaxMP'] || 999),
        Number(params['Other MaxAtk'] || 99),
        Number(params['Other MaxDef'] || 99),
        Number(params['Other MaxMat'] || 99),
        Number(params['Other MaxMdf'] || 99),
        Number(params['Other MaxAgi'] || 99),
        Number(params['Other MaxLuk'] || 99),
    ];

    /**
    * [ private ] scanMetaParamMax(object)
    * @param object the battler instance to check for meta max param
    * @param name the name of the metadata parameter to scan for
    * @param id the id of the parameter to set
    */ 
    function scanMetaParamMax(object, name, id){
        let meta = DMV.extractMetaData(object, name);
        if (meta) object._meta_paramMax[id]=Number(meta);
    }

    /**
    * [ private ] setMetaParamMax(object)
    * @param object the battler instance to check for meta max param
    * @param metaob the meta object to search parameters
    */ 
    function setMetaParamMax(object, metadata) {
        let names = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
        object._meta_paramMax = DMV.mapMeta2n(object,'max params');
        names.forEach((name, index)=>{
            scanMetaParamMax(object, 'max ' + name, index);
        });
    }

    /**
    * [ private ] getMetaParamMax(object, paramID)
    * @param object the battler instance to check for meta max param
    * @param paramID the id of the parameter to check for and return
    * @return the value of parameter id if found or null otherwise
    */ 
    function getMetaParamMax(object, paramID) {
        if (object._meta_paramMax === undefined){
            setMetaParamMax(object,object.meta);
        }
        if (object._meta_paramMax[paramID]){
            return object._meta_paramMax[paramID];
        }
        return null;
    }

    /**
    * Game_BattlerBase.prototype.paramMax(paramID)
    * @param paramID the id of the parameter to check
    * @return the max stat for the parameter specified
    */ 
    Game_BattlerBase.prototype.paramMax = function(paramID) {
        return mostat[paramID];
    };

    /**
    * Game_Actor.prototype.paramMax(paramID)
    * @param paramID the id of the parameter to check
    * @return the max stat for the parameter specified
    */ 
    Game_Actor.prototype.paramMax = function(paramID) {
        return getMetaParamMax(this, paramID) || mastat[paramID];
    };

    /**
    * Game_Enemy.prototype.paramMax(paramID)
    * @param paramID the id of the parameter to check
    * @return the max stat for the parameter specified
    */ 
    Game_Enemy.prototype.paramMax = function(paramID) {
        return getMetaParamMax(this, paramID) || mestat[paramID];
    };

    /**
    * End Declarations
    */ 
})();
/**
* ------------  End Of Plugin  ------------
* Visit https://www.dekitarpg.com for more!
*/
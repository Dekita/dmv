// Generated by RPG Maker.
// This plugins file can be pasted into a new project, and providing the MVCommons plugin
// and ALL of my plugins are there, this will automatically load them all in a working order.
var $plugins =
[
{"name":"MVCommons","status":true,"description":"Great utility library that provides common-use and simplified functions. Also expands default classes.","parameters":{}},
{"name":"DMV_Core","status":true,"description":"DMV_Core contains functions that are used within some of \r\nthe more advanced RPG Maker MV plugins of mine.","parameters":{}},
{"name":"DMV_FullKeyboardInput","status":true,"description":"This plugin enhances the default Input class to allow for \r\nthe checking of all keyboard keys.","parameters":{}},
{"name":"DMV_KursorBlink","status":true,"description":"This simple plugin allows the default window cursor \r\n'blink' speed to be modified, or even completely stopped!","parameters":{"Kursor Blink Speed":"0","Kursor Blink Min":"0.0","Kursor Blink Max":"2.0","Kursor Options":"true"}},
{"name":"DMV_MapMenuButtons","status":true,"description":"This plugin allows for the game map screen to show some \r\ncool menu buttons that run user defined code upon trigger.","parameters":{"Button 1 Data":"466, 2, 1, 17","Button 1 Func":"SceneManager.push(Scene_Item)","Button 2 Data":"500, 2, 2, 18","Button 2 Func":"$gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Skill)","Button 3 Data":"534, 2, 3, 19","Button 3 Func":"$gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Equip)","Button 4 Data":"568, 2, 4, 20","Button 4 Func":"$gameParty.setMenuActor($gameParty.leader());SceneManager.push(Scene_Status)","Button 5 Data":"602, 2, 5, 21","Button 5 Func":"SceneManager.push(Scene_Options)","Button 6 Data":"636, 2, 6, 22","Button 6 Func":"SceneManager.push(Scene_Save)","Button 7 Data":"670, 2, 7, 23","Button 7 Func":"SceneManager.push(Scene_GameEnd)","Button 8 Data":"-1, -1, 0, 0","Button 8 Func":"null","Button 9 Data":"-1, -1, 0, 0","Button 9 Func":"null"}},
{"name":"DMV_Stat_CriticalDamageRate","status":true,"description":"This plugin allows more control over critical damage calculation.","parameters":{"Default CDR Funk":"1.5"}},
{"name":"DMV_Stat_DamageLevels","status":true,"description":"This plugin creates a bunch of new attack and defence  \r\nrelated stats which can also be used in skill formulas.","parameters":{"-- Attack Level Stats --":"","ATL Form":"this.level","CAL Form":"0","PAL Form":"0","MAL Form":"0","SAL Form":"0","-- Defence Level Stats --":"","DFL Form":"this.level","CDL Form":"0","PDL Form":"0","MDL Form":"0","SDL Form":"0"}},
{"name":"DMV_Stat_ParamDistribute","status":true,"description":"Allows for parameters to be 'distributed' via the status \r\nscene and the new distribution window.","parameters":{"--- ACTOR SETTINGS ---":"","Default Min Values":"1, 1, 1, 1, 1, 1, 1, 1","Default Modifiers":"9.5, 9.5, 2, 2, 2, 2, 2, 2","Max Distribution Points":"this.level * 8 + 8;","--- WINDOW SETTINGS ---":"","Regular Window Data":"768, 264, 47, 162, 128","Toggled Window Data":"485, 264, 330, 162, 255","--- TEXT SETTINGS ---":"","Points Text Data":"32, 0","MHP Text Data":"30, 32, 32","MMP Text Data":"64, 32, 32","ATK Text Data":"98, 32, 32","DEF Text Data":"132, 32, 32","MAT Text Data":"166, 32, 32","MDF Text Data":"200, 32, 32","AGI Text Data":"234, 32, 32","LUK Text Data":"268, 32, 32","--- STAT UP BUTTONS ---":"","MHP Up Button Data":"48, 80","MMP Up Button Data":"82, 80","ATK Up Button Data":"116, 80","DEF Up Button Data":"150, 80","MAT Up Button Data":"184, 80","MDF Up Button Data":"218, 80","AGI Up Button Data":"252, 80","LUK Up Button Data":"286, 80","--- STAT DOWN BUTTONS ---":"","MHP Down Button Data":"48, 114","MMP Down Button Data":"82, 114","ATK Down Button Data":"116, 114","DEF Down Button Data":"150, 114","MAT Down Button Data":"184, 114","MDF Down Button Data":"218, 114","AGI Down Button Data":"252, 114","LUK Down Button Data":"286, 114"}},
{"name":"DMV_Stat_ParamLimitBreak","status":true,"description":"This plugin allows for actor parameter limits to be broken.","parameters":{"-- actor --":"","Actor MaxHP":"99999","Actor MaxMP":"99999","Actor MaxAtk":"9999","Actor MaxDef":"9999","Actor MaxMat":"9999","Actor MaxMdf":"9999","Actor MaxAgi":"9999","Actor MaxLuk":"9999","-- enemy --":"","Enemy MaxHP":"9999999","Enemy MaxMP":"9999999","Enemy MaxAtk":"99999","Enemy MaxDef":"99999","Enemy MaxMat":"99999","Enemy MaxMdf":"99999","Enemy MaxAgi":"99999","Enemy MaxLuk":"99999","-- other --":"","Other MaxHP":"99","Other MaxMP":"99","Other MaxAtk":"9","Other MaxDef":"9","Other MaxMat":"9","Other MaxMdf":"9","Other MaxAgi":"9","Other MaxLuk":"9"}},
{"name":"DMV_Stat_Willpower","status":true,"description":"Creates new stats: will, and willrt. (willpower & rate)","parameters":{"Default Will Funk":"(this.willrt/2)+(this.will/1000)"}},
{"name":"DMV_TimerWait4Event","status":true,"description":"This plugin allows the game timer to wait for events.","parameters":{"Default Wait":"true"}}
];

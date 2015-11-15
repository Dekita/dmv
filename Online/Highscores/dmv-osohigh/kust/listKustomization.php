<?php
/**
* Author: David Bow (Dekita - www.dekyde.com)
* Info: Simple container to hold all valid highscore lists.
* 
* $listSettings[listID]
* listID: The list identifier sent from RPG Maker Mv.
* 
* $listSettings[listID]['name']
* Should be equal to the mysql database table name.
* 
* $listSettings[listID]['type']
* Should be equal to A, B, C or D, depending on how
* you wish for the list to be ordered. 
* 
* $listSettings[listID]['show']
* Should be equal to the number of highscores to 
* return back to RPG Maker Mv.
* 
*/
$listSettings["Test"]["name"] = "default_score_table";
$listSettings["Test"]["type"] = "A";
$listSettings["Test"]["show"] = 999;

$listSettings["DefaultList1"]["name"] = "highlist1";
$listSettings["DefaultList1"]["type"] = "A";
$listSettings["DefaultList1"]["show"] = 999;

$listSettings["DefaultList2"]["name"] = "highlist2";
$listSettings["DefaultList2"]["type"] = "A";
$listSettings["DefaultList2"]["show"] = 999;

$listSettings["DefaultList3"]["name"] = "highlist3";
$listSettings["DefaultList3"]["type"] = "A";
$listSettings["DefaultList3"]["show"] = 999;

?>
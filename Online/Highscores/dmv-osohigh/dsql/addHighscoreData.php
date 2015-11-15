<?php
# 
# This file is included internally from the main api.
# You should not really need to change anything here.
# 

# Gets the new entries data
$newEntryPname = $db->real_escape_string(strip_tags($dekData[0]));
$newEntryScore = strip_tags($dekData[1]);
$newEntryExtra = $db->real_escape_string(strip_tags($dekData[2]));

# Checks to see if the score type is timescore
if ($newEntryScore == "TIMESCORE"){
    $newEntryStamp = time();
    $newEntryScore = date("d-m-Y h:i:s", $newEntryStamp);
    $sqlQuerySpntf = "'%s','%s','%s'";
}else{
    $sqlQuerySpntf = "'%s','%d','%s'";
}


# Setup the base mysql query.
$sqlQuery = <<<SQL
	INSERT INTO `{$currentList['name']}` (`UniqueEntryID`,
		`EntryName`,`EntryScore`,`EntryExtra`,`EntryStamp`) 
	VALUES (0,{$sqlQuerySpntf},CURRENT_TIMESTAMP)
SQL;

# Setup the full mysql query.
$sqlQuery = sprintf($sqlQuery, $newEntryPname, $newEntryScore, $newEntryExtra);

?>
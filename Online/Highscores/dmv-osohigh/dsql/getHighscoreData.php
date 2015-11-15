<?php
# 
# This file is included internally from the main api.
# You should not really need to change anything here.
# 

# Determines the list ordering type.
switch ($currentList["type"]) {
    case 'D': $sqlOrder = "EntryTimestamp ASC LIMIT"; break;
    case 'C': $sqlOrder = "EntryTimestamp DESC LIMIT";break;
    case 'B': $sqlOrder = "EntryScore ASC LIMIT"; break;
    case 'A': $sqlOrder = "EntryScore DESC LIMIT";break;
    default:  $sqlOrder = "EntryScore DESC LIMIT";break;
}

# Setup the mysql query.
$sqlQuery = <<<SQL
    SELECT EntryName, EntryScore, EntryExtra 
    FROM {$currentList['name']} 
    ORDER BY {$sqlOrder} {$currentList['show']} 
SQL;

?>
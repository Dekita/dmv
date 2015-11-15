<?php
# 
# How To Use:
# Simply call the php file and pass in a 'name' parameter.
# There is also an optional 'data' parameter to determine the highscore
# table description. 
# 
# Examples: 
# dmv-osohigh/addtable/NEW_TABLE_NAME
# dmv-osohigh/addtable/NEW_TABLE_NAME/NewTableDescription
#
# NOTE: 
# In order to use this part of the API, you must enable it
# within the main api.php file. For more informaiton, see 
# the disabled section around line 10 of the api.php file.
# 

# Ensures list name is available.
if (isset($urlData[1]) && !empty($urlData[1])){
    $dekList = strip_tags($urlData[1]);
}else{
    die("Unable to locate API new list name!");
}

# Ensures list description is available.
if (isset($urlData[2]) && !empty($urlData[2])){
    $dekData = strip_tags($urlData[2]);
}else{
    $dekData = 'This is a basic highscore table.';
}

# Opens new mysqli connection with predefined settings.
$db = new deksqli;

# Ensures the database connected successfully.
if($db->connect_errno > 0){
    die("Unable to connect to database [{$db->connect_error}]");
}

# Setup the mysql query.
# USE " `EntryScore` text NOT NULL, " for TIMESCORE's
$sqlQuery = <<<SQL
  CREATE TABLE `{$dekList}` (
    `UniqueEntryID` bigint(20) UNSIGNED NOT NULL,
    `EntryName` text NOT NULL,
    `EntryScore` int(9) NOT NULL,
    `EntryExtra` text NOT NULL,
    `EntryStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='{$dekData}';
SQL;
# Ensures there was no error with the query.
if(!$result = $db->query($sqlQuery)){
    die("There was an error creating the table [{$db->error}]");
}

# Setup the mysql query.
$sqlQuery = <<<SQL
  ALTER TABLE `{$dekList}`
  ADD UNIQUE KEY `UniqueEntryID` (`UniqueEntryID`);
SQL;
# Ensures there was no error with the query.
if(!$result = $db->query($sqlQuery)){
    die("There was an error altering the table keys [{$db->error}]");
}

# Setup the mysql query.
$sqlQuery = <<<SQL
  ALTER TABLE `{$dekList}`
  MODIFY `UniqueEntryID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
SQL;
# Ensures there was no error with the query.
if(!$result = $db->query($sqlQuery)){
    die("There was an error altering the table AI [{$db->error}]");
}

# Close the database.
$db->close();

# Echo completion.
echo("The table '{$dekList}' should now be created! Please check your database via phpmyadmin or similar.<br />");

?>
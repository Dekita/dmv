<?php

# Header to allow access to file from js env
header("Access-Control-Allow-Orgin: *");

# Sets time zone for TIMESCORE's
$time_zone = "GMT";
date_default_timezone_set($time_zone);

#############################################
# This below $_GET section is purely to allow
# for the developer to easily add a new score 
# table into the sql database. 

/* # <-- Add '#' BEFORE this line to enable.
if (true && isset($_GET['data'])){
    $urlData = explode('/', $_GET['data']);
    $urlDown = strtolower($urlData[0]) === 'addtable';
    if (isset($urlData[0]) && !empty($urlData[0]) && $urlDown){
        # Includes the sql databse settings
        include_once("kust/dsqlKustomization.php");        
        include_once('dsql/addNewScoreTable.php');
        die();
    }
}
*/ # <-- Add '#' BEFORE this line to enable.

# NOTE: This Should be removed for production
# You can make false for temporary disabling.
# 
# I disabled this by default to ensure that
# if it was enabled, the developer would be 
# 100% aware of doing so. Simply uncomment 
# the code above to re-enable the feature. 
#############################################


# Sets up main GET variables used by system
# Ensures all variables are correct before allowing
# The api to proceed any further. 
if (isset($_POST['data'])){
 
    $urlData = explode('/', $_POST['data']);

    if (isset($urlData[0]) && !empty($urlData[0])){
        $dekVerb = $urlData[0];
    }else{
        die("Unable to locate API access type!");
    }

    if (isset($urlData[1]) && !empty($urlData[1])){
        $dekList = $urlData[1];
    }else{
        die("Unable to locate API list type!");
    }

    if ($dekVerb === 'add'){
        if (isset($urlData[2]) && !empty($urlData[2])){
            $dekData = explode(',', $urlData[2]);
            if (sizeof($dekData) < 3){
                die("API new score data is incomplete!");
            }
            if (empty($dekData[0])){
                die("API new score name is incomplete!");
            }
            if (empty($dekData[1])){
                die("API new score value is incomplete!");
            }
        }else{
            die("Unable to locate API new score data!");
        }
    }
}


# Include highscore list database file
include_once("kust/listKustomization.php");

# Includes the sql databse settings
include_once("kust/dsqlKustomization.php");

# Ensures list type is a valid $file_data id
if (!array_key_exists($dekList, $listSettings)){
    die("List Id Given Was Invalid!!");
}

# Sets currently processing lists details
$currentList = $listSettings[$dekList];

# Opens new mysqli connection with predefined settings.
$db = new deksqli;

# Includes the required file based on verb
switch ($dekVerb) {
    case 'add': include("dsql/addHighscoreData.php"); break;
    case 'get': include("dsql/getHighscoreData.php"); break;
}

# Ensures the database connected successfully.
if($db->connect_errno > 0){
    die("Unable to connect to database [{$db->connect_error}]");
}

# Ensures there was no error with the query.
if(!$result = $db->query($sqlQuery)){
    die("There was an error running the query [{$db->error}]");
}

switch ($dekVerb) {
    # Adds the new data and echos back confirmation.
    case 'add': 
        echo("Successfully added new score: {$newEntryPname} - {$newEntryScore}");
        break;
    # Iterates over rows and echos back the data.
    case 'get': 
        while($row = $result->fetch_assoc()){
            if (($currentList["show"]--) > 0){
                $ename = $row['EntryName'];
                $score = $row['EntryScore'];
                $extra = $row['EntryExtra'];
                echo("{$ename},{$score},{$extra};");
            }else{
                break;
            }
        }
        $result->free();
        break;
}

# Close the database.
$db->close();

?>
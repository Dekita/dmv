<?php
/**
* Author: David Bow (Dekita - www.dekyde.com)
* Class: deksqli
* Info: Simple class to house database settings privately.
*/
class deksqli extends mysqli {

    private $dekHost = "localhost";
    private $dekUser = "root";
    private $dekWord = "";
    private $dekBase = "dmv_osohigh";

    function __construct() {
        return parent::__construct(
            $this->dekHost,
            $this->dekUser,
            $this->dekWord,
            $this->dekBase);
    }
}

?>
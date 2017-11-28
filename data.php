<?php
// Let any domain access (using because of "Access-Control-Allow-Origin" error)
header('Access-Control-Allow-Origin: *');

// Set the JSON header
header("Access-Control-Allow-Headers: Content-Type");
header("Content-type: text/json");

$chartType = $_GET['type'];

try {
    switch ($chartType) {
        //Returns an array conataining 30 random numbers between 0 and 3
        case 'line':
            $aData = array();
    
            for ($i=0; $i < 30; $i++) { 
               $y = rand(0, 3);   
               $aData[] = array($i, $y);
            }
    
            echo json_encode($aData);
            break;
        
        //Returns a random number representing the milliseconds between 0 and 40 minutes
        case 'gauge':
    
            $milliseconds = rand(0, 60*40*1000);
    
            echo json_encode($milliseconds);
            break;
    
        default:
            throw new Exception("Invalid chart type.", 1);
            break;
    }
}
catch (Exception $e) {
    echo $e->getMessage();
}

?>
<?php
$db = pg_connect("host=ec2-54-163-240-54.compute-1.amazonaws.com port=5432 dbname=dcff7b1rei2d3l user=qveqzbflymzrlh password=6aedd8225d71acc73d3bb619bfaf15a92d6c4ba3a978afac6602207b22a15d13);
$query = "INSERT INTO login VALUES ('0', '$_POST[username]','$_POST[password]','$_POST[name]')";
$result = pg_query($query);
?>

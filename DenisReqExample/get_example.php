<?php
$contents = file_get_contents("http://163.5.84.111:2222/v0.1/api/account/1");
if ($contents !== FALSE) {
	echo $contents;
} else {
	echo "Manon a des merge conflicts!";
}
?>

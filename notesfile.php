<?php
	$notes = $_POST['notes'];
$conn = new mysqli('localhost','root','','notes');
if($conn->connect-error){
	die('Connection Failed : '.$conn->connect-error);
}else{
	$stmt = $conn->prepare("insert into uplode(notes)
	values(?)");
	$stmt->bind_param("v",$notes);
	$stmt->execute();
	echo "registration successfully...";
	$stmt->close();
	$conn->close();
?>
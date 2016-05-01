<?php
session_start ();
include_once('../config.php');
if (isset($_GET['new'])){
	if (isset($_FILES['fichiers']))
	{
		$myFile = $_FILES['fichiers'];
		$fileCount = count($myFile["name"]);

		for ($i = 0; $i < $fileCount; $i++)
		{
			?>
			<p>File #<?= $i+1 ?>:</p>
			<p>
				Name: <?= $myFile["name"][$i] ?><br>
				Temporary file: <?= $myFile["tmp_name"][$i] ?><br>
				Type: <?= $myFile["type"][$i] ?><br>
				Size: <?= $myFile["size"][$i] ?><br>
				Error: <?= $myFile["error"][$i] ?><br>
			</p>
			<?php
		}
	}
}elseif ( isset($_POST["image"]) && !empty($_POST["image"]) ) {
    $dataURL = $_POST["image"]; 
    $parts = explode(',', $dataURL); 
    $data = $parts[1]; 
    $data = base64_decode($data); 
    $fp = fopen('images/carte/'.$data.'.jpg', 'w+'); 
    fwrite($fp, $data); 
    fclose($fp);
	$_SESSION['picture'] = $data.'.jpg';
	$_SESSION['price'] = $_POST['somme']*2;
}
?>
<!doctype html>
<html>
<head>
	<title>Test</title>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<input name="" type="textarea" placeholder="Youtube url separe par des virgules ex : https://www.youtube.com/watch?v=A0kd-w7Xwd8,https://www.youtube.com/watch?v=W4VTq0sa9yg" />
		<input name="texte1" type="textarea" placeholder="Texte 1" />
		<input name="texte2" type="textarea" placeholder="Texte 2" />
		<input name="youtube" type="textarea" placeholder="Youtube url separe par des virgules ex : https://www.youtube.com/watch?v=A0kd-w7Xwd8,https://www.youtube.com/watch?v=W4VTq0sa9yg" />
		Photos <input type="file" name="fichiers[]" multiple>
		<input type="submit" value="Envoyer">
	</form>

</body>
</html>

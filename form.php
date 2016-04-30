<?php
if (isset($_POST['new']))
{
	if (isset($_FILES['fichiers']))
	{
		$fichiers = $_FILES['fichiers'];
		$fileCount = count($fichiers["name"]);

		for ($i = 0; $i < $fileCount; $i++)
		{
			$i++;
			$filename = hash_file('sha512', $fichiers["tmp_name"][$i]);
			$path = "/images/campagne/".$user.".".$filename.".".pathinfo($fichiers["tmp_name"][$i], PATHINFO_EXTENSION);
			$photo_json[$i] = $path;
		}
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Test</title>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<br /><input type="text" name="name" placeholder="Nom campagne">
		<br /><textarea name="texte1" placeholder="Texte 1">
		<br /><textarea name="texte2" placeholder="Texte 2">
		<br /><textarea name="video" placeholder="youtube url separe par des virgules">
		<br /><input type="hidden" name="new" value="upload"/>
		<br /><input type="file" name="fichiers[]" multiple>
		<br /><input type="submit" value="Upload">
	</form>

</body>
</html>

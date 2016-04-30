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
		<input type="text" name="name" placeholder="Nom campagne">
		<input type="textarea" name="texte1" placeholder="Texte 1">
		<input type="textarea" name="texte2" placeholder="Texte 2">
		<input type="textarea" name="video" placeholder="youtube url separe par des virgules">
		<input type="hidden" name="new" value="upload"/>
		<input type="file" name="fichiers[]" multiple>
		<input type="submit" value="Upload">
	</form>

</body>
</html>

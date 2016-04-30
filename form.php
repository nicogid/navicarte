<!doctype html>
<html>
<head>
	<title>Test</title>
</head>
<body>
	<form method="post" enctype="multipart/form-data">
		<input type="file" name="fichiers[]" multiple>
		<input type="submit" value="Upload">
	</form>
	<?php
	if (isset($_FILES['fichiers'])) {
		$fichiers = $_FILES['fichiers'];
		$fileCount = count($fichiers["name"]);

		for ($i = 0; $i < $fileCount; $i++) {
			?>
			<p>File #<?= $i+1 ?>:</p>
			<p>
				Name: <?= $fichiers["name"][$i] ?><br>
				Temporary file: <?= $fichiers["tmp_name"][$i] ?><br>
				Type: <?= $fichiers["type"][$i] ?><br>
				Size: <?= $fichiers["size"][$i] ?><br>
				Error: <?= $fichiers["error"][$i] ?><br>
			</p>
			<?php
		}
	}
	?>
</body>
</html>

<?php
include_once('config.php');
if (isset($_POST['new']))
{
	$redis = new Redis();
	$redis->connect('127.0.0.1'); // port 6379 by default
	if (!$redis->get('last_id_campagne'))
	{
		$redis->set('last_id_campagne', 0);
	}
	if (isset($_FILES['fichiers']))
	{

		$fichiers = $_FILES['fichiers'];
		$fileCount = count($fichiers["name"]);

		for ($i = 0; $i < $fileCount; $i++)
		{
			$ext = pathinfo($fichiers["tmp_name"][$i], PATHINFO_EXTENSION);
			$filename = hash_file('sha1', $fichiers["tmp_name"][$i]);
			$path = "images/campagne/".$user.".".$filename.".".$ext;
			move_uploaded_file($fichiers["tmp_name"][$i], "$path");
			$photo_json[$i] = $path;
		}
	}
	$data_array = array(
		'texte1' => $_POST['texte1'],
		'name' => $_POST['name'],
		'texte1' => $_POST['texte1'],
		'video' => $_POST['video'],
		'images' => json_encode($photo_json)
	);
	$campagne_id = $redis->get('last_id_campagne') + 1;
	$redis->incr('last_id_campagne');
	$redis->delete($user.$campagne_id);
	$redis->hMSet($user.":".$campagne_id, $data_array);
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
		<br /><textarea name="texte1" placeholder="Texte 1"></textarea>
		<br /><textarea name="video" placeholder="youtube url separe par des virgules"></textarea>
		<br /><input type="hidden" name="new" value="1"/>
		<br /><input type="file" name="fichiers[]" multiple>
		<br /><input type="submit" value="Envoyer">
	</form>

</body>
</html>

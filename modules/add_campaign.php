<?php
include_once('../config.php');
if (isset($_POST['new']))
{
	if (!$redis->get('last_id_campagne')){
		$redis->set('last_id_campagne', 0);
	}
	if (isset($_FILES['fichiers'])){

		$fichiers = $_FILES['fichiers'];
		$fileCount = count($fichiers["name"]);

		for ($i = 0; $i < $fileCount; $i++)
		{
			$file = $fichiers["tmp_name"][$i];
			$ext = pathinfo($file, PATHINFO_EXTENSION);
			$filename = hash_file('sha1', $file);
			$path = "images/campagne/".$user.".".$filename.".jpg";
			move_uploaded_file($file, $path);
			$photo_json[$i] = $path;
		}
	}
	$data_array = array(
		'texte1' => $_POST['texte1'],
		'name' => $_POST['name'],
		'texte1' => $_POST['texte1'],
		'user' => $user,
		'video' => $_POST['video'],
		'images' => json_encode($photo_json)
	);
	$campagne_id = $redis->get('last_id_campagne') + 1;
	$redis->incr('last_id_campagne');
	$redis->delete("campagne:".$campagne_id);
	$redis->hMSet("campagne:".$campagne_id, $data_array);
	$redis->sAdd('user:'.$user.':campagne_list', $campagne_id);
}
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Sexy Forms</title>
		<link rel="stylesheet" href="../assets/css/style.css" />
		<link href='http://fonts.googleapis.com/css?family=Engagement' rel='stylesheet' type='text/css'>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../assets/js/jquery.uniform.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" charset="utf-8">
			$(function(){
				$("input:checkbox, input:radio, input:file, select").uniform();
			});
		</script>
	</head>
	<body>
		<article>
			<h1>Sexy form elements</h1>
			<form method="post">
				<ul>
					<li>
						<label for="name">Nom de la campagne:</label>
						<input type="text" size="40" id="name" placeholder="Nom campagne"/>
					</li>
					<li>
						<label for="email">Lien Youtube:</label>
						<input type="email";l size="40" id="text" />
					</li>
					<li>
						<label><input type="radio" name="radio" /> Mise en place de publicité</label>
						<label><input type="radio" name="radio" /> Contenu libre</label>
					</li>
					<li>
						<label><input type="checkbox" /> Si oui, souhaiez-vous utilisé notre régie publicitaire</label>
					</li>
					<li>
						<label>Charger vous images:</label>
						<input type="file" name="fichiers[]" multiple>
					</li>
					<li>
						<label for="message">Message:</label>
						<textarea cols="50" rows="5" id="message"></textarea>
					</li>
				</ul>
				<p>
					<button type="submit" class="action">Call to action</button>
					<button type="reset" class="right">Reset</button>
				</p>
			</form>
		</article>
		<footer>
			<p>A little freebie made with <strong>♥</strong> by the nice folks over at <a href="http://www.webdezign.co.uk">Webdezign</a></p>
		</footer>
<!-- Contact -->
<article id="contact" class="panel">
	<header>
		<h2>Contact Me</h2>
	</header><form method="post" enctype="multipart/form-data">
		<div>
			<div class="6u$ 12u$(mobile)">
				<input type="text" name="name" placeholder="Nom campagne">
			</div>
			<div class="6u$ 12u$(mobile)">
				<textarea name="texte1" placeholder="Texte 1"></textarea>
			</div>
			<div class="12u$">
				<textarea name="video" placeholder="youtube url separe par des virgules"></textarea>
			</div>
			<input type="hidden" name="new" value="1"/>
			<div class="6u$ 12u$(mobile)">
				<input type="file" name="fichiers[]" multiple>
			</div>
			<div class="6u$ 12u$(mobile)">
				<input type="submit" value="Envoyer">
			</div>
		</div>
	</form>
</article>

<?php
include_once('config.php');
if (isset($_POST['new']))
{
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
<!-- Contact -->
<article id="contact" class="panel">
	<header>
		<h2>Contact Me</h2>
	</header>
	<form action="#" method="post">
		<div>
			<div class="row">
				<div class="6u 12u$(mobile)">
					<input type="text" name="name" placeholder="Name" />
				</div>
				<div class="6u$ 12u$(mobile)">
					<input type="text" name="email" placeholder="Email" />
				</div>
				<div class="12u$">
					<input type="text" name="subject" placeholder="Subject" />
				</div>
				<div class="12u$">
					<textarea name="message" placeholder="Message" rows="8"></textarea>
				</div>
				<div class="12u$">
					<input type="submit" value="Send Message" />
				</div>
			</div>
		</div>
	</form>
</article>

<form method="post" enctype="multipart/form-data">
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
</form>
</body>
</html>

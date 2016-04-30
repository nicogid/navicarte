<?php
include_once('config.php');
if (isset($_GET['id']) && isset($_GET['collection']) && $_GET['id'] != "null")
{

}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Enrigistrer une carte</title>
</head>

<body><?php
	if ($_GET['collection'] == "null")
	{
		echo "<h4>Merci de renseigner une campagne</h4>";
	}
	?>
	<form>
		Numero	 : <input type="number" name="id"/><br />
		<select name="collection">
			<option value="null">Selectionner une campagne</option>
			<?php
			$campagne_list = $redis->sMembers('user:'.$user.':campagne_list');
			foreach ($campagne_list as $value)
			{
				echo "<option value=\"".$value."\">".$redis->hGet('campagne:'.$value, 'name')."</option>";
			}
			?>
		</select><br />
		<input type="submit" value="Ajouter">
	</form>
</body>
</html>

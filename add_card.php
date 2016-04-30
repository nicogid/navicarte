<?php
include_once('config.php');


?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Enrigistrer une carte</title>
</head>

<body>
	<form>
		<input type="number" name="id"/>
		<select name="collection">
			<option value="null">Selectionner une campagne</option>
			<?php
			$campagne_list = $redis->sMembers('user:'.$user.':campagne_list');
			foreach ($campagne_list as $value)
			{
				echo "<option value=\"volvo\">Volvo</option>";
			}
			 ?>
		</select>
	</form>
</body>
</html>

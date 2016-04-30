<!-- Contact -->
<article id="contact" class="panel">
	<header>
		<h2>Ajouter une carte</h2>
	</header>
	<?php
	if ($_GET['collection'] == "null")
	{
		echo "<h4>Merci de renseigner une campagne</h4>";
	}
	?>
	<form action="#" method="post">
		<div>
			<div class="row">
				<div class="6u 12u$(mobile)">
					<input type="number" placeholder="Numero" name="id_carte"/>
				</div>
				<div class="6u$ 12u$(mobile)">
					<select name="collection">
						<option value="null">Selectionner une campagne</option>
						<?php
						$campagne_list = $redis->sMembers('user:'.$user.':campagne_list');
						foreach ($campagne_list as $value)
						{
							echo "<option value=\"".$value."\">".$redis->hGet('campagne:'.$value, 'name')."</option>";
						}
						?>
					</select>
				</div>
				<div class="12u$">
					<input type="submit" value="Send Message" />
				</div>
			</div>
		</div>
	</form>
</article>


<form>

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

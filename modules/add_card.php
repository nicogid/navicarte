<!-- Contact -->
	<article id="contact" class="panel">
		<header>
			<h2>Ajouter une carte</h2>
		</header>
		<form action="#" method="post">
			<div>
				<div class="row">
					<div class="6u 12u$(mobile)">
					<input type="number" placeholder="Numero" name="id_carte"/>
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



if ($_GET['collection'] == "null")
{
	echo "<h4>Merci de renseigner une campagne</h4>";
}
?>
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

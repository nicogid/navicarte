
<!-- Work -->
<article id="work" class="panel">
	<header>
		<h2>Work</h2>
	</header>
	<p>
		<?= $redis->hGet('campagne'.$campagne_id, 'texte1')  ?>
	</p>
	<section>
		<div class="row">
			<?php
			$photos = $redis->hGet('campagne:'.$campagne_id, 'images');
			$photos = json_decode($photos);
			var_dump($photos);
			foreach ($photos as $value)
			{
				var_dump($value);
				echo "<div class=\"4u 12u$(mobile)\">";
				echo "	<a href=\"#\" class=\"image fit\"><img src=\"".$value."\" alt=\"\"></a>";
				echo "</div>";
			}
			?>
		</div>
	</section>
</article>

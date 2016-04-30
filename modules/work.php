
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
			$photos = json_decode($redis->hGet('campagne'.$campagne_id, 'images'));
			foreach ($photos as $key => $value)
			{
				echo "<div class=\"4u 12u$(mobile)\">";
				echo "	<a href=\"#\" class=\"image fit\"><img src=\"".$value."\" alt=\"\"></a>";
				echo "</div>";
			}
			?>
		</div>
	</section>
</article>

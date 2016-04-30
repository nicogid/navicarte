
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
			foreach ($photos as $key => $image)
			{
				echo "<div class=\"4u 12u$(mobile)\">";
				echo "	<a href=\"#\" class=\"image fit\"><img src=\"".$key['image']."\" alt=\"\"></a>";
				echo "</div>\n";
			}
			?>
		</div>
	</section>
</article>

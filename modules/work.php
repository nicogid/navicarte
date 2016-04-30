
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
			$i = 0;
			while ($photos[$i]['image'])
			{
				echo "<div class=\"4u 12u$(mobile)\">";
				echo "	<a href=\"#\" class=\"image fit\"><img src=\"".$photos[$i]['image']."\" alt=\"\"></a>";
				echo "</div>";
				$i++;
			}
			?>
		</div>
	</section>
</article>

<?php
$redis = new Redis();
$redis->connect('127.0.0.1'); // port 6379 by default
$valeur = $redis->Get('test2:ddsfds');
echo "Ceci est un test";
echo $valeur;
?>

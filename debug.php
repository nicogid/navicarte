<?php
$output = shell_exec('tail /var/log/apache2/error.log');
echo "<pre>$output</pre>";
?>

#!/bin/bash

while true; do
git pull
chown -R www-data:www-data /var/www
sleep 300
done


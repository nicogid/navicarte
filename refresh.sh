#!/bin/bash

while true; do
git pull
chown -R www-data:www-data /var/www
done


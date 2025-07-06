#!/bin/bash
cd /home/ubuntu
pkill node || true
nohup node app.js > output.log 2>&1 &

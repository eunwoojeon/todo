#!/bin/bash
REPOSITORY=/home/ubuntu/repo

cd $REPOSITORY

sudo /usr/bin/yarn
sudo /usr/bin/pm2 start npm --name "todo" -- run running
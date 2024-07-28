#!/bin/bash
REPOSITORY=/home/ubuntu/repo/todo

cd $REPOSITORY

sudo pm2 start dist/server.js
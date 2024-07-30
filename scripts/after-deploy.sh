#!/bin/bash
REPOSITORY=/home/ubuntu/repo/todo

cd $REPOSITORY

sudo pm2 restart dist/server.js
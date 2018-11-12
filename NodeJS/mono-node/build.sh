#!/bin/bash

docker_filename=Dockerfile
target_image=127.0.0.1:5000/chat-app

working_dir_container=/srv/node/

# --- AUTO FROM HERE ---
working_dir=$(cd $(dirname $0); pwd)

sudo docker build -f $working_dir/$docker_filename . -t $target_image


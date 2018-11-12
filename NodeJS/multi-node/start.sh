#!/bin/bash

stack_name="nodejs-chat"
compose_filename="docker-compose.yml"

# --- AUTO FROM HERE ---

sudo docker-compose -f $compose_filename build
sudo docker-compose -f $compose_filename -p $stack_name up --detach


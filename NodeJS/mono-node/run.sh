#!/bin/bash

target_image=127.0.0.1:5000/chat-app

# --- AUTO FROM HERE ---
sudo docker run -d $target_image


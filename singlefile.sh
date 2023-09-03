#!/bin/bash

# Check if two parameters are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <parameter1> <parameter2>"
    exit 1
fi

# Store the parameters in variables
parameter1="$1"
parameter2="$2"

# Run the Docker container with the given parameters
#docker run singlefile "$parameter1" > "$parameter2"

single-file "$parameter1" --browser-executable-path=/opt/google/chrome/chrome --browser-headless=false --dump-content > "$parameter2"

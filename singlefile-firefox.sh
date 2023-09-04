#!/bin/bash

# Check if two parameters are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <parameter1> <parameter2>"
    #exit 1
fi

# Store the parameters in variables
parameter1="$1"
parameter2="$2"

# Run the Docker container with the given parameters
#docker run singlefile "$parameter1" > "$parameter2"

#single-file "$parameter1" --browser-executable-path=/opt/google/chrome/chrome --browser-headless=false --dump-content > "$parameter2"
# echo "$parameter1"
# echo "$parameter2"

#single-file "$parameter1" --browser-executable-path=/snap/bin/firefox --back-end=puppeteer-firefox --browser-headless=false --dump-content > "$parameter2"

single-file "file:///mnt/microsd/ext4/zotero/storage/525NVU3M/978-3-540-75148-9_7.html" --browser-executable-path=/snap/bin/firefox --back-end=puppeteer-firefox --browser-headless=false --dump-content > "test.html"

#single-file "https://www.sciencedirect.com/science/article/pii/S0747563209001368?casa_token=Eopc9v9qSrUAAAAA:0Ve4ujVcFvV1uowW95mNy-VaidOEiG5tRY0I1ZUqI20CIFzXEoOS0wZtQ8Bw0TPaA5oaNHTA4UY" --browser-executable-path=/opt/google/chrome/chrome  --browser-headless=false --dump-content > "test.html"

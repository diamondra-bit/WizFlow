
#!/bin/bash

set -x

# Redirect output to a log file
exec >> /home/stage/Documents/logfilef.log 2>&1

# Navigate to the directory where your React app is located
cd /home/stage/stage2/client



# Build the React app (assuming you have a build script in your package.json)
npm run build

# Start the serve command to host the built React app
serve -s build -l 3003


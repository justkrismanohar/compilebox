Step 1.   Execute Install_updated_docker.sh  
Step 2.   Build docker image with the follow commands  
Step 2.1  docker image //list the current  docker images in the system  
Step 2.2  docker build -t kmvm . //Uses file named Dockerfile in the current directory to build image. Names it kmvm  
Step 3.   Use nodejs to run app.js (User forever to keep server alive. Use forever list to get data on current jobs. Use tail -f /path/to/logfile for live updates.   


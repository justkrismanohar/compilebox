###########################
# Get files for updated Docker
###########################
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-trusty main'
sudo apt-get update
docker
sudo apt-get install docker-ce
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo add-apt-repository   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
sudo apt-get update

###########################
# Install Docker
###########################
sudo apt-get install docker-engine
sudo apt-get install docker-ce
docker --version

###########################
# Install NodeJS
###########################
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo apt-get install nodejs-legacy
sudo npm install express -g
sudo npm install forever -g
cd ../API
sudo npm install
cd ../Setup
echo "NodeJS setup Complete"

###########################
# Start Docker
###########################
chmod 777 ../API/DockerTimeout.sh
chmod 777 ../API/Payload/script.sh
chmod 777 ../API/Payload/javaRunner.sh
chmod 777 UpdateDocker.sh
echo "Permissions Changed"

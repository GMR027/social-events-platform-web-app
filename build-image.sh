#! /bin/sh

docker build -t social-events-web-app .

docker tag social-events-web-app longmont.iguzman.com.mx:5000/social-events-web-app:1.0

docker push longmont.iguzman.com.mx:5000/social-events-web-app:1.0

echo "done"

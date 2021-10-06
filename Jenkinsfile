pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        APP_FOLDER = "social-events-web-app"
        REACT_APP_API_URL = sh(script: "echo ${API_URL}", , returnStdout: true).trim()
        REACT_APP_BRANCH_NAME = sh(script: "echo ${branchName}", , returnStdout: true).trim()
        REACT_APP_FACEBOOK_APP_ID = sh(script: "echo ${facebookAppID}", , returnStdout: true).trim()
        ENVT = sh(script: "echo ${ENV}", , returnStdout: true).trim()
        BUILD_MOBILE_APP = sh(script: "echo ${BUILD_MOBILE_APP}", , returnStdout: true).trim()
    }
    stages {
        stage("Check App folders") {
            steps {
                sh "sudo mkdir /$APP_FOLDER -p"
                sh "sudo chmod -R 777 /$APP_FOLDER"
                sh "sudo mkdir /$APP_FOLDER/$ENVT -p"
                sh "sudo chmod -R 777 /$APP_FOLDER/$ENVT"

                sh "sudo mkdir /$APP_FOLDER/$ENVT/static -p"
                sh "sudo chmod -R 777 /$APP_FOLDER/$ENVT/static"

                sh "sudo mkdir /$APP_FOLDER/$ENVT/assets -p"
                sh "sudo chmod -R 777 /$APP_FOLDER/$ENVT/assets"
            }
        }
        stage("Build statics") {
            steps {
                sh "npm i"
                sh "npm run build"
                sh "cp -r build/static /$APP_FOLDER/$ENVT"
                sh "cp -r build/assets /$APP_FOLDER/$ENVT"
            }
        }
        stage("Build & push docker image") {
            steps {
                sh "sudo docker build --build-arg REACT_APP_API_URL=$REACT_APP_API_URL -t $APP_FOLDER ."
                sh "sudo docker tag $APP_FOLDER longmont.iguzman.com.mx:5000/$APP_FOLDER:1.0"
                sh "sudo docker push longmont.iguzman.com.mx:5000/$APP_FOLDER:1.0"
            }
        }
        stage("Stop current instance") {
            steps {
                sh "sudo docker-compose -f docker-compose.yaml down"
            }
        }
        stage("Start instance") {
            steps {
                sh "sudo docker-compose -f docker-compose.yaml up -d"
            }
        }
        stage("Build Mobile App") {
            when {
                expression { BUILD_MOBILE_APP == "yes" }
            }
            environment {
                REACT_APP_IS_MOBILE_APP = "true"
            }
            steps {
                sh "npm i"
                sh "npm run build"
            }
        }
        stage("Builid Android App") {
            when {
                expression { BUILD_MOBILE_APP == "yes" }
            }
            steps {
                sh "rm -rf app"
                sh "cordova create app"
                sh "cp -r build app/"
                sh "rm -rf app/www"
                sh "mv app/build app/www"
                sh "./android/prepare-index.sh"
                sh "rm app/config.xml"
                sh "cp android/config.xml app/"
                sh "cp android/logo.png app/"
                sh "cp android/splash.png app/"
                sh "tar -cvf app.tar app/"
                sh "cp app.tar /$APP_FOLDER/$ENVT/static"
                dir("app") {
                    sh "cordova platform add android"
                    sh "cordova plugin add cordova-plugin-device"
                    sh "cordova plugin add cordova-plugin-splashscreen"
                    sh "cordova build android"
                }
                sh "cp app/platforms/android/app/build/outputs/apk/debug/app-debug.apk /$APP_FOLDER/$ENVT/static/app.apk"
                sh "chmod 777 /$APP_FOLDER/$ENVT/static/app.apk"
            }
        }
    }
}
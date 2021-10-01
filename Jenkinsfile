pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        APP_FOLDER = "social-events-platform-web-app"
        REACT_APP_PRODUCTION = "true"
        PUBLIC_URL = ""
        REACT_APP_API_URL = sh(script: "echo ${API_URL}", , returnStdout: true).trim()
        REACT_APP_BRANCH_NAME = sh(script: "echo ${branchName}", , returnStdout: true).trim()
        ENV = sh(script: "echo ${ENV}", , returnStdout: true).trim()
        BUILD_MOBILE_APP = sh(script: "echo ${BUILD_MOBILE_APP}", , returnStdout: true).trim()
        REACT_APP_FACEBOOK_APP_ID = sh(script: "echo ${facebookAppID}", , returnStdout: true).trim()
    }
    stages {
        stage("Check App folders") {
            steps {
                sh "sudo mkdir /var/www/apps -p"
                sh "sudo chmod -R 777 /var/www/apps"
                sh "sudo mkdir /var/www/apps/$ENV -p"
                sh "sudo chmod -R 777 /var/www/apps/$ENV"
            }
        }
        stage("Install dependencies & build Web App") {
            steps {
                sh "npm i"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "rm -rf /var/www/apps/$ENV/$APP_FOLDER"
                sh "mkdir /var/www/apps/$ENV/$APP_FOLDER"
                sh "cp -r build server deploy /var/www/apps/$ENV/$APP_FOLDER"
                sh "cp package.json /var/www/apps/$ENV/$APP_FOLDER"
            }
        }
        stage("Install production dependencies") {
            steps {
                dir("/var/www/apps/$ENV/$APP_FOLDER") {
                    sh "npm i --production"
                    sh "npm run prepare-index"
                }
            }
        }
        stage("Restart Supervisor") {
            steps {
                sh "sudo supervisorctl reread"
                sh "sudo supervisorctl update"
                sh "sudo supervisorctl restart $APP_FOLDER-$ENV"
            }
        }
        stage("Build Mobile App") {
            when {
                expression { BUILD_MOBILE_APP == "yes" }
            }
            environment {
                REACT_APP_PRODUCTION = ""
                REACT_APP_IS_MOBILE_APP = "true"
            }
            steps {
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
                sh "cp app.tar /var/www/apps/$ENV/$APP_FOLDER/build/static/"
                dir("app") {
                    sh "cordova platform add android"
                    sh "cordova plugin add cordova-plugin-device"
                    sh "cordova plugin add cordova-plugin-splashscreen"
                    sh "cordova build android"
                }
                sh "cp app/platforms/android/app/build/outputs/apk/debug/app-debug.apk /var/www/apps/$ENV/$APP_FOLDER/build/static/app.apk"
                sh "chmod 777 /var/www/apps/$ENV/$APP_FOLDER/build/static/app.apk"
            }
        }
    }
}
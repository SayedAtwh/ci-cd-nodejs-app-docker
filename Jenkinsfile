pipeline {
    agent any

    environment {
        // ID representing the credentials stored in Jenkins (Username/Password)
        DOCKERHUB_CRED = 'DockerHub'
        IMAGE_NAME = 'ci-cd-nodejs-app'
        APP_PORT = '3000'
    }

    stages {
        stage('Cleanup Environment') {
            steps {
                echo '🧹 Cleaning up previous builds...'
                sh 'docker rm -f ${IMAGE_NAME} || true'
                sh 'docker image prune -f || true'
            }
        }

        stage('Test & Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CRED, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        echo '🏗️ Building and Testing Docker image (Tests run inside Dockerfile)...'
                        sh "docker build -t ${USER}/${IMAGE_NAME}:${BUILD_NUMBER} ."
                        sh "docker tag ${USER}/${IMAGE_NAME}:${BUILD_NUMBER} ${USER}/${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CRED, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        echo '🚀 Pushing image to Docker Hub...'
                        sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                        sh "docker push ${USER}/${IMAGE_NAME}:${BUILD_NUMBER}"
                        sh "docker push ${USER}/${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CRED, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        echo '🌐 Deploying application...'
                        sh "docker run -d --name ${IMAGE_NAME} -p ${APP_PORT}:${APP_PORT} ${USER}/${IMAGE_NAME}:latest"
                        echo "✨ Application is live at http://localhost:${APP_PORT}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check the console output for details.'
        }
        always {
            // Optional: Logout from Docker Hub
            sh 'docker logout || true'
        }
    }
}

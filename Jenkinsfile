pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    environment {
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'landing-fe-container'
    }

    stages {
        stage('Checkout') {
            steps {
                retry(10) {
                    checkout scm
                }
            }
        }
        stage('Remove Old Docker Image') {
            steps {
                script {
                    echo "Stopping and removing old Docker container..."
                    sh "docker stop ${env.CONTAINER_NAME} || true"
                    sh "docker rm ${env.CONTAINER_NAME} || true"

                    echo "Removing old Docker image..."
                    sh "docker rmi landing-fe:${env.DOCKER_TAG} || true"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t landing-fe:${env.DOCKER_TAG} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh """
                        docker run -d \\
                            --restart unless-stopped \\
                            --name ${env.CONTAINER_NAME} \\
                            -p 3636:3000 \\
                            landing-fe:${env.DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed'
            script {
                sh "docker stop ${env.CONTAINER_NAME} || true"
                sh "docker rm ${env.CONTAINER_NAME} || true"
                cleanWs()
            }
        }
        always {
            echo 'Pipeline completed'
            cleanWs()
        }
    }
}

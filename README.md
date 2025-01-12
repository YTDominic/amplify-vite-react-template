## AWS Amplify React+Vite Starter Template

This repository provides a starter template for creating applications using React+Vite and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

For front-end UI design, the VITE framework was embedded. For example, buttons, containers, cards, etc. In addition, it supports CSS by using global style in the file index.css and page specific style in the file app.css.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.
- **UI design**: Vite web components for user interface design. 
- **QR Code Scanner**: react-qr-scanner library to read QR code content.
- 
## Deploying to AWS
Step 1: Using AWS amplify to create an application and select the github repository integration. Selecting AWS Amplify React+Vite Starter Template to create your own repository.  Back-end resources of Cognito userpool, AppSync API and DynamoDB will be provisioning automatically. 

Step 2: Download the amplify_outputs.json from Amplify into your local repository folder.   

Step 3: In Visual Studio Code, open the repository which just created and install the barcode scanner library by the command line “$npm install react-qr-scanner”. 

Step4: Update the App.tsx and App.css files under your “/repository name/src” folder by copying the code from project team 1 provided repository.   

Step 5: Update the web background image under your “/repository name/src/assets by copying the background.png into it.
Step 6: Update the your database schema in AppSync to add machineID field : String

Step 7: Commit code and push into github in Visual Studio Code. Amplify will detect your repository has been changed and start to build and deploy the new version of the web application.   

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

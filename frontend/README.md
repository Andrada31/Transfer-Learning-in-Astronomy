# Deep Space Objects Classification Tool

This project aims to provide an automated way to differentiate between two classes of Deep Space Objects (DSO): galaxies and nebulae. Using a custom Convolutional Neural Network (CNN) architecture, the model is trained to classify images of these objects with high accuracy.

## Project Overview

The project leverages the power of deep learning to analyze and classify images of deep space objects. By using a convolutional neural network (CNN), the model is able to learn and identify intricate patterns within the images that distinguish galaxies from nebulae. This approach not only automates the classification process but also provides a scalable solution for analyzing large datasets of astronomical images.

In addition to the AI model, the project includes a web application built with Flask. This web app allows users to upload images of deep space objects and receive real-time predictions from the trained model. The user-friendly interface ensures that even those with limited technical knowledge can easily interact with the system and obtain accurate classifications.

## Technologies Used

- **Python**: The primary programming language used for developing the AI model and backend.
- **Flask**: A lightweight web framework used to build the web application.
- **TensorFlow and Keras**: Libraries used for building and training the deep learning model.
- **HTML and CSS**: Used for creating the web application's interface.
- **React**: Used for building the frontend of the web application.

## Getting Started

In the `project` directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
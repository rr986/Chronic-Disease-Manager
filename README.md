It's a little long because you have to go into the frontend and backend folders to install the package dependencies. Then you run the server for the backend, 
go into the frontend where the react project was intialized and the directory ChronicDiseaseManager was created with the relevant frontend files, and the app builder files including the 
ones that let you build the app for the ios and android simulators. You then run the metro bundler which lets you see the log for the app, and then run the app itself in xcode, using the ios 
simulator. Once xcode opens, click the play button in the top left corner.


git checkout mobile 
cd backend
npm install

#Start backend server for API calls
npm start

cd ..

cd frontend/ChronicDiseaseManager
npm install cd ios
pod install
cd .. npx react-native start 

#While the Metro bundler is running, open the project in Xcode in a new terminal window 

open ios/ChronicDiseaseManager.xcworkspace

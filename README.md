# MINI Test

## Description

Add the description here

## Build the project

To generate the builds for the android/iOS platforms, you can run the following commands

1. Android

```bash
eas build -p android --profile preview --local --output=apk
```

2. iOS

```bash
eas build -p ios --profile preview --local
```

Note. For the previous commands to work, we need to have eas installed and login to our account beforehand, to get the login credentials contact @YeyoM

```bash
npm install -g eas-cli
eas login
```

## Run the project

To run the project, you need to have the following installed:

- Node.js
- npm

Before running the expo project, please contact Yeyo to get the .env file, and place it in the root of the project.

To run the project, follow these steps:

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the expo project

## Run the tests

To run the tests, follow these steps:

1. Make sure to have the firebase emulator running (only for the firebase tests)

```bash
firebase emulators:start
```

2. To run all the tests, run the following command

```bash
npm run test
```

3. To run only the firebase tests, run the following command

```bash
npm run test:firebase
```

4. To run only the logic tests, run the following command

```bash
npm run test:logic
```

## Technologies

Explanation of the technologies used in the project

## Contributing

To contribute to the project, follow these steps:

1. Clone the repository
2. Create a new branch (`git checkout -b feature/branch-name`)
3. Make the changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/branch-name`)
6. Create a new Pull Request
7. Wait for the approval, please contact Yeyo to review the changes
8. Once approved, the changes will be merged

# Babysitter Code Kata

This project was designed as a Test-Driven Development Kata for review by Pillar's Software Artisan team.

It was created using [Angular's CLI](https://github.com/angular/angular-cli), v. 8.3.3.

## Getting Started
To begin, please run `npm install` from the command line to install the necessary dependencies.
To see the application in a working environment, feel free to run `ng serve` and navigate to http://localhost:4200/.
Any changes you make to the source files will be reflected at that location.

## Goals
The emphasis of this project is on the testing suite and Red-Green-Refactor practice.

- It can be run using `ng test`

- The test package is built on Jasmine, and uses [Karma](https://karma-runner.github.io).

- It currently does not have e2e test coverage; if it did, it would use [Protractor](http://www.protractortest.org/) via `ng e2e`

## Additional Information
Angular is the JavaScript framework with which I have the most familiarity, and I feel strongly that Jasmine (and by extension Jest) is an excellent testing tool.


For anyone who has not worked with TypeScript extensively, I can't recommend it highly enough. The dynamic nature of JavaScript combined with type safety provides a genuinely enjoyable dev experience.

The application is lacking in any polish; the next step in fleshing this project out would likely include a quick installation of Bootstrap 4.
I would also add additional test coverage in the form of e2e testing. Lastly, I would add a backend to handle storing the families, wages, and hours, along with some sort of middleware to expose/consume that data.

## Process Walkthrough
Here, I will outline a general guide to the process for building this application:

1. Think through what services will be required for the application to run successfully. We want to:
    - Display some options for clocking in and out
    - Calculate the number of hours worked based on user inputs
    - Calculate the amount of money earned
    - Render a nice display of that amount for the user
2. Plot out the general layout for the app. We need:
    - A way to select the time the user punches in and out
    - A dropdown for the user to choose which family they're working with that evening
    - An output showing the total they've earned for the evening
3. From there, we will be able to test-drive the services and build the view layer so our acceptance test passes!

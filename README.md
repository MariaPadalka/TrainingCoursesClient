# CourseManagementClient

## Project Description

CourseManagementClient is an Angular application designed to provide a user interface for managing course-related data. This includes functionalities for administrators and teachers to interact with entities such as groups, teachers, subjects, and loads.

## Technologies Used

- **Angular**: A platform for building mobile and desktop web applications.
- **Angular Material**: A UI component library for Angular.
- **RxJS**: A library for reactive programming using Observables.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.

## Roles

- **Teacher**:
  - View loads and all related information.
  - Change password.
  - View personal data.


https://github.com/user-attachments/assets/2881a557-78d4-468d-9460-4d4140d75f22



- **Administrator**:
  - Manage admins, teachers, subjects, views and groups.
  - Add and update entities.
 
https://github.com/user-attachments/assets/a0224f2e-1670-49c3-988a-394f56b569ef

## Responsive Design

The application is designed to be responsive and provides a good user experience across various devices and screen sizes. 

- **Media Queries**: CSS media queries are utilized to handle different screen sizes and orientations.
- **Angular Material**: Leveraging Angular Material's responsive features to handle layout and component scaling effectively.

https://github.com/user-attachments/assets/189133cb-1a0a-4f87-830f-d41af1dc5f55

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (min version 18.19)
- npm or yarn

## Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/MariaPadalka/TrainingCoursesClient.git
    cd TrainingCoursesClient
    ```

2. **Install dependencies**

    Run the following command to install the project dependencies:

    ```bash
    npm install
    ```

    **Note**: If you encounter errors related to modules while running `npm install` in Visual Studio Code, try restarting VS Code. This often resolves the issue.

3. **Configure the environment file**

    Rename the `environment.default.ts` file to `environment.ts` and update the `apiUrl` property with the correct API URL:

    ```typescript
    export const environment = {
        production: false,
        apiUrl: '/** REPLACE WITH API URL for example [http://localhost:5000/api] **/',
    };
    ```

4. **Start the development server**

    To start the development server, run:

    ```bash
    npm start
    ```

    Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you make any changes to the source files.

## Scripts

- **Start the development server**:

    ```bash
    npm run start
    ```

- **Build the application**:

    ```bash
    npm run build
    ```

- **Watch for file changes and rebuild**:

    ```bash
    npm run watch
    ```

- **Run linter**:

    ```bash
    npm run lint
    ```

- **Fix linter issues**:

    ```bash
    npm run lint:fix
    ```

- **Format code with Prettier**:

    ```bash
    npm run prettier
    ```

- **Check code formatting with Prettier**:

    ```bash
    npm run prettier:check
    ```

## Contributing

Contributions are welcome! Please submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## Project Documentation

For detailed documentation of the API and other components, please refer to the [Swagger documentation](https://github.com/MariaPadalka/TrainingCoursesAPI).

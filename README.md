{# ShelfView - Book Management Application

## Overview

ShelfView is a Next.js application for managing a personal book collection. It allows users to add, view, update, and delete book details, as well as view a summary of each book.

## Features

-   **Book List Display:** Displays a list of books with their title and cover image.
-   **Book Input Form:** Form to add new book entries, including title, author, ISBN, and cover image URL.
-   **Book Summary:** Generates a short summary of the book using an AI model based on the title and author.
-   **Search by ISBN:** Allows users to find books by entering their ISBN.
-   **Update Book Edition:** Enables users to update the edition number of a book.
-   **Delete Book:** Removes book details based on the ISBN.

## Technologies Used

-   Next.js
-   React
-   Tailwind CSS
-   ShadCN UI components
-   Lucide React icons
-   Zod for schema validation
-   React Hook Form for form management
-   Genkit for AI book summary

## Prerequisites

Before running the application, ensure you have the following installed:

-   Node.js (v18 or later)
-   npm or yarn
-   Genkit CLI

## Installation

Follow these steps to set up the project:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    or using yarn:

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file in the project root directory.
    -   Add the necessary environment variables. For example:

        ```
        GOOGLE_GENAI_API_KEY=<Your Google GenAI API Key>
        ```

4.  **Install Genkit CLI:**

    ```bash
    npm install -g genkit-cli
    ```

## Running the Application

To run the application, follow these steps based on your operating system:

### Windows

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Start Genkit development server:**

    Open a new terminal and run:

    ```bash
    npm run genkit:dev
    ```

3.  **Access the application:**

    Open your web browser and go to `http://localhost:9002`.

### MacOS

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Start Genkit development server:**

    Open a new terminal and run:

    ```bash
    npm run genkit:dev
    ```

3.  **Access the application:**

    Open your web browser and go to `http://localhost:9002`.

## Building and Running for Production

1.  **Build the application:**

    ```bash
    npm run build
    ```

2.  **Start the production server:**

    ```bash
    npm start
    ```

## Notes

-   Ensure that your Google GenAI API key is correctly set up in the `.env` file for the AI book summary feature to work.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes.
4.  Push your branch to your fork.
5.  Submit a pull request.

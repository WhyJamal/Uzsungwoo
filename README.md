# Uzsungwoo

Uzsungwoo is a web-based project designed to manage factory product loading and processing while fully integrating with 1C. The system focuses on handling invoices and synchronizing all data with 1C for seamless operational automation.

## Purpose

Uzsungwoo aims to simplify factory operations by providing a visual, intuitive web interface. It allows users to load products onto machines, track them via QR scanners, and ensure that all operations are synchronized with 1C for accurate record-keeping.

## Key Features

- Manage and monitor product loading stages.
- Full 1C integration, primarily for invoices.
- User authentication and role-based access — each user sees pages relevant to their responsibilities.
- Track product movement onto machines using QR scanners.
- Clear visualization of operational workflow using interactive frontend components.

## Technologies

- Frontend: Vue 3
- State management: Pinia
- Routing: Vue Router
- Styling: Tailwind CSS
- Language: TypeScript
- Integration: 1C (mostly invoice-based, via REST/HTTP)

## Installation (Development)

Follow these steps to set up the project locally. Ensure Node.js and npm are installed.

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install required dependencies:

```bash
npm install
```

Alternatively, if a `packages.txt` file is provided:

```powershell
Get-Content packages.txt | ForEach-Object { npm install $_ }
```

3. Start the development server:

```bash
npm run dev
```

4. For a production build:

```bash
npm run build
```

## Usage

- Open the login page and authenticate using your credentials.
- The system redirects you to the pages corresponding to your role.
- Products are loaded onto machines, tracked via QR scanners, and all actions are synchronized with 1C in real time.
- Monitor invoices and their product items at each processing stage.

## Structure and Modules

- `LoginPage.vue` — handles authentication.
- Stage and product loading modules — manage creating, updating, and tracking product loading stages.
- 1C integration — synchronizes all frontend operations with 1C via REST API calls.

Detailed folder structure and backend logic can be found in the project source (e.g., `uzsungwoo/`, `utils/`).

## 1C Integration

Integration between the Vue frontend and 1C is central to this project. Communication uses RESTful HTTP requests to ensure full synchronization.

Key integration concepts:

- Data exchange via HTTP requests (GET/POST).
- Automatic synchronization for key actions (loading, stage completion, status updates).
- Error handling and logging for reliability.

Technical details such as endpoints, authentication tokens, and field mappings should be included in the 1C integration documentation.

## Contributing

To contribute:

1. Fork the repository → create a new branch → commit your changes → open a Pull Request.
2. Keep commit messages concise and meaningful (e.g., `Add: QR scanner module` or `Fix: double submit on login form`).

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

WhyJamal

# Task Management API - Tech Lead Technical Assessment

> **Name**: Akhmad Ramdhan Pamuji
> **Email**: hello@arpamuji.dev
> **Company**: PT. Digital Service Global

---

## Test Duration

| Item        | Description        |
| ----------- | ------------------ |
| Start Time  | 06:10:00 WIB       |
| Finish Time | 12:20:00 WIB       |
| Duration    | 6 hours 10 minutes |

---

## Task Summary

### Requirements

- **Node.js**: Version 18.x or higher
- **Postgres**: Version 14.x or higher
- **NPM**: Version 9.x or higher or **Bun**: Version 1.0.0 or higher

### Installation

1. Clone the repository:
    ```bash
    git clone [repository_url]
    cd dsg-test
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```
3. Set up environment variables:

    ```bash
    cp .env.example .env

    # Edit .env file with your database credentials
    DATABASE_URL="your-postgres-connection-strings"
    ```

4. Run database migrations:
    ```bash
    npm run db:migrate
    # or
    bun run db:migrate
    ```
5. Seed the database with sample data:
    ```bash
    npm run db:seed
    # or
    bun run db:seed
    ```
6. Start the server:
    ```bash
    npm run dev
    # or
    bun run dev
    ```
7. Run tests:
    ```bash
    npm run test
    # or
    bun run test
    ```

### API Endpoints

```bash
Base URL: http://localhost:3000/api
```

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| POST   | /tasks     | Create a new task       |
| GET    | /tasks     | Retrieve all tasks      |
| GET    | /tasks/:id | Retrieve a task by ID   |
| PUT    | /tasks/:id | Update a task by ID     |
| DELETE | /tasks/:id | Delete a task by ID     |
| GET    | /health    | Check API health status |

### Technical Decisions

1. `express` dipilih sebagai framework utama karena simple, fleksible, dan ekosistem luas.
2. `prisma` digunakan sebagai ORM yang modern, ekosistem sudah matang serta familiar menggunakan prisma.
3. `zod` digunakan untuk validasi input data, Typescript-ready, zero-dependency, terkenal serta familiar menggunakan zod.
4. `vitest` dipilih sebagai testing framework karena cepat, mudah digunakan, dan memiliki integrasi yang baik dengan TypeScript.
5. `Architectural Pattern` yang digunakan adalah menggunakan arsitektur berlapis berbasis controller-service-repository untuk memisahkan tanggung jawab separation of concerns, meningkatkan maintainability, dan scalability.

### Assumptions

1. API ini tidak memerlukan autentikasi atau otorisasi, sehingga semua endpoint dapat diakses secara publik.
2. Tidak ada batasan pada jumlah tugas yang dapat dibuat atau diambil, sehingga API dapat menangani jumlah tugas yang besar tanpa masalah performa.
3. Menggunakan hard delete, sehingga data yang dihapus tidak dapat dipulihkan, dan tidak ada mekanisme soft delete yang diterapkan.
4. Asumsi jumlah tugas yang akan dibuat tidak banyak, sehingga tidak memerlukan fitur pagination atau filtering.
5. Berjalan lokal, sehingga tidak mempertimbangkan aspek deployment dan containerization dalam implementasi API ini.

### Testing

```bash
Running tests:
npm run test
# or
bun run test
```

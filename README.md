# 🏆 Programming Olympics 2025 - "E-Scapadas" Travel Agency - Group 007

[Español](README.es.md) | English

This project was developed as part of the **National Olympics of Technical Professional Education 2025** in the **Programming** specialty. It consists of a web platform that allows users to explore travel packages, filter them, add them to a cart, complete a purchase process, and view their placed orders.

---

# 👨‍💻 Team Members

**Facundo Gandolfo**  
Project Leader and Graphic Designer  
Technical Programming Student  
ONETP 2025 Participant  
🇦🇷 Argentina

**Lautaro Borges**  
Programmer  
Technical Programming Student  
ONETP 2025 Participant  
🇦🇷 Argentina

**Valentina Bernardi**  
Functional Analyst  
Technical Programming Student  
ONETP 2025 Participant  
🇦🇷 Argentina

**Diego Nuñez**  
Programmer  
Technical Programming Student  
ONETP 2025 Participant  
🇦🇷 Argentina

---

## 📦 Contents

- [Technologies Used](#️-technologies-used)
- [Main Features](#-main-features)
- [Project Structure](#-project-structure)
- [How to Deploy](#-how-to-deploy)
- [Credits](#-credits)

---

## 🛠️ Technologies Used

### 🔹 Frontend

- Angular 17
- Tailwind CSS 4.1

### 🔸 Backend

- Java 17
- Spring Boot 3
- MySQL (phpMyAdmin)

---

## 🎯 Main Features

- 🔍 **Search with dynamic filters**: search for travel packages by filtering by city, category, type, and duration.
- 🛒 **Shopping cart**: system to add and remove selected packages, with automatic summary.
- ✅ **Checkout process**: passenger data entry, form validations, and purchase confirmation.
- 📋 **Order management**: orders registered in the database with their respective status.
- 📊 **"My purchases" panel**: list of all orders placed by the user with their details.

---

## 📁 Project Structure

turismo-olimpiadas/
├── frontend-olimpiadas/  ← Angular + Tailwind CSS
└── backend-olimpiadas/   ← Spring Boot + MySQL

- **frontend-olimpiadas/**: contains components, services, routes, and presentation logic.
- **backend-olimpiadas/**: contains controllers, services, entities, DTOs, validations, and database connection.

---

## 🚀 How to Deploy

### Prerequisites

Before starting, make sure you have installed:

- **Node.js** (v18 or higher) and **npm**
- **Java JDK 17** or higher
- **Maven** (for building the backend)
- **MySQL** (or phpMyAdmin)
- **Angular CLI**: `npm install -g @angular/cli`

### 1️⃣ Database Configuration

1. Create a MySQL database:
```sql
CREATE DATABASE turismo_db;
```

2. Configure the connection in `backend-olimpiadas/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/turismo_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. The tables will be created automatically by Spring Boot on the first run.

### 2️⃣ Backend Deployment

1. Navigate to the backend directory:
```bash
cd backend-olimpiadas
```

2. Install dependencies and build the project:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will be available at: `http://localhost:8080`

### 3️⃣ Frontend Deployment

1. Navigate to the frontend directory:
```bash
cd frontend-olimpiadas
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
ng serve
```

The frontend will be available at: `http://localhost:4200`

### 4️⃣ Access the Application

Once both servers are running:

1. Open your browser and go to `http://localhost:4200`
2. The frontend will automatically communicate with the backend on port 8080
3. Start exploring travel packages!

### 📝 Additional Notes

- Make sure both backend and frontend are running simultaneously
- Check that MySQL is running before starting the backend
- If you encounter CORS issues, verify the CORS configuration in the backend

---

# 🎓 Credits

This system was developed as part of the **Programming** specialty project in the **ONETP 2025** competition.

The development integrates:

- Responsive frontend design with Angular and Tailwind CSS
- Business logic and persistence in Java with Spring Boot
- Structured MySQL database with relational entities
- Validations, filters, and order control integrated throughout the app

We thank our teachers and the technical community for their support during the project development.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
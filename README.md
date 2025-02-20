# Express TypeScript Initialization

Welcome to the **Express TypeScript Initialization** project! This repository provides a simple and effective starting point for building robust web applications using **Express** and **TypeScript**.

## Table of Contents

- [Introduction](#introduction)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a boilerplate setup for building a web application with **Express** and **TypeScript**. It comes with pre-configured tools for migrations, seeding, and automatic generation of necessary files, making it easier for developers to kickstart a project without worrying about setup.

## Setup Instructions

To get started with the project, follow these simple steps:

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/ohmjess/express-ts-init.git
cd express-ts-init
```

### 2. Create project structure

Run the following command to create the project structure:

```bash
node .\setup.js   
```

### 3. Migrate Database

Run the following command to migrate the database and create the necessary tables:

```bash
npm run prisma:migrate
```

### 3. Prisma Generation

Run the following command to generate Prisma client and other necessary files:

```bash
npm run prisma:generate
```

### 4. Prisma Generation

Run the following command to generate Prisma client and other necessary files:

```bash
npm run prisma:seed
```

### 5. Run the Application

Start the application by running:

```bash
npm run dev
```

Your Express application will now be running on `http://localhost:5000`.

## Available Scripts

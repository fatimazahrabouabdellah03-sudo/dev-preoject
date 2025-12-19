# Stage Platform

Une application web de gestion des stages permettant aux étudiants de soumettre leurs stages et aux administrateurs de les valider ou refuser. Le projet est développé avec **React.js** pour le frontend et **Express.js** avec **MySQL** pour le backend.

---

## Réalisé par

- Fatima-Zahra BOUABDELLAH  
- Malak El Friakh  
- Salma KOUTA  
- Ahmed Amine OUAKIL  

---
```
## Structure du projet

backend/
├── config/
│ └── database.js
├── controllers/
│ └── stageController.js
├── models/
│ ├── Stage.js
│ └── User.js
├── routes/
│ └── stageRoutes.js
├── node_modules/
├── .env
├── package.json
├── package-lock.json
└── server.js

frontend/
├── src/
│ ├── components/
│ │ ├── StageForm.js
│ │ └── StageList.js
│ ├── pages/
│ │ ├── AdminPage.js
│ │ └── StudentPage.js
│ ├── services/
│ │ └── api.js
│ ├── App.js
│ ├── index.js
│ └── index.css
├── public/
│ └── index.html
├── package.json
└── package-lock.json
```


---

## Base de données MySQL

```sql
-- Base de données
CREATE DATABASE IF NOT EXISTS stage_platform;
USE stage_platform;

-- Table users
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('etudiant', 'admin') DEFAULT 'etudiant',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table stages
CREATE TABLE IF NOT EXISTS stages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_etudiant INT NOT NULL,
  entreprise VARCHAR(150) NOT NULL,
  sujet TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  status ENUM('en attente', 'valide', 'refuse') DEFAULT 'en attente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_etudiant) REFERENCES users(id) ON DELETE CASCADE
);

-- Insertion d'utilisateurs de test
INSERT INTO users (nom, email, role) VALUES
('Alice Dupont', 'alice@example.com', 'etudiant'),
('Bob Martin', 'bob@example.com', 'etudiant'),
('Admin', 'admin@example.com', 'admin');
```
Configuration de l'environnement
Créer un fichier .env dans le dossier backend/ :

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=stage_platform
```
Installation et démarrage

Backend
```bash
Copier le code
cd backend
npm install
npm run dev
```
Le serveur backend sera accessible sur : http://localhost:5000/api

Frontend
```bash
Copier le code
cd frontend
npm install
npm start
```
Le frontend sera accessible sur : http://localhost:3000

Fonctionnalités
Les étudiants peuvent :

Ajouter un stage

Consulter leurs stages

Vérifier le statut de validation

Les administrateurs peuvent :

Consulter tous les stages

Valider ou refuser un stage

Technologies utilisées
Frontend : React.js, Axios

Backend : Node.js, Express.js, MySQL

Base de données : MySQL


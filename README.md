# 🏢 OrgManageR – Organization Management System

A **full-stack web application** built with **Django (Backend)** and **React (Frontend)** that allows administrators to manage organizations and their users efficiently. The project demonstrates end-to-end CRUD operations, RESTful API integration, and a modern React UI connected to Django REST Framework.

---

## 🚀 Features
- 🔗 **Full-stack integration** (Django REST API + React frontend)
- 🧾 **Organization management** – create, edit, delete, and view organizations
- 👥 **User management** – assign users to organizations
- 🌐 **Dynamic data fetch** – all organization/user data fetched from Django backend
- ⚙️ **Status badges** – live “Active / Inactive” indicator with animation
- 🎨 **Responsive UI** – built using **Bootstrap**
- 📦 **REST API endpoints** powered by Django REST Framework

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React 18, Bootstrap 5, Axios, React Router |
| Backend | Django 5, Django REST Framework |
| Database | SQLite (default, can switch to MySQL/PostgreSQL) |
| Tools | Git, VS Code, npm, pip |

---

## 🧩 Project Structure
OrgManageR/
│
├── backend/ # main content inside
│
├── frontend/ #ui content inside
│ 
└── README.md



**Backend Setup**
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

**🔗 API Endpoints**
Method	Endpoint	Description
GET	/api/organizations/	Fetch all organizations
POST	/api/organizations/	Add new organization
GET	/api/users/	Fetch all users
PUT	/api/organizations/{id}/	Update organization
DELETE	/api/organizations/{id}/	Delete organization
🧾 Requirements

**See requirements.txt**
 for Python dependencies.


**🧑‍💻 Author**
## Sandeep
🎓 B.Tech in ECE | Aspiring Full-Stack Developer
📬 LinkedIn

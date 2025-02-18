# Online Code Compiler

Этот проект представляет собой веб-сервис для компиляции и выполнения C++ кода в изолированном контейнере Docker.

## Запуск проекта

### 1. Клонируйте репозиторий

```sh
git clone https://github.com/username/project.git
cd project
```

### 2. Запустите контейнер с GCC через Docker Compose

```sh
docker compose up -d
```

### 3. Запустите backend

```sh
cd backend
npm install
npm start
```

### 4. Запустите frontend

```sh
cd frontend
npm install
npm start
```

### 5. Открывайте в браузере

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:3001](http://localhost:3001)

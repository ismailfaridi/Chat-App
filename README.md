# Full Stack Realtime Chat App  
This project is a modern real-time chat application built to allow users to engage in one-on-one or group conversations instantly. It features user authentication, live messaging via WebSockets, and a responsive UI for desktop and mobile.  
The architecture is split into a **Backend** (server + WebSocket logic) and a **Frontend** (client application) so that each layer remains modular and maintainable.

## 🌐 Live Demo
Check out the live application here: [Chat App](https://chat-app-rcqi.onrender.com/)

## 🚀 Features  
- Secure user sign up, login and authentication (via JWT)  
- Real-time message delivery (sending and receiving messages instantly via Socket.io)  
- Online/offline status tracking so users can see who’s available  
- Global state management with Zustand  
- Persistent chat history so conversations are stored and retrievable  
- Error handling on both the server and client sides  
- Temporary notification toasts using React Hot Toast  
- Responsive UI (works well on various screen sizes)  
- Modular architecture with separate frontend and backend codebases  
- Deployed on Render.com  

## 🛠 Technology Stack  
### Backend  
- Node.js & Express.js  
- Socket.IO  
- JSON Web Tokens (JWT)  
- Bcryptjs - password hashing  
- Cloudinary - image upload  
- MongoDB  

### Frontend  
- React  
- Tailwind CSS & DaisyUI  
- Socket.IO client  
- Zustand - global state management  
- react-router-dom - routing  
- react-hot-toast - temporary notification toasts  

## 📁 Project Structure  
/backend ← server-side code  
│ ├─ package.json  
│ ├─ src/  
│ └─ …  
/frontend ← client-side (UI) code  
│ ├─ package.json  
│ ├─ src/  
│ └─ …  
README.md ← this file  

## 🔒 Setup .env File
Create .env file in backend directory and add the following fields.
```js
PORT = 5001
MONGODB_URI = ...
JWT_SECRET = ...

CLOUDINARY_CLOUD_NAME = ...
CLOUDINARY_API_KEY = ...
CLOUDINARY_API_SECRET = ...

NODE_ENV = development
```

### Build the app
```shell
npm run build
```

### Start the app
```shell
npm run start
```

## 📂 Contribution
Contributions, bug reports, and feature requests are welcome! Feel free to fork the repository, make changes, and open a pull request..  

## 👤 Author
**Name:** Muhammad Ismail  
**GitHub:** [Muhammad Ismail](https://github.com/ismailfaridi)  
**LinkedIn:** [Muhammad Ismail](https://www.linkedin.com/in/ismailfaridi)  
**Website:** [Muhammad Ismail Faridi](https://ismailfaridi.com)  
**Email:** [contact@ismailfaridi.com](mailto:contact@ismailfaridi.com)  

### Connect with me
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/ismailfaridi)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ismailfaridi)
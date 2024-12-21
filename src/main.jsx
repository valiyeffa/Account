import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)

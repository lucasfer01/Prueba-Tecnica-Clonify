// React-router-dom
import { Navigate } from 'react-router-dom';

export function LoggedIn({ children, isAutenticated }) {
  return isAutenticated ? children : <Navigate to='/' />
}
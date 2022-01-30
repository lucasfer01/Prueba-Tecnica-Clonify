// React-router-dom
import { Navigate } from 'react-router-dom';

export function NotLoggedIn({ children, isAutenticated }) {
    return isAutenticated ? <Navigate to='/home' /> : children
}
// Axios
import axios from 'axios';
// Urls
import { CLOUDINARY_URL } from '../enviroment';

// Subir imagenes
export function subirImagenes(foto) {
    const formData = new FormData();
    formData.append('file', foto[0]);
    formData.append('upload_preset', 'nwrhjlzs');

    return axios.post(CLOUDINARY_URL, formData);
}
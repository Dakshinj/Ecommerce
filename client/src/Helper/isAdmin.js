
export const isAdmin = () => {

    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('admin')) {
        return localStorage.getItem('admin');
    } else {
        return false;
    }
};
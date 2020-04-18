
export const isLoggedIn = () => {

    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('admin')) {
        return true;
    } else {
        return false;
    }
};
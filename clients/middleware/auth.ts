import axios from 'axios';

export default async function ({ store, redirect }: any) {
    const token = localStorage.getItem('Authtoken');
    if (!token) {
        return redirect('/login');
    }

    try {
        const response = await axios.get('http://localhost:8888/users/auth', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error('Token expired');
        }
        store.commit('setAuthUser', response.data);
    } catch (error) {
        console.error('Error:', error);
        localStorage.removeItem('Authtoken');
        return redirect('/login');
    }
}

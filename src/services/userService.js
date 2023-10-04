export async function fetchUser() {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch("http://lambalog.com/api/users/info", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
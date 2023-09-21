export default async function fetchUserData() {
    const response = await fetch('/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const data = await response.json();
    return data;
}

export async function sendSignoutRequest() {
    const response = await fetch('/user/signout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    return response.status;
}
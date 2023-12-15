export default async function fetchUserData(cb = (dat, err) => {}) {
    const response = await fetch('/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    
    if (!response.ok) {
        cb(null, response.status);
        return null;
    }

    const data = await response.json();
    cb(data);
    return data;
}

export async function sendUserData(data) {
    const response = await fetch('/user', {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response;
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
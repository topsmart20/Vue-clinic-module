export async function login(loginEmail, loginPassword) {
    const rawResponse = await fetch('/api/login', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'loginEmail': loginEmail, 'loginPassword': loginPassword})
    });
    return await rawResponse.json();
}

export async function sso() {
    const rawResponse = await fetch('/api/login', {
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
        }
    });    
    return await rawResponse.json();
}

export async function logout() {
    const rawResponse = await fetch('/api/logout', {
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
        }
    });    
    return await rawResponse.json();
}
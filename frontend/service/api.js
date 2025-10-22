const apiUrl = import.meta.env.VITE_API_URL;

const getAllRestaurant = async () => {
    const url = `${apiUrl}restaurant`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllRestaurant };

const getAllRestaurantFoodball = async () => {
    const url = `${apiUrl}restaurant`; // Enlevez "/foodball"
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllRestaurantFoodball };

const getAllPlat = async () => {
    const url = `${apiUrl}/plat`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllPlat };

const getAllTeam = async () => {
    const url = `${apiUrl}team`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllTeam };

const getAllTypeEvent = async () => {
    const url = `${apiUrl}typeevent`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllTypeEvent };

const getAllEvent = async () => {
    const url = `${apiUrl}event`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllEvent };

const getAllUser = async () => {
    const url = `${apiUrl}user`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllUser };

const getAllRole = async () => {
    const url = `${apiUrl}role`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllRole };

const getAllMenu = async () => {
    const url = `${apiUrl}menu`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllMenu };

const getAllInscription = async () => {
    const url = `${apiUrl}utilisateur`;
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};

// 🆕 FONCTIONS POUR RESET PASSWORD
const forgotPassword = async (email) => {
    const url = `${apiUrl}user/forgot-password`;
    const requestInfos = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};

const resetPassword = async (token, password) => {
    const url = `${apiUrl}user/reset-password/${token}`;
    const requestInfos = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};

// N'oublie pas d'exporter les nouvelles fonctions
export { forgotPassword, resetPassword };
export { getAllInscription };


const getAllRestaurant = async () => {
    const url = "http://localhost:3000/api/restaurant";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllRestaurant };

const getAllRestaurantFoodball = async () => {
    const url = "http://localhost:3000/api/restaurant/foodball";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllRestaurantFoodball };

const getAllPlat = async () => {
    const url = "http://localhost:3000/api/plat";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllPlat };

const getAllTeam = async () => {
    const url = "http://localhost:3000/api/team";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllTeam };

const getAllTypeEvent = async () => {
    const url = "http://localhost:3000/api/typeevent";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllTypeEvent };

const getAllEvent = async () => {
    const url = "http://localhost:3000/api/event";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllEvent };

const getAllUser = async () => {
    const url = "http://localhost:3000/api/user";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllUser };

const getAllRole = async () => {
    const url = "http://localhost:3000/api/role";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllRole };

const getAllMenu = async () => {
    const url = "http://localhost:3000/api/menu";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllMenu };

const getAllInscription = async () => {
    const url = "http://localhost:3000/api/utilisateur";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
};
export { getAllInscription };
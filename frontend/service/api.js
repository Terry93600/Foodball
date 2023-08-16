const getAllRestaurant = async () => {
    const url = "http://localhost:3000/api/restaurant";
    const requestInfos = new Request(url, {
        method: 'get',
    });
    const request = await fetch(requestInfos);
    const response = await request.json();
    return response;
}

export { getAllRestaurant };
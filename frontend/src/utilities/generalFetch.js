export const fetchDataGeneral = async (path, method, token, data) => {

    const fetchedData = await fetch(`${path}`, {
      method: method, 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify(data),
    });

    if (fetchedData.status === 401) {
      window.location.href = `http://localhost:3000/login/`;
      return null;
    };
    
    const jsonData = await fetchedData.json();

    console.log(jsonData);

    return jsonData;
}

export const fetchDataGeneral = async (endpoint, method, token, data) => {

    const fetchedData = await fetch(`${process.env.REACT_APP_API_PATH}${endpoint}`, {
      method: method, 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify(data),
    });

    if (fetchedData.status === 401) {
      window.location.href = `${process.env.REACT_APP_FRONTEND}/login/`;
      return null;
    };
    
    let jsonData = fetchedData.json();
    return jsonData;
}

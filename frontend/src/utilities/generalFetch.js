export const fetchDataGeneral = async (path, method, data) => {
  const token = localStorage.getItem('token');

    const fetchedData = await fetch(`${process.env.REACT_APP_BACKEND}${path}`, {
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
    
    let jsonData = await fetchedData.json();
    return jsonData;
}

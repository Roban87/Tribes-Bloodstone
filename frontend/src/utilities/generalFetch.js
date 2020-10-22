export const fetchDataGeneral = async (endpoint, method, data = undefined) => {
  let options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if ( endpoint !== '/login' && endpoint !== '/register') {
    const token = localStorage.getItem('token');
    options.headers['Authorization'] = `Bearer ${token}`;
  };

  if ( data !== undefined) {
    options['body'] = JSON.stringify(data);
  };

  const fetchedData = await fetch(`${process.env.REACT_APP_BACKEND}${endpoint}`, options);

  if (fetchedData.status === 401) {
    window.location.href = `${process.env.REACT_APP_FRONTEND}/login/`;
    return null;
  };
  
  let jsonData = await fetchedData.json();
  return jsonData;
}

export const fetchDataGeneral = async (path, method, token, data) => {

    const fetchedData = await fetch(`${process.env.REACT_APP_API_PATH}${path}`, {
      method: method, 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify(data),
    });
    console.log(fetchedData);

    if (fetchedData.status === 401) {
      window.location.href = `${process.env.REACT_APP_FRONTEND}/login/`;
      return null;
    };
    // if (fetchedData.ok === false) {
    //   throw ({status: fetchedData.status, message: fetchedData.statusText});
    // }
    
    return fetchedData;
}

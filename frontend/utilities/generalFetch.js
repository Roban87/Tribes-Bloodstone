

const fetchedData = await fetch(`${process.env.REACT_APP_API_PATH}/${route}/${kingdomId}`, {
  method: method, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }, 
  body: JSON.stringify(data),
});

const jsonData = await fetchedData.json();

if (jsonData.status === 401)

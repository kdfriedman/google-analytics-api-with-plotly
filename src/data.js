
export const fetchData = async (url = '', method) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      });
      if (!response.ok) {
        const jsonResponse = await response.json();
        throw new Error(`HTTP Status Code - ${response.status}: ${jsonResponse.data}`); 
      }
      
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

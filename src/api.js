const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";


const cache = {
    get(key) {
      const data = JSON.parse(localStorage.getItem(key));
      return data;
    },
    set(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
};
  


const request = async url => 
{
    try 
    {       
        const result = await fetch(url);
        if (result.ok)
            return await result.json();     
        else
        {
            if (result.status >= 500)
                throw `서버 에러: ${result.status}`;
            if (result.status >= 400)
                throw `클라이언트 에러: ${result.status}`;
            if (result.status >= 300)
                throw `리다이렉트 에러: ${result.status}`;
            throw result.status;
        }
    } 
    catch (e) 
    {
        if (e.message) throw e.message;
        else throw e;
    }   
};    


const api = {
  fetchCats: async query => 
  {
      try
      {
          const cacheData = cache.get(query);
          if (cacheData)
            return {isError: false, data: cacheData};

          const result = await request(`${API_ENDPOINT}/api/cats/search?q=${query}`);
          cache.set(query, result.data);
          return {isError: false, data: result.data};
      }
      catch(e)
      {
          return {isError: true, data: e};
      }
  },
  fetchCatInfo: async id => 
  {
      try
      {
        const cacheData = cache.get(id);
        if (cacheData)
          return {isError: false, data: cacheData};

        const result = await request(`${API_ENDPOINT}/api/cats/${id}`);
        cache.set(id, result.data);
        return {isError: false, data: result.data};
      }
      catch(e)
      {
          return {isError: true, data: e};
      }
  },
  fetchRandomCats: async _ => 
  {
      try
      {
        const result = await request(`${API_ENDPOINT}/api/cats/random50`);
        return {isError: false, data: result.data};
      }
      catch(e)
      {
          return {isError: true, data: e};
      }
  }
};

export default api


//const API_BASE_URL = process.env.API_BASE_URL || "OOPS" // "http://localhost:3001"
const API_BASE_URL = process.env.API_BASE_URL || "https://twitter-outrage-classification.herokuapp.com" // "http://localhost:3001"
console.log("API BASE URL", API_BASE_URL)

const get = async (entity: string): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/api/${entity}`);
  return await response.json();
};

const create = async (entity: string, payload: {}): Promise<any> => {
  try {
    const response = await fetch(`/api/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return await response.json();
  } catch (e) {
    throw Error(e);
  }
};

export { get, create };

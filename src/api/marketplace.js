const API_URL = "http://localhost:5050";

export async function getAllArticles() {
  try {
    const response = await fetch(`${API_URL}/articles`);
    const data = response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

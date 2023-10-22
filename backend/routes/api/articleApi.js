// articlesApi.js

import axios from 'axios';

export async function fetchArticles() {
  try {
    const response = await axios.get('http://example.com/api/articles');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
}

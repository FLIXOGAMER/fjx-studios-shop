import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/tebex';

export async function fetchCategories() {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchProducts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages`);
    return response.data.packages || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function fetchCategoryById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
}

export async function fetchProductsByCategory(categoryId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/packages`);
    return response.data.packages || [];
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }
}

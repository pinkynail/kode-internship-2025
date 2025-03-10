import axios from "axios";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
  position: string;
  birthday: string;
  phone: string;
  avatarUrl?: string; // Добавляем avatarUrl, если он есть в ответе API
}

interface ApiResponse {
  items: User[]; // Обновляем интерфейс под структуру ответа
}

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<ApiResponse>(
    "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all",
  );
  return response.data.items; // Извлекаем массив из items
};

export const fetchUsersByDepartment = async (
  department: string,
): Promise<User[]> => {
  const response = await axios.get<ApiResponse>(
    `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${department}`,
  );
  return response.data.items; // Извлекаем массив из items
};

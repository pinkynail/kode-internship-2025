// src/api/users.ts
import axios from "axios";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
  position: string;
  birthday: string;
  phone: string;
};

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const departments = [
      "android",
      "ios",
      "design",
      "management",
      "qa",
      "back_office",
      "frontend",
      "hr",
      "pr",
      "backend",
      "support",
      "analytics",
    ];
    const promises = departments.map((dept) =>
      api
        .get(
          `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${dept}`,
        )
        .then((response) => response.data.items || [])
        .catch((error) => {
          console.warn(`No data for ${dept}:`, error.message);
          return [];
        }),
    );
    const results = await Promise.all(promises);
    const allUsers = results.flat();
    console.log("Fetched all users:", allUsers);
    return allUsers;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch all users");
  }
};

export const fetchUsersByDepartment = async (
  department: string,
): Promise<User[]> => {
  try {
    const response = await api.get(
      `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${department}`,
    );
    return response.data.items || [];
  } catch (error) {
    console.error(`API Error for ${department}:`, error);
    return []; // Возвращаем пустой массив вместо ошибки
  }
};

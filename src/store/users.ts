import { createStore, createEffect, combine } from "effector";
import { fetchAllUsers, fetchUsersByDepartment, User } from "../api/users";

export const fetchUsersFx = createEffect<void, User[], Error>(async () => {
  const users = await fetchAllUsers();
  console.log("fetchUsersFx result:", users); // Лог для отладки
  return users;
});

export const fetchUsersByDepartmentFx = createEffect<string, User[], Error>(
  async (department) => {
    const users = await fetchUsersByDepartment(department);
    console.log(`fetchUsersByDepartmentFx (${department}) result:`, users); // Лог для отладки
    return users;
  },
);

// Хранилище для всех пользователей
export const $users = createStore<User[]>([], { skipVoid: false }) // Разрешаем undefined
  .on(fetchUsersFx.doneData, (_, users) => users)
  .on(fetchUsersByDepartmentFx.doneData, (_, users) => users);

// Хранилище для кэширования данных по департаментам
export const $usersCache = createStore<{ [key: string]: User[] }>(
  {},
  { skipVoid: false },
) // Разрешаем undefined
  .on(fetchUsersFx.doneData, (state, users) => ({
    ...state,
    all: users,
  }))
  .on(
    fetchUsersByDepartmentFx.done,
    (state, { result: users, params: department }) => ({
      ...state,
      [department]: users,
    }),
  );

export const $isLoading = combine(
  fetchUsersFx.pending,
  fetchUsersByDepartmentFx.pending,
  (fetchAllPending, fetchByDeptPending) =>
    fetchAllPending || fetchByDeptPending,
);

export const $error = createStore<string | null>(null)
  .on(fetchUsersFx.fail, (_, { error }) => error.message)
  .on(fetchUsersByDepartmentFx.fail, (_, { error }) => error.message);

import { createStore, createEffect, combine } from "effector";
import { fetchAllUsers, fetchUsersByDepartment, User } from "../api/users";

export const fetchUsersFx = createEffect<void, User[], Error>(async () => {
  const users = await fetchAllUsers();
  console.log("fetchUsersFx result:", users);
  return users; // Убеждаемся, что возвращается уникальный массив
});

export const fetchUsersByDepartmentFx = createEffect<string, User[], Error>(
  async (department) => {
    const users = await fetchUsersByDepartment(department);
    console.log(`fetchUsersByDepartmentFx (${department}) result:`, users);
    return users;
  },
);

// Хранилище для всех пользователей (только уникальные по id)
export const $users = createStore<User[]>([], { skipVoid: false }).on(
  fetchUsersFx.doneData,
  (_, users) => {
    // Удаляем дубликаты по id
    const uniqueUsers = users.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id),
    );
    return uniqueUsers;
  },
);

// Хранилище для кэширования данных по департаментам
export const $usersCache = createStore<{ [key: string]: User[] }>(
  {},
  { skipVoid: false },
)
  .on(fetchUsersFx.doneData, (state, users) => ({
    ...state,
    all: users.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id),
    ),
  }))
  .on(
    fetchUsersByDepartmentFx.done,
    (state, { result: users, params: department }) => ({
      ...state,
      [department]: users.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.id === user.id),
      ),
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

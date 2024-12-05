// "use server";

import { revalidatePath } from "next/cache";

type User = {
  name: string;
  score: number;
};

const users: User[] = [];

export async function registerUser(name: string): Promise<User> {
  const newUser: User = { name, score: 0 };
  users.push(newUser);
  revalidatePath("/");
  return newUser;
}

export async function submitScore(name: string, score: number): Promise<void> {
  const userIndex = users.findIndex((user) => user.name === name);
  if (userIndex !== -1) {
    users[userIndex].score = Math.max(users[userIndex].score, score);
    users.sort((a, b) => b.score - a.score);
    revalidatePath("/");
  }
}

export async function getLeaderboard(): Promise<User[]> {
  return users.slice(0, 10); // Return top 10 users
}

import { UserService } from "../services/user.service";

// Mock repository
jest.mock("../repositories/user.repository", () => ({
  getUserById: jest.fn((id) => (id === 1 ? { id, name: "John Doe", email: "john@example.com" } : null)),
  createUser: jest.fn((userData) => ({ id: 2, ...userData })),
}));

test("findUserById should return correct user data", async () => {
  const user = await UserService.getUserById(1);
  expect(user).toEqual({ id: 1, name: "John Doe", email: "john@example.com" });
});

test("findUserById should return null for unknown ID", async () => {
  const user = await UserService.getUserById(999);
  expect(user).toBeNull();
});
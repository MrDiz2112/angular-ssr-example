export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Tech Corp' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Digital Inc' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: 'Web Solutions' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', company: 'Cloud Services' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', company: 'Data Systems' },
  { id: 6, name: 'Diana Davis', email: 'diana@example.com', company: 'Mobile Apps' }
];

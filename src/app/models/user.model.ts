export interface IUser {
  id: string,
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  created_date: string;
  last_modified_date: string;
  city: string;
  state: string;
  preferred_language: string;
  role_id: number;
}

export type NewUser = Omit<IUser, 'id' | 'created_date' | 'last_modified_date'> & { password: string };

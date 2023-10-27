
export interface User {
   id: number;
   email: string;
   isActive: boolean;
   isValidated: boolean;
   status: string;
   validatorToken: string;
   nextTimeTokenGen: null;
   isAdmin: boolean;
   created_at: Date;
   updated_at: Date;
   delete_at: null;
   profile: Profile;
}

export interface Profile {
   id: number;
   firstname: string;
   lastname: string;
   position: null;
   institution: null;
   created_at: Date;
   updated_at: Date;
}

export type LocalStorageAuthData = {
   user: User
   accessToken: string
}

export type Pagination<T> = {
   metadata: {
      totalPages: number
      totalItems: number
      perPage: number
   }
   items: Array<T>
}

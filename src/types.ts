export interface Category extends Model {
  name: string;
}

export interface Image {
    id: string;
    image: string;
}

export interface Item extends Model {
  description: string;
  images: Image[];
  name: string;
  category: string;
  serial_number: string;
  status: string;
}

export interface Model {
  created_at: string;
  id: string;
  updated_at: string;
}

export interface UpdateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  serial_number: string;
  images: FileList;
}

export interface RegisterUser {
    email: string;
    username: string;
    password1: string;
    password2: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    first_name: string;
    last_name: string;
    rodo: boolean;
    terms_of_use: boolean;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface User extends Model {
    email: string;
    username: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

export interface Rental extends Model {
    user: string;
    item: string;
    start_date: string;
    end_date: string;
}

export interface RentalResponse {
    id: string;
    user: User;
    item: Item;
    start_date: string;
    end_date: string;
    status: string;
}

export interface ParsedRentalsForList {
    id: string;
    serial_number: string;
    name: string;
    user: string;
    start_date: string;
    end_date: string;
    status: string;
}

interface IUserRequest {
  email: string;
  first_name: string;
  patronymic: string;
  last_name: string;
  phone_number: string;
  password: string;
  password2: string;
}

interface IUserResponse {
  id: number;
  email: string;
  first_name: string;
  patronymic: string;
  last_name: string;
  phone_number: string;
}
interface IUserError {
  status: string;
}

interface EditUser {
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}
interface ILoginResponse {
  access: string;
  refresh: string;
}

interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  phone_number: string;
  email: string;
}

interface OrderRequest {
  car_make_model: string;
  car_year: string;
  car_body: number;
  vin_code: string;
  vin_image: string;
  second_phone: string;
  upload_images: File[];
  sample: string | File | null;
  tech_passport: string | File | null;
}

interface OrderResponse {
  id: number;
  car_make_model: string;
  car_year: string;
  car_body: string;
  vin_code: string;
  vin_image: string;
  status: string;
  second_phone: string;
  images: { image: string }[];
  sample: string;
  tech_passport: string;
}

interface EditResponse {
  car_make_model: string;
  car_year: string;
  car_body: string;
  vin_code: string;
  second_phone: string;
}

interface IRessetPassword {
  email: string;
}

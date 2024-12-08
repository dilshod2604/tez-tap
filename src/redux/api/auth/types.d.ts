import { useSignUpMutation } from "@/redux/api/auth";
import { message } from "antd";
import { type } from "os";
namespace AUTH {
  //sugnup
  type UserSignUpResponse = IUserResponse ;
  type UserSignUpRequest = IUserRequest;
  //useSignUpMutation
  type UserSignInResponse = ILoginResponse;
  type UserSignInRequest = ILoginRequest;
  //getuser
  type GetUserResponse = UserResponse;
  type GetUserRequest = number;
  //edituser
  type EditUserResponse = UserResponse;
  type EditUserRequest = {
    id: number;
    data: EditUser;
  };
  //resetpassword
  type RessetPasswordResponse = {
    message: string;
  };
  type RessetPasswordRequest = IRessetPassword;
  //confirm password
  type ConfirmPasswordResponse = {
    message: string;
  };
  type ConfirmPasswordRequest = {
    uidb64: string | string[] | undefined;
    token: string | string[] | undefined;
    newpassword: {
      new_password: string;
    };
  };
}

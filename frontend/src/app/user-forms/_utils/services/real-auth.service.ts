import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UniResponse } from '../http/uniresponse'
import { UserModel } from '../../_models/UserModel';
import { Observable } from 'rxjs';
import {
  LoginResponse, LogoutResponse, ProfileOwnChangePasswordResponse,
  ProfileOwnResponse, RegisterConfirmResponse, RegisterResponse,
  ResetPasswordConfirmResponse, ResetPasswordResponse
} from '../http/responses';


export class DataResponse<Type> {
  data: Type;

  constructor(data: Type) {
    this.data = data;
  }

  get_data() {
    return this.data;
  }
}


@Injectable({
  providedIn: 'root'
})
export class RealAuthService {
  private _api_prefix = 'http://localhost:9000/api/v1/user_forms/';
  private _api_url_login = this._api_prefix + "user/login/";
  private _api_url_logout = this._api_prefix + "user/logout/";
  private _api_url_profile_own = this._api_prefix + "user/profile/own/";
  private _api_url_profile_own_update = this._api_prefix + "user/profile/own/update/";
  private _api_url_profile_own_change_password = this._api_prefix + "user/profile/own/change-password/";

  private _api_url_register_create = this._api_prefix + "user/register/create/";
  private _api_url_register_confirm = this._api_prefix + "user/register/confirm/{email}/{token}/";
  private _api_url_reset_password_send_request = this._api_prefix + "user/reset-password/send-request/";
  private _api_url_reset_password_confirm = this._api_prefix + "user/reset-password/confirm/{email}/{token}/";

  constructor(private http: HttpClient) { }


  // =========== business logic ===========
  public log_in(email: string, password: string): Observable<HttpResponse<DataResponse<LoginResponse>>> {
    console.log("RealAuthService - log_in ", email, password);

    return this.http.post<DataResponse<LoginResponse>>(
      this._api_url_login,
      {
        "email": email,
        "password": password
      },
      { observe: "response" });
  }

  public log_out(token: string): Observable<HttpResponse<LogoutResponse>> {
    console.log("RealAuthService - log_out", token);
    return this.http.post<LogoutResponse>(
      this._api_url_logout,
      {},
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public profile_own_get(token: string): Observable<HttpResponse<DataResponse<ProfileOwnResponse>>> {
    console.log("RealAuthService - profile_own_get", token);
    return this.http.get<DataResponse<ProfileOwnResponse>>(
      this._api_url_profile_own,
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public profile_own_update(token: string, email: string, first_name: string,
    last_name: string): Observable<HttpResponse<DataResponse<ProfileOwnResponse>>> {
    console.log("RealAuthService - profile_own_update", token);
    return this.http.put<DataResponse<ProfileOwnResponse>>(
      this._api_url_profile_own_update,
      {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
      },
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public profile_own_change_password(token: string, old_password: string,
    new_password: string): Observable<HttpResponse<DataResponse<ProfileOwnChangePasswordResponse>>> {
    console.log("RealAuthService - profile_own_update", token);
    return this.http.post<DataResponse<ProfileOwnChangePasswordResponse>>(
      this._api_url_profile_own_change_password,
      {
        "old_password": old_password,
        "new_password": new_password,
      },
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public register_create(email: string, password: string, first_name: string,
    last_name: string): Observable<HttpResponse<DataResponse<RegisterResponse>>> {
    console.log("RealAuthService - register_create", email, password);
    return this.http.post<DataResponse<RegisterResponse>>(
      this._api_url_register_create,
      {
        "email": email,
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
      },
      { observe: "response" });
  }

  public register_confirm(email: string,
    register_confirm_token: string): Observable<HttpResponse<DataResponse<RegisterConfirmResponse>>> {
    console.log("RealAuthService - register_confirm", email, register_confirm_token);
    const url = this._api_url_register_confirm
      .replace(/{email}/gi, email)
      .replace(/{token}/gi, register_confirm_token);
    return this.http.get<DataResponse<RegisterConfirmResponse>>(
      url,
      { observe: "response" });
  }


  public reset_password_send_request(email: string): Observable<HttpResponse<DataResponse<ResetPasswordResponse>>> {
    console.log("RealAuthService - reset_password_send_request", email);
    return this.http.post<DataResponse<ResetPasswordResponse>>(
      this._api_url_reset_password_send_request,
      {
        "email": email,
      },
      { observe: "response" });
  }

  public reset_password_confirm(email: string,
    password_reset_token: string,
    new_password: string
  ): Observable<HttpResponse<DataResponse<ResetPasswordConfirmResponse>>> {
    console.log("RealAuthService - reset_password_confirm", email, password_reset_token, new_password);
    const url = this._api_url_reset_password_confirm
      .replace(/{email}/gi, email)
      .replace(/{token}/gi, password_reset_token);
    return this.http.post<DataResponse<ResetPasswordConfirmResponse>>(
      url,
      {
        "new_password": new_password,
      },
      { observe: "response" });
  }

  // =========== END OF business logic ===========

}

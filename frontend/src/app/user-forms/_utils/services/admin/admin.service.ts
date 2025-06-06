import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUserDeleteResponse, AdminUserGetResponse, AdminUserListResponse, LoginResponse, LogoutResponse, ProfileOwnChangePasswordResponse, ProfileOwnResponse, RegisterConfirmResponse, RegisterResponse, ResetPasswordConfirmResponse, ResetPasswordResponse } from '../../http/responses';
import { UserStateService } from '../user-state-service.service';
import { DataResponse } from '../../http/responses'
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // private _api_prefix = 'http://localhost:9000/api/v1/user_forms/';
  private _api_prefix = environment.apiPrefix;  
  private _api_url_admin_user_get = this._api_prefix + "admin/user/id/{id}/";
  private _api_url_admin_user_update = this._api_prefix + "admin/user/id/{id}/";
  private _api_url_admin_user_delete = this._api_prefix + "admin/user/id/{id}/";
  private _api_url_admin_user_create = this._api_prefix + "admin/user/create/";
  private _api_url_admin_user_list = this._api_prefix + "admin/user/";

  constructor(private http: HttpClient, private userStateService: UserStateService) { }

  // ------------------ administrator panels -------------------
  public admin_user_list_get(): Observable<HttpResponse<DataResponse<AdminUserListResponse>>> {
    const token = this.userStateService.get_current_token();
    console.log("AdminService - admin_user_list_get", token);
    return this.http.get<DataResponse<AdminUserListResponse>>(
      this._api_url_admin_user_list,
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public admin_user_get(user_id: string): Observable<HttpResponse<AdminUserGetResponse>> {
    const token = this.userStateService.get_current_token();

    console.log("AdminService - admin_user_get", token, user_id);
    return this.http.get<AdminUserGetResponse>(
      this._api_url_admin_user_get.replace(/{id}/gi, user_id),
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public admin_user_update(user_id: string, user_data: any, is_password_change_open: boolean): Observable<HttpResponse<DataResponse<AdminUserGetResponse>>> {
    const token = this.userStateService.get_current_token();
    console.log("ADMIN USER UPDATE - USER DATA 0000", user_data);

    if ((is_password_change_open) &&
      (user_data['password_1'] != undefined) && (user_data['password_1'] != null) && (user_data['password_1'] != "") &&
      (user_data['password_2'] != undefined) && (user_data['password_2'] != null) && (user_data['password_2'] != "") &&
      (user_data['password_1'] == user_data['password_2'])) {
      user_data['password'] = user_data['password_1'];
    }

    console.log("ADMIN USER UPDATE - USER DATA 1111", user_data);


    delete user_data['password_1'];
    delete user_data['password_2'];
    console.log("ADMIN USER UPDATE - USER DATA 2222 ", user_data);

    console.log("AdminService - admin_user_update", token, user_id, user_data);
    return this.http.put<DataResponse<AdminUserGetResponse>>(
      this._api_url_admin_user_update.replace(/{id}/gi, user_id),
      user_data,
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public admin_user_delete(user_id: string): Observable<HttpResponse<AdminUserDeleteResponse>> {
    const token = this.userStateService.get_current_token();

    console.log("AdminService - admin_user_delete", token, user_id);
    return this.http.delete<AdminUserDeleteResponse>(
      this._api_url_admin_user_delete.replace(/{id}/gi, user_id),
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }

  public admin_user_create(user_data: any): Observable<HttpResponse<DataResponse<AdminUserGetResponse>>> {
    const token = this.userStateService.get_current_token();

    console.log("AdminService - admin_user_create", token, user_data);
    return this.http.post<DataResponse<AdminUserGetResponse>>(
      this._api_url_admin_user_create,
      user_data,
      {
        observe: "response",
        "headers": {
          "Authorization": "Token " + token
        }
      }
    );
  }



  // ------------------ /administrator panels -------------------

}

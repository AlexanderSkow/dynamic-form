import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDto, CreateUserDto } from "../domains/user.dto";
import { SuccessDto } from "../domains/success.dto";

const userUrl = 'http://localhost:3000/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  public getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(userUrl);
  }

  public addUser(createUserDto: CreateUserDto): Observable<SuccessDto> {
    return this.http.post<SuccessDto>(userUrl, createUserDto);
  }

  public getUser(id: number):Observable<UserDto> {
    return this.http.get<UserDto>(`${userUrl}/${id}`);
  }

  public editUser(user: UserDto, id: number):Observable<SuccessDto> {
    return this.http.put<SuccessDto>(`${userUrl}/${id}`, user);
  }
}
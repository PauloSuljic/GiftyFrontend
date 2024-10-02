import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

interface Friend {
  id: string;
  name: string;
  dob: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dummyFriends: Friend[] = [
    {
      id: '1',
      name: 'John Doe',
      dob: '1990-01-01',
      image: 'https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png'
    },
    {
      id: '2',
      name: 'Jane Smith',
      dob: '1992-05-10',
      image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png'
    },
    {
      id: '3',
      name: 'Maya Piglet',
      dob: '1996-09-24',
      image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png'
    },
    {
      id: '4',
      name: 'Michael Brown',
      dob: '1988-03-15',
      image: 'https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png'
    },
    {
      id: '5',
      name: 'Sarah Connor',
      dob: '1985-11-01',
      image: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png'
    }
  ];

  constructor(private http: HttpClient) {}

  // Method to extract username from token
  getUsernameFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token); // Decode the token
      return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null; // Extract the username
    } catch (error) {
      console.error("Error decoding token", error);
      return null; // Return null if there is an error
    }
  }

  // Fetch friends for the logged-in user
  getFriends(): Observable<Friend[]> {
    return of(this.dummyFriends);
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Friend[]>(`/api/friend`, { headers }); // Ensure this endpoint returns correct JSON data
  }
}

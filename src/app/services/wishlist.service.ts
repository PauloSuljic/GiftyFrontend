import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

// Update the Wishlist interface to match API requirements
interface Wishlist {
  id: string;
  title: string; // Changed from `name` to `title`
  items: any[];  // Assuming items will be an array; you can specify more detail if needed
}

interface NewWishlist {
  title: string; // Changed from `name` to `title`
  items: any[];  // Assuming items will be an array; you can specify more detail if needed
}


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5010/api/Wishlist'; 

  constructor(private http: HttpClient) {}

  // Helper method to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  // Fetch all wishlists from API
  getWishlists(): Observable<Wishlist[]> {
    const headers = this.getAuthHeaders();
  
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => response.data.map((wishlist: any) => ({
        id: wishlist.id,
        title: wishlist.title,
        items: wishlist.items || [] // Ensure items is initialized
      }))), // Access the `data` field where wishlists are stored
      catchError(error => {
        console.error('Error fetching wishlists:', error);
        return throwError(error); // Handle errors gracefully
      })
    );
  }

  // Add a new wishlist to the API
  addWishlist(wishlist: NewWishlist): Observable<Wishlist> {
    const headers = this.getAuthHeaders();
    const newWishlist = {
      title: wishlist.title.trim(), // 'title' is expected by the API
      items: wishlist.items // Ensure to send items
    };

    return this.http.post<Wishlist>(this.apiUrl, newWishlist, { headers }).pipe(
      map(response => ({
        id: response.id,
        title: response.title,
        items: response.items || [] // Ensure items is returned
      })),
      catchError(error => {
        console.error('Error adding wishlist:', error);
        return throwError(error);
      })
    );
  }

  // Delete a wishlist from the API
  deleteWishlist(wishlistId: string): Observable<void> {
    const headers = this.getAuthHeaders();
    const deleteUrl = `${this.apiUrl}/${wishlistId}`;
    return this.http.delete<void>(deleteUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error removing wishlist:', error);
        return throwError(error);
      })
    );
  }

  // Fetch details of a specific wishlist by ID
  getWishlistById(wishlistId: string): Observable<Wishlist> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${wishlistId}`; // Construct the URL for fetching the specific wishlist

    return this.http.get<any>(url, { headers }).pipe(
      map(response => ({
        id: response.data.id,
        title: response.data.title,
        items: response.data.items || [] // Ensure items is initialized
      })),
      catchError(error => {
        console.error('Error fetching wishlist details:', error);
        return throwError(error); // Handle errors gracefully
      })
    );
  }
}

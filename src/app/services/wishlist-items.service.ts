import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

interface WishlistItem {
  id: string;
  name: string; // Changed from `name` to `title`
  link: string;
  description: string;
  price: number;  // Assuming items will be an array; you can specify more detail if needed
}

interface NewWishlistItem {
  name: string; // Changed from `name` to `title`
  link: string;  // Assuming items will be an array; you can specify more detail if needed
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistItemsService {

  private apiUrl = 'http://localhost:5010/api/WishlistItems'; 

  constructor(private http: HttpClient) {}

  // Helper method to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  // Fetch all wishlists from API
  getWishlistItems(wishlistId: string): Observable<WishlistItem[]> {
    const headers = this.getAuthHeaders();
  
    return this.http.get<any>(`${this.apiUrl}/${wishlistId}`, { headers }).pipe(
      map(response => response.data.map((wishlistItem: any) => ({
        id: wishlistItem.id,
        name: wishlistItem.name,
        link: wishlistItem.link,
        price: wishlistItem.price // Ensure items is initialized
      }))), // Access the `data` field where wishlists are stored
      catchError(error => {
        console.error('Error fetching wishlists:', error);
        return throwError(error); // Handle errors gracefully
      })
    );
  }

    // Add a new wishlist to the API
    addWishlistItem(wishlistId: string, wishlistItem: NewWishlistItem): Observable<WishlistItem> {
      const headers = this.getAuthHeaders();
      const newWishlistItem = {
        name: wishlistItem.name.trim(), // 'title' is expected by the API
        link: wishlistItem.link, // Ensure to send items
        description: wishlistItem.description,
        price: wishlistItem.price
      };
  
      return this.http.post<WishlistItem>(`${this.apiUrl}/${wishlistId}`, newWishlistItem, { headers }).pipe(
        map(response => ({
          id: response.id,
          name: response.name,
          description: response.description,
          link: response.link,
          price: response.price
        })),
        catchError(error => {
          console.error('Error adding wishlist:', error);
          return throwError(error);
        })
      );
    }

    // Delete item from wishlist
  deleteWishlistItem(wishlistItemId: string): Observable<void> {
    const headers = this.getAuthHeaders();
    const deleteUrl = `${this.apiUrl}/${wishlistItemId}`;
    return this.http.delete<void>(deleteUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error removing wishlist:', error);
        return throwError(error);
      })
    );
  }

  // Fetch wishlist details, including name
  getWishlistDetails(wishlistId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${wishlistId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error removing wishlist:', error);
        return throwError(error);
      })
    );
  }

  // Update a wishlist item
  updateWishlistItem(item: WishlistItem): Observable<WishlistItem> {
    const headers = this.getAuthHeaders(); // Add headers for authorization
    const updateUrl = `${this.apiUrl}/${item.id}`; // Construct the URL with the item ID
    
    return this.http.put<WishlistItem>(updateUrl, item, { headers }).pipe(
      catchError(error => {
        console.error('Error updating wishlist item:', error); // Handle the error
        return throwError(error); // Rethrow the error so it can be caught by the subscriber
      })
    );
  }

}

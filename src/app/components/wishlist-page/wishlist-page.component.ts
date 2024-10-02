import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RemindersComponent } from '../reminders/reminders.component';
import { MiniCalendarComponent } from '../mini-calendar/mini-calendar.component';
import { NgFor, NgIf, CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';
import { WishlistItemsService } from '../../services/wishlist-items.service';
import { ActivatedRoute } from '@angular/router';
import { NewWishlistItemModalComponent } from "../new-item-modal/new-item-modal.component";
import { WishlistService } from '../../services/wishlist.service';
import { ItemModalComponent } from "../item-modal/item-modal.component";

export interface WishlistItem {
  id: string;
  name: string; // Changed from `name` to `title`
  link: string;
  description: string;
  price: number;  // Assuming items will be an array; you can specify more detail if needed
}

export interface NewWishlistItem {
  name: string; // Changed from `name` to `title`
  description: string;
  link: string;  // Assuming items will be an array; you can specify more detail if needed
  price: number;
}

@Component({
  selector: 'wishlist-page-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RemindersComponent, MiniCalendarComponent, NgFor, NgIf, NewWishlistItemModalComponent, ItemModalComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {
  wishlistItems: WishlistItem[] = []; // Local state for wishlists
  newWishlistItem: NewWishlistItem = { name: '', link: '', description: '', price: 0 }; // Object for new wishlist
  maxWishlistItems: number = 8; // Maximum number of wishlists to show
  wishlistName: string | null = null; // Variable to hold the username
  wishlistId: string | null = null;  // Store wishlist ID
  selectedItem: WishlistItem | null = null;  // Selected item for editing
  showAddModal: boolean = false;
  showEditModal: boolean = false;  // Controls the visibility of the modal

  constructor(@Inject(DOCUMENT) private document: Document,private route: ActivatedRoute, private userService: UserService, private wishlistItemsService: WishlistItemsService, private wishlistService: WishlistService) {
    const wishlistId = this.route.snapshot.paramMap.get('id');
    this.wishlistId = wishlistId;
    if (wishlistId){
      this.loadWishlistDetails(wishlistId);
      this.loadWishlistItems(wishlistId);
    }
  }

  // Fetch wishlist details, including name
  loadWishlistDetails(wishlistId: string) {
    this.wishlistService.getWishlistById(wishlistId).subscribe({
      next: (wishlist) => {
        this.wishlistName = wishlist.title;  // Assuming the wishlist name is stored in 'title'
      },
      error: (error) => {
        console.error('Error fetching wishlist details:', error);
      }
    });
  }

  // Fetch wishlist details, including all items
  loadWishlistItems(wishlistId: string) {
    this.wishlistItemsService.getWishlistItems(wishlistId).subscribe({
      next: (wishlistItems) => {
        this.wishlistItems = wishlistItems;  // Directly assign the fetched items to the local array
      },
      error: (error) => {
        console.error('Error fetching wishlist items:', error);
      }
    });
  }

  // Method to handle adding a new wishlist item
  addWishlistItem(newItem: NewWishlistItem) {
    if (this.wishlistId){
      const wishlistIdNew = this.wishlistId;
      // Call the service to save the new item to the backend
      this.wishlistItemsService.addWishlistItem(this.wishlistId, newItem).subscribe({
        next: (savedItem) => {
          // On success, add the item to the local list
          this.wishlistItems.push(savedItem);
          this.loadWishlistItems(wishlistIdNew);
          this.closeAddModal();  // Close the modal after saving
        },
        error: (error) => {
          console.error('Error saving wishlist item:', error);
        }
      });
    }
  }
  
  // Handle deleting the item
  deleteWishlistItem(itemId: string) {
    if (this.wishlistId){
      const wishlistIdNew = this.wishlistId;
      this.wishlistItemsService.deleteWishlistItem(itemId).subscribe({
        next: () => {
          this.loadWishlistItems(wishlistIdNew);
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error deleting wishlist item:', error);
        }
      });
    }
  }
  
  // Handle updating the item when changes are saved
  updateWishlistItem(updatedItem: WishlistItem) {
    if (this.wishlistId) {
      const wishlistIdNew = this.wishlistId;
      this.wishlistItemsService.updateWishlistItem(updatedItem).subscribe({
        next: (updated) => {
          // Update the local list with the updated item
          const index = this.wishlistItems.findIndex(item => item.id === updated.id);
          if (index !== -1) {
            this.wishlistItems[index] = updated; // Replace the old item with the updated one
          }
          this.loadWishlistItems(wishlistIdNew); // Optionally reload the entire list
          this.closeEditModal(); // Close the modal after successful update
        },
        error: (error) => {
          console.error('Error updating wishlist item:', error);
        }
      });
    }
  }

  // Check if we can add a new wishlist (if there are less than max wishlists)
  canAddNewItem(): boolean {
    return this.wishlistItems.length < this.maxWishlistItems;
  }

  openAddModal() {
    this.showAddModal = true; // Show the modal
  }

  // Method to close the wishlist modal
  closeAddModal() {
    this.showAddModal = false;
  }

  // Open the edit modal for the selected item
  openEditModal(item: WishlistItem) {
    this.selectedItem = item;
    this.showEditModal = true;
  }

  // Close the edit modal
  closeEditModal() {
    this.selectedItem = null;
    this.showEditModal = false;
  }

  // Method to handle deletion event from the modal
  onWishlistItemDelete(deletedWishlistId: string) {
    // Remove the deleted wishlist from the local wishlists array
    this.wishlistItems = this.wishlistItems.filter(wishlistItems => wishlistItems.id !== deletedWishlistId);
  }


}

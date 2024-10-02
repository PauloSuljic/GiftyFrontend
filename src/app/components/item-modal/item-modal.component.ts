import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { WishlistItem } from '../wishlist-page/wishlist-page.component';
import { FormsModule } from '@angular/forms';
import { WishlistItemsService } from '../../services/wishlist-items.service';

@Component({
  selector: 'app-item-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnChanges {
  @Input() wishlistItem: WishlistItem | null = null; // Input item to be edited
  @Output() itemUpdated = new EventEmitter<WishlistItem>(); // Emit when item is updated
  @Output() itemDeleted = new EventEmitter<string>(); // Emit when item is deleted
  @Output() modalClosed = new EventEmitter<void>();  // Emit to close the modal

  editedItem: WishlistItem = { id: '', name: '', price: 0, link: '', description: '' }; // Temporary item for editing

  constructor(private wishlistItemsService: WishlistItemsService) {} // Inject the service

  // When the input changes (e.g., when the modal is opened), copy the data into `editedItem`
  ngOnChanges(changes: SimpleChanges) {
    if (changes['wishlistItem'] && this.wishlistItem) {
      // Copy the current wishlist item to the editable item object
      this.editedItem = { ...this.wishlistItem };
    }
  }

  // Save the changes and emit the updated item
  saveChanges() {
    if (this.editedItem) {
      this.itemUpdated.emit(this.editedItem); // Emit the updated item
      this.onClose(); // Close the modal after saving
    }
  }

  // Call the service to delete the item from the backend
  deleteItem() {
    if (confirm('Are you sure you want to delete this item?')) {
      if (this.wishlistItem) {
        // Call the delete service method
        this.wishlistItemsService.deleteWishlistItem(this.wishlistItem.id).subscribe({
          next: () => {
            console.log(`Item with ID: ${this.wishlistItem?.id} deleted successfully`);
            this.itemDeleted.emit(this.wishlistItem?.id); // Emit the item ID after deletion
            this.onClose();
          },
          error: (error) => {
            console.error('Error deleting item:', error);
          }
        });
      }
    }
  }
  // Close the modal
  onClose() {
    this.modalClosed.emit(); // Emit to close the modal
  }
}

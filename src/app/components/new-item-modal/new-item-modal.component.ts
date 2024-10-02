import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NewWishlistItem } from '../wishlist-page/wishlist-page.component';

export interface WishlistItem {
  name: string;
  link: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-new-item-modal',
  templateUrl: './new-item-modal.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./new-item-modal.component.css']
})
export class NewWishlistItemModalComponent {
  @Input() wishlistId: string | null = null;  // Input for the wishlist ID
  @Output() itemSaved = new EventEmitter<NewWishlistItem>();  // Output event to notify parent about the new item
  @Output() modalClosed = new EventEmitter<void>(); 

  newItem: NewWishlistItem = { name: '', link: '', description: '', price: 0 };

  productAsin: string = '';

  constructor(private productService: ProductService) {}

  // Close the modal
  onClose() {
    this.modalClosed.emit();
  }

  // Method to save the item
  saveItem() {
    if (this.newItem.name.trim() && this.newItem.link.trim()) {
      // Emit the new item to the parent component
      this.itemSaved.emit(this.newItem);
      this.onClose(); // Close modal after saving
    } else {
      alert('Name and Link are required');
    }
  }

  fetchProductDetails() {
    if (!this.productAsin) return;

    this.productService.getProductDetails(this.productAsin).subscribe({
      next: (details) => {
        console.log('Fetched product details:', details);
        // Handle the details (add to wishlist, etc.)
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
  }
}

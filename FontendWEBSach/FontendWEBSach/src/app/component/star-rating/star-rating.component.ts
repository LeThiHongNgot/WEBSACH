import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],


})
export class StarRatingComponent {
  @Input() maxRating: number = 5;
  @Input() rating: number = 0;

  itemsToRepeat = new Array(5);
  ngOnInit() {
        // Initialize the rating when the component is initialized
         this.handleUpdateRating(this.rating);
      }
  handleUpdateRating(newRate: number) {
      this.rating = newRate;
  }

}
// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-star-rating',
//   template: `
//     <span *ngFor="let _ of itemsToRepeat; let i = index">
//       <span class="star" [class.filled]="i < rating" (click)="handleUpdateRating(i + 1)">&#9733;</span>
//     </span>
//   `,
//   styles: [`
//     .star {
//       font-size: 24px;
//       cursor: pointer;
//     }
//     .filled {
//       color: gold;
//     }
//   `]
// })
// export class StarRatingComponent {
//   @Input() maxRating: number = 5;
//   @Input() rating: number = 0;

//   itemsToRepeat = new Array(this.maxRating);
//   ngOnInit() {
//     // Initialize the rating when the component is initialized
//     this.handleUpdateRating(this.rating);
//   }

//   handleUpdateRating(newRate: number) {
//     this.rating = newRate;
//   }
// }

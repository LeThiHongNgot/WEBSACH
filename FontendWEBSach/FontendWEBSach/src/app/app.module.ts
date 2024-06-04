import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Thư viện cpn
import { StarRatingComponent } from './component/star-rating/star-rating.component';
import { AuthorCardComponent } from './component/author-card/author-card.component';
// Thư viện page
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CartComponent } from './pages/cart/cart.component';
// Thư viện angular và khác
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './component/modal/modal.component';
import {HttpClientModule } from '@angular/common/http';
import { AddressComponent } from './component/address/address.component';
import { MapComponent } from './component/map/map.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {environment} from './environments/environment';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { RatingDecimalComponent } from './component/rating-decimal/rating-decimal.component';
import { NgxViacepModule } from "@brunoc/ngx-viacep";
import {  ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {CloudinaryModule} from '@cloudinary/ng';
import { CommentComponent } from './componentAdmin/comment/comment.component';
import { MenuComponent } from './componentAdmin/menu/menu.component';
import { ModalAddStaffComponent } from './componentAdmin/modal-add-staff/modal-add-staff.component';
import { ModalAddVoucherComponent } from './componentAdmin/modal-add-voucher/modal-add-voucher.component';
import { ModalEditVoucherComponent } from './componentAdmin/modal-edit-voucher/modal-edit-voucher.component';
import { ModalXoaComponent } from './componentAdmin/modal-xoa/modal-xoa.component';
import { OrderAdminComponent } from './componentAdmin/order-admin/order-admin.component';
import { OrderDetailComponent } from './componentAdmin/order-detail/order-detail.component';
import { OrderNotCompleteComponent } from './componentAdmin/order-not-complete/order-not-complete.component';
import { RevenueAdminComponent } from './componentAdmin/revenue-admin/revenue-admin.component';
import { SachComponent } from './componentAdmin/sach/sach.component';
import { StaffAdminComponent } from './componentAdmin/staff-admin/staff-admin.component';
import { SuaSachComponent } from './componentAdmin/sua-sach/sua-sach.component';
import { ThemSachComponent } from './componentAdmin/them-sach/them-sach.component';
import { UserAdminComponent } from './componentAdmin/user-admin/user-admin.component';
import { VoucherAdminComponent } from './componentAdmin/voucher-admin/voucher-admin.component';
import { ModalApceptComponent } from './componentAdmin/modal-apcept/modal-apcept.component';
import { ModalAddStakholderbookComponent } from './componentAdmin/modal-add-stakholderbook/modal-add-stakholderbook.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    ProductComponent,
    StarRatingComponent,
    AuthorCardComponent,
    CategoryComponent,
    PaymentComponent,
    ModalComponent,
    CartComponent,
    AddressComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    RatingDecimalComponent,
    CommentComponent,
    MenuComponent,
    ModalAddStaffComponent,
    ModalAddVoucherComponent,
    ModalEditVoucherComponent,
    ModalXoaComponent,
    OrderAdminComponent,
    OrderDetailComponent,
    OrderNotCompleteComponent,
    RevenueAdminComponent,
    SachComponent,
    StaffAdminComponent,
    SuaSachComponent,
    ThemSachComponent,
    UserAdminComponent,
    VoucherAdminComponent,
    ModalApceptComponent,
    ModalAddStakholderbookComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatRadioModule,
    MatSliderModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SlickCarouselModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxViacepModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CloudinaryModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CartComponent } from './pages/cart/cart.component';
import { ModalComponent } from './component/modal/modal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SachComponent } from './componentAdmin/sach/sach.component';
import { ThemSachComponent } from './componentAdmin/them-sach/them-sach.component';
import { RevenueAdminComponent } from './componentAdmin/revenue-admin/revenue-admin.component';
import { OrderAdminComponent } from './componentAdmin/order-admin/order-admin.component';
import { StaffAdminComponent } from './componentAdmin/staff-admin/staff-admin.component';
import { UserAdminComponent } from './componentAdmin/user-admin/user-admin.component';
import { VoucherAdminComponent } from './componentAdmin/voucher-admin/voucher-admin.component';
import { OrderNotCompleteComponent } from './componentAdmin/order-not-complete/order-not-complete.component';
import { OrderDetailComponent } from './componentAdmin/order-detail/order-detail.component';
import { CommentComponent } from './componentAdmin/comment/comment.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginadminComponent } from './pages/loginadmin/loginadmin.component';
import { authGuard } from './guards/auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { staffAuthGuard } from './guards/admin-auth.guard';
const routes: Routes = [
  { path: 'OrderDetail-admin/:id', component: OrderDetailComponent },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: ModalComponent,
    canActivate: [authGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
  },

  {
    path: 'books',
    component: SachComponent,
    canActivate: [staffAuthGuard]
  },
  {
    path: 'product/:combinedParam',
    component: ProductComponent,
  },
  {
    path: 'category-product',
    component: ProductComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'produc/:id',
    component: ProductComponent,
  },
  { path: 'modal', component: ModalComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'category/:id', component: CategoryComponent },
  {
    path: 'them-sach/:bookId',
    component: ThemSachComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'them-sach',
    component: ThemSachComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'revenue-admin',
    component: RevenueAdminComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'order-admin',
    component: OrderAdminComponent,
    canActivate: [staffAuthGuard]
  },
  {
    path: 'staff-admin',
    component: StaffAdminComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'user-admin',
    component: UserAdminComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'voucher-admin',
    component: VoucherAdminComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'OrderNotComplete-admin',
    component: OrderNotCompleteComponent,
    canActivate: [staffAuthGuard]
  },
  {
    path: 'OrderDetail-admin',
    component: OrderDetailComponent,
    canActivate: [staffAuthGuard]
  },
  {
    path: 'comment-admin',
    component: CommentComponent,
    canActivate: [staffAuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

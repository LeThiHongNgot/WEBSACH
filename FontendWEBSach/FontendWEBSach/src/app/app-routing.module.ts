import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CartComponent } from './pages/cart/cart.component';
import { ModalComponent } from './component/modal/modal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SachComponent } from './componentAdmin/sach/sach.component';
import { SuaSachComponent } from './componentAdmin/sua-sach/sua-sach.component';
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

const routes: Routes=[
    {
    path:'cart',
    component: CartComponent
    },
    {
      path:'home',
      component: HomeComponent,

      },
    {
    path:'',
    component: HomeComponent,
    pathMatch: 'full',
    },
    {
    path:'user',
    component: UserComponent,
    },
    {
    path:'category',
    component: CategoryComponent,
    },
    {
    path:'product/:id',
    component: ProductComponent,
    },
    {
    path:'category-product',
    component: ProductComponent,
    },
    {
    path:'payment',
    component: PaymentComponent,
    },
{
    path:'produc/:id',
    component: ProductComponent,
    },
    { path: 'modal', component: ModalComponent},
    { path:'admin', component: AdminComponent},
    { path: 'category/:id', component: CategoryComponent},
    {
        path:'sach',
        component: SachComponent,
        },
        {
        path:'sua-sach',
        component: SuaSachComponent,
        },
        {
        path:'them-sach',
        component: ThemSachComponent,
        },
        {
        path:'revenue-admin',
        component: RevenueAdminComponent,
        },
        {
        path:'order-admin',
        component: OrderAdminComponent,
        }, 
        {
        path:'staff-admin',
        component: StaffAdminComponent,
        },
        {
        path:'user-admin',
        component: UserAdminComponent,
        },
        {
        path:'voucher-admin',
        component: VoucherAdminComponent,
        },
        {
        path:'OrderNotComplete-admin',
        component: OrderNotCompleteComponent,
        },
        {
        path:'OrderDetail-admin',
        component: OrderDetailComponent,
        },
        {
        path:'comment-admin',
        component: CommentComponent,
        },
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}

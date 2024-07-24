import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('user_token');
  const role = localStorage.getItem('role');
  if (token&&(role === 'Quản lý')) {
    return true;
  } else {
    router.navigate(['/admin']); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    return false;
  }
};
export const staffAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('user_token');
  const role = localStorage.getItem('role');
  if (token && (role === 'Nhân viên' || role === 'Quản lý'))  {
    return true;
  } else {
    router.navigate(['/admin']);
    return false;
  }
};
export interface User {
    Id: string,
    fullName: string,
    password: string,
    email: string,
    phone: string,
    Bills: any[],
    UserRoles: any[]
}

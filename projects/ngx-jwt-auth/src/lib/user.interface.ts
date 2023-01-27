export default interface User {
    id: string;
    email?: string;
    phone?: string;
    firstName: string;
    lastName?: string;
    isSuperAdmin?: boolean;
    [field: string]: unknown;
}

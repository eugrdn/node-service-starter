export namespace Models {
    enum UserRole {
        Admin = 'Admin',
        User = 'User',
    }

    interface WithId {
        id: number | string;
    }

    interface WithDates {
        created_at: string;
        updated_at: string;
    }

    type UUID = string;

    interface Person {
        firstName: string | null;
        middleName: string | null;
        lastName: string | null;
    }

    export interface Address extends WithId, WithDates {
        userId: UUID;
        houseNo: string;
        apartmentNo: string | null;
        index: string | null;
        region: string | null;
        district: string | null;
        settlement: string | null;
        structureNo: string | null;
    }

    export interface User extends Person, WithId, WithDates {
        role: UserRole;
        tel: string | null;
        email: string;
        password: string;
    }
}

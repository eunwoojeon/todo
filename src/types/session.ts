import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        sub_id: string;
        email: string;
        name: string;
        picture: string | null | undefined
    }
}
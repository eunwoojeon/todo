import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        userId: string;
        email: string;
        name: string;
        picture: string | null | undefined
    }
}
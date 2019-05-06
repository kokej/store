export interface AdditionalUserInfo {
    isNewUser: boolean;
    profile: {
        email: string;
        family_name: string;
        given_name: string;
        id: string;
        link: string;
        locale: string;
        name: string;
        picture: string;
        verified_email: boolean;
    };
    providerId: string;
}

export interface UserCredential {
    a: any;
    accessToken: string;
    idToken: string;
    providerId: string;
    signInMethod: string;
}

export interface User {
    displayName: string;
    email: string;
    emailVerified: boolean;
    metadata: {
        creationTime: string;
        lastSignInTime: string;
    };
    phoneNumber: string;
    photoURL: string;
    uid: string;
    refreshToken: string;
}

export interface FirebaseUser {
    additionalUserInfo?: AdditionalUserInfo;
    credential?: UserCredential;
    operationType: string;
    user: User;
}

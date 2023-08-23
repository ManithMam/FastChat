export default interface FastChatUser {
    id: string,
    userName: string,
    displayName: string,
    email: string,
    profile_picture: string,
    lastOnline: number,
    participantOf: string[],
}
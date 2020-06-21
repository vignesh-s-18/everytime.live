declare global {
  interface Window {
    hasCreatedOffer: boolean;
  }
}

type User = {
  name: string;
};

export type RoomData = {
  roomId: string;
  passwordProtected?: boolean;
  users?: User[];
} | null;

// @todo add undefined type (I have to fix some components);
export type StreamConfig = MediaStreamConstraints;
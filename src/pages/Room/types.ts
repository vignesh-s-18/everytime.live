type User = {
  name: string;
};

export type RoomData = {
  roomId: string;
  passwordProtected?: boolean;
  users?: User[];
} | null;

export type StreamConfig = MediaStreamConstraints | undefined;
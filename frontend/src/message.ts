import { User } from "./user";

export class Message{
  content: string;
  user: User;
  timestamp: Date = new Date();

  constructor(content: string, user: User){
    this.content = content;
    this.user = user;
  }
}
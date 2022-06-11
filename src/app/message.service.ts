import { Injectable } from '@angular/core';
import { MetaTestService } from './meta-test.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // constructor() { }


  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
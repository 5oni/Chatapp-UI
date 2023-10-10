import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private users = [
    { name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
    // Add more users as needed
  ];

  getUsers() {
    return this.users;
  }
}

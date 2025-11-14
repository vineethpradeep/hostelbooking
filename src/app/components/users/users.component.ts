import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [    CommonModule,RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList = [
    {
      firstName: 'Ravi',
      lastName: 'Kumar',
      emailAddress: 'ravi.kumar@example.com',
      phoneNumber: '9876543210',
      
    },
    {
      firstName: 'Priya',
      lastName: 'Sharma',
      emailAddress: 'priya.sharma@example.com',
      phoneNumber: '9123456780',

    },
    {
      firstName: 'Arun',
      lastName: 'Nair',
      emailAddress: 'arun.nair@example.com',
      phoneNumber: '9988776655',
      
    },
    {
      firstName: 'Meera',
      lastName: 'Joseph',
      emailAddress: 'meera.joseph@example.com',
      phoneNumber: '9012345678',
  
    }, {
      firstName: 'Ravi',
      lastName: 'Kumar',
      emailAddress: 'ravi.kumar@example.com',
      phoneNumber: '9876543210',
      
    },
    {
      firstName: 'Priya',
      lastName: 'Sharma',
      emailAddress: 'priya.sharma@example.com',
      phoneNumber: '9123456780',

    },
    {
      firstName: 'Arun',
      lastName: 'Nair',
      emailAddress: 'arun.nair@example.com',
      phoneNumber: '9988776655',
      
    },
    {
      firstName: 'Meera',
      lastName: 'Joseph',
      emailAddress: 'meera.joseph@example.com',
      phoneNumber: '9012345678',
  
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

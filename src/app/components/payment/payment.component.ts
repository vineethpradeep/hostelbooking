import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  
   imports: [    CommonModule,
    RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  implements OnInit{

   paymentList=[
    {
      transactionId:'TUH67232788Z',
     phoneNumber: '9876543210',
     amount:'5000',
     paymentStatus:'Success',
    
      
    },
    {
     transactionId:'GQR78667M',
     phoneNumber: '9123456780',
     amount:'8000',
     paymentStatus:'Pending',
    
    },
    {
     transactionId:'Jk324OFD',
     phoneNumber: '998877665',
     amount:'2500',
     paymentStatus:'Failed',
    
      
    },
    {
     transactionId:'XHDA8329O',
     phoneNumber: '9012345678',
     amount:'15000',
     paymentStatus:'Success',
    
  
    },
    {
      transactionId:'TUH67232788Z',
     phoneNumber: '9876543210',
     amount:'5000',
     paymentStatus:'Success',
    
      
    },
    {
     transactionId:'GQR78667M',
     phoneNumber: '9123456780',
     amount:'8000',
     paymentStatus:'Pending',
    
    },
    {
     transactionId:'Jk324OFD',
     phoneNumber: '998877665',
     amount:'2500',
     paymentStatus:'Failed',
    
      
    },
    {
     transactionId:'XHDA8329O',
     phoneNumber: '9012345678',
     amount:'15000',
     paymentStatus:'Success',
    
  
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}



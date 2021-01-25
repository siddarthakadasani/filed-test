import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaymentService } from '../services/payment/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentSubscription: Subscription;
  showSpinner: boolean = false;
  constructor(private _paymentService: PaymentService,
    private _snackBar: MatSnackBar,
    private _router:Router) { }

  ngOnInit(): void {
    this.paymentSubscription = this._paymentService.getFormValues().subscribe((res) => {
      this.doPayment(res);
    })
  }
  doPayment(payLoad) {
    console.log(payLoad, "in payment page");
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.openToastBar('Payment Successful','ok')
    }, 3000);
    // API call- below post call is commented due to server and endpoint are not available
    //this._paymentService.makePayment(payLoad).subscribe((response)=>{ "/ to do"},(error)=>{})
  }
  openToastBar(message: string, action: string) {
  let toastClosed =  this._snackBar.open(message, action, {
      duration: 2000,
    }).afterDismissed();
    toastClosed.subscribe(()=>{
      this._router.navigate(['/home']);
    })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.paymentSubscription.unsubscribe();
  }

}

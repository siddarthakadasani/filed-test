import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';



@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  showExpiryError: boolean = false;

  constructor(private _paymentService: PaymentService) {
    this.paymentForm = new FormGroup({
      creditCardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      creditHolder: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required, Validators.pattern('^[0-9/]*$'), Validators.minLength(4), Validators.maxLength(5)]),
      securityCode: new FormControl('', [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])

    })
  }

  ngOnInit(): void {
  }
  onExpiration(event) {
    console.log(event.target.value);
    let pattern = /^[0-9]$/
    let value = event.target.value;
    let newDate = '';
    let today = new Date();
    // if(pattern.test(value)){
    if (value.length == 2) {
      if (value > 1 && value <= 9) {
        newDate = value + '/';
        this.paymentForm.controls['expirationDate'].patchValue(newDate)
      }

    } else if (value.length >= 2) {
      if (value.length > 3 && value.includes('/')) {
        let split = value.split('/');
        let expiryYear = split[1];
        let presentYear = today.getFullYear().toString().substring(2);
        if (expiryYear.length == 2 && expiryYear >= presentYear) {
          this.showExpiryError = false;
        } else {
          this.showExpiryError = true;
        }
        console.log(expiryYear, presentYear, "expiryYear presentYear")
      }
    }
    //}
  }
  onPayment(event) {
    console.log(this.paymentForm.value);
    this._paymentService.setFormValues(this.paymentForm.value);
  }

}



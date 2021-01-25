import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentFormAnnounce = new Subject();

  constructor(private _http: HttpClient) { }

  setFormValues(formObj) {
    this.paymentFormAnnounce.next(formObj);
  }

  getFormValues() {
    return this.paymentFormAnnounce.asObservable();
  }

  makePayment = (paymentObj) => {
    let URL = '';
    let paymentRequestModel: paymentModel;

    paymentRequestModel = {
      creditCardNumber: paymentObj.creditCardNumber,
      cardHolderName: paymentObj.cardHolderName,
      expirationDate: paymentObj.expirationDate,
      secuirtyCode: paymentObj.secuirtyCode,
      amount: Number(paymentObj.amount)
    }
    return this._http.post(URL, paymentRequestModel);
  }
}
export interface paymentModel {
  creditCardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  secuirtyCode: string;
  amount: number

}

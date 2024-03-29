import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, collection, query, where, getDocs, setDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '@shared/services';
import { Recipient } from '@data/types/article.type';
import Swal from 'sweetalert2';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  formBuilder = inject(FormBuilder);
  currentTime: number = new Date().getTime();

  transactionForm = this.formBuilder.group({
    phone_number: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(5)]]
  });

  get numberControl() {
    return this.transactionForm.get('phone_number');
  }

  get amountControl() {
    return this.transactionForm.get('amount');
  }

  constructor(
    private readonly auth: Auth,
    private firestore: Firestore,
    private globalService: GlobalService,
    private router: Router
  ) {}

  /**
   * This method sends money to the specified recipient's phone number according to the amount.
   * It first checks the database if the recipient's phone number exists and processes the transaction.
   * If the record does not exist, it throws an error informing the user that the recipient phone number provided does
   * not match either of the database's users' phone number.
   */
  async sendMoney(): Promise<void> {
    const transactionID: string = doc(collection(this.firestore, 'transactions')).id;
    const transactionRef = doc(this.firestore, `transactions/${transactionID}`);

    // Get reference to the Firestore collection
    const q = query(
      collection(this.firestore, 'users'),
      where('phone', '==', this.transactionForm.controls.phone_number.value)
    );

    // Listen to real-time changes
    const querySnapshot = await getDocs(q);

    // Check if the record exists, process transaction, throw error if otherwise
    if (querySnapshot.size !== 0) {
      querySnapshot.forEach((doc) => {
        // Get the transaction details from user
        const data: Recipient = {
          recipient_phone_number: Number(this.transactionForm.controls.phone_number.value),
          amount: Number(this.transactionForm.controls.amount.value),
          recipient_name: doc.data()['displayName'],
          time: this.currentTime
        };

        setDoc(transactionRef, data, { merge: true })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((data: void) => {
            Swal.fire({
              icon: 'success',
              title: 'Transaction Successful',
              text: `You have successfully sent Kshs. ${
                this.transactionForm.controls.amount.value
              } to ${doc.data()['displayName']}`,
              customClass: {
                confirmButton: 'sweetAlertButton'
              }
            });
            return this.router.navigate(['../dashboard']);
          });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry! That phone number is not registered in our system.',
        customClass: {
          confirmButton: 'sweetAlertButton'
        }
      });
    }
  }

  getOne(s: string): Observable<any> {
    return from(of([]))
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore, Unsubscribe, onSnapshot, collection } from '@angular/fire/firestore';
import { GlobalService } from '@shared/services';
import { DatePipe, DecimalPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { ArticlesService } from '@data/services';
import { FrequentPayments, Recipient, Transaction } from '@data/types/article.type';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'xtra-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, DecimalPipe, DatePipe, MatIconModule, ReactiveFormsModule, NgClass],
  template: `
    <section class="flex flex-col pt-4">
      <div>
        <h3 class="text-3xl font-bold">Overview</h3>
      </div>

      <section class="flex flex-col xl:flex-row pt-7">
        <div class="flex flex-col flex-1">
          <span class="text-2xl font-bold">Quick Transfer</span>
          <div class="flex flex-row mt-8">
            <form
              class="flex flex-row"
              [formGroup]="transactionService.transactionForm"
              (ngSubmit)="onSendMoneySubmitted()">
              <input
                [ngClass]="{
                  'is-invalid':
                    transactionService.numberControl?.invalid &&
                    transactionService.numberControl?.touched
                }"
                formControlName="phone_number"
                type="number"
                placeholder="Phone number"
                class="border-2 border-gray-500 w-full rounded py-3 px-4 outline-none focus:bg-indigo-100 focus:transition ease-in duration-150 mr-3" />
              <input
                [ngClass]="{
                  'is-invalid':
                    transactionService.amountControl?.invalid &&
                    transactionService.amountControl?.touched
                }"
                formControlName="amount"
                type="number"
                placeholder="Amount"
                class="border-2 border-gray-500 w-full rounded py-3 px-4 outline-none focus:bg-indigo-100 focus:transition ease-in duration-150" />
              <button
                [disabled]="transactionService.transactionForm.invalid"
                class="affirmative-btn cursor-pointer mr-2 hover:text-gray-500 border-2 border-black
                   flex py-2 px-4 bg-[#1F1F1F] rounded font-semibold
                   transition ease-in duration-150 ml-4 items-center">
                <mat-icon class="text-white">send</mat-icon>
              </button>
            </form>
          </div>

          <div class="flex flex-col">
            @if (
              transactionService.numberControl?.invalid && transactionService.numberControl?.touched
            ) {
              <div>
                @if (this.transactionService.numberControl?.errors?.['required']) {
                  <small class="text-danger">
                    *Phone number is required. Start with zero, followed by the other 9 digits.
                  </small>
                }
                @if (this.transactionService.numberControl?.errors?.['minlength']) {
                  <small class="text-danger">*Phone number cannot be less than 10 digits</small>
                }
              </div>
            }

            @if (
              transactionService.amountControl?.invalid && transactionService.amountControl?.touched
            ) {
              <div>
                @if (this.transactionService.amountControl?.errors?.['required']) {
                  <small class="text-danger">*Amount is required</small>
                }
                @if (this.transactionService.amountControl?.errors?.['min']) {
                  <small class="text-danger">*Amount cannot be less than Kshs. 5</small>
                }
              </div>
            }
          </div>
        </div>

        <div class="flex flex-col flex-1 px-0 xl:px-12 mt-12 xl:mt-0">
          <span class="text-2xl font-bold">Recent Transactions</span>

          <div class="mt-8 flex flex-col">
            @for (transaction of recentTransactions; track transaction) {
              <div class="flex flex-row mb-5">
                <div class="flex flex-col flex-1">
                  <p class="font-bold">{{ transaction.name }}</p>
                  <p class="text-gray-400">{{ transaction.reason }}</p>
                </div>
                <div class="flex-col text-end flex-1">
                  <p class="font-bold">Ksh {{ transaction.amount | number: '1.0-0' }}</p>
                  <p class="text-gray-400">{{ transaction.time }}</p>
                </div>
              </div>
            }

            @for (transaction of realtimeTransactionUpdates; track transaction) {
              <div class="flex flex-row mb-5">
                <div class="flex flex-col flex-1">
                  <p class="font-bold">{{ transaction?.['recipient_name'] }}</p>
                  <p class="text-gray-400">Transfer</p>
                </div>
                <div class="flex-col text-end flex-1">
                  <p class="font-bold">Ksh {{ transaction?.['amount'] | number: '1.0-0' }}</p>
                  <p class="text-gray-400">{{ transaction?.['time'] | date: 'h:mm a' }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="sidebar flex flex-col flex-2 my-12 xl:my-0">
          <span class="text-2xl font-bold">Frequent Payments</span>
          <div class="mt-8 flex flex-col md:flex-row space-x-0 md:space-x-3">
            @for (frequentPayment of frequentPayments; track frequentPayment) {
              <div class="rounded-2xl border-2 border-gray-200 p-4 flex flex-row my-4 md:my-0">
                <img
                  class="mr-4"
                  width="50"
                  height="50"
                  alt="frequent payment service logo"
                  [ngSrc]="frequentPayment.logo" />
                <div class="flex flex-col">
                  <p class="font-bold">Ksh {{ frequentPayment.amount }}</p>
                  <p class="text-gray-400">{{ frequentPayment.title }}</p>
                </div>
              </div>
            }
          </div>

          <div class="flex flex-col mt-20 items-center content-center">
            <img class="w-80" alt="statistics" src="assets/svgs/dashboard/statistics.svg" />
            <p class="text-2xl font-bold text-gray-600 mt-12">Check in later for the statistics</p>
          </div>
        </div>
      </section>
    </section>
  `,
  styles: [
    `
      .is-invalid {
        border: 2px solid red !important;
      }

      .text-danger {
        color: red;
        font-weight: bold;
        margin-bottom: 10px;
        transition: ease-in 10ms;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  globalService = inject(GlobalService);
  transactionService = inject(ArticlesService);
  firestore = inject(Firestore);

  onSnapshotSubscription!: Unsubscribe;

  realtimeTransactionUpdates!: Recipient[];

  recentTransactions: Transaction[] = [
    {
      name: 'Marvin McKinney',
      reason: 'Shopping',
      amount: '94.00',
      transactionType: 'send',
      time: '8:20pm'
    },
    {
      name: 'Jane Wanjiru',
      reason: 'Food shopping',
      amount: '550.00',
      transactionType: 'send',
      time: '11:08pm'
    },
    {
      name: 'Tim Turner',
      reason: 'Stipend',
      amount: '1500.00',
      transactionType: 'receive',
      time: '9:07am'
    },
    {
      name: 'Nicole Locksmith',
      reason: 'Loan',
      amount: '5700.00',
      transactionType: 'send',
      time: '9:33pm'
    }
  ];

  frequentPayments: FrequentPayments[] = [
    {
      logo: 'assets/svgs/dashboard/mastercard.svg',
      amount: '3,500.00',
      title: 'Month Transfer'
    },
    {
      logo: 'assets/svgs/dashboard/netflix.svg',
      amount: '1,140.00',
      title: 'Netflix Premium'
    },
    {
      logo: 'assets/svgs/dashboard/spotify.svg',
      amount: '350.00',
      title: 'Spotify Music'
    }
  ];

  ngOnInit() {
    this.getRealTimeTransactionUpdates();
  }

  /**
   * This method provides real-time updates on documents inside the transactions collection.
   */
  getRealTimeTransactionUpdates() {
    this.onSnapshotSubscription = onSnapshot(collection(this.firestore, 'transactions'), (data) => {
      this.realtimeTransactionUpdates = data.docs.map((doc) => {
        return { ...(doc.data() as Recipient) };
      });
    });
  }

  /**
   * This method is an event listener that fires the sendMoney() method in the transactions service
   */
  onSendMoneySubmitted(): void {
    this.transactionService.sendMoney().catch((error): void => {
      this.globalService.showSnackbar(error.message);
    });
  }

  /**
   * We detach the Firestore real-time updates listener inside the onDestroy lifecycle hook.
   */
  ngOnDestroy() {
    this.onSnapshotSubscription();
  }
}

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  UserCredential
} from '@angular/fire/auth';
import { doc, Firestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalService } from '@shared/services';
import { User } from '@data/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  globalService = inject(GlobalService);

  user$!: Observable<unknown>;

  userDataDetails!: User;

  constructor(
    private readonly auth: Auth,
    private firestore: Firestore,
    private formBuilder: FormBuilder
  ) {
    // Initialize the firebase auth instance.
    this.auth = getAuth();
    // Persist firebase auth session.
    this.auth.setPersistence(browserLocalPersistence);

    // We use this since we want to switch to another observable of the record, further than the authentication tab
    // say you want to get the email and displayName
    this.user$ = authState(this.auth).pipe(
      switchMap(async (user) => {
        if (user) {
          const docRef = doc(firestore, `users/${user?.uid}`);
          return onSnapshot(docRef, (dataDoc) => {
            return (this.userDataDetails = dataDoc.data() as User);
          });
        } else {
          return of(null); // allows us to tell if the user isn't logged in
        }
      })
    );
  }

  // Login form
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  // Sign up form
  signUpForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    phone: [Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)]
  });

  /**
   * This method logs in the user to the platform
   * using their email and password.
   * It uses Firebase Auth for checking if user exists in the database
   * and throws an error if otherwise
   */
  async loginUser(): Promise<void> {
    await signInWithEmailAndPassword(
      this.auth,
      String(this.loginForm.controls.email.value),
      String(this.loginForm.controls.password.value)
    )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((userCredential: UserCredential) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back!`,
          customClass: {
            confirmButton: 'sweetAlertButton'
          }
        });
        return this.router.navigate(['../admin']);
      })
      .catch((error) => {
        this.globalService.showSnackbar(error.message);
      });
  }

  /**
   * This method signs up the user to the platform
   * using the details provided in the registration form.
   * The user credential returned after creating the user with their email and password
   * is then sent over to createUserData to create a collection of users in the database.
   */
  async signUpUser(): Promise<void> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      this.auth,
      String(this.signUpForm.controls.email.value),
      String(this.signUpForm.controls.password.value)
    );
    return this.createUserData(userCredential);
  }

  /**
   * Adds a new user to the users collection in the database.
   * @param user user credential details returned from createUserWithEmailAndPassword
   */
  createUserData(user: UserCredential): void {
    const userRef = doc(this.firestore, `users/${user.user.uid}`);

    const data: User = {
      uid: user.user.uid,
      displayName: this.signUpForm.controls.fullName.value,
      email: this.signUpForm.controls.email.value,
      phone: this.signUpForm.controls.phone.value,
      fullName: this.signUpForm.controls.fullName.value,
      authType: 'email-and-password'
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDoc(userRef, data, { merge: true }).then((data: void) => {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: `Welcome to Xtra Blog!`,
        customClass: {
          confirmButton: 'sweetAlertButton'
        }
      });
      return this.router.navigate(['../admin']);
    });
  }

  /**
   * This method logs in the user using Google Authentication
   */
  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const userCred: UserCredential = await signInWithPopup(this.auth, provider);
    return this.updateUserDataLogin(userCred, 'google');
  }

  /**
   * This method signs up the user using Google Authentication
   */
  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const userCred: UserCredential = await signInWithPopup(this.auth, provider);
    return this.updateUserData(userCred, 'google');
  }

  /**
   * This method signs out current logged-in user
   */
  async signOutUser() {
    await signOut(this.auth)
      .then(() => {
        // Clear all local storage items.
        localStorage.clear();
        return this.router.navigate(['../']);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error): void => {
        this.globalService.showSnackbar("Couldn't sign out. Please try again");
      });
  }

  /**
   * Takes info from the auth state and mirror it on the firestore document
   * This is where you could add any kind of custom data that you want
   * @param user user information gotten from the auth state
   * @param authType the type of authentication used
   */
  async updateUserData(user: UserCredential | null, authType: string) {
    const userRef = doc(this.firestore, `users/${user?.user.uid}`);

    const { value: phone_number } = await Swal.fire({
      title: 'Kindly provide your phone number',
      input: 'number',
      inputLabel: 'Your phone number',
      inputPlaceholder: '0700000000',
      customClass: {
        confirmButton: 'sweetAlertButton'
      }
    });

    if (phone_number) {
      const data = {
        uid: user?.user.uid,
        displayName: user?.user.displayName,
        email: user?.user.email,
        authType: authType,
        photoURL: user?.user.photoURL,
        phone: Number(phone_number)
      };
      setDoc(userRef, data, { merge: true }).then(() => {
        // this.getToken(user);
        this.globalService.showSnackbar('Welcome to Xtra Blog');
        return this.router.navigate(['../admin']);
      });

      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
        customClass: {
          confirmButton: 'sweetAlertButton'
        }
      });
    }
  }

  /**
   * Takes info from the auth state and mirror it on the firestore document
   * This is where you could add any kind of custom data that you want
   * @param user user information gotten from the auth state
   * @param authType the type of authentication used
   */
  async updateUserDataLogin(user: UserCredential | null, authType: string) {
    const userRef = doc(this.firestore, `users/${user?.user.uid}`);

    const data = {
      uid: user?.user.uid,
      displayName: user?.user.displayName,
      email: user?.user.email,
      authType: authType,
      photoURL: user?.user.photoURL
    };
    setDoc(userRef, data, { merge: true }).then(() => {
      // this.getToken(user);
      this.globalService.showSnackbar('Welcome back');
      return this.router.navigate(['../admin']);
    });

    await Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `Welcome back, ${data.displayName}`,
      customClass: {
        confirmButton: 'sweetAlertButton'
      }
    });
  }
}

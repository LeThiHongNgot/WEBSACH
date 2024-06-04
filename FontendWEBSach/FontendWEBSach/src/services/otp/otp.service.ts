import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private afAuth: AngularFireAuth) {}

  sendOTP(phoneNumber: string): Promise<any> {
    return this.afAuth.signInWithPhoneNumber(phoneNumber, new firebase.auth.RecaptchaVerifier('phone'));
  }

  verifyOTP(verificationId: string, code: string): Promise<any> {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    return this.afAuth.signInWithCredential(credential);
  }
}

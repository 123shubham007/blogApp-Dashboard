import { Injectable } from '@angular/core';
import { Auth, authState, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard : boolean = false;

  constructor( private toastr: ToastrService, private router : Router, private auth : Auth ) { }

  onLogin(formValue : any){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValue.email, formValue.password).then(async ()=>{

      this.toastr.success('Login Successfully!!!');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['']);
      
    }).catch((error) => {
      this.toastr.warning(error);
    });
  }

  loadUser(){
    authState(this.auth).subscribe(user=>{
      localStorage.setItem( 'user', JSON.stringify(user) );
    })
  }

  logOut(){
    signOut(this.auth).then(()=>{

      this.toastr.info('LogOut Successfully!!!');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);

    }).catch((error) => {
      this.toastr.warning(error);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}

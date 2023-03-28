import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userEmail !: string;
  isLoggedIn$ !: Observable<boolean>

  constructor( private authService : AuthService ){}

  ngOnInit() : void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
  }

  onlogOut(){
    this.authService.logOut();
  }

}

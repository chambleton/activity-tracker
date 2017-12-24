import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})

export class UserSigninComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}

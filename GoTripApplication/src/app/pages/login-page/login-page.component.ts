import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Parse from 'parse';
import { currentUser } from '../../services/getCurrentUserData.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = ''
  password: string = ''


  constructor(private router: Router, private currentUser: currentUser) { }

  ngOnInit(): void {
  }

  onKey(event: any) {

    switch (event.target.id) {
      case "InputEmail":
        this.email = event.target.value;
        break;
      case "InputPassword":
        this.password = event.target.value;
        break;
    }
    console.log(event);

}

  async onClickMe(){
    await Parse.User.logIn(this.email, this.password)
    .then((loggedUser) => {
      let user = loggedUser.id;
  this.currentUser.userId = user;

  const queryUser = new Parse.Query(Parse.User);

  const User = new Parse.User()
  User.id = user;
  queryUser.equalTo('objectId', User.id);


  queryUser.find().then(async resp=>{
    let username =  await resp[0].get('username');
    console.log('====> This is the username')
    this.currentUser.name = username;
    console.log(this.currentUser.name);
  })

  this.router.navigate(['dashboard']);
}).catch((error: any) => {
  // Show the error message somewhere
  alert("Error: " + error.code + " " + error.message);
});
  }
}

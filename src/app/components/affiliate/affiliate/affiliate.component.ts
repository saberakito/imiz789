import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private todoServcie:TodoService) { }
  infoMessage:any;
  username:any;
  password:any;
  status_login_rubsub:any;
  sub:any;
  id:any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
      if(this.id!=null){
        window.location.assign("https://wallet-imiwin.com/register?token=70657dvos548e3004pa81809bvows6b49dcc5cf9&affm="+this.id);
      }
      
    });

  }

  loginRubsub(form){
    this.todoServcie.loginRubsub(form.value.username,form.value.password).subscribe(data => {
      this.todoServcie.createUserRubsub(form.value.username).subscribe(data => {});
      try{
        //saKop1a
        var objArray = JSON.parse(data['_body']);
        objArray.mem_code = form.value.username;
        if(objArray.result=="Y"){
          this.router.navigateByUrl('/affm/main');
          localStorage.setItem("data_member_rubsub",JSON.stringify(objArray));
          localStorage.setItem("token_key_rubsub",JSON.stringify(data['token_key']));
          this.todoServcie.setLoggedInRubsub(true);
         // location.reload();
        }else{
          alert('เข้าสู่ระบบผิดพลาด');
          this.infoMessage = 'Login Failed. Please Try Again.';
        }
      }catch(e){
        this.infoMessage = 'Error Login';
      }
     
    });
  }

}

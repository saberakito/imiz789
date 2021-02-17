import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css','../main.css']
})
export class WithdrawComponent implements OnInit {

  constructor(private todoServcie:TodoService) { }
  amount_all_income:any;
  amount_withdraw:any;
  aa_amount_withdraw:any
  array_withdraw:any;
  ngOnInit() {
    this.todoServcie.getAmountIncome().subscribe(data=>{
      debugger;
      if(data!=null){
        this.amount_all_income = data['data']['aa_amount_total'];
        this.amount_withdraw = data['data']['aa_amount_withdraw'];
        this.aa_amount_withdraw = data['data']['aa_amount_withdraw'];
      }else{
        this.amount_all_income = '0';
        this.amount_withdraw = '0';
      }
    });
    this.todoServcie.getAmountWithdraw().subscribe(data=>{
      if(data!=null){
        this.array_withdraw = data['data'];
      }
    });
    
  }

  withdraw_fn(){
    var  value_amount = $("[name='amount_withdraw']").val();
    if(value_amount<=this.aa_amount_withdraw){
      this.todoServcie.withdraw_service(value_amount).subscribe(data=>{
        debugger
        if(data['result']=='Y'){
          this.todoServcie.updateWithdraw(value_amount).subscribe(response=>{
            alert(data['msg']);
            location.reload();
          })
        }else{
          alert('ข้อมูลไม่ถูกต้อง');
        }
      });
    }else{
      alert('ใส่รายได้ที่ถอนได้ให้ถูกต้อง');
    }
  }

}

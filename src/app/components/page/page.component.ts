import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

declare  var testHoldon,HoldOn,validURL,LoadingPage:  any;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 3000 00:00:00 GMT'
      })
    });

    return next.handle(httpRequest);
  }
  @Input('value_app') value_app: string;
  id:any;
  sub:any;
  constructor(private route:ActivatedRoute,private todoServcie:TodoService) {
    this.route.queryParams.subscribe(params => {
      let menu = params['menu'];
      if(menu=='hide'){
        $(".nav_area").hide();
        $(".footerArea2").hide();
        $(".m_footer").hide();
        $(".topnav_mobile").hide();
      }
  });
  }
  public data_deatail:string = "<img src='/assets/images/loading/05.gif'>";
  public data_title:string;
  menu_hide:any;
  showHeader:any;
  aff:any;
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
      if(this.value_app!=null){
        this.id = this.value_app;
      }
     // this.id =  params['id'];
    // testHoldon('sk-cube-grid','กำลังโหลดข้อมูล');
     LoadingPage('open');
      this.todoServcie.getDataPage(this.id).subscribe((response)=>{
        // this.data_title = response.data.menu_name;
        // this.data_deatail = response.data.menu_detail;
        // this.data_title = response.data.menu_name;
        // this.data_deatail = response.data.menu_detail;
        LoadingPage('close');

        var url_data = response.data.menu_detail;
        if(this.id=='register'||this.id=='deposit'||this.id=='withdraw'){
          if(this.id=='registerssss'){
            this.route.queryParams
              .subscribe(params => {
                this.todoServcie.getDataKey(params.aff).subscribe((response2)=>{
                  var obj_1 = response.data.menu_detail.split('src="');
                  var obj_2 = response.data.menu_detail.split('src="')[1].split('" width');
                  var link_set = response.data.menu_detail.split('src="')[1].split('" width')[0]+'&aff_id='+response2;
                  var linet_update = obj_1[0]+' src="'+link_set+'" width'+obj_2[1];
                  setTimeout(function(){
                    $("#content_html").replaceWith(linet_update);
                    LoadingPage('close');
                  },3000)
                
                });
              }
            );
          }else{
            $("#content_html").replaceWith(response.data.menu_detail);
            setTimeout(function(){
              
              LoadingPage('close');
            },3000)
            
          }
         
         
          
           
        }else{
          this.data_title = response.data.menu_name;
          this.data_deatail = response.data.menu_detail;
          LoadingPage('close');
        }
        
       HoldOn.close();
        
      });
    });
  }

}

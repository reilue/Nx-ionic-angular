import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '@suite/services';
import { ResponseShow } from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss']
})
export class PermissionsPage implements OnInit {
  constructor(private permissionService: PermissionsService) {}

  ngOnInit() {
    this.permissionService.getShow().then(
      (data: Observable<HttpResponse<ResponseShow[]>>) => {
        data.subscribe((perList: HttpResponse<ResponseShow[]>) => {
          console.log(perList);
        });
      },
      error => console.log(error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-support-zone',
  templateUrl: './support-zone.component.html',
  styleUrls: ['./support-zone.component.css']
})
export class SupportZoneComponent implements OnInit {

  currentLang = "th";
  constructor(private tranService: TranslateService) { }

  ngOnInit() {
    $(".button-collapse").sideNav({
      closeOnClick: true, /* กดแล้วปิด */
      draggable: true /* บนมือถือลากได้ */
    });
  }

  changLang() {
    this.currentLang = this.currentLang == "en" ? "th" : "en";
    this.tranService.use(this.currentLang);
    // $('select').material_select();
  }

}

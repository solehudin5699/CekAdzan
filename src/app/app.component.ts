import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cekadzan';
  constructor() {}

  data = {
    keyword: '',
    result: [],
    searchDone: false,
    isLoading: false,
  };
  goSearch() {
    if (this.data.keyword) {
      this.data.isLoading = true;
      this.data.searchDone = false;
      fetch(
        `https://api.banghasan.com/sholat/format/json/kota/nama/${this.data.keyword}`
      )
        .then((res) => res.json())
        .then((data: any) => {
          this.data.isLoading = false;
          this.data.searchDone = true;
          this.data.result = data.kota;
          // console.log(this.data.result);
        })
        .catch(() => {
          this.data.searchDone = true;
          this.data.isLoading = false;
          this.data.result = [];
        });
    }
  }
}

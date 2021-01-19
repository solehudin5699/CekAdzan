import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor() {}
  data = {
    result: {
      kotaOrKab: '',
      tanggal: '',
      imsak: '',
      subuh: '',
      terbit: '',
      dhuha: '',
      dzuhur: '',
      ashar: '',
      maghrib: '',
      isya: '',
    },
    isLoading: false,
  };
  @Input() item: any;
  ngOnInit(): void {
    this.data.isLoading = true;
    let dates = new Date();
    let date = dates.getDate();
    let dateFormat = date > 9 ? date : `0${date}`;
    let month = dates.getMonth() + 1;
    let monthFormat = month > 9 ? month : `0${month}`;
    let year = dates.getFullYear();
    let datesNow = `${year}-${monthFormat}-${dateFormat}`;
    fetch(
      `https://api.banghasan.com/sholat/format/json/jadwal/kota/${this.item.id}/tanggal/${datesNow}`
    )
      .then((res) => res.json())
      .then((data: any) => {
        this.data.isLoading = false;
        this.data.result = { ...data.jadwal.data, kotaOrKab: this.item.nama };
        // console.log(this.data.result);
      })
      .catch(() => {
        this.data.isLoading = false;
        this.data.result = {
          kotaOrKab: '',
          tanggal: '',
          imsak: '',
          subuh: '',
          terbit: '',
          dhuha: '',
          dzuhur: '',
          ashar: '',
          maghrib: '',
          isya: '',
        };
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Au } from './aut';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

authors:Au[]= [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Au[]>('https://localhost:7009/api/Authors').subscribe(
      (response) => {
        // Store the list of authors in the authors array
        this.authors = response;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu', error);
      });
  }
}

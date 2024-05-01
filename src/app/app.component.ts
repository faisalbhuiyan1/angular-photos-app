import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  photosList: any;

  ngOnInit(): void {
    this.fetchPhotosList()
  }

  fetchPhotosList() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(photosListResponse => {
        this.photosList  = photosListResponse
      }).catch(error => {
        console.error("Error fetching photos list", error)
      })
  }

  title = 'photos-angular-app';
}

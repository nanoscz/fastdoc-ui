import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const KEY_GOOGLE_MAP = 'AIzaSyBBEUVyUIeYZmJIv6jT961JwLn9sl_a5aU'
const KEY_GOOGLE_MAP1 = "AIzaSyAevfplTXFndsqlENM0shMER-wXWLyJCcQ"

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapsURL = `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE_MAP1}`;
  mapsReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient) {
    // Map loading should occur just once
    this.loadMap();
  }

  private loadMap(): void {
    console.log("se debe llmar a la apu", this.mapsURL)
    this.httpClient
      .jsonp(this.mapsURL, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe((status: boolean) => this.mapsReady$.next(status));
  }
}

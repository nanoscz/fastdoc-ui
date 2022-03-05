import { MapService } from './../shared/services/map.service';
import { ClientService } from './../shared/services/client.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  clients$ = new BehaviorSubject<Array<any>>([]);
  apiLoaded: boolean = false;
  titles = ['Origen', 'Destino']
  icons = ['http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png', 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png']
  center: google.maps.LatLngLiteral = { lat: -17.7770695, lng: -63.1828104 };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [];
  typeOfDocuments = ['Sobre', 'Archivador', 'Libro'];
  form!: FormGroup;
  msgErrorMaps = null;
  constructor(private fb: FormBuilder, private mapService: MapService) {

  }

  initializeMaps() {
    this.apiLoaded = true;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      documentDelivery: this.fb.group({
        date: [new Date(), Validators.required],
        payment: ['15']
      }),
      documentDetail: this.fb.group({
        originName: ['asdadasd', Validators.required],
        destinationName: ['asdasdas', Validators.required],
        originPhone: ['1111111', Validators.required],
        destinationPhone: ['222222', Validators.required],
        description: [''],
        typeOfDocument: ['', Validators.required]
      })
    })

    this.mapService.mapsReady$.pipe(filter(Boolean)).subscribe(() => this.initializeMaps());
  }

  onSubmit() {
    if (this.markerPositions.length !== 2) {
      this.msgErrorMaps = 'Debe seleccionar las coordenas de origen y destino.'
      return
    }
    console.log(this.form.value)
    console.log(this.markerPositions.length)

  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (this.markerPositions.length < 2) {
      console.log(event, event.latLng.toJSON())
      this.markerPositions.push(event.latLng.toJSON());
    }
    if (this.markerPositions.length !== 2) {
      this.msgErrorMaps = 'Debe seleccionar las coordenas de origen y destino.'
    } else {
      this.msgErrorMaps = null;
    }
  }


}

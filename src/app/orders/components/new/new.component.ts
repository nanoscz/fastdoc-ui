import { ShippingDocumentService } from './../../../shared/services/shipping-document.service';
import { ShippingDetailService } from './../../../shared/services/shipping-detail.service';
import { CoordService } from './../../../shared/services/coord.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { MapService } from '../../../shared/services/map.service';
import { MAP_STYLES } from '../../../shared/utils/mapStyles';
import { SessionService } from '../../../shared/services/session.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  clients$ = new BehaviorSubject<Array<any>>([]);
  apiLoaded: boolean = false;
  titles = ['Origen', 'Destino']
  icons = ['http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png', 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png']
  center: google.maps.LatLngLiteral = { lat: -17.7770695, lng: -63.1828104 };
  zoom = 15;
  googleMaps = {
    styles: MAP_STYLES.defaultStyles,
    mapTypeControl: false,
    streetViewControl: false
  }
  markerOptions: Array<google.maps.MarkerOptions> = [
    {
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: '../../assets/images/origen.png'
    },
    {
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: '../../assets/images/destination.png'
    }
  ];
  markerPositions: google.maps.LatLngLiteral[] = [];
  typeOfDocuments = ['Sobre', 'Archivador', 'Libro'];
  form!: FormGroup;
  msgErrorMaps = null;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private mapService: MapService,
    private coordService: CoordService,
    private shippingDetailService: ShippingDetailService,
    private shippingDocumentService: ShippingDocumentService
  ) {

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
        originName: ['John Dee', Validators.required],
        destinationName: ['Alexa Dae', Validators.required],
        originPhone: ['79476808', Validators.required],
        destinationPhone: ['79476808', Validators.required],
        description: [''],
        typeOfDocument: ['Sobre', Validators.required]
      })
    })

    this.mapService.mapsReady$.pipe(filter(Boolean)).subscribe(() => this.initializeMaps());
  }

  onCancel() {
    this.router.navigate(['/orders/list']);
  }

  onSubmit() {
    if (this.markerPositions.length !== 2) {
      this.msgErrorMaps = 'Debe seleccionar las coordenas de origen y destino.'
      return
    }

    const coords = {
      origin: { type: "Point", "coordinates": [this.markerPositions[0].lat, this.markerPositions[0].lng]},
      destination: { type: "Point", "coordinates": [this.markerPositions[1].lat, this.markerPositions[1].lng]}
    }

    const documentDetail = this.form.value.documentDetail
    const documentDelivery =  this.form.value.documentDelivery
    const session = this.sessionService.getSession()

    this.coordService.create(coords).pipe(
      switchMap((data) => this.shippingDetailService.create({
        name_origin: documentDetail.originName,
        name_destination: documentDetail.destinationName,
        description: documentDetail.description,
        phone_origin: documentDetail.originPhone,
        phone_destination: documentDetail.destinationPhone,
        documentType: documentDetail.typeOfDocument,
        coordId: data.id
      })),
      switchMap((res) => this.shippingDocumentService.create({
        date: documentDelivery.date,
        payment: documentDelivery.payment,
        clientId: session.id,
        employeeId: null,
        motorcyclistId: null,
        shippingDetailId: res.id
      }))
    ).subscribe(() =>  {
      this.router.navigate(['/orders/list'])
    })
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

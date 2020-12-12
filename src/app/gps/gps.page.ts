import { Component, OnInit } from '@angular/core';
declare var google;
import { StudentService } from '../services/student.service';
import { Photo, Position } from '../models/photo';
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
  id: number;
  photoPath: string;
  student: number;
}


@Component({
  selector: 'app-tab4',
  templateUrl: 'gps.page.html',
  styleUrls: ['gps.page.scss']
})
export class Tab4Page implements OnInit{

  map = null;
  markers : Marker[];

  constructor(private studentService: StudentService) {
    this.markers = [];
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.loadMap();
    this.getPhotos(currentUser.username);

  }

  
  getPhotos(username) { 
    this.studentService.getByUsername(username)
      .subscribe(
        data => {
          console.log(data);
          // let photosNumber = Object.keys(data[0].photos).length;
          for (let photo of data[0].photos) {
            let photo_aux: Marker = {
              id: photo.id,
              title: photo.location,
              photoPath: photo.photoPath,
              student: photo.student,
              position: {
                lat: parseFloat(photo.latitude),
                lng: parseFloat(photo.longitude),
              }
            }
            this.markers.push(photo_aux);
          };
          this.loadMap()
          // console.log(this.photos);
        },
        error => {
          console.log(error);
        }
      );
  }


  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 37.9, lng: -4.7};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 11
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    console.log(this.markers),
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(markers: Photo) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const iconic = {
      url: markers.photoPath,
      scaledSize: new google.maps.Size(35,35),
    };

    const contentString =
    '<div id="content">' +
    "<strong> Usuario: --"+currentUser.username+"</strong>"+
    "<strong> Localización: --"+markers.title+"</strong>"+


    "<img src="+markers.photoPath+"  width='100' "+"height='120'>"+
    "</div>" +
    "</div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });




    const markeerr= new google.maps.Marker({ 
    // const marker =new google.maps.Marker({
      position: markers.position,
      map: this.map,
      icon: iconic,
      title: markers.title
    });

    markeerr.addListener("click", () => {
      infowindow.open(this.map, markeerr);
    });

   // return marker;
  }

}
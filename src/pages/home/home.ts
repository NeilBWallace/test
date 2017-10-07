import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image-provider';
import { AngularFireDatabase } from 'angularfire2/database';
import {File} from '@ionic-native';
import * as firebase from 'firebase/app'
import 'firebase/storage'
declare var window:any;
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  private images = [];
  imageUrls = [];
arrData=[];
myInput;  

cameraOptions: CameraOptions = {
    sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.FILE_URI,
    mediaType: this.camera.MediaType.ALLMEDIA
 };

public Fbref:any;

  constructor(
    private fd: AngularFireDatabase,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private camera: Camera,
    private imageSrv: ImageProvider
  ) {

  this.Fbref = firebase.storage().ref();

    this.fd.list("/records/").subscribe( _data =>{
       this.arrData =_data;
       console.log(this.arrData);
    });

    let data = localStorage.getItem('images');
    if (data) {
      this.images = JSON.parse(data);
    }
  }

  AddRecord(){
    this.fd.list("/records/").push(this.myInput)
  }
  delete (i){
    this.fd.list("/records/").remove(this.arrData[i].$key);
  }
  UploadVideo(){
  //   
     this.camera.getPicture(this.cameraOptions).then( (fileUri: any) => {
        console.log('File URI: ' + JSON.stringify(fileUri));
        window.resolveLocalFileSystemURL('file://' + fileUri, (fileEntry) => {
          console.log('Type: ' + (typeof fileEntry));
           fileEntry.file( (file) => {
             console.log('File: ' + (typeof file) + ', ' + JSON.stringify(file));
             const fileReader = new FileReader();
             
             fileReader.onloadend = (result: any) => {
               console.log('File Reader Result: ' + JSON.stringify(result));
               let arrayBuffer = result.target.result;
               let blob = new Blob([new Uint8Array(arrayBuffer)], {type: 'video/mp4'});
               const name = '' + Date.now();
               this.upload(blob);
             };
  
            
             
             fileReader.readAsArrayBuffer(file);
           }, (error) => {
             console.log('File Entry Error: ' + JSON.stringify(error));
           });
        }, (error) => {
          console.log('Error resolving file: ' + JSON.stringify(error));
        });
      });
    
     

      
  }
  
  upload(blob: Blob) {
   this.Fbref.child('vid').put(blob);
  }
  captureDataUrl: string;

  takePicture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=> {
      
  }
    )

  }
}

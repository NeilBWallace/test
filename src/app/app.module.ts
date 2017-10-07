import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AngularFireModule } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../providers/image-provider';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebaseStorge from 'firebase/storage';

var config = {
  apiKey: "AIzaSyCE8z153bgKkDLJeGLRhIUrH4BC_7RLzU4",
  authDomain: "challenge-me-11dcc.firebaseapp.com",
  databaseURL: "https://challenge-me-11dcc.firebaseio.com",
  projectId: "challenge-me-11dcc",
  storageBucket: "challenge-me-11dcc.appspot.com",
  messagingSenderId: "406718256646"
};






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    AngularFireDatabaseModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    Camera,
    ImageProvider
    ]
})
export class AppModule {}

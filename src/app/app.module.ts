import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AdvertisingPage } from '../pages/advertising/advertising';
import { FeedPage } from '../pages/feed/feed';
import { NotificationsPage } from '../pages/notifications/notifications';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { FormLayoutPage } from '../pages/form-layout/form-layout';

import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
import { GoogleMap } from '../components/google-map/google-map';

import { FeedService } from '../pages/feed/feed.service';
import { NotificationsService } from '../pages/notifications/notifications.service';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { EmailComposer } from '@ionic-native/email-composer';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Toast } from '@ionic-native/toast';
import { BackgroundMode } from '@ionic-native/background-mode';

// Functionalities
import { MapsPage } from '../pages/maps/maps';
import { FacebookLoginPage } from '../pages/facebook-login/facebook-login';
import { GoogleLoginPage } from '../pages/google-login/google-login';
import { ContactCardPage } from '../pages/contact-card/contact-card';

import { GoogleMapsService } from '../pages/maps/maps.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FacebookLoginService } from '../pages/facebook-login/facebook-login.service';
import { GoogleLoginService } from '../pages/google-login/google-login.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDXkegMRg-GOjeB8TnNGrSLkN2FEKTa_vI",
  authDomain: "blunobeacon-1509979347620.firebaseapp.com",
  databaseURL: "https://blunobeacon-1509979347620.firebaseio.com",
  projectId: "blunobeacon-1509979347620",
  storageBucket: "blunobeacon-1509979347620.appspot.com",
  messagingSenderId: "48317300260"
};

@NgModule({
  declarations: [
    MyApp,
    AdvertisingPage,
    FeedPage,
    NotificationsPage,
    TabsNavigationPage,
    FormLayoutPage,
    FacebookLoginPage,
    GoogleLoginPage,
    MapsPage,
    ContactCardPage,

    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
    GoogleMap
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'blunobeacon'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdvertisingPage,
    FeedPage,
    NotificationsPage,
    TabsNavigationPage,
    FormLayoutPage,
    MapsPage,
    FacebookLoginPage,
    GoogleLoginPage,
    ContactCardPage
  ],
  providers: [
    FeedService,
    NotificationsService,

    FacebookLoginService,
    GoogleLoginService,
    GoogleMapsService,

	  SplashScreen,
	  StatusBar,
    SocialSharing,
    NativeStorage,
    InAppBrowser,
    CallNumber,
    Facebook,
    GooglePlus,
    Keyboard,
    Geolocation,
    EmailComposer,
    IBeacon,
    LocalNotifications,
    SpinnerDialog,
    Toast,
    BackgroundMode,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AdvertisingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-advertising',
  templateUrl: 'advertising.html',
})
export class AdvertisingPage {

  proximity: string;
  greeting: string;
  url_image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController
  ) {
    this.proximity = this.navParams.get("proximity")
  }

  ionViewWillEnter() {
    if (this.proximity == "ProximityImmediate") {
      this.greeting = "Disfruta del evento!"
      this.url_image = "./assets/images/beacons1.png"
    } else if (this.proximity == "ProximityNear") {
      this.greeting = "¡Bienvenido!"
      this.url_image = "./assets/images/beacons2.png"
    } else if (this.proximity == "ProximityFar") {
      this.greeting = "Nos vemos pronto!"
      this.url_image = "./assets/images/beacons3.png"
    } else if (this.proximity == "ProximityUnknown") {

    }
  }

  dismiss() {
    this.view.dismiss();
  }

}

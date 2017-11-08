import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ModalController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { AdvertisingPage } from '../pages/advertising/advertising';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  // rootPage: any = WalkthroughPage;
  rootPage: any = TabsNavigationPage;


  pages: Array<{ title: string, icon: string, component: any }>;
  pushPages: Array<{ title: string, icon: string, component: any }>;

  beacons: any = [];
  inBackground: boolean = false;
  notificationID: number = 0;
  regions = [
    { uuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0' },	// UUID for bluno nano dfRobot.
  ];
  updateTimer: any;
  is_present_modal: boolean = true;
  beacon_proximity: string = "ProximityImmediate";

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private ibeacon: IBeacon,
    private localNotifications: LocalNotifications,
    public modalCtrl: ModalController,
    private backgroundMode: BackgroundMode
  ) {
    platform.ready().then(() => {
      platform.resume.subscribe(
        data => this.inBackground = false
      )
      platform.pause.subscribe(
        data => this.inBackground = true
      )
      this.ibeacon.enableBluetooth()
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();

      this.startScan()
    });

  }

  startScan() {
    // The delegate object holds the iBeacon callback functions
    // specified below.
    const delegate = this.ibeacon.Delegate();

    // Set the delegate object to use.
    this.ibeacon.setDelegate(delegate);

    // Request permission from user to access location info.
    // This is needed on iOS 8.
    this.ibeacon.requestAlwaysAuthorization();

    // Start monitoring and ranging beacons.
    for (var i in this.regions) {

      let beaconRegion = this.ibeacon.BeaconRegion(i + 1, this.regions[i].uuid);

      // Start monitoring.      
      this.ibeacon.startMonitoringForRegion(beaconRegion)
        .then(
        () => console.log('Native layer recieved the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
        );

      // Start ranging.
      this.ibeacon.startRangingBeaconsInRegion(beaconRegion).then(
        data => console.log(data),
        error => console.log('error')
      );
    }


    // Called continuously when ranging beacons.
    delegate.didRangeBeaconsInRegion().subscribe(
      pluginResult => {
        let exists = false;
        console.log('didRangeBeaconsInRegion: ', pluginResult)
        //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
        for (let i in pluginResult.beacons) {
          // Insert beacon into table of found beacons.
          let beacon = pluginResult.beacons[i];
          for (let j = 0; j < this.beacons.length; j++) {
            if (beacon.uuid == this.beacons[j].uuid) {
              exists = true
            }
          }
          if (!exists) {
            this.beacons.push(beacon);
          }
          if (beacon.proximity != this.beacon_proximity) {
            this.beacon_proximity = beacon.proximity
            this.is_present_modal = true
          }
          if (this.inBackground) {
            console.log('background')
            // Show notification if a beacon is inside the region.
            // TODO: Add check for specific beacon(s) in your app.
            if (pluginResult.beacons.length > 0 && this.is_present_modal) {
              this.localNotifications.schedule(
                {
                  id: ++this.notificationID,
                  title: 'Beacon en el rango',
                  text: 'El scanner iBeacon detectó un beacon, toque aquí para abrir la app.'
                });
            }
          }
          if (this.is_present_modal) {
            let proximity = { proximity: beacon.proximity }
            this.is_present_modal = false;
            this.presentAdvertisingModal(proximity)
          }
        }
      },
      error => console.error()
    );

    // Called when starting to monitor a region.
    // (Not used in this example, included as a reference.)
    delegate.didStartMonitoringForRegion().subscribe(
      (pluginResult) => {
        //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
      }
    );
  }


  presentAdvertisingModal(proximity) {
    let advertisingModal = this.modalCtrl.create(AdvertisingPage, proximity);
    advertisingModal.present();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }
}

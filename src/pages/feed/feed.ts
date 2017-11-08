import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/Rx';

import { FeedModel } from './feed.model';
import { FeedService } from './feed.service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'feed-page',
  templateUrl: 'feed.html'
})
export class FeedPage {
  feed: FeedModel = new FeedModel();
  loading: any;

  posts: Array<{
    title: string;
    image: string;
    description: string;
  }>

  constructor(
    public nav: NavController,
    public feedService: FeedService,
    public navParams: NavParams,
    public socialSharing: SocialSharing
  ) {
    this.feed.category = navParams.get('category');

    this.posts = [
      {
        title: "Beacons",
        image: "https://b-i.forbesimg.com/anthonykosner/files/2013/08/ibeacons.jpg",
        description: "Un beacon es un dispositivo de bajo consumo que emite una señal broadcast, y son suficientemente pequeños para fijarse en una pared o mostradores. Utiliza conexión bluetooth de bajo consumo (BLE) para transmitir mensajes o avisos directamente a un dispositivo móvil sin necesidad de una sincronización de los aparatos, la señal es captada por estos dispositivos y se transmite a menudo a un servidor en la nube a través de internet. El servidor de la nube procesa la información y lleva a cabo análisis más detallado para guiar los comportamientos basados en la localización específica del dispositivo móvil"
      },
      {
        title: "Arduino Bluno Nano",
        image: "http://www.avrcircuit.com/shop/img/p/2/8/5/285-large.jpg",
        description: "Tiene el tamaño de un chicle, el Bluno Nano es perfecto para proyectos BLE con espacio o peso limitado.La familia Bluno de DFRobot es la primera de su tipo en integrar el módulo BT 4.0 (BLE) en Arduino Uno, lo que la convierte en una plataforma ideal de creación de prototipos para que los desarrollos sean inalámbricos. Podrá desarrollar su propia pulsera inteligente, podómetro inteligente y más. A través de la tecnología Bluetooth 4.0 de baja potencia, la comunicación de baja energía en tiempo real se puede hacer realmente fácil."
      }
    ]
  }


  ionViewDidLoad() {
    this.feed.posts = this.posts;
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sharePost(post) {
    //this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share(post.description, post.title, post.image)
      .then(() => {
        console.log('Success!');
      })
      .catch(() => {
        console.log('Error');
      });
  }
}

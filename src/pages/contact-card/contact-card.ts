import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { ContactModel } from './contact.model';


@Component({
  selector: 'contact-card-page',
  templateUrl: 'contact-card.html'
})
export class ContactCardPage {
  contact: ContactModel = new ContactModel();

  constructor(
    public navCtrl: NavController,
    public callNumber: CallNumber,
    private emailComposer: EmailComposer,
    public inAppBrowser: InAppBrowser
  ) {
  }

  call(number: string){
    this.callNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  sendMail(){
    //for more option please go here: http://ionicframework.com/docs/native/email-composer/
     let email = {
      to: 'arduinodayperu@gmail.com',
      subject: '',
      body: ""
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }


  openInAppBrowser(website: string){
    this.inAppBrowser.create(website, '_blank', "location=yes");
  }

  openLinkUnmsm(){
    this.inAppBrowser.create("http://www.unmsm.edu.pe/", '_blank', "location=yes");    
  }

  openLinkFisi(){
    this.inAppBrowser.create("http://sistemas.unmsm.edu.pe/", '_blank', "location=yes");    
  }
}

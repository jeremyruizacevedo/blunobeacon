import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';

@Component({
  selector: 'form-layout-page',
  templateUrl: 'form-layout.html'
})
export class FormLayoutPage {
  section: string;

  post_form: any;
  event_form: FormGroup;
  card_form: FormGroup;

  categories_checkbox_open: boolean;
  categories_checkbox_result;

  commentsRef: AngularFireList<any>;
  comments: Observable<any[]>;

  author_image: string;
  author_name: string;
  date: Date;

  main_page: { component: any };
  loading: any;

  constructor(
    public nav: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    private toast: Toast,
    public facebookLoginService: FacebookLoginService,
    private nativeStorage: NativeStorage,
  ) {
    this.main_page = { component: FormLayoutPage };
    this.section = "qualify";
    this.date = new Date()

    this.nativeStorage.getItem("author_image").then(
      image => this.author_image = image,
      error => console.log('error get image nativeStorage')
    )

    this.nativeStorage.getItem("author_name").then(
      name => this.author_name = name,
      error => console.log('error get name nativeStorage')
    )

    this.post_form = new FormGroup({
      author_image: new FormControl(this.author_image),
      author_name: new FormControl(this.author_name),
      rate: new FormControl(5, Validators.required),
      comment: new FormControl('', Validators.required),
      date: new FormControl(this.date.toLocaleString())
    });
    this.commentsRef = this.database.list('comments');
    this.comments = this.commentsRef.snapshotChanges()
      .map(changes => {
        console.log(changes)
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  ionViewWillEnter() {

  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  doFacebookLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    let env = this;

    this.facebookLoginService.getFacebookUser()
      .then(function (data) {
        // user is previously logged with FB and we have his data we will let him access the app
        env.nav.setRoot(env.main_page.component);
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.facebookLoginService.doFacebookLogin()
          .then((res) => {
            env.nativeStorage.setItem("author_image", res.image)
            env.nativeStorage.setItem("author_name", res.name)
            env.loading.dismiss();
            env.nav.setRoot(env.main_page.component);
          }, (err) => {
            console.log("Facebook Login error", err);
          });
      });
  }

  createPost() {
    this.nativeStorage.getItem("author_image").then(
      image => {
        this.post_form.value.author_image = image
        this.nativeStorage.getItem("author_name").then(
          name => {
            this.post_form.value.author_name = name
            this.commentsRef.push(this.post_form.value);
            this.toast.show("Gracias por calificarnos", '5000', 'bottom').subscribe(
              toast => {
              }
            );
          },
          error => {
            this.post_form.value.author_name = "Usuario"
            this.commentsRef.push(this.post_form.value);
            this.toast.show("Gracias por calificarnos", '5000', 'bottom').subscribe(
              toast => {
              }
            );
          }
        )
      },
      error => {
        this.post_form.value.author_image = "https://icon-icons.com/icons2/67/PNG/512/user_13230.png"
        this.nativeStorage.getItem("author_name").then(
          name => {
            this.post_form.value.author_name = name
            this.commentsRef.push(this.post_form.value);
            this.toast.show("Gracias por calificarnos", '5000', 'bottom').subscribe(
              toast => {
              }
            );
          },
          error => {
            this.post_form.value.author_name = "Usuario"
            this.commentsRef.push(this.post_form.value);
            this.toast.show("Gracias por calificarnos", '5000', 'bottom').subscribe(
              toast => {
              }
            );
          }
        )
      }
    )
  }

}

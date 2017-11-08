import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { FormLayoutPage } from '../form-layout/form-layout';
import { ContactCardPage } from '../contact-card/contact-card';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = FeedPage;
    this.tab2Root = FormLayoutPage;
    this.tab3Root = ContactCardPage;
  }
}

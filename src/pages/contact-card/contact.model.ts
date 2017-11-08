export class ContactModel {
	images: Array<string> = [];
	name: string;
	rating: number;
	email: string;
	phone: string;
	annex: string;
  website: string;
  address: string;

	constructor() {
    this.images = [
			'./assets/images/contacts/image1.png',
			'./assets/images/contacts/image2.png',
			'./assets/images/contacts/image3.png',
			'./assets/images/contacts/image4.png'
		];
		this.name = "NIIT Robótica e Internet de las Cosas";
		this.rating = 5;
		this.email = "arduinodayperu@gmail.com";
		this.phone = "016197000";
		this.annex = "3604"
	  this.website = "https://jguerra91.wixsite.com/niitroboticaiot";
	  this.address = "Of 302 Pabellon FISI UNMSM Lima, Perú";
  }
}

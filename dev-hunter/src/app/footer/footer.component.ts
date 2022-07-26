import { Component} from '@angular/core';
import { faFacebookF, faInstagram, faTwitter, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faGooglePlusG = faGooglePlusG;
  faLinkedinIn = faLinkedinIn;

}

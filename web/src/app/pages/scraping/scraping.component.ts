import { Component } from '@angular/core';
import { ScrapingService } from 'src/app/services/scraping.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-scraping',
  templateUrl: './scraping.component.html',
  styleUrls: ['./scraping.component.scss', '../../styles/general.scss']
})
export class ScrapingComponent {

  constructor(private scraping_service: ScrapingService) { }

  async on_export(type: string) {
    try {
      const data = await this.scraping_service.export_careers_open_ai(type);
      if (!data) return;

      saveAs(data, `careers_open_ai.${type}`)

    } catch (e) {
      console.log(e);
    }
  }
}
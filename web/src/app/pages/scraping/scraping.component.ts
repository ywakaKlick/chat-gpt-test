import { Component } from '@angular/core';
import { ScrapingService } from 'src/app/services/scraping.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scraping',
  templateUrl: './scraping.component.html',
  styleUrls: ['./scraping.component.scss', '../../styles/general.scss']
})
export class ScrapingComponent {

  constructor(private scraping_service: ScrapingService, private snackbar: MatSnackBar) { }

  async on_export_careers(type: string) {
    try {
      const data = await this.scraping_service.export_careers_open_ai(type);
      if (!data) return;

      saveAs(data, `careers_open_ai.${type}`)
      this.snackbar.open('Successfully exported!', undefined, { duration: 3000 })
    } catch (e) {
      console.log(e);
      this.snackbar.open('An error occurred while exporting', undefined, { duration: 3000 })
    }
  }

  async on_export_research_index(type: string) {
    try {
      const data = await this.scraping_service.export_research_index(type);
      if (!data) return;

      saveAs(data, `research.${type}`)
      this.snackbar.open('Successfully exported!', undefined, { duration: 3000 })
    } catch (e) {
      console.log(e);
      this.snackbar.open('An error occurred while exporting', undefined, { duration: 3000 })
    }
  }

  async on_export_blog(type: string) {
    try {
      const data = await this.scraping_service.export_blog(type);
      if (!data) return;

      saveAs(data, `blog.${type}`)
      this.snackbar.open('Successfully exported!', undefined, { duration: 3000 })
    } catch (e) {
      console.log(e);
      this.snackbar.open('An error occurred while exporting', undefined, { duration: 3000 })
    }
  }
}

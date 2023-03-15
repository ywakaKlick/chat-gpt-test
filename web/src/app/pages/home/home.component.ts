import { Component } from '@angular/core';
import { ChatGptService } from 'src/app/services/chat-gpt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ScrapingService } from 'src/app/services/scraping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles/general.scss']
})
export class HomeComponent {
  response: string = "";
  question: string = "";

  form_group: FormGroup = new FormGroup({
    input_question: new FormControl('', [Validators.required]),
  });

  constructor(private chatGptService: ChatGptService, private favorite_service: FavoriteService, private scraping_service: ScrapingService) { }

  async ngOnInit(): Promise<void> {

  }

  async on_send() {
    this.question = this.form_group.get('input_question')?.value;
    this.response = await this.chatGptService.send_message(this.question);
  }

  async on_save() {
    try {
      await this.favorite_service.save_favorite(this.question, this.response);
    } catch (e) {
      console.log(e);
    }
  }
}

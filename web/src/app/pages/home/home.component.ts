import { Component } from '@angular/core';
import { ChatGptService } from 'src/app/services/chat-gpt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private chatGptService: ChatGptService, private favorite_service: FavoriteService, private snackbar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {

  }

  async on_send() {
    this.question = this.form_group.get('input_question')?.value;
    this.response = await this.chatGptService.send_message(this.question);
    console.log(this.response)
  }

  async on_save() {
    try {
      await this.favorite_service.save_favorite(this.question, this.response);
      this.snackbar.open('Successfully saved to your favorite!', undefined, { duration: 3000 })
    } catch (e) {
      console.log(e);
      this.snackbar.open('An error occurred saving to favorite', undefined, { duration: 3000 })
    }
  }

  on_clear() {
    this.form_group.get('input_question')?.setValue("");
    this.question = "";
    this.response = "";
  }
}

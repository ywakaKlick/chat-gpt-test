import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

const configuration = new Configuration({
  apiKey: environment.apiKey,
});
const openai = new OpenAIApi(configuration);

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  constructor() { }

  public async send_message(message: string) {
    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 1000,
      temperature: 0.5,
    });
    return response.data.choices[0].text;
  }
}

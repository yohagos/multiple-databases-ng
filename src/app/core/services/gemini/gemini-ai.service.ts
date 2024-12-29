import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiAiService {
  private _apiKey = environment.API_KEY

  private _geminiResponseSubject = new BehaviorSubject<string>('')
  public geminiResponse$ = this._geminiResponseSubject.asObservable()


  async helpWithTicketDescription(
    ticketDescription: string,
    ticketName: string,
    projectName: string,
    projectDescription: string
  ) {
    const genAi = new GoogleGenerativeAI(this._apiKey);
    const generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        }
      ],
      maxOutputToken: 100,
    }

    const model = genAi.getGenerativeModel({
      model: 'gemini-pro',
      ...generationConfig
    })

    const prompt =
    `Can you please help me write a Ticket Description? Depending on the provided Informations:
      Project Name "${projectName}", Project Description "${projectDescription}", TicketName "${ticketName}" and
      the Ticket Description "${ticketDescription}" so far. You do not have to Include the informations I provided in your response, thanks!`
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  }

  async helpWithProjectDescription(
    projectName: string,
    customerName: string,
    projectDescription: string,
  ) {
    const genAi = new GoogleGenerativeAI(this._apiKey);
    const generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        }
      ],
      maxOutputToken: 100,
    }

    const model = genAi.getGenerativeModel({
      model: 'gemini-pro',
      ...generationConfig
    })

    const prompt =
    `Can you please help me write a Project Description? Depending on the provided Informations:
      Project Name "${projectName}", Customer Name "${customerName}" and Project Description "${projectDescription}" so far.
      You do not have to Include the informations I provided in your response, thanks!`
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  }
}

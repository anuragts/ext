import axios from "axios";
import { openAi } from "./config/openAi.config";

interface Diagnostic {
  message: string;
}

export default async function getDetails(err:Diagnostic[],language:string,code:string) {

  console.log(err);

  if(!code){
    return 'No code found'
  }

  if(!err){
    return 'No error found'
  }

  const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt:
      `You are an AI which explains what is wrong with his code , generally i'll provide the lanuage also .\nand also suggest how to resolve it.\n\nhere is example response\n\ncode - \nlanguage - typescript\n\nconst hello:number = 'main';\n\nconsole.log(hello);\n\nresponse - \nThis code is incorrect because the variable hello is declared as a number data type, but it is assigned a string value. To fix this, you should change the data type of the variable hello to a string, such as: const hello:string = 'main'.\n\n\ncode - ${code} \n language - ${language}\n here is the error ${err}\n\nresponse -  `,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text;

}

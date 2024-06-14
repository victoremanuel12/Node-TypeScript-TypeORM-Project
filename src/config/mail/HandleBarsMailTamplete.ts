import handlebars from "handlebars";
import fs from "fs";
interface ITamplateVarieble {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  file: string;
  variebles: ITamplateVarieble;
}
 export default class HandlebarsMailTemplate {
  public async parse({file , variebles} : IParseMailTemplate): Promise<string>{
    const templateFileContent = await fs.promises.readFile(file,{encoding: 'utf8'});
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variebles);
  }
}
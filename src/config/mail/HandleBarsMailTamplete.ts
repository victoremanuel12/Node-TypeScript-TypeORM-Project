import handlebars from "handlebars";
interface ITamplateVarieble {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variebles: ITamplateVarieble;
}
 export default class HandlebarsMailTemplate {
  public async parse({template , variebles} : IParseMailTemplate): Promise<string>{
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variebles);
  }
}
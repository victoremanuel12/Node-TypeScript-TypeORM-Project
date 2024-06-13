import handlebars from "handlebars";
interface ITamplateVarieble {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variebles: ITamplateVarieble;
}
 class HandlebarsMailTemplate {
  public async parse({template , variebles} : IParseMailTemplate): Promise<string>{
    return ''
  }
}
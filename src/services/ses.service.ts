import AWS, { SES } from 'aws-sdk';
import config from '../config';

export class SesService {
  private ses: SES;

  constructor() {
    AWS.config.update({
      credentials: new AWS.Credentials({
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
      }),
      region: config.awsSesRegion,
    });

    this.ses = new AWS.SES();
  }

  async listTemplates(): Promise<string[]> {
    const res = await this.ses.listTemplates().promise();

    if (res.TemplatesMetadata && res.TemplatesMetadata.length) {
      return res.TemplatesMetadata.map((t) => t.Name!);
    }
    return [];
  }

  async getTemplate(name: string): Promise<SES.Template> {
    const res = await this.ses.getTemplate({ TemplateName: name }).promise();

    if (res.Template) {
      return res.Template;
    }
    throw new Error(`Template ${name} does not exist.`);
  }

  async deleteTemplate(name: string): Promise<{ message: string }> {
    await this.ses.deleteTemplate({ TemplateName: name }).promise();
    return { message: `Template ${name} deleted` };
  }

  async createTemplate(template: SES.CreateTemplateRequest): Promise<{ message: string }> {
    await this.ses.createTemplate(template).promise();
    return { message: `Template ${template.Template.TemplateName} created` };
  }

  async updateTemplate(template: SES.CreateTemplateRequest): Promise<{ message: string }> {
    await this.ses.updateTemplate(template).promise();
    return { message: `Template ${template.Template.TemplateName} updated` };
  }
}

export default new SesService();

import util from 'util';
import rimraf from 'rimraf';
import req from 'supertest';
import liveServer, { LiveServerParams } from 'live-server';
import { flatten } from 'lodash';
import { CliFactory } from './cli';
import { serverParams } from '../src/commands/start';
import { spawnPublic } from '../src/lib/spawnPublic';
import { PUBLIC_DIR } from '../src/utils/constants';
import sesService from '../src/services/ses.service';
import { testTemplate } from './__fixtures__/template';
import { readTemplateFiles } from './lib/readTemplateFiles';
import { listItem } from './templates';
import { ErrorCode } from './utils/error';

/*----------  Test Helpers  ----------*/

// Mock SES service
jest.mock(
  '../src/services/ses.service',
  jest.fn().mockImplementation(() => ({
    listTemplates: () => Promise.resolve([testTemplate.TemplateName]),
    getTemplate: () => Promise.resolve(testTemplate),
    deleteTemplate: () =>
      Promise.resolve({ message: `Template ${testTemplate.TemplateName} deleted` }),
    createTemplate: () =>
      Promise.resolve({ message: `Template ${testTemplate.TemplateName} created` }),
    updateTemplate: () =>
      Promise.resolve({ message: `Template ${testTemplate.TemplateName} updated` }),
  }))
);

/**
 * Checks the value `process.stdout.write` is called with for a matching string.
 *
 * @param writeSpy The `process.stdout.write` jest spy instance
 * @param str The string to find
 */
const findInStdout = (writeSpy: jest.SpyInstance, str: string): boolean =>
  flatten<string>(writeSpy.mock.calls)
    .filter((v) => typeof v === 'string')
    .some((v) => v.includes(str));

/**
 * The test server params.
 */
const testServerParams: LiveServerParams = { ...serverParams, logLevel: 0 };

/**
 * The supertest request function.
 */
const request = req(`http://localhost:${testServerParams.port}`);

/**
 * The time in ms to wait for the test server to shut down.
 */
const SHUTDOWN_TIMEOUT = 5000;

/*----------  Begin Tests  ----------*/

describe('command line usage', () => {
  let cli: CliFactory;
  let writeSpy: jest.SpyInstance;

  beforeAll(() => {
    // Bootstrap cli
    cli = new CliFactory(sesService);

    // Start test server
    liveServer.start(testServerParams);
  });

  beforeEach(async () => {
    // Spawn new public dir
    const rm = util.promisify(rimraf);
    await rm(PUBLIC_DIR);
    await spawnPublic();

    // Spy on stdout
    writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation((() => {}) as any);
  });

  afterEach(() => {
    writeSpy.mockClear();
  });

  afterAll(async () => {
    // Wait for test server to shutdown
    await new Promise((resolve) =>
      setTimeout(() => {
        liveServer.shutdown();
        resolve();
      }, SHUTDOWN_TIMEOUT)
    );
  }, SHUTDOWN_TIMEOUT);

  /*----------  List  ----------*/

  describe('list', () => {
    it('should list all templates', async () => {
      await cli.run('npx ses-templates list');
      expect(findInStdout(writeSpy, testTemplate.TemplateName)).toBeTruthy();
    });
  });

  /*----------  Create  ----------*/

  describe('create', () => {
    it('should create a template', async () => {
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates create ${testTemplate.TemplateName}`);

      // stdout should indicate creation was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Template created successfully!`)
      ).toBeTruthy();

      // Should be able to read template values
      const { Template } = await readTemplateFiles(testTemplate.TemplateName);
      expect(Template).toEqual(testTemplate);

      // Index should be updated with new item
      const { text } = await request.get('/').expect(200);
      expect(text.includes(listItem(testTemplate.TemplateName))).toBeTruthy();
    });

    it('should exit if template already exists', async () => {
      jest.spyOn(process, 'exit').mockImplementationOnce((() => {}) as any);
      await cli.run(`npx ses-templates create ${testTemplate.TemplateName}`);

      // stdout should indicate template already exists
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Template already exists`)
      ).toBeTruthy();

      expect(process.exit).toHaveBeenCalledWith(ErrorCode.CONFLICT);
    });
  });

  /*----------  Push  ----------*/

  describe('push', () => {
    it('should push a template that does not exist', async () => {
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates create ${testTemplate.TemplateName}`);

      await cli.run(`npx ses-templates push ${testTemplate.TemplateName}`);

      // stdout should indicate push was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Pushed to SES successfully!`)
      ).toBeTruthy();
    });

    it('should push a template that already exists', async () => {
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates create ${testTemplate.TemplateName}`);

      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates push ${testTemplate.TemplateName}`);

      // stdout should indicate push was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Pushed to SES successfully!`)
      ).toBeTruthy();
    });

    it('should push all templates', async () => {
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates create ${testTemplate.TemplateName}`);

      await cli.run('npx ses-templates push');

      // stdout should indicate push was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Pushed to SES successfully!`)
      ).toBeTruthy();
    });
  });

  /*----------  Pull  ----------*/

  describe('pull', () => {
    it('should pull a template', async () => {
      await cli.run(`npx ses-templates pull ${testTemplate.TemplateName}`);

      // stdout should indicate pull was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Pulled from SES successfully!`)
      ).toBeTruthy();

      // Should be able to read template values
      const { Template } = await readTemplateFiles(testTemplate.TemplateName);
      expect(Template).toEqual(testTemplate);

      // Index should be updated with new item
      const { text } = await request.get('/').expect(200);
      expect(text.includes(listItem(testTemplate.TemplateName))).toBeTruthy();
    });

    it('should exit if template does not exist', async () => {
      jest.spyOn(process, 'exit').mockImplementationOnce((() => {}) as any);
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));

      await cli.run(`npx ses-templates pull ${testTemplate.TemplateName}`);

      expect(process.exit).toHaveBeenCalledWith(ErrorCode.NOT_FOUND);
    });

    it('should pull all templates', async () => {
      await cli.run('npx ses-templates pull');

      // stdout should indicate pull was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Pulled from SES successfully!`)
      ).toBeTruthy();

      // Should be able to read template values
      const { Template } = await readTemplateFiles(testTemplate.TemplateName);
      expect(Template).toEqual(testTemplate);

      // Index should be updated with new item
      const { text } = await request.get('/').expect(200);
      expect(text.includes(listItem(testTemplate.TemplateName))).toBeTruthy();
    });
  });

  /*----------  Delete  ----------*/

  describe('delete', () => {
    it('should delete a template', async () => {
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates create ${testTemplate.TemplateName}`);

      await cli.run(`npx ses-templates delete ${testTemplate.TemplateName}`);

      // stdout should indicate deletion was successful
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Template deleted successfully!`)
      ).toBeTruthy();

      // Item should be removed from index
      const { text } = await request.get('/').expect(200);
      expect(text.includes(listItem(testTemplate.TemplateName))).toBeFalsy();
    });

    it('should log template not found in SES', async () => {
      jest.spyOn(sesService, 'getTemplate').mockRejectedValueOnce(new Error('does not exist'));
      await cli.run(`npx ses-templates delete ${testTemplate.TemplateName}`);

      // stdout should indicate template not found
      expect(
        findInStdout(writeSpy, `${testTemplate.TemplateName}: Template not found in SES`)
      ).toBeTruthy();
    });
  });
});

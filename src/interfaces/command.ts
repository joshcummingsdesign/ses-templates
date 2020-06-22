import { Command } from 'commander';
import { SesService } from '../services/ses.service';

export type CliCommand = (cli: Command, ses: SesService) => void;

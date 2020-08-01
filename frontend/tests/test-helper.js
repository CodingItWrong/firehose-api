import Application from 'firehose/app';
import config from 'firehose/config/environment';
import { setApplication } from '@ember/test-helpers';

setApplication(Application.create(config.APP));

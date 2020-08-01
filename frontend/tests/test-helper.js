import Application from 'firehose/app'
import config from 'firehose/config/environment'
import { setApplication } from '@ember/test-helpers'
import { start } from 'ember-qunit'

setApplication(Application.create(config.APP))

start()

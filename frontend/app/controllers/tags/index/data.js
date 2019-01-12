import Controller from '@ember/controller'
import { sort } from '@ember-decorators/object/computed'

export default class TagsIndexController extends Controller {
  tagSorting = Object.freeze(['name'])

  @sort('model', 'tagSorting')
  sortedTags
}

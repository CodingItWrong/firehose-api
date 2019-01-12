import Route from '@ember/routing/route'

export default class ShowTagDataRoute extends Route {
  async model() {
    let { tag_name } = this.paramsFor('tags/show')
    console.log('finding', tag_name)
    const tags = await this.store.query('tag', {
      filter: { name: tag_name },
      include: 'bookmarks',
    })
    return tags.firstObject
  }
}

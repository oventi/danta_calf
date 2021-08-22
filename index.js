/*
 * danta calf 1.0 - danta starter project
 * danta uses esm (https://github.com/standard-things/esm) to support es6
 */

import danta from 'danta'

/*
 * must implement and export function get_data(stage)
 * stage can be eiher 'dev' or 'build'
 */
export async function get_data(stage) {
  /*
   * getting the da: danta has several data access (da) helpers
   * - simple http using got (https://github.com/sindresorhus/got)
   * - strapi via their content api (https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html)
   * - contentful using their library (https://github.com/contentful/contentful.js)
   */
  const http = danta.get_http_da() // using the simple http da

  /*
   * getting data: using an env value for the endpoint
   * the env values must be in a json file
   */
  const {data} = await http.get(`${process.env.DATA_ENDPOINT}/petitions/featured.json`).json()

  /*
   * transforming data before returning it
   * the return object will then be used to render the html pages
   */
  return {
    title: 'Help create a more just, fair and sustainable society',
    entries: data.map(({
      slug, image_url: thumbnail_url, additional_image_sizes_url: [{url: image_url}],
      title, what, signature_count, url
    }) => ({
      slug, title,

      // the petition's site does not provide images' alt text
      thumbnail: {url: thumbnail_url, title},
      image: {url: image_url, title},

      description: `
        ${what.replace(/\n/gi, '<br>')}
        <p class="signed">${signature_count} have signed</p>
      `,
      cta: {text: 'I will sign', url}
    }))
  }
}

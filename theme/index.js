import danta from 'danta'

export async function request(path, data) {
  const {entries, ...global} = data
  const is_home = path === '/'
  const template = is_home ? 'home' : 'entry'
  const page_data = is_home
    ? {title: 'danta', entries}
    : entries.find(e => path === `/${e.slug}`)

  if(!page_data) {
    return {content: `${path} not found`, status: 404}
  }

  return {content: danta.render(template, {global, ...page_data})}
}

export async function build(data) {
  const {entries, ...global} = data

  // build home
  await danta.build('index.html', 'home', {global, title: 'danta', entries})

  // build entry pages
  for(const entry of entries) {
    await danta.build(`${entry.slug}.html`, 'entry', {global, ...entry})
  }
}

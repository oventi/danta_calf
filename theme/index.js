import danta from 'danta'

export async function request(path, data) {
  const {entries, ...global} = data
  const is_home = path === '/'
  const template = is_home ? 'home' : 'entry'

  const page = is_home
    ? {title: 'danta', entries}
    : entries.find(p => path === `/${p.slug}`)

  if(!page) {
    return {content: `${path} not found`, status: 404}
  }

  return {content: danta.render(template, {global, ...page})}
}

export async function build(project_name, templates, base_data) {
}

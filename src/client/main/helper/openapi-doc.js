const premitive = ['string', 'integer', 'boolean', 'long', 'double']
const premitiveValue = {
  string: 'string',
  integer: 0,
  boolean: false,
  long: 0,
  double: 0,
}
const objectConstructor = (property, definitions) => {
  if ('type' in property) {
    if (property.type === 'object') {
      const classObj = {}
      if ('additionalProperties' in property) {
        classObj.MapKey = objectConstructor(property.additionalProperties, definitions )
      }
      for (let prop in property.properties || {}) {
        classObj[prop] = objectConstructor(property.properties[prop], definitions )
      }
      return classObj
    } else if (premitive.includes(property.type)) {
      return premitiveValue[property.type]
    } else if (property.type === 'array') {
      return [ objectConstructor(property.items, definitions) ]
    }
  } if ('$ref' in property) {
    return definitions[property.$ref.split('/')[3]] ? objectConstructor(definitions[property.$ref.split('/')[3]], definitions) : {}
  }
}

const parameterFormatter = (parameter) => {
  const obj = {}
  obj.name = parameter.name
  obj.description = parameter.description
  obj.required = parameter.required
  obj.hasOptions = 'enum' in parameter.schema
  if (obj.hasOptions) {
    obj.options = parameter.schema.enum
  }
  obj.type = parameter.schema.type
  obj.value = parameter.default || ''
  return obj
}

const apiConstructor = (path, method, data) => {
  const apiObject = data.paths[path][method]
  const resObj = {}
  resObj.path = path
  resObj.method = method
  resObj.summary = apiObject.summary || ''
  resObj.description = apiObject.description || ''
  resObj.consumes = apiObject.consumes  || []
  resObj.produces = apiObject.produces || []
  apiObject.parameters = apiObject.parameters || []
  resObj.pathParam = apiObject.parameters.filter(parameter => parameter.in === 'path').map(parameterFormatter)
  resObj.query = apiObject.parameters.filter(parameter => parameter.in === 'query').map(parameterFormatter)
  resObj.header = apiObject.parameters.filter(parameter => parameter.in === 'header').map(parameterFormatter)
  if (resObj.method !== 'get' && apiObject.requestBody ) {
    console.log(apiObject)
    Object.keys(apiObject.requestBody.content).forEach(e => {
      resObj.consumes.push(e)
      resObj.body = objectConstructor(apiObject.requestBody.content[e].schema, data.components.schemas)
    })
  }
  Object.keys(apiObject.responses).forEach(status => {
    if (apiObject.responses[status].content) {
      Object.keys(apiObject.responses[status].content).forEach(e => {
        resObj.produces.push(e)
        resObj.response = objectConstructor(apiObject.responses[status].content[e].schema, data.components.schemas)
      })
    }
  })
  return resObj
}


const openApiDocFormatter = (data) => {
  let controllers = {};
  const url = new URL(data.servers[0].url)

  let tags = []

  for (const path in data.paths || {}) {
    for (const method in data.paths[path] || {}) {
      tags = [...tags, ...data.paths[path][method].tags]
    }
  }

  tags = [...new Set(tags)]

  tags.forEach(e => {
    controllers[e] = {name: e, description: e , apis: []}
  })

  Object.keys(data.paths).forEach(path => {
    const pathConfig = data.paths[path]
    Object.keys(pathConfig).forEach(method => {
      pathConfig[method].tags.forEach(tag => {
        controllers[tag].apis.push(apiConstructor(path, method, data, url))
      })
    })
  })

  return {
    host: url.host,
    basePath: url.pathname,
    info: data.info,
    swagger: data.openapi,
    controllers
  }
}

export default openApiDocFormatter

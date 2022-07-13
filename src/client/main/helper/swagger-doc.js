/* eslint-disable no-unused-vars */
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
    return definitions[property.$ref.split('/')[2]] ? objectConstructor(definitions[property.$ref.split('/')[2]], definitions) : {}
  }
}

const parameterFormatter = (parameter) => {
  const obj = {}
  obj.name = parameter.name
  obj.description = parameter.description
  obj.required = parameter.required
  obj.hasOptions = 'enum' in parameter
  if (obj.hasOptions) {
    obj.options = parameter.enum
  }
  obj.type = parameter.type
  obj.value = parameter.default || ''
  return obj
}

const apiConstructor = (path, method, data) => {
  const apiObject = data.paths[path][method]
  const resObj = {}
  resObj.path = path
  resObj.method = method
  resObj.summary = apiObject.summary
  resObj.description = apiObject.description
  resObj.consumes = apiObject.consumes
  resObj.produces = apiObject.produces
  apiObject.parameters = apiObject.parameters || []
  resObj.pathParam = apiObject.parameters.filter(parameter => parameter.in === 'path').map(parameterFormatter)
  resObj.query = apiObject.parameters.filter(parameter => parameter.in === 'query').map(parameterFormatter)
  resObj.header = apiObject.parameters.filter(parameter => parameter.in === 'header').map(parameterFormatter)
  if (resObj.method !== 'get') {
    resObj.body = apiObject.parameters.filter(parameter => parameter.in === 'body')
    if (resObj.body.length) {
      resObj.body = objectConstructor(resObj.body[0].schema, data.definitions)
    }
  }
  Object.keys(apiObject.responses).forEach(status => {
    if ('schema' in apiObject.responses[status]) {
      resObj.response = objectConstructor(apiObject.responses[status].schema, data.definitions)
    }
  })
  return resObj
}

const swaggerDocFormatter = (data) => {
  let controllers = {}

  data.tags.forEach(e => {
    controllers[e.name] = {...e, apis: []}
  })

  Object.keys(data.paths).forEach(path => {
    const pathConfig = data.paths[path]
    Object.keys(pathConfig).forEach(method => {
      pathConfig[method].tags.forEach(tag => {
        controllers[tag].apis.push(apiConstructor(path, method, data))
      })
    })
  })

  return {
    host: data.host,
    basePath: data.basePath,
    info: data.info,
    swagger: data.swagger,
    controllers
  }
}

export default swaggerDocFormatter
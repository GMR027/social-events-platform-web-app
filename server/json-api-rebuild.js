/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const assignObject = ( object, included ) => {
  const id = object.id;
  const type = object.type;
  for (const i of included) {
    if ( id === i.id && type === i.type ) return i;
  }
  return object;
};

const checkObject = ( element, included) => {
  if ( !included ) return element;
  if ( Array.isArray(element.data) ) {
    for (let j = 0; j < element.data.length; j++) {
      element.data[j] = assignObject(element.data[j], included);
      if ( element.data[j].relationships ) {
        element.data[j].relationships = rebuildObject(element.data[j].relationships, included);
      }
    }
  } else {
    element.data = assignObject(element.data, included);
    if ( element.data.relationships ) {
      element.data.relationships = rebuildObject(element.data.relationships, included);
    }
  }
  return element;
};

const rebuildObject = ( relationships, included ) => {
  for (const i in relationships) {
    if (Object.prototype.hasOwnProperty.call(relationships, i)) {
      relationships[i] = checkObject(relationships[i], included);
    }
  }
  return relationships;
};

const rebuildData = ( d ) => {
  const data = { ...d };
  const included = data.included;
  if ( Array.isArray(data.data) ) {
    for (let i = 0; i < data.data.length; i++) {
      data.data[i].relationships = rebuildObject(data.data[i].relationships, included);
    }
  }
  data.data.relationships = rebuildObject(data.data.relationships, included);
  return data;
};

module.exports = rebuildData;

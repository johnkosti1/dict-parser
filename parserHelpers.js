
function getDict(doc) {
  const d = doc || document;
  return Array.from(d.querySelectorAll('.dictentry'))
}

function getHead(doc) {
  const d = doc || document;
  return d.querySelector('.ldoceEntry.Entry')
}

function getMainInfo(doc) {
  const headEntry = getHead(doc);
  
  // console.log('ddddi', headEntry.querySelectorAll('.defRef'))
  
  const result = {
    hyphenation: headEntry?.querySelector('.HYPHENATION')?.innerText.trim() || '',
    pronCodes: headEntry?.querySelector('.PronCodes')?.innerText.trim() || '',
    ukVoice: headEntry.querySelector('.speaker.brefile')?.getAttribute('data-src-mp3'),
    usVoice: headEntry.querySelector('.speaker.amefile')?.getAttribute('data-src-mp3'),
    inflections: getInflections(headEntry),
    variants: getVariants(headEntry),
    freq: [],
    pos: [],
  }
  
  headEntry?.querySelectorAll('.Head .POS').forEach(item => {
    result.pos.push(item.textContent.replace(/[^a-zA-Z0-9/-]+/, ''))
  })
  
  headEntry?.querySelectorAll('.FREQ').forEach(item => {
    result.freq.push({
      title: item.getAttribute('title').trim(),
      value: item.textContent.trim()
    })
  })
  
  return result;
}

function getExamples(doc) {
  const d = doc || document;
  const result = [];
  const firstDict = d.querySelector('.ldoceEntry.Entry');
  const senses = firstDict.querySelectorAll('.Sense');
  
  // console.log('sssssss', Array.from(firstDict.querySelectorAll('.Sense .defRef')).map(item => item.getAttribute('title')))
  
  senses.forEach(item => {
    const subSenses = item.querySelectorAll('.Subsense');
    if (subSenses.length) {
      const signPost = item.querySelector('.SIGNPOST')?.textContent?.trim();
      const subSensesResult = {
        signPost,
        subSenses: []
      }
      subSenses.forEach(sub => {
        const text = sub.querySelector('.DEF')?.textContent?.trim();
        if (text) {
          const res = {
            text,
            allExamples: getExampleData(getExampleElements(sub, true)),
            // mainExamples: getExampleData(getExampleElements(sub)),
            // examplesG: Array.from(sub.querySelectorAll('.GramExa')).map(item => ({
            //   text: item.querySelector('.PROPFORM')?.textContent?.trim(),
            //   items: getExampleData(getExampleElements(item))
            // })),
            // examplesC: Array.from(sub.querySelectorAll('.ColloExa')).map(item => ({
            //   text: item.querySelector('.COLLO')?.textContent?.trim(),
            //   items: getExampleData(getExampleElements(item))
            // })),
          };
          
          subSensesResult.subSenses.push(res)
        }
      })
      result.push(subSensesResult)
    } else {
      const text = item.querySelector('.DEF')?.textContent?.trim();
      const signPost = item.querySelector('.SIGNPOST')?.textContent?.trim();
      if (text) {
        const res = {
          text,
          signPost,
          allExamples: getExampleData(getExampleElements(item, true)),
          // mainExamples: getExampleData(getExampleElements(item)),
          // examplesG: Array.from(item.querySelectorAll('.GramExa')).map(item => ({
          //   text: item.querySelector('.PROPFORM')?.textContent?.trim(),
          //   items: getExampleData(getExampleElements(item))
          // })),
          // examplesC: Array.from(item.querySelectorAll('.ColloExa')).map(item => ({
          //   text: item.querySelector('.COLLO')?.textContent?.trim(),
          //   items: getExampleData(getExampleElements(item))
          // })),
        };
        
        result.push(res)
      }
    }
  })
  
  return result;
}

function getExampleElements(element, all = false) {
  return Array.from(element.querySelectorAll(`${all ? '' : ':scope > ' }.EXAMPLE`))
}

function getExampleData(examples) {
  return Array.from(examples).map(item => ({
    text: item.textContent.trim(),
    voice: item.querySelector('.speaker')?.getAttribute('data-src-mp3'),
  }));
}

function getInflections(element) {
  const inflections = element.querySelector('.Inflections');
  if (!inflections) {
    return {}
  }
  
  return {
    plural: getStrictText(inflections.querySelector('.PLURALFORM')),
    comparative: getStrictText(inflections.querySelector('.COMP')),
    superlative: getStrictText(inflections.querySelector('.SUPERL')),
  }
}

function getStrictText(element) {
  if (!element) {
    return ''
  }
  
  for(let i = 0; i < element.childNodes.length; ++i) {
    if (element.childNodes[i].nodeName === '#text') {
      return element.childNodes[i].textContent.trim()
    }
  }
  
  return '';
}

function selectVariants(element, type) {
  return Array.from(element.querySelectorAll(`.Head .Variant .${type}`))
}

function getVariants(element) {
  const types = ['ORTHVAR', 'LEXVAR']
  
  return types.map(type => selectVariants(element, type)
    .map(item => ({ type: type, value: item.textContent.trim() || ''})))
    .reduce((acc, curr) => [...acc, ...curr], [])
}

function getWholeDescription(doc) {
  return getDict(doc)
    .filter(item => getHead(item))
    .map(item => ({
      ...getMainInfo(item),
      examples: getExamples(item),
    }))
}

module.exports = getWholeDescription

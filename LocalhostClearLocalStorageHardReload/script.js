/* W E B   U T I L S */
const create = (type, parent = null, classNames = [], id = '', style = {}, events = [], attrs = {}) => {
	const element = document.createElement(type)
	if (classNames.length) classNames.forEach(className => element.classList.add(className))
	if (id !== '') element.id = id
	Object.keys(style).forEach(key => element.style[key] = style[key])
	events.forEach(e => {
		element.addEventListener(e.name, e.handler)
	})
	Object.keys(attrs).forEach(key => element[key] = attrs[key])
	if (parent != null) parent.appendChild(element)
	return element
}




/* C O M P O N E N T S */
const Button = (parent, backgroundColor, color, iconsClasses, title, callback) => {
  const element = create('div', parent, [], '', {
    width: '50px', height: '50px',
    backgroundColor: backgroundColor, color: color, borderRadius: '50px', cursor: 'pointer',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    position: 'relative',
    overflow: 'hidden',
    opacity: .2,
  }, [
    { name: 'click', handler: callback },
    { name: 'mouseenter', handler: (event) => {
      event.target.style.opacity = 1
    }},
    { name: 'mouseleave', handler: (event) => {
      event.target.style.opacity = .2
    }}
  ], { title })
  iconsClasses.forEach(ic => create('span', element, ic, '', {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', top: '0', right: '0', bottom: '0', left: '0',
  }))

  return element
}

const ButtonContainer = (parent) => create('div', parent, [], '', {
  minWidth: '50px', minHeight: '50px',
  padding: '20px 40px',
  position: 'fixed', top: 0, right: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '5px',
})




/* L O G I C */
const clear = () => {
  localStorage.clear()
}

const hardReload = () => {
  location.reload(1)
}





/* M A I N */
window.addEventListener('load', async () => {
  const buttonContainer = ButtonContainer(document.body)
  // HARD RELOAD BUTTON
  Button(
    buttonContainer,
    '#638dd6',
    '#fff',
    [['fa-solid', 'fa-rotate-left', 'fa-xl']],
    "Hard reload (removing cache)",
    hardReload
  )
  // CLEAR LOCALSTORAGE AND RELOAD BUTTON
  Button(
    buttonContainer,
    '#d66e63',
    '#fff',
    [['fa-solid', 'fa-rotate-left', 'fa-2x'], ['fa-solid', 'fa-xmark', 'fa-xs']],
    "Clear localStorage and hard reload",
    () => {
      clear()
      hardReload()
    }
  )
})

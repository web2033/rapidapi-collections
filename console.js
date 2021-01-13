// go to https://rapidapi.com/collection/recommended-apis and run this whole code in the console:

// 1. Parse
let links = [...document.querySelectorAll('div.scrolling.menu.transition a')]
let collection = links.filter((link) =>
  link.pathname.startsWith('/collection/')
)
let data = collection.map((link) => {
  return { href: link.href, text: link.text }
})

// 2. Put data in file and download
let a = document.createElement('a')
a.href = URL.createObjectURL(
  new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
)
a.setAttribute('download', 'data.json')
document.body.appendChild(a)
a.click()
document.body.removeChild(a)

// 3. Summary
console.log('Exported ' + data.length + ' links!')

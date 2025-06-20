Cypress.Commands.add('press', { prevSubject: true }, (subject, key) => {
  if (!key) throw new Error('You need to provide a key (e.g, .press("enter"))')

  // Deprecation warning
  Cypress.log({
    name: 'warn',
    displayName: 'warn',
    message: '⚠️ DEPRECATION WARNING: The "press" command will be deprecated in a future release. Consider using Cypress\'s native .type() command with key modifiers instead.',
    consoleProps: () => ({ Warning: 'The "press" command is deprecated' })
  })

  const log = Cypress.log({
    autoEnd: false,
    name: 'press',
    displayName: 'press',
    message: `pressing ${key}`,
    consoleProps: () => {
      return { Key: key }
    }
  })

  if (key === 'ctrl+a' || key === 'CTRL+A' || key === 'cmd+a' || key === 'CMD+A') {
    key = 'selectAll'
  }

  return cy.wrap(subject, { log: false })
    .then($el => {
      log.set({ $el }).snapshot('before')
    })
    .type(`{${key}}`, { log: false })
    .then($el => {
      log.set({ $el }).snapshot('after').end()
    })
})

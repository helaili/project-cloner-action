const core = require('@actions/core')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const template_owner = core.getInput('template_owner')
    const template_repo = core.getInput('template_repo')
    const template_project_number = parseInt(
      core.getInput('template_project_number')
    )
    const owner = core.getInput('owner')
    const repo = core.getInput('repo')
    const project = core.getInput('project')
    const token = core.getInput('token')

    const projectClonerModule = await import('@helaili/project-cloner')
    const projectCloner = new projectClonerModule.ProjectCloner(
      token,
      template_owner,
      template_repo,
      template_project_number,
      owner,
      repo,
      project
    )
    const projectMetadata = await projectCloner.clone()

    // Set outputs for other workflow steps to use
    core.setOutput('id', projectMetadata.id)
    core.setOutput('url', projectMetadata.url)
    core.setOutput('number', projectMetadata.number)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}

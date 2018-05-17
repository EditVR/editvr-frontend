## Git workflow

This project makes use of the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.

### Branch naming conventions

- `master` The master branch is for code ready to be released to the production environment.
- `develop` This branch is merged in to master when a release is ready to be deployed. It only contains code that has gone through peer review and is ready for PO review. At the the time of each release, the `develop` branch should be merged into `master` and a tag should be created with a proper release tag.
- `feature/{ticket-number}--{short-description}` Feature branches should branch from and merge back into the `develop` branch. They contain code that is currently in development. When a story/feature is complete, a pull request should be created merging the feature branch into the `develop` branch.
- `hotfix/{short-description}` Create a hotfix branch for quick fixes that need to bypass the `develop` branch and get merged directly into `master`. Hotfixes should only be when needed. Be sure your hotfixes are branched off of `master` and your PRs are set to merge back into `master`.

### Pull requests

Pull requests should be named with the full Jira ticket ID (if applicable) plus a brief description. Example:

> {ticket-number} - {short description}

The description should contain a link to the corresponding ticket.

Also include a brief description of what the pull request is doing if it is more involved than what can be adequately communicated in the title.

Lastly, include complete steps to functionally test the pull request.

You will be presented with a template containing these main components when you create a new PR.

### Assignment and acceptance

All pull requests need to go through a review process. When your pull request is ready to be reviewed, label it as `needs review`. If you know who should be reviewing it, go ahead and assign that person as well. If the reviewer has questions or encounters issues, they will leave comments, apply the appropriate labels and assign back to you. If your pull request receives both `passes code review` and `passes functional review` labels, it will be assigned back to you for you to merge into the sprint branch and delete the feature branch. Ultimately, you are the owner of your pull requests and it is up to you to see that they get reviewed and merged into the develop branch.

Label pull requests that are not ready for review as `work in progress`.

### Additional pull request best practices

- Generally, pull requests should resolve a single Jira ticket. Try to avoid combining multiple tickets into a single pull request. There may be instances where it makes sense to do otherwise but please use discretion.
- Try to keep pull requests reasonably small and discrete. Following the one pull request per ticket paradigm should accomplish this by default. However, if you are beginning to work on a story and it feels like it will result in a giant pull request with lots of custom code, changes across many features, and lots of testing scenarios, think about how you might break down the story into smaller subtasks that could be incrementally developed and tested. Create subtasks or potentially even new stories within Jira. If you are unsure about how or are unable to do this, please reach out to the project Tech Lead, Product Owner, or Project Manager.

## Coding standards

Coding standards will be rigorously enforced on this project. Please save everybody time by checking for common syntax errors in your custom code and fixing them before you send your pull request into review. This project has few npm scripts that, when run, will analyze the codebase and produce a report of all coding standards violations that should be corrected. These scripts will be executed prior to a commit being formed to ensure code committed to the project is correctly formed.

There are scripts included in this project to help check your custom code for common errors. From within the project you can run:

- `yarn lint` to lint all of your custom code.
- `yarn prettier` to automatically format your code.

## Commit message standards

This project makes use of the Commitizen commit convention, which is documented explicity in [Angular's contribution docs](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit). A simple commit validation precommit hook is in place to help facilitate the adoption of this convention.

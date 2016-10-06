# Git Workflow

This is the process I use for all my open-source projects to manage a clean tree.

## Feature Branches

We should perform all work on “feature branches”, which is to say that we should never do any work on the master branch. For each new task, we create a separate branch, especially if that amounts to multiple feature branches at a time.

We should be sure to keep all cloned master branches (both those on our local machine and those on GitHub) up to date with the current upstream master to ensure our code will fit in well with any changes that beat you to the proverbial punch.

With the exception of the feature or bug on which we are working, the tree should remain absolutely pristine with respect to master. That is, there should be no unrelated changes in our feature branch, including minor documentation errors or misspellings in comments on unrelated features. It’s great to catch and fix them, but they should be done in their own feature branch on their own pull request. Or we should open an issue for them.

## Pull Requests

When code is ready to be peer-reviewed, merged, or for some other reason presented, we should push our feature branch to our clone and open a pull request for that branch against the upstream master branch. Any further changes we make on that feature branch should, without exception, be in service of that pull request (e.g. incorporation of feedback).

When the pull request is opened, the continuous integration process will automatically be triggered and its results displayed in the body of the request. This may catch the occasional bug, but it is generally accepted that if our tests pass locally, they should pass in the cloud. We must be sure to test before submitting a pull request.

Along the same lines, each pull request must be accompanied by any tests and documentation necessary. If a new feature is added, it must be thoroughly unit tested and fully documented. We must make no changes to existing unit tests without adequate documentation for the change in order to ensure all code performs to the agreed spec, now and in the future.

Further, all code should be easy to read. We should avoid any stylistic or language features that make code more difficult to read. Where possible, our code changes should attempt to match the style of the code that surrounds it.

## Commit Messages

The commit message structure is stolen from a loving homage to the conventions used by Google and friends on their open-source libraries. In general, commits should follow the format below, and any line of the commit message should not be longer 100 characters to ensure readability in any git tool.

```
<type>(<scope>): <subject>

<body>

<footer>
```

The `type` must be one of the following:

* `feat`: a new feature
* `fix`: a bug fix
* `docs`: changes only to documentation
* `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `refactor`: a code change that neither fixes a bug nor adds a feature
* `perf`: a code change that improves performance
* `test`: adding missing tests
* `chore`: changes to the build process or auxiliary tools and libraries, such as documentation generation

The `scope` could be anything specifying place of the commit change. We will need to flesh this out as a team.

The `subject` contains a very succinct description of the change, written in the imperative, present tense. It should not be a complete sentence.

Just as in `subject`, the message `body` uses the imperative, present tense. For example, we should use “change” rather than “changed” or “changes”. We should also include the motivation for the change and contrast it with previous behavior.

The `footer` should note breaking changes and reference any issues that this commit addresses.

In addition, all breaking changes have to be mentioned in footer with the description of the change, justification, and migration notes. These are less common in an application than they are in a shared library, but this is the place to note where this change will cause an issue in another part of the broader system, including business process. For example, an API endpoint change will affect the frontend and is considered breaking. We should write breaking changes like this:

```
BREAKING CHANGE: this one thing was changed and this other thing was removed.

    This is a more detailed explanation of the change, including the rationale for making it.

    To migrate from the old to the new, the following process...
```

We should list any closed bugs on a seperate line in the footer prefixed with "Closes" keyword like this:

```
Closes #1234
```

Or, in case of multiple issues, like this:

```
Closes #123, #245, #992
```

GitHub will automatically close these issues when the pull request is merged to the `master` branch.

Here is an example of a commit message that incorporates some of these concepts:

```
feat(nav): add link to new user dashboard

Add link to the navbar's dropdown menu to the new dashboard (`/dashboard`).
Remove the link to the old settings (`/settings`) area. This is still accessbile
from the dashboard.

Closes #498
```

## Ensuring Valuable, Atomic Commits with `git rebase -i`

Before a pull request is merged, we must ensure that each commit in the pull request represents a single change that makes sense in the context of the commit history. Here are a few guidelines to keep in mind:

* Commits should be “atomic,” which is to say that a commit contains the smallest possible change that is self-sufficient.
* The commit does not depend on any future commits.
* A commit should cause no unit or E2E tests to fail.
* All changes should be adequately tested.
* The commit could, at any time, be pushed to production without negative side effects.
* Any extraneous commits (e.g. whitespace changes or incorporation of feedback) should be squashed with a more meaningful commit.

Following these guidelines (though there may occasionally be exceptions) ensures that the commit history is our changelog and that we can easily follow what happened when. We can also track back changes using [`git blame`](http://git-scm.com/docs/git-blame) to see who made which change when and why, and it will make it easier to locate from whence a bug came with [`git bisect`](http://git-scm.com/docs/git-bisect). To paraphrase Martha Stewart, it’s a good thing.

All that said, this doesn’t change how we work day-to-day. It will often be necessary to submit changes multiple times on a single pull request to respond to feedback from our peers. Before the code is merged, however, it may need to be rebased.

Rebasing allows us to change the existing commit history by replaying the existing commits in a customizable way (and, optionally, on a branch other than the one on which they were originally made). It can be a complicated topic, so only the most common scenario is discussed here: choosing which commits to keep for a pull request. Those curious should read some of the links included at the end of this document as they will greatly enhance one’s understanding of how directed acyclic graphs - and therefore git - works.

To contrive an example scenario, let’s say we are working on an issue/user story that involves creating a new API endpoint. Initially, we open a pull request with a few model unit tests that intentionally fail. After some feedback, we submit a new commit on the same feature branch that creates the model changes. Our third commit creates a controller and its associated tests. In the fourth, we incorporated some feedback and added a few unit tests. Then we add a route definition and its tests that ties everything together. Finally, we notice a little whitespace problem and fix it. Our pull request now represents six commits we want to merge to `master`:

```
commit 123
     Add tests for future user model changes

commit 456
     feat(users): Change model to support some new feature

commit 789
     feat(users): Add controller for user endpoint

commit 012
     Add tests to validate the null hypothesis

commit 345
     feat(users): Add route to direct GET to controller

commit 678
     Fix whitespace in users controller
```

These are not all atomic changes. Commits 123 and 456 should be the same, as should commits 789, 012, and 678 (even though it’s out of order). At the end of the day, we want three atomic commits in this contrived example - the model, the controller, and the route - because these are self-sufficient, atomic, and well-tested.

This complex change can be done using the `git rebase -i HEAD~6` command on our feature branch. The `-i` tells git to do the rebasing interactively, allowing us to make changes, while `HEAD~6` says to use the six most recent commits on the current branch (e.g. the six most recent commits you would see in `git log`). This will open your default editor with the following contents (notice they are in reverse order):

```
pick 678 Fix whitespace in users controller
pick 345 feat(users): Add route to direct GET to controller
pick 012 Add tests to validate the null hypothesis
pick 789 feat(users): Add controller for user endpoint
pick 456 feat(users): Change model to support some new feature
pick 123 Add tests for future user model changes

# Rebase 123..678 onto 123
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Here, git is giving us the opportunity to decide how to replay the commit history. By simply changing the word that prefixes each commit, we can decide what to do with the commits, including creating a new commit message. By default, all commits say “pick”, which means to replay it from bottom to top. Any commits we delete from this list will not be replayed, and will thus be forever lost. If we accidentally committed something to this branch unrelated to this feature (like a change to the `.gitignore`) we would want to remove it here so it would not become part of the final set of commits.

Keeping in mind the changes we want to make, we can write the rebasing instructions like this:

```
pick 345 feat(users): Add route to direct GET to controller
reword 678 Fix whitespace in users controller
squash 012 Add tests to validate the null hypothesis
squash 789 feat(users): Add controller for user endpoint
reword 456 feat(users): Change model to support some new feature
squash 123 Add tests for future user model changes
```

It looks like there is a lot going on here, but we really are only doing a couple of things. Starting at the bottom, we are saying to “squash” that commit into the one above it, whose commit message we want to “reword” to something else so that we can ensure it contains information from both commits, if necessary.

When we “reword” a commit message, once we save this file the standard git commit message prompt will open in our editor with all “squashed” commit messages (that is, the messages from 123 and 456), allowing us to write one that makes sense considering the additional changes we squashed. These are now one commit.

We are doing the same thing with commits 789, 012, and 678. Here, it is particularly important to re-word the commit message because the commit into which the other two are squashing is not even in the right format. Presumably, it also does not contain the required information in the body.

Lastly, we just “pick” commit 345 because it is just fine as it is.

After we save the file and edit the reworded commit messages one-by-one as git prompts us, our commit history through `git log` will look like this:

```
commit 456 feat(users): Change model to support some new feature
commit 678 feat(users): Add controller for user endpoint
commit 345 feat(users): Add route to direct GET to controller
```

This commit history is very easy to follow as each of the changes are atomic and self-sufficient - and we don’t have any extraneous information. It should be clear to anyone browsing the commit log what happened. Once the rebasing is complete, we can push our changes up to our feature branch.

And there was much rejoicing.

*Note:* we will have to pass the `--force` argument to `git push` because we are overwriting remote history; this is completely acceptable for a pull request, but should never be done to a branch on which others are working or both parties will encounter errors when they try to incorporate each other’s changes.

## Merging

When pull requests are ready to be merged, the “Merge” button on GitHub should ***never*** be used. It may work in some cases when no rebasing occurred, but it will often include a “Merge” commit log message, which pollutes the stream and violates the principles set out above. Changes should always be merged locally, re-tested, then pushed manually to `master`.

More tactically, in order to merge changes we use rebase again. Assuming our feature branch is called `users-endpoint`, we must check out `master`, ensure it’s up-to-date, rebase `users-endpoint` to it, confirm all is well, and then merge it on into `master`:

```
$ git checkout master
$ git pull
$ git checkout users-endpoint
$ git rebase master
$ # run your tests!
$ git checkout master
$ git merge users-endpoint
```

In this case, we’re doing the same thing as before, except we are replaying all commits from the master branch onto our feature branch so that: (1) everything is up to date and someone else didn’t submit a change that makes our feature no longer work; and (2) our branch will merge very cleanly into the master branch, without any of those “merge” commits. That is, when the last command is complete, git should tell you that it performed a *fast-forward* merge. If it does not, something has gone wrong because git did not simply replay the commits on top of master.

## External Resources

### Interactive Git Tools:

* [Code School - Try Git](https://try.github.io/)
* [Learn Git Branching](http://pcottle.github.io/learnGitBranching/)
* [Visualizing Git Concepts with D3](http://www.wei-wang.com/ExplainGitWithD3/
)

### Branching Workflows:

* [Git Branching - Branching Workflows](http://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
* [Git Workflows and Tutorials | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows)

### Rebasing:

* [Git Branching - Rebasing](http://git-scm.com/book/en/v2/Git-Branching-Rebasing)
* [docs: `git rebase`](http://git-scm.com/docs/git-rebase)
* [Git Tools - Rewriting History](http://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
* [Git Reference: Branching and Merging](http://gitref.org/branching/)
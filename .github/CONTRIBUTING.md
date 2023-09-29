# Welcome to the NoBox console contribution guide

Welcome. Thank you for considering contributing to the NoBox console. It’s people like you who make the NoBox console such a great tool, and NoBox cloud services promising.
Now that you intend to contribute, here's how we can help.

This document is to make the contribution process easy and effective for everyone involved.

Contributions involves finding and identifying bugs, fixing issues, suggesting and working on improvements, and more. Of course, we can't do it all ourselves, and thus welcome contributions.

Following these guidelines communicates that you respect the time of the developers managing and developing this project and in return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Getting started

This app is powered by NodeJs🌟, and developed in typescript

You'll need to have [the latest LTS version of NodeJs](https://nodejs.org/download).

You'll also need a package manager, either `npm` or `yarn`

Run this in your terminal to get the necessary tools if you don't have them

```bash
npm install --global yarn ts-node
```

Once that's ready, run the following in your terminal

```bash
git clone ...

cd ...

npm install
```

And that's all on getting started. run `ts-node index.ts` to run console.

<!-- Include app structure for file organization -->

## Issues

Issues are for tracking ideas, feedback, tasks, or bugs.

For efficient communication, you can @mention collaborators or maintainers to draw their attention.

[Read the doc](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) for more information.

> Adding labels to your created issue will help in many ways

### Create a new issue

If you spot a problem or find something to improve in the project, first search and confirm if it does not exist, if it does, you can join and address it, if it does not, you can open a new issue with the relevant [issue form](https://github.com/github/docs/issues/new/choose)

it's advisable to first open an issue, giving it a label that best fits your mode of contribution. This will help others know what you're doing and not repeat it, but probably join you, or motivate you, whatever the case may be. Reference [issues](#issues) to see notes on that.

When opening an Issue, you may want to check the following:

-[ ] Set a clear title for the idea, bug, or whatever you intend to communicate.
-[ ] Add a clear description of what it is about, and how it improves/resolves anything in the project
-[ ] Add a labels to your issue e.g *bug*, *documentation*, *enhancement*, *question*, etc. You can also create yours.
-[ ] If there is a pull request that relates to an issue, do well to update the issue and reference the pull request.

### Solution

When you scan through the existing issues, and find one that interests you (by narrowing down your search by labels as filters), you're welcome to open a pull request to address it.

It's advisable to make your contribution cover just an area at a time per pull request. Of course.

### Test

It's always advisable to test whatever you've done. This project uses [`jest`](https://jestjs.io/docs/). To run test, run `test` prefix with your package manager

```bash
npm test
```

```bash
yarn test
```

### Commit

Make sure your commit messages/notes indicate what you did, this will help when checking your contribution and help in approving your work on time. Examples of commit messages 👇🏾

  ```bash
      # Bad commit message ❌
      $ git commit -m "Made an update"
      ...
  
      # Good commit message ✅
      $ git commit -m "Updated the README file: fixed typo in overview section"
      ...
  
      # Keep it short and precise as much as possible.
  ```

### Self Review

To speed up your approval, you may want to check the following:

- [ ] Confirm that the changes meet the stated requirement (i.e. resolve the bug or satisfy the required changes for improvement).
- [ ] Test your codes and make sure it isn't breaking anything
- [ ] Check the portability of your work (i.e. check if it does not break on other OS). If there is anything as touching portability, you can state a workaround in your PR note, or probably request for someone else with a different OS to see that it doesn't break.
- [ ] Make sure every change is properly documented in your pull request note.
- [ ] Check the repository to confirm your version is up to date with the current codes on the production branch, to avoid conflicts, thus making merging difficult.
- [ ] If there are any failing checks in your PR, troubleshoot them until they're all passing.

### Pull Request

When you're ready to push your changes to the project, create a pull request (PR).

- Don't forget to link [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you're solving one.
- Make sure to properly document your contribution, as we'll first review the documentation before the codes.
- Be available, as we may ask questions, make suggestions, ask for changes to be made to your PR, or require additional information.
- For any conversation that requires you to do something, mark the conversation as resolved after that task is done, this will help to in the review process.

### Pull request is merged! 🙌🏾🥳🍾

Congratulations🍾 We appreciate you.

Once your PR is merged, your contribution will be publicly visible on the project.

Since you're part of the NoBox console community, we'll want more of your contributions.

### Discussions

If you have questions, any questions actually, please feel free to ask in the [Q&A discussion section](https://github.com/codepraycode/nobox-console/discussions/new?category=q-a)

If you have an idea and want to discuss it, initiate a conversation about the idea in the [Ideas discussion section](https://github.com/codepraycode/nobox-console/discussions/new?category=ideas)

> If you intend to workon an Idea, you can open an issue, but reference that idea when communicating improvement.

Of course, one key thing for community growth is communication, [general conversation](https://github.com/codepraycode/nobox-console/discussions/new?category=general) is where we just talk about anything.

Thanks!✨

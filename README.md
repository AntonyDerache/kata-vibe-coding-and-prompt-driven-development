# Kata vibe coding vs prompt driven development

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Steps

Kata will proceed with 3 main steps:

- 30 minutes of vibe coding
- Checking what we could get and comparing with others
- X minutes of prompt driven development using the craft-rules.md file

## Main features

Produce a random spinning wheel.

- User can add names in a list to fill the wheel
- User can trigger a button to spin the wheel
- The wheel spin and end up on a name from the list randomly
- Congrats to the winner

### Optionnal features

- Save in LocalStorage the names so we can do not have to re-write each of them every-time
- Add conffetis (see [canvas-confetti](https://www.npmjs.com/package/canvas-confetti))
- Statistics about winners
- Add anything you find fun

### Notes

- No starter design defined. Let's let the AI be creative
- Feel free to add or erase rules in craft-rules.md as you wish.
- Feel free to add or update tests to make the PDD in a TDD way.
- Feel free to use any other front frameworks you feel at ease with.
- Feel free to use any AI tool you wish to try for this exercice.

### branches

you have 2 branches so you can separate and keep your trace of work

- vide-coding
- prompt-driven-development

## Start Developing

Once you've created a project and installed dependencies with `npm install`

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

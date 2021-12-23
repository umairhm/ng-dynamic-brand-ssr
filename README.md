# Angular - Dynamic Brand with SSR

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.14.

## Objective

This is a PoC to load dynamic brand styles for browser and server-side generation during build time using environment variables.

## Resources for inspiration

- [Dynamically Load CSS with the Angular CLI](https://juristr.com/blog/2019/08/dynamically-load-css-angular-cli/) by [Juri Strumpflohner](https://twitter.com/jurist)
- [Environment-Based Index HTML with Angular CLI](https://netbasal.com/environment-based-index-html-with-angular-cli-46e2e562a6da) by [Netanel Basal](https://twitter.com/NetanelBasal) - thanks [Jay](https://twitter.com/JayCooperBell) for the reference
- [How to pass environment variables at building time in an Angular application using .env files](https://ferie.medium.com/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c) by [Riccardo Andreatta](https://twitter.com/Ferie80)

## Implementation details

- Add the following `link` to the `index.html` file, to hold dynamically injected brand style file
```html
<link id="brand-style" rel="stylesheet">
```
- Add a directory for all the brand specific style files, in this example it's `src/brand-styles`
- Add separate style files in this directory for each brand like this
```
- src
  - brand-styles
    - one.scss
    - two.scss
```
- Update `angular.json` -> `projects/[project-name]/architect/build/options/styles` with the following content
```json
{
  "input": "src/brand-styles/one.scss",
  "bundleName": "one.min",
  "inject": false
},
{
  "input": "src/brand-styles/two.scss",
  "bundleName": "two.min",
  "inject": false
}
```
- This will tell the Angular CLI to compile these styles into their own separate bundles, but do not inject them in the `index.html` file during build
- To set the brand in the `process.env`, we are using `cross-env` by [Kent C. Dodds](https://twitter.com/kentcdodds) in the `package.json` file
- To inject the style in `index.html` during build, we are using `@angular-builders/custom-webpack` by [JeB](https://twitter.com/jebbacca) which gives us an option `indexTransform` that takes a `.ts` or `.js` file and uses it to transform `index.html` during the build
- We have a file called `index-html-transform.ts` on the root of the project that get the brand value from `process.env.BRAND` and updates the `href` of the placeholder `link` element that we have in `index.html` file

This is pretty much everything to get going!

Now, most likely we will need the selected brand in our components/services as well. For that, we have a file called `set-environment.ts` on the root of the project, which takes the brand from `process.env.BRAND` and updates the `src/environments/environment.ts` file with the brand value. And we can simply import `brand` from our environment file in our application.

## What's next?

- The first thing is to see if this solution makes sense or we have better ways to handle the situation?
- If this solution makes sense, will it work with SSR as expected?
- The `environment.ts` file gets updated with the build. We need to make sure that other details in the file are not affected except the brand

## Development server

### Brand - one

- `npm run start:one`: Serves the app with brand `one` styling at `http://localhost:4200`
- `npm run build:one`: Builds the app with brand `one` styling in the `dist` folder
- `npm run dev:ssr:one`: Serves the app with brand `one` styling built using Angular Universal at `http://localhost:4200`
- `npm run build:ssr:one`: Builds the app with brand `one` styling built using Angular Universal in the `dist` folder
- `npm run serve:ssr:one`: Serves the app from the `dist` folder that was built using the above script at `http://localhost:4000`
- `npm run prerender:one`: Prerenders the app with brand `one` styling built using Angular Universal in the `dist` folder

### Brand - two

- `npm run start:two`: Serves the app with brand `two` styling at `http://localhost:4200`
- `npm run build:two`: Builds the app with brand `two` styling in the `dist` folder
- `npm run dev:ssr:two`: Serves the app with brand `two` styling built using Angular Universal at `http://localhost:4200`
- `npm run build:ssr:two`: Builds the app with brand `two` styling built using Angular Universal in the `dist` folder
- `npm run serve:ssr:two`: Serves the app from the `dist` folder that was built using the above script at `http://localhost:4000`
- `npm run prerender:two`: Prerenders the app with brand `two` styling built using Angular Universal in the `dist` folder

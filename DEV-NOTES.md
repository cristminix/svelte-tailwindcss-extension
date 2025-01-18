# About Project
This project is ported version of LLFetcher built with svelte framework and attended to be run on Mozilla Firefox 

# DEVELOPER NOTES

This project currently developed under windows 11 OS and tested under Mozila Firefox 134.0.1

# Setup
This project powered by `vite-plugin-web-extension` so you need to properly setup current configuration in `vite.config.ts`

```
...
export default defineConfig({
    ...
 plugins: [
    svelte(),
    webExtension({
      // disableAutoLaunch:true,
      manifest: generateManifest,
      skipManifestValidation: true,
      browser: "firefox",
      watchFilePaths: ["package.json", "manifest.json"],
      webExtConfig: {
        firefox: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
        startUrl: "https://www.linkedin.com/learning",
        keepProfileChanges: true,
        firefoxProfile: "default-release",
        target:"firefox-desktop"
      },
    }),
  ],
    ...
})
```
you must properly set `firefox` with valid firefox path and `firefoxProfile` as a valid firefox profile , valid profile can be found in `%APPDATA%\Roaming\Mozilla\Firefox\Profiles`

# Running The Project
Open `cmd` then run this commands

```
# install dependencies
> pnpm i

# run extension with development environment
> pnpm dev
```

Open another `cmd` then run this command

```
# build script inject
> pnpm run build:inject
```

When firefox opened then reload the page.
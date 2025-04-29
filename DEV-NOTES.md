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

![Firefox Profile Dir](screenshoot/firefox-profile.png?raw=true "Firefox Profile Dir")
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
![Running Project](screenshoot/running-project.png?raw=true "Running Project")

# Running or debug content script inject

```
> pnpm run dev:inject
```

After run above command then open browser with vite address  for example `http://localhost:5173/src/debug-inject.html`


## Notes
Remember to create new profile by opening the firefox app and enter `about:profiles` then create new profile called `default-release` as it specified on `vite.config.ts` to allow keep profile changes never use it as default profile

On linux with forefox snap app you need to edit `.bashrc` or `.zhrc` or `.profile`

```
# add this line

mkdir -p ~/tmp-dir
export TMPDIR=~/tmp-dir/
```
To avoid errors while executing `web-ext` command


# copy sql-wasm.wasm file to `dist/db` folder

dont forget to copy `sql-wasm.wasm` wasm file to `dist/db` folder originally from `node_modules/sql.js/dist` folder to avoid wasm error



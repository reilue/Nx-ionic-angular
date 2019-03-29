# Sga & Logistica App para Krack

## Requirements

- [Enviroment Setup](https://ionicframework.com/docs/installation/environment)
- [Ionic Installation](https://ionicframework.com/docs/installation/cli)
- [iOS Setup](https://ionicframework.com/docs/installation/ios)
- [Android Setup](https://ionicframework.com/docs/installation/android)
- [Set up & Build Ionic App for -Ubuntu-](https://gallant-bell-850d88.netlify.com/2019/march/ionic4-workflow-multiapp-project.html#build-project-using-ionic-cli-for-mobile-dev)

## Usage

### Web development

For **sga** or **mobile** App, open console in the root project and execute

```bash
cd apps/mobile
npm install
ionic serve --project mobile
```

or

```bash
cd apps/sga
npm install
ionic serve --project sga
```

and follow the steps.

### Mobile development

open console in the root project and execute

```bash
cd apps/mobile
npm install
ionic cordova build android --project mobile
```

for more commands to, [running iOS](https://ionicframework.com/docs/building/android) or [running Android](https://ionicframework.com/docs/building/ios)

--Android folder address apk generated--
`/platforms/android/app/build/outputs/apk`

### API Updates

To generate a scheme (or Interface) from API & Enviroment Postman JSON, we use [MakeTypes](https://jvilk.com/MakeTypes/).

To update latest API changes do the following

- Export the collection from Postman
- Set the exported collection in `/shared_modules/services/api` folder
- Use [MakeTypes](https://jvilk.com/MakeTypes/) to generate the scheme (Interfaces)
- Save the scheme in `/shared_modules/models` folder
- **Run** the proyect

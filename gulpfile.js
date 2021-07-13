const { series, src, dest } = require('gulp');
const { join } = require('path');
const { copy } = require('fs-extra');
const { exec, spawn } = require('child_process');
const depcheck = require('depcheck');
const fs = require('fs-extra');

/*******************************
 * package JSON File reader
 * for deps checkinf with DepChekc module for server and server build
 */
let config = {
  packageJsonFilePath: join(__dirname, 'package.json'),
  destPathPackageJsonFile: join(__dirname, 'dist', 'apps', 'server', 'api'),
  essentialSource: [
    join(__dirname, 'npm-install.sh'),
    join(__dirname, '.prod.env'),
  ],
  essentialDest: [
    join(__dirname, 'dist', 'apps', 'server', 'api', 'npm-install.sh'),
    join(__dirname, 'dist', 'apps', 'server', 'api', '.prod.env'),
  ],
};

/*** depcheck config */

const options = {
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: false, // skip calculation of missing dependencies
  ignorePatterns: [
    // files matching these patterns will be ignored
    'sandbox',
    'dist',
    'bower_components',
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    'grunt-*',
  ],
  parsers: {
    // the target parsers
    '**/*.js': depcheck.parser.es6,
    '**/*.jsx': depcheck.parser.jsx,
  },
  detectors: [
    // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration,
  ],
  specials: [
    // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack,
  ],
  package: {
    // may specify dependencies instead of parsing package.json
    dependencies: {
      lodash: '^4.17.15',
    },
    devDependencies: {
      eslint: '^6.6.0',
    },
    peerDependencies: {},
    optionalDependencies: {},
  },
};

async function readConfigFile(cb) {
  /** read Config form file*/

  console.log('Done');
  cb();
}

async function movingConfigFiles(cb) {
  /** copying config file there */
  try {
    await Promise.all(
      config.essentialSource.map(async (accu, index) => {
        return await copy(accu, config.essentialDest[index]);
      })
    );
    cb();
  } catch (err) {
    throw err;
  }
}

async function installNpm(cb) {
  try {
    console.log('wait for 5 seconds');

    // exec(config.essentialDest[0], (err, stdout, stderr) => {
    //   if (err) {
    //     console.log(err);
    //   }

    //   console.log(stdout);
    // });
    console.log(config.destPathPackageJsonFile);
    const bat = spawn(join(config.destPathPackageJsonFile, 'npm-install.sh'), {
      cwd: config.destPathPackageJsonFile,
      shell: true,
      detached: true,
    });

    bat.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
      depchecking();
    });
  } catch (err) {
    throw err;
  }
}

async function depchecking() {
  await copy(
    config.packageJsonFilePath,
    join(config.destPathPackageJsonFile, 'package.json')
  );
  const deps = await depcheck(config.destPathPackageJsonFile, options);

  await checkPackage(deps);
}

async function readFile() {
  return fs.readFileSync(config.packageJsonFilePath);
}

async function checkPackage(package) {
  // console.log(package);
  const packageJson = JSON.parse((await readFile()).toString());

  let { using } = package;

  /** copying
   *
   * this package is not redable with Deccheck module
   */

  const nonRead = {
    '@nestjs/platform-express': '',
    'mongoose-sequence': '',
    'multer-s3': '',
    '@nestjs/mapped-types': '^0.4.0',
    morgan: '^1.10.0',
    'cli-color': '^2.0.0',
    winston: '^3.3.3',
    'winston-daily-rotate-file': '^4.5.5',
  };

  using = { ...using, ...nonRead };

  const { dependencies } = packageJson;
  /**
   * writing here as which module using the package and not using package
   */
  const tempObj = {};

  const usingKeyArray = Object.keys(using);

  Object.keys(dependencies).forEach((accu) => {
    const usingKey = usingKeyArray.find((innerAccu) => innerAccu === accu);

    if (usingKey) {
      tempObj[accu] = dependencies[accu];
      return true;
    }
  });

  console.log(tempObj);
  /** clear devDependencies */

  packageJson.scripts = {};

  packageJson.devDependencies = {};

  packageJson.dependencies = { ...tempObj, '@nestjs/mapped-types': '^0.4.0' };

  fs.writeFileSync(
    join(config.destPathPackageJsonFile, 'package.json'),
    JSON.stringify(packageJson)
  );
  /** write file directory */
  // fs.mkdirSync(__dirname + '/build');
  await fs.copy(
    config.destPathPackageJsonFile,
    join(__dirname, '..', '..', 'prohub_automated', 'automate_only')
  );
  // console.log(config.destPathPackageJsonFile);

  process.stdin.read;

  // console.log(packageJson.dependencies);
}
// async function series() {
//   await readConfigFile();
//   await movingConfigFiles();
// }

// series();

exports.default = series(readConfigFile, movingConfigFiles, installNpm);

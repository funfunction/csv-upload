import lBashExecChain from "@root/mid-libs_node/bl/cli/lBashExecChain";
import env from "@root/mid-libs_node/bl/envs/processEnv";
import { buildSync } from "esbuild";
const { join } = require("path");

const l = console.log;

/**
@file
run this file
- to build the bundle file
- and deploy to heroku

*/



/*
generate the deployable file: _build/express-csv_BUNDLE.js
*/
const doEsBuild = () => {
  const path = join(process.cwd(), "\\packages\\server-express\\");
  const inputPath01 = join(path, "express-csv.js");
  const outputPath = join(path, "_build\\express-csv_BUNDLE.js");
  l({ inputPath01, outputPath });

  l(buildSync({
    entryPoints: [inputPath01],
    bundle: true,
    platform: "node",
    target: ["node15.10.0"],
    external: ["fsevents"],
    outfile: outputPath,
  }));
};



const appName = "express-csv";

const packagejson = `{"scripts": {"start": "node ./app.js"},"engines": {"node": "15.x"}}`;



const cmds = `

${doEsBuild()}

cd ..\\_thyBuilds\\${appName}
rm -rf Procfile app.js package.json .git

cd ../../_thyrepo
cp -v ./packages/server-express/_build/${appName}_BUNDLE.js ../_thyBuilds/${appName}/app.js
cd ..\\_thyBuilds\\${appName}

echo "web: node app.js" > Procfile
echo ${packagejson} > package.json

git init
git add .
git commit -m "initial commit for heroku deploy, csv"

git config --local remote.heroku.url https://git.heroku.com/${appName}.git
git config --local remote.heroku.fetch +refs/heads/*:refs/remotes/heroku/*

heroku apps:destroy -a ${appName} --confirm ${appName}
heroku create ${appName}
heroku git:remote -a ${appName}

heroku config:set mongoUriAtlas=${env.mongoUriAtlas}

git push heroku master
`;

//@run
lBashExecChain(cmds);

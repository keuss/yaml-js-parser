// To test node app/src/index.js
const httpreq = require('httpreq');
const yaml = require('js-yaml');
const fs = require('fs');
const sleep = require('system-sleep');
const NEXUS_BASE_URL = "http://hostname/nexus/service/local/artifact/maven/redirect?r=central-all";

function deleteFile(fileName) {
  fs.unlink(`./${fileName}`,function(err){
        //if (err) return console.log(err);
        console.log(`file : ${fileName} deleted successfully`);
   });
}

/*
Example yaml file :
application:
  java:
    tomcat:
      components:
      - artifact:
          group_id: com.foo
          artifact_id: bar
          version: 1.15.0
          type: war
      - artifact:
          group_id: com.foo
          artifact_id: bar-conf
          version: 1.15.0
          type: zip
          classifier: template
*/
function processYAML(yamlFile) {
  try {
    console.log('convert Yaml file', yamlFile);
    // Get document, or throw exception on error
    var yamlObject = yaml.safeLoad(fs.readFileSync(yamlFile, 'utf8'));
    //console.log('yaml json string', JSON.stringify(yamlObject));
    console.log('processYAML', yamlObject);
    yamlObject.application.java.tomcat.components.forEach(function(e) {
      downloadFile(e.artifact, false)
    });
  } catch (e) {
    console.log(e);
  }
}

function getFileName(artifact) {
  if (!artifact.classifier) artifact.classifier = '';
  var fileName = (artifact.classifier === '') ? `./${artifact.artifact_id}-${artifact.version}.${artifact.type}` : `./${artifact.artifact_id}-${artifact.version}-${artifact.classifier}.${artifact.type}`;
  return fileName;
}

function downloadFile(artifact, verbose, callback) {
  // Example : http://hostname/nexus/service/local/artifact/maven/redirect?r=central-all&g=com.foo&a=bar&v=1.13.0&e=war
  // Nexus API : https://repository.sonatype.org/nexus-restlet1x-plugin/default/docs/path__artifact_maven_redirect.html
  console.log('downloadFile', artifact);
  var fileNameToSave = getFileName(artifact);
  console.log('fileNameToSave', fileNameToSave);
  deleteFile(fileNameToSave);
  httpreq.download(
    `${NEXUS_BASE_URL}&g=${artifact.group_id}&a=${artifact.artifact_id}&v=${artifact.version}&e=${artifact.type}&c=${artifact.classifier}`,
    fileNameToSave
    , function (err, progress) {
      if (err) return console.log(err);
      if (verbose) console.log(progress);
    }, function (err, res) {
      if (err) return console.log(err);
      if (verbose) console.log(res);
      if (callback) callback(fileNameToSave);
    });
}

// get YAML file
const artifactYAML = {
  group_id: 'com.foo',
  artifact_id: 'bar',
  version: '1.13.0',
  type: 'yml'
};

downloadFile(artifactYAML, false, processYAML);

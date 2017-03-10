# yaml-js-parser

Yaml to JavaScript Object parser test with fetching files from Nexus Repository

- Get YAML for nexus repo with nexus api : https://repository.sonatype.org/nexus-restlet1x-plugin/default/docs/path__artifact_maven_redirect.html
- Convert yaml to JSON
- Process YAML Object to fetch binary files in the yaml file
 
 ## npm dependencies
 
 ```
 "dependencies": {
    "httpreq": "0.4.23",
    "js-yaml": "3.8.2",
    "read-json": "1.0.3",
    "system-sleep": "1.3.0"
  }
  ```
 
 ## Yaml example :
 
 ```
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
 ```

# yaml-js-parser

Yaml to JavaScript parser test with fetching files from Nexus Repository

- Get YAML for nexus repo with nexus api
- Convert yaml to JSON
- Process YAML to dowload binary files
 
 
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

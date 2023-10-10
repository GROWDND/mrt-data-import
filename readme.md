## How to use


### Github
 - clone down or download the Repo as a zip

### Google Sheets
 Export the document as a web page (.html) 
 `File -> Download -> Web page (.html)` 


### The Script
Once the file is downloaded, unzip the folder to the directory of your choice.

open a new terminal: *Mac*
 `Open spotliht search (⌘ + space)`
 `Type *Terminal*`

 open a new command pompt: *Windows*
 `Windows Key => Type "cmd" push enter`


Navigate to the current directory  where the Github repo live and copy the path.

Change the current location of the terminal to the path with the script.  *make sure the path is in quotes*

`cd "C:/download/mrtSheetsToData"`


#### Running the Script
Running the script is a easy as copying the line below, and just adding the path of the html files

```
node mrtHtmlToJson.js <html files folder>
```

__if the path is C:/Users/jason/Downloads/Simple_MRT_Legislation__

the runner script would be 
```
node mrtHtmlToJson.js C:/Users/jason/Downloads/Simple_MRT_Legislation
```

### Uploading files
after the script has been run a newly created "output" folder will be generated with .json files in it.
navigate to [Github](https://github.com/GROWDND/mandatedReporterTraining/)
under the  "data" folder, navigate to the folder that you need, and replace the appropiate files using the Add file/ upload file button
drag and dropfiles, write a little message, then push the green commit button.


__/resources/who-is-a-mandated-reporter/__

-[Child Abuse](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/who_is_a_mandated_reporter)

-[Domestic Violence](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/who_is_a_mandated_reporter)

-[Elder Abuse](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/who_is_a_mandated_reporter)

-[Child Abuse Accordian Questions](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/who_is_a_mandated_reporter)

-[Domestic Violence Accordian Questions](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/who_is_a_mandated_reporter)

-[Elder Abuse Accordian Questions](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/who_is_a_mandated_reporter)




__/resources/how-to-report/__

-[How to Report - Child](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/states/how_to_report)

-[How to Report - Elder](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/states/how_to_report)

__/resources/laws-and-regulations/__

-[Legal - Child](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/states/childAbuse/legal)

-[Legal - Elder](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/states/elderAbuse/legal)


__/resources/state-resources/__

-[Resources - Child](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/states/childAbuse/resources)

-[Resources - Elder](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/states/elderAbuse/resources)


__/resources/sources-and-citations/__

-[Sources - Child](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/sources/childAbuse)

-[Sources - Elder](https://github.com/GROWDND/mandatedReporterTraining/tree/master/data/sources/elderAbuse)


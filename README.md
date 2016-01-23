# latest

============================================
|   Programming Project - UI Developer
============================================

This readme goes over our code project. We would like to give you rest of the
week to complete it and e-mail back the files. Please confirm that you have
received this e-mail and will send back the completed project  to us by 
midnight Sunday .

This Friday Q&A  session ( Let me know 30 min time slot so I can block my 
calendar ) is so you can ask for any clarification about the project. Think of
this meeting like a work meeting, where you have been given some 
requirements and before implementing it you have a chance to talk
to the customer/team for clarification.

Code Project: EagleEye
==================

XYZ company wants to improve productivity of failure root cause analysis
and has developed two REST api's. They want to roll out these features in
a new tool called 'EagleEye'. Your job ( should you choose to accept ) is
to develop a user interface to satisfy the following use cases:

Use Case 1. : Search to find other runs and bugs that have the same 
problem. One place where this is very valuable is in 
intermittent issues.

Use Case 1.1 : User should be able to click on a matched line
and go into lines around it in  the document. 

Use Case 2 :  In a micro service architecture a user requests hops around
multiple containers to service end user. The request can be
uniquely identified with an id called ECID ( Execution context
ID ). User should be able to provide this id ( think like
Fedex's tracking id ) and use the event view to debug what
went wrong.

Use Case 3 :  Tests are run in Hudson jobs. The tests are taking a long time
to run. We would like to identify these slow tests. Also, we want 
to identify any time period in the job where the tests ran slowly
or we had a burst of failures. Provide a visualization that'll
help user identify above.

Implementation notes:
=================

- We expect this application to grow into a large application thus we want
to ensure that it's designed to scale.

- It should be developed using AngularJS. You can use any other 
library for styling and visualization as long as the whole application works
without any need to have a server, i.e. we can simply load it in browser
and try it out.

- JSON have been provided for 'search' and 'actions' ( for job test results )
REST api in 'json' sub directory. . Please use it to create your mock service.

- Use Case 1 : /json/search-error.json
/json/search-illegalargumentexception.json
/json/search-nullpointerexception.json

- Use Case 1.1 : There are no json file. You'll have to design the
service and use mock json files.

- Use Case 2 : /json/search-event-view-ecid-0058XfwMFzUFCCPLIek3yf0006ZW0001ze.json        
/json/search-event-view-ecid-aa04b5d0db9e65dc:3e7b6e52:15068bd6990:-8000-0000000000000002.json

- Use Case 3 :/json/actions-job-result.json
/json/actions-job-result-2.json 

-  Our user are working in tight timelines and we need to ensure that 
our user experience makes it very simple to them to use our application.

- We expect user to store their preference. Please also develop and mock
preference service and it as part of your application.

- We expect the work to be like production quality. Write it as if your code
will be put in production the next day.

- We would like to assess the application by first trying it out and then going
through code. For other projects we request working JUnit tests. In this case
it's optional to provide automated unit tests in your choice of javascript
framework. At a minimum we should have a readme with some manual
tests that we can follow to try the application out.


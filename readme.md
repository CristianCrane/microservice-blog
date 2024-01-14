# project overview
this is a small blog application

# quickstart
all microservices are intended to be ran in k8s.
it is assumed you have docker desktop with a k8s cluster running on your machine.

Start the project with `skaffold dev`.
Access the app by navigating to `http://blog.com` in your browser.

Note: The following line was added to the `hosts` file at `C:\Windows\System32\drivers\etc` to redirect `blog.com` -> `localhost` which is where the k8s nginx router is listening.
`127.0.0.1 blog.com` 

# Lessons learned and topics covered
- microservices
  - sharing/managing data between microservices
  - the role of async communication via events and the event-bus
  - adding features to an existing microservice system
  - synchronizing/backfilling events when services go down or new services are added
- docker
  - containerizing & pushing microservice images to dockerhub 
- kubernetes
  - deployments, services, load balancers, ingress controllers
  - configuration, setup, networking, and deployment of a microservice system on k8s
- skaffold
  - automating/managing the entire k8s developement lifecycle & multiple microservices automatically

# Thoughts to investigate and improve on
- a lot of duplicated code
  - solution: build a central library as an npm module to share code between different microservices
- hard to picture the flow of events between services
  - solution: precisely define all of our events in shared library
- hard to remember what properties an event should have
  - solution: write everything in typescript and share it between all microservices
- hard to test some event flows
  - solution: invest more time into automated tests
- hard to test race conditions of events - features depend on assumed sequence of events
  - todo: investigate concurrency issues of microservices
---
id: 6
title: System-Design:Load balancer
createdAt: "2021-06-30 5:00:00"
# image field is not mandatory
# you can skip it to keep the size of blog cards small
 image: /images/loadbalancer/Simple_load_balancer_arch.png
tags:
  - system design
  - scalability
  - dns
  - loadbalancer
category: dev
author:
  name: Ashraf
  twitter: Er3bu5_
  image: /images/portfolio.png
---

# System Design: Load balancer

In the last article we talked about **horizontal scaling** and how this approach requires a way to distribute incoming traffic among web servers that are defined. In this article, we discuss load balancers and how they work

<!--more-->

### What is a load balancer?

> According to (Wikipedia): load balancer refers to the process of distributing a set of tasks over a set of resources (computing units), with the aim of making their overall processing more efficient. Load balancing can optimize the response time and avoid unevenly overloading some compute nodes while other compute nodes are left idle.
![/images/loadbalancer/Load-Balancer-Placed.png](/images/loadbalancer/Load-Balancer-Placed.png)

As you can see from the diagram, you can place a load balancer at any layer of your architecture including (Client/Backend/Database layers).

## How load balancer works?

To really understand how load balancer works we should first know the life cycle of DNS request.

1. You open the browser and enter example.com
2. The web client sends a query over the internet to find example.com
3. A recursive resolver (also known as a DNS resolver) is the first stop in a DNS query. The recursive resolver acts as a middleman between a client and a DNS nameserver.

    After receiving a DNS query from a web client, it sends a request to root servers.

4. A root server accepts a recursive resolver’s query which includes a domain name, and the root nameserver responds by directing the recursive resolver to a TLD nameserver, based on the extension of that domain (.com, .net, .org, etc.).

    In this case, the root server will direct the recursive resolver to a TLD server that contains all information about ".com" domains

5. A TLD nameserver maintains information for all the domain names that share a common domain extension, such as .com, .net, or whatever comes after the last dot in a URL.

    The TLD server responsible for .com domains will point back to the authoritative nameserver that contains information about the example.com domain

6. The authoritative nameserver contains information about example.com and it will provide the recursive resolver with the IP address of that example.com

the response of the authoritative nameserver may be something like:

| example .com  | record type  | value     |  TTL |
|---------------|--------------|-----------|------|
|  @            |  A           | 192.0.2.1 | 3600 |   


7. The request then is redirected to the server with IP 192.0.2.1

![/images/loadbalancer/DNS_(2).png](/images/loadbalancer/DNS_(2).png)

**Okay, I know how DNS query lookup what is the relationship between it and the load balancing ?**

When you scale horizontally you will have many servers with different IP addresses, the **load balancer lies in the authoritative nameserver.**

DNS load balancing enables the authoritative server to return different IP addresses of a certain domain to the clients. Every time it receives a query for an IP, it returns a list of IP addresses of a domain to the client.

The client picks the first IP address from that list and forwards the request.

**The load balancer will return the IP addresses of the servers in a different order for every request using different types of algorithms to take that decision.**

for example, a company has one domain name and three identical copies of the same website residing on three servers with three IP addresses. The DNS server will be set up so that the domain name has multiple A records, one for each IP address.

When one user accesses the home page it will be sent to the first IP address. ⇒ 192.0.2.1

The second user who accesses the home page will be sent to the next IP address. ⇒ 192.0.4.2

The third user will be sent to the third IP address. ⇒ 192.2.0.2

In each case, once the IP address is given out, it goes to the end of the list. The fourth user, therefore, will be sent to the first IP address, and so forth.

This algorithm is called **Round-robin DNS load balancing**

![/images/loadbalancer/DNS_Load_balancing.png](/images/loadbalancer/DNS_Load_balancing.png)

## Load balancing algorithms

Different basic algorithms used by load balancers to make the decision of which server should send the request.

1. **Weighted Scheduling Algorithm**

    Suppose that we have 3 servers with different capabilities

    server one has the lowest capabilities server 3 has the highest capabilities, and server 2 has some capabilities between the two, every server will take a number that represents the weight the server can handle

    the higher the weight of the server, the more requests it will receive

    ![/images/loadbalancer/Weighted_load.png](/images/loadbalancer/Weighted_load.png)

2. **Round Robin Scheduling**

    As discussed above, an incoming request is routed to each available server in a sequential manner.

3. **Least connection**

    The least Connection load balancing is a dynamic load balancing algorithm where client requests are distributed to the application server

    with the least number of active connections at the time the client request is received.

    ![/images/loadbalancer/Least_connection.png](/images/loadbalancer/Least_connection.png)

4. **Weighted least connection**

    Weighted Least Connection builds on the Least Connection load balancing algorithm to account for differing application server characteristics.

    The administrator assigns a weight to each application server based on criteria of their choosing to demonstrate the application server's traffic-handling capability.

    ![/images/loadbalancer/Weighted_least_connection.png](/images/loadbalancer/Weighted_least_connection.png)

5. **Source IP Hash**

    The load balancer will hash the IP address of the user and cache it, then send the user to the same server every time a request is sent from this IP address.

    ![/images/loadbalancer/IP_Hash.png](/images/loadbalancer/IP_Hash.png)

There are many algorithms to implement, most companies use different algorithms types together to fit their needs since every type has its own advantages and disadvantages.

## Software load balancer vs. Hardware load balancers

**Software load balancer**: as the name suggests it is software that you install on any server or device you want that generally implements a combination of one or more scheduling algorithms.

**Software load balancer examples:**

- [HAProxy](http://www.haproxy.org/)
- [NGINX](https://www.nginx.com/resources/wiki/)
- Varnish – A reverse proxy based load balancer.

**Hardware load balancer:** it is a hardware device with a specialized operating system that distributes web application traffic across a cluster of application servers. (simply you buy a physical load balancer server)

**Hardware load balancer examples:**

- F5 Load Balancer
- Citrix
- A10 Thunder ADC

| Name   | Cost  | Security  | Configuration  | Scalability   | Support |
|--------|-------|-----------|----------------|---------------|---------|
|  Software load balancer | low  | low   | easy  | easy   | N/A |
|   Hardware load balancer | high  | high  | hard   | hard   | 24/7 |


## **Layer4 vs Layer7 load balancing**

The term layer refers to the [OSI layers](https://www.imperva.com/learn/application-security/osi-model/). Load balancers can be performed at various layers in the OSI including layer4 and layer7.

**Layer4 load balancing (dumb balancing):**

operates at the intermediate transport layer, which deals with the delivery of messages with no regard to the content of the messages.

Transmission Control Protocol (TCP) is the Layer 4 protocol for Hypertext Transfer Protocol (HTTP) traffic on the Internet.

Layer 4 load balancers simply forward network packets to and from the upstream server without inspecting the content of the packets.

They can make limited routing decisions by inspecting the first few packets in the TCP stream.


**Layer7 load balancing (smart balancing):**

A Layer 7 load balancer terminates the network traffic and reads the message within. It can make a load‑balancing decision based on the content of the message (the URL or cookie, for example).

It then makes a new TCP connection to the selected upstream server (or reuses an existing one, by means of HTTP keepalives) and writes the request to the server.

![/images/loadbalancer/layer7.png](/images/loadbalancer/layer7.png)

Layer 7 load balancing is more CPU‑intensive than packet‑based Layer 4 load balancing, but rarely causes degraded performance on a modern server.

Layer 7 load balancing enables the load balancer to make smarter load‑balancing decisions and to apply optimizations and changes to the content (such as compression and encryption).

It uses buffering to offload slow connections from the upstream servers, which improves performance.

## Example: simple layer4 and layer7 load balancing architecture.

Suppose that we have an **e-commerce application that has 3 servers**

- **Frontend Server**
- **Backend Server**
- **Database sever**

Our app suffers from a high load that makes the application unavailable for some users. So we decided to **scale the application horizontally** and

- divide **the one big backend server into multiple servers one for each service.**
- buy **2 more servers for the frontend**
- buy **2 load balancers servers.**

**Now, we have those components**

- **3 Front end servers**
- Multiple servers for each backend service
- 2 load balancers servers
- 1 Database server

![/images/loadbalancer/Simple_load_balancer_arch.png](/images/loadbalancer/Simple_load_balancer_arch.png)

## References
- https://www.nginx.com/resources/glossary/layer-7-load-balancing/#:~:text=Layer%204%20load%20balancers%20simply,packets%20in%20the%20TCP%20stream.&text=A%20Layer%207%20load%20balancer,and%20reads%20the%20message%20within.
- https://en.wikipedia.org/wiki/Load_balancing_(computing)
- https://kemptechnologies.com/load-balancer/load-balancing-algorithms-techniques/
- https://avinetworks.com/glossary/hardware-load-balancer/#:~:text=The%20most%20obvious%20difference%20between,x86%20servers%20or%20virtual%20machines.
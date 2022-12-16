---
id: 7
title: What Happens When You Type Reddit.com Into Your Browser ? Part(1) (DNS)
createdAt: "2022-12-11 5:00:00"
# image field is not mandatory
# you can skip it to keep the size of blog cards small
image: /images/whathappens/Howinternetworks.jpg
tags:
  - network
  - dns
category: dev
author:
  name: Ashraf
  twitter: Er3bu5_
  image: /images/portfolio.png
---

# What Happens When You Type Reddit.com Into Your Browser ? Part1 (DNS)

This article is me trying to understand how DNS, browsers, and the system itself work together to achieve a "taken for granted" task like accessing a webpage. Why reddit? because I like it. 😃.
We are going to assume that nothing is cached, including DNS records, HTTP resources (HTML files, images, JS files, web fonts, etc.), and that we are connecting to [reddit.com](http://reddit.com) for the first time. NOTHING is cached.

The Article is surprisingly long, So divided it into 3 parts.

The article answers many questions like:  
* What exactly is an IP address?  
* What  is DNS? How does it function? And what are DNS components?  
* How do TCP 3-Way Handshake and TLS work ?
* What are HTTP and HTTPS?  
* What are DOM and CSSOM ? 
---  
## Introduction  
- You opened your favourite browser and typed "reddit.com" in the address bar and clicked Enter.  
Unfortunately, browsers, computers, and other devices communicate only using **IP addresses**.
### What is an IP address?  
Each computer, mobile device, or other Internet-connected device must have a unique address.  
Internet addresses take the form **nnn.nnn.nnn.nnn**, where nnn must be a number between 0 and 255.
This address is known as an "IP address."

So if devices and networks use the IP address to communicate, why are we using domain names like [reddit.com](http://reddit.com) instead of the reddit IP, for example [192.168.25.140](http://192.168.25.140) ?

Simply because it is so hard to remember those IP addresses, imagine that every time you want to access a website, you must know its IP address! 
So how does the browser know the IP address when we are trying to access a website?

### DNS and how does it work?  
The Domain Name System (DNS) translates domain names into IP addresses. Imagine DNS as a phonebook that points every domain name to its corresponding IP address, something like this:

| Domain Name | IP address     |  
| ----------- | -------------- |  
| google.com  | 195.14.54.20   |  
| netflix.com | 192.154.14.210 |

### What is the process of obtaining an IP address from DNS?   
![/images/whathappens/Internal.gif](/images/whathappens/Internal.gif)
1.  A user types "reddit.com" into a web browser, and the query goes to the network layer of the browser.  
2.  The browser doesn't know what the IP address of reddit.com is, so it checks its DNS cache for the IP address.  
3.  The browser doesn't have any records for the reddit website.  
4.  The next step is the operating system itself; the browser will ask the OS for the IP address.  
5.  The OS will check the system hosts file.  
The location of the hosts file will differ by operating system. The typical locations are noted below:  
```
- Windows 10 - "C:\Windows\System32\drivers\etc\hosts"  
- Linux - "/etc/hosts"  
- Mac OS X - "/private/etc/hosts" 
```
The hosts file contains the hostname and the corresponding IP, and it looks something like this:  ```
```
    72.30.35.10 google.com  
```
6.  Unfortunately, the hosts file also doesn't have the IP. So the OS will go check the system's local DNS cache.  
Here is a copy of my local DNS cache file.  
![/images/whathappens/image.png](/images/whathappens/image.png)

The OS DNS cache also doesn't have the IP address. Now that's a problem. Where else can we get the IP from?  
![/images/whathappens/fulldnsquery.gif](/images/whathappens/fulldnsquery.gif)


The OS knows the answer; it will call a server called the recursive resolver (which is frequently your ISP DNS server).  
The recursive resolver takes a trip to find the IP address.  
1.  The resolver will first check if it has the IP address; if not, it will ask the root server.  
	 - *What is the name of the root name server?*
		 Well, it is a server at the very top of the DNS hierarchy and essentially manages domain names for the entire Internet.  

2. The root name server doesn't store the IP addresses; instead, it stores the TLD (top-level domain) data.  
	- *What exactly are TLD servers?*  
		A TLD nameserver keeps track of all domain names that share a common domain extension, such as.com.net, or whatever comes after the last dot in a URL.  
3. Since we are asking for the IP address of reddit.com, the root server will respond to the resolver with information about the ".com" TLD.  
4. The resolver will go and ask the TLD server for the IP. Again, the TLD server doesn't know the IP; instead, it will answer with data about the "authoritative DNS servers" that have the IP address.  
	* *What are the authoritative servers?*  
		Consider it the real phone book that holds the IP address of the website. Authoritative nameservers are responsible for providing answers to recursive resolver nameservers about where specific websites can be found. and it is maintained by the owner of the website or the hosting service provider.  
5.  Lastly, the recursive resolver sends a query to the domain’s nameserver.  
6.  The IP address for reddit.com is then returned to the resolver from the nameserver. and it caches the results for later requests.  
7.  The resolver then responds to the OS with the results and caches them.  
8. The IP address is passed to the web browser along with the domain reddit.com by the operating system.  
9.  The browser is now able to establish a connection with reddit.com.  
![/images/whathappens/Howinternetworks.jpg](/images/whathappens/Howinternetworks.jpg)




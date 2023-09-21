# Plotline_SDE_Backend
## ADITYA JAMWAL
## Problem statement
An online billing system is essential for businesses to manage their invoicing, payments, and financial transactions efficiently. Your task is to develop a Node.js server for a billing system that provides seamless functionality and a user-friendly experience.
## Overview
<br/>
For the mentioned assignment, there are a few points I would like to inform before evaluation. <br/> <br/>
1) Involved Tools and Technologies : Node.js, Express, MongoDB (Database), Postman (Local Tests, Backend API check) <br/> <br/>
2) MongoDB Atlas Cluster => Project Name: Plotline_SDE_Backend with IP Adress : 0.0.0.0/0 [Open To All], and invite sent to the two given mail id as ReadOnly Members for this Cluster0. <br/> <br/>
3) To run, either download zip file/ git clone (any code editor/ IDE) -> Initialize with npm install (to install all dependencies), for accessing .env files, use MongoDB invitation to know working cluster [MongoDB_URL], for bcrypt (encryption of password at user authentication : Use any 32 bit random symbols, numbers and letters. <br/> <br/>
4) Structure of Backend Application (Node.js Server) -> Root -> src (source) includes app, config and index.js. <br/> <br/>
5) Index.js acts as the startpoint for this application, I've added comments to almost each file explaining idea about ongoing functions/ procedures. <br/> <br/>
6) Config includes mongoose.js (To establish connection with Database) <br/> <br/>
7) App is the main directory including subdirectory namely: Users (Login/ SignUp) , Products (or Services) , Cart (Billing Operations) and routerHandler (to handle various routes from middleware to backend/ APIs/ Database). <br/> <br/>
8) Each segment contains comments included by me to extend my point of view in working on this assignment <br/> <br/>
9) Right now I've just included Products segment (with taxonomy) -> tax addition based on range provided, Services can be implemented just as a copy of this. <br/> <br/>
10) Each of the 3 segments include 4 files: model.js (For Schema Model), repository.js (For exporting requests), routes.js (For applying REST principle operations), controller.js (For main functional value). <br/> <br/>
11) Features: Create an account, Fetch all products and services information with their prices, Add a product or service to the cart, Remove a product or service from the cart, Clear the cart, View total bill, Tax on individual product/service. <br/> <br/>
12) Testing of the application was done on POSTMAN (use new HTTPs request, enter PORT (localhost:4000), select REST Method accordingly for test cases).

Decentralized Human verification for X posts to guarentee a post was made by a Human and not a bot.

# What is the project
These days, with the rise of AI agents and bot accounts, social media appears to heve fewer human-to-human interaction. There is a growing need for real conversations with real people. We set out to create an auxilary website that can provide proof that a post on X was created and posted by a real human and not an autonomous bot.
We used the Humanity Protocol API to validate the credentials of a user. Once a user is validated they can submit a post on the website page which posts on X.com on behalf of their account with a humanity verification link. 
The Humanity Protocol API is called from a smart contract on the Chainlink Protocol. We utilize Chainlink's off-platform API calling functionality in our smart contract. This ensures a decentralized, trustless, and verifiable human authentification process.


# About Us
Our team is a team of Students from The University of Texas at Austin. We represent the Texas Blockchain student organization. 
Our memmbers include:

- Kyla (kojaewhi22) - Frontend Engineer
- Akshat (DinglyCoder) - Frontend Engineer
- Shanti (shazam8253) - Backend Engineer
- Adarsh (Adarsh54) - Smart Contract Engineer

# How to Test and Run

1. Start the backend server:
```bash
cd backend
npm install
npm start
```

2. Start the frontend application:
```bash
cd website/hawkeye
npm start
```

The application will be available at `http://localhost:3000`

# Humanity Protocol Feedback
We appreciate that Humanity Protocol is in its early stages of development and acknowledge the efforts of the development team in assisting us throughout the process. Their responsiveness to our inquiries was valuable in helping us integrate their system into our project.

However, there were several challenges we encountered:

* Unclear Credential Collection Process – It was not explicitly documented how user credentials are collected and managed in practice. Our project operates under the assumption that a separate credential collection service exists, but clearer guidance on this aspect would be beneficial.
* API Bugs – We encountered certain issues when using the API to validate credentials, we notified these bugs and they were addressed, or a workaround was given, in a timely manner
* Limited Documentation – The available documentation lacked detailed examples or a intended standardization of obtaining and verifying credentials making it challenging to implement features in the intended way the Humanity Protocol wishees for them to be implemented. More examples in the docs would greatly benefit the developer experience.

# Video Demo
https://youtu.be/bbMlU2d64W8



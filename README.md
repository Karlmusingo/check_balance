# CHECK BALANCE

**Write a web application to compute the balance of a currency account given a series of transactions**

[Run it locally](#run-it-locally)

Requirements:

- Users must be able to log in using an email/username password combination

- After logging in, users are presented with a list of transactions and a form to enter a transaction in the system. Each transaction is defined by the following attributes:

  - Description

  - amount withdrawn

  - amount deposited

  - account balance after the transaction

- The form should allow the user to enter just the description and the amount withdrawn/deposited, the balance will be computed by the backend.

- After a transaction is entered, it must be sent to the backend. The backend must accept that transaction, store it and compute the balance of the user's account, given the transaction it received and the previous transactions it has stored. Each account starts with balance 0.

- After the backend processes the new transaction, the list should update and display the new transaction alongside the others.

- The returned transactions should be sorted by reverse insertion order.

- Store the user accounts in a database (if you don't allow users to create an account, see below, you can pre-populate them)

- The backend should expose a JSON REST API and the frontend should be a single page application, reloading the page is not accepted.

Bonus:

- Users can create an account

- Use pagination to prevent having to load all transactions at the same time.

- Possibly, you should work in a Linux environment (or at least provide instructions to make the system work easily in Linux)

## Run the project locally {#run-it-locally}

To run the project locally, first make sure to have node and mongodb installed

### Clone the project

```bash
$ git clone https://github.com/Karlmusingo/check-balance-frontend.git
```

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
